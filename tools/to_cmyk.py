#!/usr/bin/env python3
"""Turn a print cover's RGB PDF (from tools/print_cover.js) into the flattened CMYK files a printer wants.

    python3 tools/to_cmyk.py <dir>/<name>  [--profile ISOcoated_v2_300_eci.icc] [--dpi 300]

Reads <name>-rgb.pdf and <name>.json and writes:
  <name>-cmyk.pdf      the file to upload: one flattened CMYK image at exact physical size
  <name>-cmyk.tif      the same pixels as an LZW TIFF with the output profile embedded
  <name>-softproof.jpg what the CMYK will roughly look like, converted back to sRGB
  <name>-guides.jpg    the soft proof at 100 dpi with trim/fold, safe and hinge lines drawn on
  <name>-gamut.png     where the printed hue/saturation moves more than 6 (a*b*) from the screen colour (red)
and prints a preflight report: size, resolution, total ink coverage, colour shift.

The RGB -> CMYK conversion is Ghostscript's (sRGB in, relative colorimetric). Black point
compensation is off: it lifted and greyed deep colours such as madder and indigo by dE 7-9,
where plain relative colorimetric holds them within about 2 and only clips the very darkest ink. The default output profile is ISO Coated v2 300% (FOGRA39, 300% ink limit),
a safe general-purpose target for coated cover stock on digital or offset presses.
Needs ghostscript, Pillow (with ImageCms) and numpy.
"""
import argparse
import json
import subprocess
import tempfile
from pathlib import Path

import numpy as np
from PIL import Image, ImageCms, ImageDraw

Image.MAX_IMAGE_PIXELS = None
ICC_DIRS = [Path("/usr/share/color/icc"), *sorted(Path("/usr/share/ghostscript").glob("*/iccprofiles"))]


def find_profile(name: str) -> Path:
    p = Path(name)
    if p.exists():
        return p
    for d in ICC_DIRS:
        if (d / name).exists():
            return d / name
    raise SystemExit(f"ICC profile {name} not found (apt-get install icc-profiles)")


def gs(*a):
    subprocess.run(["gs", "-q", "-dSAFER", "-dBATCH", "-dNOPAUSE", *a], check=True)


def to_lab(img, src_profile):
    lab = ImageCms.createProfile("LAB", 6500)
    t = ImageCms.buildTransform(src_profile, lab, img.mode, "LAB", ImageCms.Intent.RELATIVE_COLORIMETRIC)
    a = np.asarray(ImageCms.applyTransform(img, t)).astype(np.float32)
    # Pillow's LAB as an array: L 0..255 -> 0..100; a/b are signed bytes read as unsigned
    # (getpixel() instead reports them offset by 128)
    ab = a[..., 1:].copy()
    ab[ab > 127] -= 256
    return np.dstack([a[..., 0] * 100 / 255, ab])


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("base", help="<dir>/<name>, as passed to print_cover.js --out")
    ap.add_argument("--profile", default="ISOcoated_v2_300_eci.icc")
    ap.add_argument("--dpi", type=int, default=300)
    o = ap.parse_args()
    base = Path(o.base)
    meta = json.loads(base.with_suffix(".json").read_text())
    rgb_pdf = Path(f"{base}-rgb.pdf")
    prof = find_profile(o.profile)
    srgb = ImageCms.createProfile("sRGB")
    cmyk_prof = ImageCms.getOpenProfile(str(prof))
    W, H = meta["width_in"], meta["height_in"]
    want = (round(W * o.dpi), round(H * o.dpi))

    with tempfile.TemporaryDirectory() as tmp:
        tif, png = Path(tmp) / "c.tif", Path(tmp) / "r.png"
        common = [f"-r{o.dpi}", "-dTextAlphaBits=4", "-dGraphicsAlphaBits=4", "-dInterpolateControl=1"]
        gs("-sDEVICE=tiff32nc", *common, f"-sOutputICCProfile={prof}", "-dRenderIntent=1", "-dBlackPtComp=0",
           "-o", str(tif), str(rgb_pdf))
        gs("-sDEVICE=png16m", *common, "-o", str(png), str(rgb_pdf))
        cmyk = Image.open(tif).convert("CMYK")
        cmyk.load()
        rgb = Image.open(png).convert("RGB")
        rgb.load()

    # Chrome rounds the PDF page up by up to a point, adding a sliver of blank page at the right and
    # bottom (the wrap is laid out from the top-left corner). Crop back to the exact size.
    extra = (cmyk.size[0] - want[0], cmyk.size[1] - want[1])
    if not (0 <= extra[0] <= 6 and 0 <= extra[1] <= 6):
        raise SystemExit(f"raster is {cmyk.size}, expected {want}: the PDF page size is wrong")
    cmyk, rgb = cmyk.crop((0, 0, *want)), rgb.crop((0, 0, *want))

    icc = prof.read_bytes()
    cmyk.save(f"{base}-cmyk.tif", compression="tiff_lzw", dpi=(o.dpi, o.dpi), icc_profile=icc)
    cmyk.save(f"{base}-cmyk.pdf", "PDF", resolution=o.dpi, quality=95, subsampling=0,
              title=f"{meta.get('source', '')} {meta['binding']} {meta['pages']}pp")

    proof = ImageCms.profileToProfile(cmyk, cmyk_prof, srgb, renderingIntent=ImageCms.Intent.RELATIVE_COLORIMETRIC,
                                      outputMode="RGB")
    proof.save(f"{base}-softproof.jpg", quality=90, dpi=(o.dpi, o.dpi))

    # --- preflight ---
    c = np.asarray(cmyk).astype(np.float32) / 255 * 100
    tac = c.sum(axis=2)
    # colour shift: screen RGB vs. soft proof, in Lab (dE76), on a 100-dpi sample to keep it quick
    small = (round(W * 100), round(H * 100))
    la, lb = to_lab(rgb.resize(small, Image.BILINEAR), srgb), to_lab(proof.resize(small, Image.BILINEAR), srgb)
    de = np.sqrt(((la - lb) ** 2).sum(axis=2))
    # Ink on paper can't get as dark as a screen, so dark colours always lift a little in lightness.
    # The part worth watching is the colour itself (a*, b*): a hue or saturation change.
    dab = np.sqrt(((la[..., 1:] - lb[..., 1:]) ** 2).sum(axis=2))
    heat = np.asarray(proof.resize(small, Image.BILINEAR)).astype(np.float32) * 0.35 + 255 * 0.65
    heat[dab > 6] = [220, 30, 30]
    Image.fromarray(heat.astype(np.uint8)).save(f"{base}-gamut.png")

    # re-read the PDF to make sure what we upload is what we checked
    with tempfile.TemporaryDirectory() as tmp:
        back = Path(tmp) / "b.tif"
        gs("-sDEVICE=tiff32nc", f"-r{o.dpi}", "-o", str(back), f"{base}-cmyk.pdf")
        b = Image.open(back).convert("CMYK")
        rt = float(np.abs(np.asarray(b.resize(small)).astype(int) - np.asarray(cmyk.resize(small)).astype(int)).mean())

    guides(proof, meta, f"{base}-guides.jpg")

    size_pdf = Path(f"{base}-cmyk.pdf").stat().st_size / 1e6
    print(f"{base.name}: {meta['binding']}cover, {meta['pages']} pages, spine {meta['spine_in']:.3f} in")
    print(f"  size      {W:.3f} x {H:.3f} in = {cmyk.size[0]} x {cmyk.size[1]} px at {o.dpi} dpi, CMYK ({prof.name})")
    print(f"  ink       max {tac.max():.0f}%, {100 * (tac > 300.5).mean():.3f}% of area over 300%")
    print(f"  shift     dE mean {de.mean():.1f} (95th pct {np.percentile(de, 95):.1f}); hue/saturation only: mean {dab.mean():.1f}, "
          f"{100 * (dab > 6).mean():.1f}% of area over 6 (red in -gamut.png)")
    print(f"  pdf       {size_pdf:.1f} MB, round-trip diff {rt:.2f}/255 {'ok' if rt < 2 else '!! check'}")


def guides(proof, meta, out):
    """Soft proof at 100 dpi with the fold/trim lines (cyan), safe area (magenta) and, on a hardcover, the hinge."""
    dpi = 100
    W, H = meta["width_in"], meta["height_in"]
    im = proof.resize((round(W * dpi), round(H * dpi)), Image.LANCZOS)
    d = ImageDraw.Draw(im)
    px = lambda v: round(v * dpi)
    spine = meta["spine_in"]
    if meta["binding"] == "hard":
        q = dict(p.split("=") for p in meta["query"].split("&") if "=" in p)
        edge, pw, ph = 0.787, 7.5 + float(q.get("extw", 0.276)), 9.25 + float(q.get("exth", 0.394))
    else:
        edge, pw, ph = 0.2, 7.5, 9.25
    x0, x1, x2, x3 = edge, edge + pw, edge + pw + spine, edge + 2 * pw + spine
    y0, y1 = edge, edge + ph
    for x in (x0, x1, x2, x3):
        d.line([(px(x), 0), (px(x), im.height)], fill=(0, 170, 220), width=2)
    for y in (y0, y1):
        d.line([(0, px(y)), (im.width, px(y))], fill=(0, 170, 220), width=2)
    s = 0.25
    for a, b in ((x0, x1), (x2, x3)):
        d.rectangle([px(a + s), px(y0 + s), px(b - s), px(y1 - s)], outline=(220, 0, 140), width=2)
    if spine > 2 * 0.0625:
        d.rectangle([px(x1 + 0.0625), px(y0 + s), px(x2 - 0.0625), px(y1 - s)], outline=(220, 0, 140), width=2)
    if meta["binding"] == "hard":
        for x in (x1 - 0.4, x2 + 0.4):  # the hinge groove: keep type out of the 0.4 in next to the spine
            for y in range(px(y0), px(y1), 16):
                d.line([(px(x), y), (px(x), y + 8)], fill=(240, 150, 0), width=2)
    im.save(out, quality=88)


if __name__ == "__main__":
    main()
