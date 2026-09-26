# Final proof — 12-blockprint

All three must-fixes are fixed in the renders: every up-chevron in the Reasoning Room matches a BFS recomputation cell by cell, 5D encodes all five axes and has correct GPipe routing, and the CNN squares are area-true. Fonts are Eczar and Anek Latin only, all 15 PDFs match their JPGs (NN's !! is edge antialiasing only), and titles, counts, levels and margins are clean. The only findings are a minor missing-arc strip at the right edge of the Transformers field and a wrong PDF size range in NOTES.

Review must-fixes confirmed fixed: 3

## Defects

- **transformers-from-scratch** (minor) — The pattern stops short at the right edge of the field. In stampField (index.html), cMax = ceil((W-ox)/BW) stamps blocks c=-1..5 but never c=6. The arcs block draws its indigo look-back arcs up to 110px to the LEFT of each token, so the arcs that should come in from the block beyond the right trim are missing. Measured on the render: indigo ink density in the rightmost 30px is 0.03 at x=690-710 and 0.001 at x=710-720, against about 0.08-0.13 everywhere else. In the top-right corner (about x 690-720, y 0-45) there is plain madder with no arcs at all. It shows at full size in the JPG and in the PDF, and it will be worse once bleed is added.
  - *Fix:* In stampField, stamp one more column past the right edge: cMax = Math.ceil((W-ox)/BW)+1. The field clip-path already crops the overhang. Re-render transformers-from-scratch (JPG and PDF) and check that the right strip below each token line carries indigo arcs to the trim. The other blocks don't overhang to the left, so they are unaffected.
- **notes-pdf-sizes** (minor) — The production notes in NOTES.md say the PDFs are 'about 1.8–3.4 MB each'. The files in renders/pdf actually run from 1.18 MB (charlie-sound-room) to 4.85 MB (neural-networks-from-scratch), and transformers-from-scratch is 4.20 MB. The ~39 MB total is right (39.9 MB).
  - *Fix:* Change the range in NOTES.md Production notes to 'about 1.2–4.9 MB each (about 40 MB for all fifteen)'.
