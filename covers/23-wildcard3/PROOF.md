# Final proof — 23-wildcard3

All three must-fixes are confirmed fixed in the renders and the PDFs: Pi now reads "9 capsules · 1 hour", the Vision Room bar clears the flanks, and the Decision Trees irises are hurts, torteaux and plates. All PDFs embed only Newsreader and match their JPGs (pdfpeek diff 1.7-3.0). Every Nº, level, capsule count and hour count matches books.json, and "115 figures" on the wrap checks out against books.vizuara.ai. The only defects left are two small minor ones: the Language Room label touches the sawtooth chief, and there is a stray gold fleck on 5D Parallelism.

Review must-fixes confirmed fixed: 3

## Defects

- **charlie-language-room** (minor) — Two of the label's three pendants touch the factory chief's sawtooth line. The outer pendants' bottoms sit on the roof ridges at about cover (437, 426) and (515, 426), and their black outlines merge with the line of partition. The numbers from arms.js: label(200, 48, 150) puts the pendant bottoms at shield y 81.75, and factoryChief has its ridges at x 160 and x 240, y 84. That is a 2.25-unit gap, smaller than the combined half-strokes (1.5 + 1.75), so the outlines overlap. This shows in both the JPG/PNG and the PDF. The other three cadency marks (crescent, mullet, martlet) all clear the roof by at least 10 units.
  - *Fix:* In ARMS['charlie-language-room'], shrink or raise the label so its pendants clear the ridges by at least 8 units, e.g. label(200, 44, 130), which puts the bottom at y about 73 and leaves about 11 units above the ridge. Alternatively, shorten the pendants (ph = w*0.24). Then re-render the JPG, PNG and PDF.
- **5d-parallelism** (minor) — A stray gold fleck sits on its own near the lower-right flank, at about cover (578-582, 750-752), roughly 4x2 px. It is the tip of one Or dovetail tab from the row-8/column-4 cell, which is otherwise clipped away by the shield outline. It is not connected to any cell, so it reads as a speck on the Sable field. It is barely visible at 720px but will print at roughly 1 x 0.5 mm.
  - *Fix:* In ARMS['5d-parallelism'], drop any partition fragment that is disconnected after clipping and smaller than about 40 sq units. A simpler route is to shift the dovetail origin for the y=420 line (e.g. origin: 25) so no tab tip lands inside the shield in that corner. Then re-render the JPG, PNG and PDF.
