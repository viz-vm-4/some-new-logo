#!/usr/bin/env python3
"""Build covers/index.html: one proof page comparing every cover direction.

Reads covers/_shared/books.json, covers/_shared/directions.json (name + pitch per
folder, optional) and each covers/NN-*/ folder (NOTES.md, renders/*.jpg).
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "covers"
books = json.loads((ROOT / "_shared/books.json").read_text())
order = [b["slug"] for b in books["books"]]
by_slug = {b["slug"]: b for b in books["books"]}
meta = {}
if (ROOT / "_shared/directions.json").exists():
    meta = json.loads((ROOT / "_shared/directions.json").read_text())


def notes_name(notes: str, fallback: str) -> str:
    m = re.search(r"^#\s+(.+)$", notes, re.M)
    return m.group(1).strip() if m else fallback


def palette(notes: str) -> list:
    seen = []
    for h in re.findall(r"#[0-9a-fA-F]{6}\b", notes):
        h = h.upper()
        if h not in seen:
            seen.append(h)
    return seen[:7]


directions = []
for d in sorted(p for p in ROOT.iterdir() if p.is_dir() and re.match(r"\d\d-", p.name)):
    renders = d / "renders"
    slugs = [p.stem for p in renders.glob("*.jpg")] if renders.exists() else []
    slugs = [s for s in order if s in slugs] + sorted(s for s in slugs if s not in order and not s.startswith("_"))
    if not slugs:
        continue
    notes = (d / "NOTES.md").read_text() if (d / "NOTES.md").exists() else ""
    m = meta.get(d.name, {})
    directions.append({
        "id": d.name,
        "num": d.name[:2],
        "name": m.get("name") or notes_name(notes, d.name),
        "pitch": m.get("pitch", ""),
        "palette": m.get("palette") or palette(notes),
        "page": f"{d.name}/index.html",
        "covers": [{"slug": s, "src": f"{d.name}/renders/{s}.jpg"} for s in slugs],
        "wraps": [f"{d.name}/renders/{p.name}" for p in sorted(renders.glob("_wrap*.jpg"))] if renders.exists() else [],
    })

before = [{"slug": p.stem, "src": f"_shared/before/{p.name}"}
          for p in sorted((ROOT / "_shared/before").iterdir())]

data = {
    "books": {s: {"title": b["title"], "level": b.get("level", ""), "series": b.get("series")}
              for s, b in by_slug.items()},
    "core": books["core_set"],
    "directions": directions,
    "before": before,
}

template = (Path(__file__).parent / "gallery_template.html").read_text()
out = template.replace("/*__DATA__*/null", json.dumps(data, ensure_ascii=False))
(ROOT / "index.html").write_text(out)
total = sum(len(d["covers"]) for d in directions)
print(f"wrote covers/index.html: {len(directions)} directions, {total} covers")
