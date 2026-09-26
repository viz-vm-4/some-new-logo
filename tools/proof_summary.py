#!/usr/bin/env python3
"""Summarise cover-final-proof workflow journals: per direction, fixes verified/missing and defects.
Also writes covers/<id>/PROOF.md for the record.  usage: python3 tools/proof_summary.py <journal.jsonl> ..."""
import json, sys
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent / "covers"
for j in sys.argv[1:]:
    recs = [json.loads(l) for l in Path(j).read_text().splitlines() if l.strip()]
    labels = {r["key"]: r.get("label", "") for r in recs if r.get("type") == "started"}
    for r in recs:
        if r.get("type") != "result" or not isinstance(r.get("result"), dict):
            continue
        cid = labels.get(r["key"], "").split("proof:")[-1]
        p = r["result"]
        blockers = [d for d in p["defects"] if d["severity"] == "blocker"]
        print(f"== {cid}: verified {p['fixes_verified']}, missing {len(p['fixes_missing'])}, defects {len(p['defects'])} ({len(blockers)} blocker)")
        for m in p["fixes_missing"]:
            print(f"   MISSING {m['slug']}: {m['issue'][:160]}")
        for d in p["defects"]:
            print(f"   {d['severity'].upper()} {d['slug']}: {d['issue'][:160]}")
        out = [f"# Final proof — {cid}", "", p["note"], "", f"Review must-fixes confirmed fixed: {p['fixes_verified']}", ""]
        if p["fixes_missing"]:
            out += ["## Review items not yet fixed", ""] + [f"- **{m['slug']}** — {m['issue']}" for m in p["fixes_missing"]] + [""]
        out += ["## Defects", ""] + ([f"- **{d['slug']}** ({d['severity']}) — {d['issue']}\n  - *Fix:* {d['fix']}" for d in p["defects"]] or ["None."])
        if (ROOT / cid).is_dir():
            (ROOT / cid / "PROOF.md").write_text("\n".join(out) + "\n")
