#!/usr/bin/env python3
"""Flag ink strokes or paper gaps thinner than 1 CSS px (1/96 in at trim) in 5x renders.

A morphological opening with a 5 px disc (= 1 CSS px at 5x) removes every feature narrower than
1 CSS px; whatever the opening removes is 'thin'. Thin residue is summed per 8x8 CSS px tile and a
tile is flagged when it holds more than ~2 CSS px^2 of it (line-end tips and corner rounding stay
below that). Writes an overlay per cover (red = thin ink, blue = thin paper gap) to /tmp/17-optical-check/.
    python3 covers/17-optical/tools/printcheck.py
"""
import glob, os, sys
import numpy as np
from PIL import Image

D = '/tmp/17-optical-check'
S = 5                       # device px per CSS px
PAPER = np.array([244, 242, 236])
OFFS = [(dy, dx) for dy in range(-2, 3) for dx in range(-2, 3) if dy * dy + dx * dx <= 4]

def shift_and(m, fill):
    out = np.ones_like(m)
    H, W = m.shape
    pad = np.pad(m, 2, constant_values=fill)
    for dy, dx in OFFS:
        out &= pad[2 + dy:2 + dy + H, 2 + dx:2 + dx + W]
    return out

def opening(m):
    er = shift_and(m, True)            # erosion (outside counts as ink: bleed continues)
    return ~shift_and(~er, True)       # dilation = not erode(not)

def thin(m):
    return m & ~opening(m)

def tiles(r, t=8 * S):
    H, W = r.shape
    h, w = H // t, W // t
    return r[:h * t, :w * t].reshape(h, t, w, t).sum(axis=(1, 3))

bad_total = 0
for f in sorted(glob.glob(os.path.join(D, '*.png'))):
    if f.endswith('.overlay.png'):
        continue
    im = np.asarray(Image.open(f).convert('RGB')).astype(int)
    dist = np.abs(im - PAPER).sum(axis=2)
    ink = dist > 90                      # anything clearly not paper (ink or spot colour)
    ti, tp = thin(ink), thin(~ink)
    lim = 2 * S * S                      # 2 CSS px^2 per tile
    fi, fp = tiles(ti) > lim, tiles(tp) > lim
    n = int(fi.sum() + fp.sum())
    bad_total += n
    name = os.path.basename(f)[:-4]
    worst = max(int(tiles(ti).max()), int(tiles(tp).max())) / (S * S)
    print(f'{"ok" if n == 0 else "!!"} {name:34s} thin-ink tiles {int(fi.sum()):3d}  thin-gap tiles {int(fp.sum()):3d}  worst {worst:5.1f} px^2')
    if n:
        ov = (im * 0.35 + 165).astype(np.uint8)
        ov[ti] = [230, 0, 0]
        ov[tp] = [0, 90, 255]
        Image.fromarray(ov).resize((im.shape[1] // 2, im.shape[0] // 2)).save(f[:-4] + '.overlay.png')
sys.exit(1 if bad_total else 0)
