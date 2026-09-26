# Final proof — 02-plates

All six must-fix items are confirmed in the renders and PDFs. All 13 PDFs embed only Bodoni Moda and match their JPGs (pdfpeek diff 1.2–5.5). Legends run to two lines with no stranded keys. The Pi arms share one live span (dth = 0.55), the Reasoning Room uses one shared reward scale, and the Vision Room screen and tiles are square and match cell by cell. Capsule and hour counts, levels and plate numbers match books.json. What remains is four minor, non-blocking issues: a wrap sphere touching a rule, one leader that misses its node, one figure letter crowding the legend rule, and an edge hairline in the preview JPGs only.

Review must-fixes confirmed fixed: 6

## Defects

- **_wrap** (minor) — On the back cover of the print wrap, the bottom spheres of the two hidden layers in Fig. 2 sit directly on the Fig. 2 caption rule. The nodes are at cy 496 + 1.5*64 = 592 with r = 22, so they reach y = 614, and the caption legend is pinned at top:614px. Pixel columns at x = 290 and x = 430 in _wrap.jpg show the sphere shading running straight into the rule with no gap.
  - *Fix:* In FIG['nn-back'], raise cy by about 8–10px (for example 486), or move the Fig. 2 legend to top:624px, so the art clears the rule. Then re-render the wrap.
- **decision-trees-from-scratch** (minor) — The leader for 'a the root split' ends on the stem below the root node, not on the node. It is called as label(P, 300, 722, …, 'a') at index.html l.803. The root node is centred at (300,700) with a radius of about 10, so the dot lands about 12px below the node, on the trunk.
  - *Fix:* Retarget the leader to the node edge, for example label(P, 293, 708, 190, 742, 'a', { dot: true }), so it touches the x₁ ≤ 0.50 roundel.
- **charlie-reasoning-room** (minor) — The figure letter 'c' is placed at ly = 780 (baseline 786, l.1436), only about 3–4px above the legend rule at y = 790. At 1x and in print it looks as if it sits on the rule.
  - *Fix:* Raise the 'c' label to about ly = 766–770 (level with 'a' at 770), or move it to the left of the leader, so there is a clear gap of at least 10px above the rule.
- **renders-edge-hairline** (minor) — 11 of the 13 cover JPG/PNG renders and _wrap.jpg have a 1px dark line along one full edge. It is at the top in ai-context, math, decision-trees, transformers and all four Charlie covers, and at the bottom in build-llms, NN, harness and _wrap. For example, row 0 of ai-context-engineering.jpg is (86,101,120) on paper (159,177,199). The PDFs do not have it: pdf.js and PyMuPDF rasters are clean at the edges. The cause is a screenshot artifact that pulls in a sliver of the neighbouring element, not the cover art.
  - *Fix:* In tools/render.js, screenshot a clip snapped to whole pixels ({x: round(b.x), y: round(b.y), width: 720, height: 888}), or give each cover an integer page offset. Then re-export the JPG/PNG renders and the wrap. The print PDFs need no change.
