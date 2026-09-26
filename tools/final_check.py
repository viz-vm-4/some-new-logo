#!/usr/bin/env python3
"""Whole-set QA for covers/NN-*/: one line per direction, non-zero exit if anything fails.

Checks: core-six present; every JPG 720x888 (wraps 888 tall); no 1px edge seams; a PDF per cover
at exact trim; no system-fallback fonts (DejaVu / Liberation) in any PDF; pdfpeek bands; no stale
renders. Needs Pillow + numpy, and runs tools/pdfpeek.js.
usage: python3 tools/final_check.py [dir ...]
"""
import json
import re
import subprocess
import sys
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
COVERS = ROOT / "covers"
core = json.loads((COVERS / "_shared/books.json").read_text())["core_set"]
FALLBACK = re.compile(rb"FontName /[A-Z]{6}\+(DejaVu|Liberation)[A-Za-z0-9-]*")


def seam(a):
    e = lambda x, y: float(np.abs(x - y).mean())
    out = []
    for name, edge, n1, n2 in [("top", a[0], a[1], a[2]), ("bottom", a[-1], a[-2], a[-3]),
                               ("left", a[:, 0], a[:, 1], a[:, 2]), ("right", a[:, -1], a[:, -2], a[:, -3])]:
        v, inner = e(edge, n2), e(n1, n2)
        if v > 12 and v > 3 * inner + 4:
            out.append(name)
    return out


dirs = [COVERS / d for d in sys.argv[1:]] or sorted(p for p in COVERS.iterdir() if p.is_dir() and re.match(r"\d\d-", p.name))
failed = False
for d in dirs:
    r = d / "renders"
    jpgs = sorted(p for p in r.glob("*.jpg") if not p.name.startswith("_"))
    wraps = sorted(r.glob("_wrap*.jpg"))
    slugs = {p.stem for p in jpgs}
    page = (d / "index.html").read_text(errors="ignore")
    problems = []
    missing_core = [s for s in core if s not in slugs]
    if missing_core:
        problems.append(f"missing core: {missing_core}")
    for p in jpgs + wraps:
        a = np.asarray(Image.open(p).convert("RGB")).astype(int)
        h, w, _ = a.shape
        if (p in jpgs and (w, h) != (720, 888)) or (p in wraps and h != 888):
            problems.append(f"{p.name} is {w}x{h}")
        s = seam(a)
        if s:
            problems.append(f"{p.name} edge seam {s}")
    pdfs = {p.stem: p for p in (r / "pdf").glob("*.pdf")}
    if set(pdfs) != slugs:
        problems.append(f"pdf/jpg mismatch: no pdf {sorted(slugs - set(pdfs))}, stale pdf {sorted(set(pdfs) - slugs)}")
    for s, p in pdfs.items():
        m = FALLBACK.search(p.read_bytes())
        if m:
            problems.append(f"{s}.pdf embeds fallback {m.group(1).decode()}")
    stale = [s for s in slugs if f'data-slug="{s}"' not in page and f"'{s}'" not in page and f'"{s}"' not in page]
    if stale:
        problems.append(f"renders not found in page source (stale?): {stale}")
    bands = {"ok": 0, "??": 0, "!!": 0}
    if pdfs:
        out = subprocess.run(["node", str(ROOT / "tools/pdfpeek.js"), *map(str, pdfs.values())],
                             capture_output=True, text=True).stdout
        bad = []
        for line in out.splitlines():
            k = line[:2]
            if k in bands:
                bands[k] += 1
                if k == "!!":
                    bad.append(line.split()[1])
        if bad:
            problems.append(f"pdfpeek !! (check by eye): {bad}")
    hard = [p for p in problems if not p.startswith("pdfpeek")]
    failed |= bool(hard)
    status = "FAIL" if hard else ("look" if problems else "ok  ")
    print(f"{status} {d.name:16} covers {len(jpgs):2}  wraps {len(wraps)}  pdf ok/??/!! {bands['ok']}/{bands['??']}/{bands['!!']}")
    for p in problems:
        print(f"       - {p}")
sys.exit(1 if failed else 0)
