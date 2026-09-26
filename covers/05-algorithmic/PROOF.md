# Final proof — 05-algorithmic

All 7 must-fixes are confirmed in the renders: every raster is 720×888 / 1440×1776, the cased accents survive a real greyscale conversion, the PDFs embed only Newsreader and IBM Plex Mono, and the SciML, bandit, Pi and ViT captions are corrected. For Pi, the designer kept the panel order with a reasoned rebuttal, adding A–C letters and a disclaimer. Capsule and hour counts match books.json, and every PDF matches its JPG. Only 6 minor defects remain and none of them blocks print.

Review must-fixes confirmed fixed: 7

## Defects

- **git-github-masterclass** (minor) — The caption says '19 merged back into main at the rings', but only 17 rings can be seen. At two steps two branches merge at the same moment (cx 228.6 and 457.7 in the SVG), so each pair of rings prints exactly on top of each other. A reader who counts the rings gets 17, not 19.
  - *Fix:* In GEN['git-github-masterclass'], allow at most one merge per time step: break out of the merge loop after the first merge at t. Then re-render so the ring count and the caption's merge count match. If simultaneous merges are wanted, offset the coincident rings instead.
- **decision-trees-from-scratch** (minor) — The 7px red root split has round caps, so it pokes about 3px above and below the plate frame (the red runs y≈309–787, the frame y 312–783). Its ground-coloured casing also cuts gaps about 11px wide into the frame's top and bottom border lines. This shows in the JPG and the PDF.
  - *Fix:* Draw the root split with stroke-linecap="butt" and end it on the inside edge of the frame, or clip the accent to the plate rect. Draw the frame border after the casing so the casing can't break it.
- **charlie-language-room** (minor) — The 'Vision Room' label card is 12px tall and sits squeezed inside the branch bundle. A branch edge shows through as a hairline running under the label text across the bottom of the card, so it reads like an underline. This shows in the JPG, the 2x PNG and the PDF.
  - *Fix:* Make the label card taller: height 14 with y = ly − 7.5 instead of height 12 with y = ly − 6.5. Or place 'Vision Room' where its branch ends, clear of the other branches.
- **charlie-reasoning-room** (minor) — The caption breaks '(p =' at the end of line 3 and puts '0.72)' at the start of line 4, splitting the value from its variable. The review had this same kind of break fixed for 'git log --graph'.
  - *Fix:* Wrap 'p = 0.72' (the whole parenthetical) in the existing <span class="nw"> nowrap span in the caption template.
- **_wrap** (minor) — On the back cover the code block uses white-space:pre-wrap and word-break:break-all, so 4 source lines wrap in the middle of an expression and the continuation starts at column 0: '/ s' ↵ '- 0.1;', 'cy' ↵ '="${f1(py)}"', '(x²+' ↵ 'y−11)²'. The SEED line also splits the slug across lines as 'mathematical-' / 'foundations-for-ml'.
  - *Fix:* Reformat the printed source so every line fits the 624px measure at 8.6px, then use white-space:pre, or drop the size slightly. Wrap the quoted slug in white-space:nowrap.
- **renders/_sheet.png** (minor) — renders/_sheet.png is a stale full-page capture from 21:36, before the revision. It shows the old BPE arc-cloud LLM plate, the old 'I · DROP OLDEST' Pi panels and the old 2-line 5D title, so it contradicts the current renders in the same folder.
  - *Fix:* Delete it, or regenerate it with `node tools/render.js covers/05-algorithmic/index.html --pdf --sheet` before the folder goes to the client.
