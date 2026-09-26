# Final proof — 09-atlas

All six must-fixes hold up in the renders. #6 was reasonably rebutted: books.vizuara.ai/book/ai-context-engineering does list '43 capsules 200 figures ~10 hours', and the back cover now takes it from DATA. Capsule and hour counts match books.json on all 14 covers, the code audit passes, all PDFs embed only Overpass and Newsreader, pdfpeek flags nothing, and no text is within 24px of the trim. Only three minor defects remain.

Review must-fixes confirmed fixed: 6

## Defects

- **ai-context-engineering (print wrap, back cover)** (minor) — On the roadmap network, the stage-2 label 'LEARNING FROM DATA' ends at x≈451 and the stage-3 bullet starts at x=455. That 3.6px gap is about one word space, so the header reads as one run: '2 LEARNING FROM DATA 3 NEURAL NETWORKS'. The label and the next bullet nearly collide.
  - *Fix:* In buildWrap (index.html ~line 922), move stageLbl(3,'Neural networks',…) at least 16px right (x≈440), or shorten or restack the stage-2 label, so there are at least 12px between 'DATA' and the '3' bullet.
- **mathematical-foundations-for-ml** (minor) — The dashed drop guide under the resultant starts 16px below the vector's tip (the path starts at tip.y+16), about 8px short of the arrowhead, so it doesn't meet the vector it projects. Bullet 7 sits only about 1.9px from that dashed line along its whole height (bullet at tip+(12,26), r=9.2).
  - *Fix:* Start the dashed guide at the tip itself (M tip V gnd) and draw it under the arrow layer. Move bullet 7 clear of the guide, for example to tip+(24,26) or to the resultant's first station, so there is at least 6px of clearance.
- **charlie-sound-room (page caption / NOTES)** (minor) — The emblem caption (CAPS in index.html line 881, repeated in NOTES) says 'the brain is the flat run of text between them' (between listening and speaking). The render shows audio in (1) → audio out (2) → text (3, the brain) after speaking, following part order, so the caption contradicts the image.
  - *Fix:* Reword the caption and the NOTES line to match the map, e.g. 'listening and speaking are drawn as waveforms, then the brain runs on as a flat line of text, and the wire streams in small chunks.'
