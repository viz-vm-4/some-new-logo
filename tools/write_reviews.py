#!/usr/bin/env python3
"""Write covers/<id>/REVIEW.md from a cover-critique workflow journal.

usage: python3 tools/write_reviews.py <journal.jsonl> [<journal.jsonl> ...]
"""
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "covers"

for journal in sys.argv[1:]:
    recs = [json.loads(line) for line in Path(journal).read_text().splitlines() if line.strip()]
    labels = {rec["key"]: rec.get("label", "") for rec in recs if rec.get("type") == "started"}
    for rec in recs:
        if rec.get("type") != "result":
            continue
        r = rec.get("result")
        label = labels.get(rec.get("key"), "")
        if not isinstance(r, dict) or "must_fix" not in r:
            continue
        cid = label.split("critique:")[-1] if "critique:" in label else None
        if not cid or not (ROOT / cid).is_dir():
            print(f"skip: couldn't map result to a folder (label={label!r})")
            continue
        out = [f"# Art-director review — {cid}", "",
               f"**Score:** {r['score']}/10", "", f"**Verdict:** {r['verdict']}", "",
               f"**Strongest:** {r['strongest']}", "", f"**Weakest:** {r['weakest']}", "",
               "## Must fix", ""]
        out += [f"{i}. **{m['slug']}** — {m['issue']}\n   - *Fix:* {m['fix']}" for i, m in enumerate(r["must_fix"], 1)] or ["None."]
        out += ["", "## Improvements (highest impact first)", ""]
        out += [f"{i}. **{m['target']}** — {m['suggestion']}" for i, m in enumerate(r["improvements"], 1)] or ["None."]
        (ROOT / cid / "REVIEW.md").write_text("\n".join(out) + "\n")
        print(f"wrote covers/{cid}/REVIEW.md  ({len(r['must_fix'])} must-fix, {len(r['improvements'])} improvements, score {r['score']})")
