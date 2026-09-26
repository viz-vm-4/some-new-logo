# Final proof — 13-miniature

All four must-fix items are confirmed fixed in the renders and PDFs: the Eczar stacked fractions with 'A =' (the PDFs embed only Eczar and Anek Latin), the NN ink underlays with a verified real forward pass and argmax pearl path matching the colophon, the 5D key on ivory with measured equal gaps, and the monotonic LLM ramp with gold bezels. All capsule and hour counts and levels match books.json, the PDF previews match the JPGs, and the one remaining issue is a minor, ambiguous block-table thread on the Language Room.

Review must-fixes confirmed fixed: 4

## Defects

- **charlie-language-room** (minor) — The block-table thread from floor run 1 (tokens 0-3) does not clearly point at one page. It is meant to go to page G (right column, row 3). On its way up it crosses page H, which is this request's other right-hand page, and passes over H's first slot (the pink token). It then ends with its gold dot on the 4px seam between G's bottom frame and H's top frame. Anyone tracing it can't tell whether run 1 maps to G or H. H also has its own thread, from run 3, ending at its bottom edge. The PDF and the JPG are identical here, at render px ~(226,597) to (466,524). The run 2 thread to page B also crosses the foreign page C and the free page D, but it clearly ends on B.
  - *Fix:* In roomLanguage's overArt in index.html, move each thread's end point off the shared seam, and route the threads so none crosses another page of the same request. For example, end right-column threads at the page's left-edge midpoint (P0.x-3, P0.y+ch/2), brought up through the 16px gutter between the two page columns. Or end every thread at a page corner facing the floor rather than at bottom-centre. Alternatively, change the owner map so no owned page sits directly above another owned page. Then re-render the PNG, JPG and PDF.
