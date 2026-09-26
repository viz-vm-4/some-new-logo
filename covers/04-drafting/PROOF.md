# Final proof — 04-drafting

All 8 must-fix items are fixed in the renders, and the PDFs match their renders. All 12 PDFs are 7.5 × 9.25 in and embed only Overpass Mono, Instrument Sans, Noto Sans Mono and Noto Sans Math, with no DejaVu or Liberation fallbacks. pdfpeek flags nothing. All capsule/hour counts, levels and drawing numbers match books.json. What remains is five minor issues: the GPT-2 residual-2 tap in Build LLMs, and four places where a tag or the stamp touches art (Reasoning, Language, Vision, Kernel). None blocks print.

Review must-fixes confirmed fixed: 8

## Defects

- **build-llms-from-scratch** (minor) — The block order is now correct (LN1, MHA, add, LN2, FFN, add) but the residual wiring is not. In block() the residual-1 polyline runs along y=add1 from x0−16 to x0−8.5, and residual 2 starts at that same point and runs left to x0−28. The two skip wires therefore share one segment and meet at a T-junction about 12px left of ⊕₁ (e.g. about x=88, y=407 in Block 1 and y=229 in Block 12). Read as a schematic, residual 2 taps the residual-1 wire, which carries the block input x, instead of ⊕₁'s output. That draws ⊕₂ = x + FFN(LN₂(h)) rather than GPT-2's h + FFN(LN₂(h)). This is exactly the kind of wiring error the review said a reader who knows the architecture would spot.
  - *Fix:* Stop the two wires sharing a segment. Bring residual 1 into ⊕₁ from below (end its riser at the bottom of ⊕₁, [x0−4, add1+4.5]). Start residual 2 from ⊕₁'s left or top side, or from a junction dot on the trunk just above ⊕₁, then route it left to x0−28 and up to ⊕₂. Apply the change to both Block 1 and Block 12.
- **charlie-reasoning-room** (minor) — The top edge of the hexagonal equipment tag 3 (POLICY π) sits on the bottom edge of the fifth bandit box and hides about 16px of it (overlap about x 348–368, y 204–207). Separately, tag 1's leader ends on a free dot about 6px right of the chain's last connector dot (about x 386 and x 392, y 186), which reads as a stray double dot.
  - *Fix:* Move tag 3 down about 8px (centre y ≈ 221) so it clears the bandit box, keeping its vertical leader to the policy path. End tag 1's leader on the fifth bandit box's right edge, or on the existing connector dot, and remove the extra dot.
- **charlie-language-room** (minor) — The red tag 4 (KV CACHE) hexagon overlaps the bottom-right corner of the last KV-cache page and hides part of that page's bottom edge (overlap about x 473–486, y 208–215). Its right vertex is also about 3px from the east wall.
  - *Fix:* Move tag 4 below the top rack with a short vertical leader from the bottom-centre of a page, e.g. hexagon centre about (474, 234). It then clears both the page and the wall.
- **charlie-vision-room** (minor) — The left vertices of equipment tags 1 (IMAGE, about y 178) and 3 ([CLS] TOKEN, about y 352) touch the inner face of the west poché wall at x≈106, so the hexagon outlines merge into the wall.
  - *Fix:* Shift both hexagons about 6px right (centre x ≈ 122), or shorten their leaders, so there is at least 4px of paper between each tag and the wall.
- **kernel-engineering** (minor) — After the stamp was pulled in from the border, the top-left corner of the rotated PRELIMINARY stamp touches the right border of matrix C. The stamp's red outline starts at x=498.5, y≈448, and C's border occupies x 497–498.5 there.
  - *Fix:* Move the stamp about 6px right (its right edge then sits about 12px from the frame at 680, inside the review's 12–16px range), or scale it to about 95% about its centre. Either way, keep at least 4px between the stamp and C.
