# Final proof — 18-sculpture

3 of 4 must-fixes are confirmed in the renders and PDFs (Kernel widow, DeiT token order and disc, Context stone list on front and back); the oxblood glaze is still visibly rosy, and the Neural Networks input pins show no threads; fonts are all Newsreader/Instrument Sans with no fallbacks, pdfpeek flags nothing, capsule/hour counts, catalogue numbers and levels all match books.json, all text is 38px or more from the edges, and wall values are within tolerance.

Review must-fixes confirmed fixed: 3

## Review items not yet fixed

- **build-llms-from-scratch** — Only partly fixed. NOTES says the lit faces now sit around #8E2B25 and the shadow faces are off black. The 2x render shows otherwise. The key-lit upper-left facet of every module measures about RGB 150–207, 87–147, 82–144 (around #C68885, a rosy salmon, and the top module's top face is pink). That is lighter and paler than the coral the review flagged, and far from the #7A2320–#8E2B25 target. The shader albedo is oxblood (about #6A2C29, visible on the upper-right facets), but the clear coat (rough 0.05, coat 1.0) mirrors the softbox across whole facets and washes them pink. The lower-right shadow facets measure about RGB 19–24, 7–11, 7–11 (about 9%), still well under the 15–25% the review asked for. The label still reads 'Stoneware, oxblood glaze'. Fix: lower the clear-coat strength or raise the coat roughness to about 0.2–0.3 so the key facets stay near #8E2B25 with only a local highlight, and raise the right-side fill or bounce so the shadow facets reach about 40–60/255. Alternatively, relabel the medium 'Stoneware, red glaze'.

## Defects

- **neural-networks-from-scratch** (minor) — The string construction does not look fully connected, which contradicts the caption 'Three layers, fully connected in thread'. The pins pass through the boards, and the threads attach to the pin ends on the far (+x) face. At yaw 30° the camera only sees the near face. So the four brass pins on the input board have no thread touching them: all 20 layer-1 threads appear from behind that board's right edge. The 10 threads from the middle board to the output board likewise start behind the middle board, not at its five visible pins. Confirmed at 2x (crop of the left board): the input pins stand bare.
  - *Fix:* Attach the thread ends to the camera-facing pin heads, so both ends of every thread are visible. One way is to mount the pins on the boards' front edges (z≈+0.27) and run the threads in that plane. Another is to cut the yaw to about 10° so both ends of each through-pin show with threads on them. Then re-render the JPG and PDF.
