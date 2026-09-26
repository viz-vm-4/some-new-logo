# 08 — Buckram: the Vizuara bindery edition

## The idea
Every Vizuara book is designed as a real case-bound hardcover, not as a printed picture of one. Each gets a deep bookcloth, **one foil** and **one blind die**. The title is blocked in foil at the head of the board, following title-page order: the substance in spaced capitals, connecting words ("from Scratch", "for Machine Learning") in italic, and the level and capsule count underneath in words ("Beginner · Thirty-three capsules"). Below it, in a sunk roundel, sits the book's own **device**, drawn from the mechanism the book teaches. A blind-blocked **band** repeats that subject as tone-on-tone texture, in the way a Clothbound Classic repeats its motif, and carries the device like a medallion. The Vizuara imprint is a small stamped device at the tail.

## Level = the binding itself (ordinal)
| Level | Binding | Visible leather on the front board |
|---|---|---|
| Beginner | **Full cloth** | none |
| Intermediate | **Quarter-bound** | a house-black leather-grain spine strip with a gilt fillet (1 piece) |
| Advanced | **Half-bound** | the spine strip plus two fore-edge corners with gilt fillets (2 pieces) |

The leather you can see goes 0 → 1 → 2, and that follows binding prestige: full cloth is the plainest trade binding and half leather the grandest. It still reads at 180 px, and the level is also spelled out in the label line.

## Assignment rules (so 50 books read as a library)
1. **Cloth follows the subject family.** Within a family, neighbours on the shelf alternate cloths.

   | Family | Cloths |
   |---|---|
   | Foundations & maths | Prussian `#18305A`, Cobalt `#233F86` |
   | Classical ML & data tools | Moss `#434D1F`, Tobacco `#5E3A1F` |
   | Deep learning & vision | Bottle `#1A3F2E`, Viridian `#10503F` |
   | Language & LLMs | Oxblood `#5B1A24`, Madder `#8A2A1C`, Claret `#6A1C3C` |
   | Agents, context & memory | Peacock `#0C4450`, Saffron `#C68F1F` (light) |
   | Systems & infrastructure | Ink `#1A1C23`, Slate `#343E48` |
   | RL & reasoning | Aubergine `#3F1C42` |
   | Spine & corners (all books) | House black `#1D1C20`, leather grain |

2. **Gold is the default foil, and every other foil means something.** Palladium is for systems and infrastructure, copper for agents, context and memory, and black pigment only on a light cloth (Saffron). A series keeps one foil across its volumes (the Charlie books are all gold).
3. **Level is the binding**, never a colour.
4. **Each device has a unique silhouette at ~45 px**, which is the size of the roundel in a 180 px thumbnail. It draws the book's mechanism, not a generic icon, and it may not repeat another device's figure.
5. **Type is legible by construction.** Lettering uses only the light stops of its foil, and a build check on the page requires every type stop to reach at least 3:1 against the cloth and the label and print foil at least 4.5:1. All 14 books pass; the lowest title value is Madder/gold at 4.40:1 and the lowest label is Madder/gold at 6.05:1.
6. **Forthcoming books** carry their device blind, with only its key element foiled, until publication.

## Foils
Each foil has four values:
- **Sheen:** a 10-stop gradient for the device, ring and fillets.
- **Type:** light stops only. Each text line gets its own gradient (objectBoundingBox), so every line has the same highlight wherever it sits on the board.
- **Label:** a flat light value for the small caps and rules.
- **Print:** one flat value for the PDF.

| Foil | Meaning | Type stops | Print value | Spot |
|---|---|---|---|---|
| Gold | default | `#D7B565 → #FBEAB0` | `#DCBD6E` | Pantone 871 C |
| Copper | agents, context & memory | `#EBA882 → #FDE3D0` | `#EEB391` | Pantone 876 C |
| Palladium | systems & infrastructure | `#C9CDD1 → #F7F8F9` | `#D3D6D9` | Pantone 877 C |
| Black pigment | light cloths only | `#161617 → #2A2A2B` | `#1C1C1D` | matt pigment foil |

## Type
- **Title:** Cormorant Garamond Bold capitals, +4% tracking, lining figures. A short numeral line is scaled up so it carries the cover (5D at 1.7×, SQL at 1.9×).
- **Continuations:** Cormorant Garamond Semibold Italic. Italic lines are wrapped for balance, prefer to break after a dash or comma, and never leave a lone word.
- **Labels and imprint:** Cormorant Garamond Bold capitals, +24–34% tracking, 13.5–14 px (10 pt). The label is always on **baseline 372**, and the title stacks upward from it, so the junction between title and band is identical across the shelf.
- The presentation page is set in EB Garamond. Both families come from Google Fonts.

## Grid (720 × 888 px = 7.5 × 9.25 in)
- Label baseline 372, with the title block stacked above it and auto-fitted (sizes shrink in 5% steps until the block fits below y 60, or y 92 on series covers).
- Blind band 418–792, roundel ⌀300 centred at y 605, imprint on baseline 848.
- Everything is centred on the *board*, which is offset by the hinge (full cloth) or by the spine leather (quarter and half).
- The Intelligence Factory sub-series swaps the roundel for a round-headed **arch** (a "room"), with a series running head and the volume numeral inside the arch. All four volumes share the north-light factory-roof band. On half-bound covers, the head's flanking rules stop 16 px short of the corner fillet, or are dropped if they would be shorter than 14 px.

## Devices and bands: one line per book
- **AI Context Engineering** (Peacock / copper, quarter): crop marks frame a window cut from a stream of tokens. What falls inside is solid (selected context) and the rest stays as a dotted stream. Band: token brickwork.
- **Mathematical Foundations for ML** (Prussian / gold, full cloth): Gaussian level sets (probability), their eigen-axes (linear algebra) and gradient descent zig-zagging to the minimum (calculus), all as one figure. Band: the gradient field of the same quadratic, with every arrow pointing downhill into the roundel.
- **Neural Networks from Scratch** (Bottle / gold, full cloth): a 3-5-5-2 perceptron whose edge weights are drawn as stroke widths (minimum 1.6 px). Band: a feed-forward lattice.
- **Build LLMs from Scratch** (Oxblood / gold, quarter): the causal attention matrix. Dot area is the attention weight, with the "sink" on the first token, and masked future positions are open rings. Band: lower-triangular staircases.
- **5D Parallelism** (Ink / palladium, half): the 5-cube in Petrie projection, with 32 devices and 80 links; each of the five edge directions is one parallelism axis. Band: a mesh of 2×2 accelerator nodes, burnished lighter because the cloth is near-black.
- **Pi vs Hermes vs Codex** (Saffron / black pigment, half): three context windows that show **three stages of one generic compaction cycle**: a full window, then older turns folded down, then a summary block over the recent turns with room freed below. Arrows between the panels make it read as a sequence. It deliberately makes **no claim about how Pi, Hermes or Codex compacts**, and the panels are not the three products. Band: accordion chevrons (folded context).
- **Build Decision Trees from Scratch** (Moss / gold, full cloth): a trained tree with square splits and round leaves in two classes. Band: recursive axis-aligned partitions.
- **SQL Masterclass** (Tobacco / gold, full cloth): ⋈, the join. Two relations drawn as rows meet at the key. Band: ledger rules.
- **Build a DeiT from Scratch** (Viridian / gold, half): 4×4 image patches flanked by the class token (solid) and the distillation token (open), each read out by its own head. Band: a patch grid.
- **Kernel Engineering**, coming soon (Slate / palladium, half): **tiled GEMM**. A sits to the left, B above and C at the lower right. One output tile of C is solid, computed from the hatched row panel of A and column panel of B. Because the book is forthcoming, the device is blind except for C's outline and the output tile, which are foiled. Band: circuit traces with vias.
- **Charlie I, Language Room** (Madder / gold, half): **continuous batching**. Six request lanes, each request a wide prefill bar followed by its decode steps, and a new request slots in the moment one finishes.
- **Charlie II, Vision Room** (Viridian / gold, quarter): an eye whose iris is cut into ViT patches.
- **Charlie III, Sound Room** (Peacock / gold, quarter; voice agents belong to the agents family): a voice-agent turn, with the user's waveform first and the agent's answer following on the line below.
- **Charlie IV, Reasoning Room** (Aubergine / gold, half): **a sampled group**. One prompt fans into six reasoning chains of different lengths, each ending in its reward (solid = correct, open = wrong), and the best chain is carried in heavy foil.

## How each effect maps to a real finish
| On screen (PNG/JPG, `.so` layer) | In production |
|---|---|
| Cloth colour + value-noise slubs/mottle + 4 px weave | Real bookcloth (buckram or linen-finish, e.g. Brillianta / Arbelave class), matched to the swatch. The texture is screen-only. |
| Foil sheen, cloth speck, soft shadow | **Hot-foil blocking** from one brass die per book. The minimum foil line is 1.6 px ≈ 1.2 pt, and counters are open. |
| Darker (or, on Ink, burnished) band with a light lip | **Blind blocking** (deboss, no foil) from a second die. |
| Sunk roundel / arch with a shaded rim | **Sunk panel** made by a two-level blind die pressed about 0.6 mm. The foil device is blocked into it. |
| House-black strip and corners, gilt fillets | A **two-cloth case**, with the fillets on the same foil pass. |

**The print PDFs (`renders/pdf/`, the `.po` layer) are pure vector.** They contain flat cloth colour, flat black leather areas, the blind band as a flat tint, and every foil element in **one flat value**, meant to print as Pantone 871/876/877 C metallic or as spot-gloss UV over a flat tone. They embed **no images** (checked: 0 image XObjects in all 14) and weigh 50–270 KB each. `pdfpeek` reports `!!`/`??` against the textured JPGs; that is expected, and I checked the previews by eye. For the case-bound edition, the page shows the **foil die** and **blind die** of 5D Parallelism as one-colour vector plates, next to the screen simulation and the print file.

## Build notes
- Everything is vanilla JS generating inline SVG. Art is written once with paint tokens (foil sheen, type foil, flat label foil, accent, knock-out) and painted three ways: screen, print and die plates.
- The three textures (cloth, leather grain, foil speck) are computed from value noise at page load and used only on screen.
- The page builds right after the document is parsed. Titles are refitted if the web fonts arrive later.
- A full case wrap of 5D Parallelism (half-bound: corners and strip mirrored on the back board, title stamped along the spine, blind colophon on the back) is on the page as `.wrap`.

## Review response (art-director review, 7.5/10)
**Must-fix, all done:**
1. *Page-fixed gradient dims the same words:* **Confirmed** in the renders ("ERING", "CLASS", "TREES", Language Room label). Type now uses its own light-stop foil per line, and the full sheen is kept for the device, ring and fillets only. Labels and rules use a flat light value. The build check table is on the page.
2. *Copper on Peacock:* **Confirmed.** I kept copper, because it now *means* agents, context and memory, but it uses only its light stops on type, and I deepened Peacock (`#0F4E58 → #0C4450`). The title is now 5.34:1 and the label 6.98:1. Madder, Viridian, Moss, Tobacco and Slate were also deepened slightly so every book clears the check.
3. *Running head vs corner fillet:* **Confirmed** on the half-bound Charlie covers. The rules are now clipped 16 px short of the fillet, or dropped. (With the new level code, the half-bound Charlie volumes are I and IV.)
4. *Raster in the print PDFs:* **Confirmed.** My NOTES were wrong: an earlier optimisation had removed the separate print layer. The print version is now flat vector with zero images; see above.
5. *Pi vs Hermes vs Codex:* neither of us can verify the three tools' internals, so the device no longer assigns a mechanism to any product. It shows one generic compaction cycle in three stages, and the code comment now says so.

**Improvements taken:**
- Assignment rules (cloth by family, foil meanings, a unique-silhouette rule). I placed Moss with classical ML and data tools rather than deep learning, so data and tooling books have a family of their own.
- Ordinal level code: full, then quarter, then half. All four Charlie volumes now carry the spine strip.
- Kernel as tiled GEMM. I made it legible while forthcoming by foiling C's outline and the output tile, **not** by deepening the blind: a 2:1 blind tone on Slate would have to be nearly black, which no real deboss produces.
- Language Room as continuous batching.
- Reasoning Room as a sampled group.
- The whole typography pass: Charlie subtitles without the repeated room word, the fixed label baseline, 5D scaled 1.7×, no full stop after "LLMs", the Reasoning device cleared of the numeral rule (by the redraw), and NN edges at 1.6 px or more.

**Declined:**
- *Bandit "pull-knob" arms at the base of the Reasoning tree:* it adds a second idea that turns to noise at 45 px, and the subtitle already says "from bandits".
- *Separate PDF files for the die plates:* the renderer exports only `.cover` elements, so the plates are shown as vector SVG on the page instead. They are ready to export when needed.

## What I'd do next
- A slipcase for the four Charlie volumes, whose spines read *I · II · III · IV*.
- Spine designs for the whole library, so the shelf rhythm (rules, device, title positions) lines up across all 50 books.
- A real swatch test: block the Gold and Palladium dies on Oxblood, Ink and Saffron samples to confirm the 1.2 pt minimum line and the band depth.
- Devices for the remaining ~36 titles under rule 4, starting with the image-transformer family (CNN, ViT, NanoVLM, Transformers for Vision), where patch grids must not repeat.
