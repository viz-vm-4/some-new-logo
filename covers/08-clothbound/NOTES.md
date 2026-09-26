# 08 — Buckram: the Vizuara bindery edition

## The idea
Every Vizuara book is designed as a real case-bound hardcover, not as a printed picture of one. Each gets a deep bookcloth, **one foil** and **one blind die**. The title is blocked in foil at the head of the board, following title-page order: the substance in spaced capitals, connecting words ("from Scratch", "for Machine Learning") in italic, and the level and capsule count underneath in words ("Beginner · Thirty-three capsules"). Below it, in a sunk roundel, sits the book's own **device**, drawn from the mechanism the book teaches. A blind-blocked **band** repeats that subject as tone-on-tone texture, in the way a Clothbound Classic repeats its motif, and carries the device like a medallion. The Vizuara imprint is a small stamped device at the tail. Every cover follows the same grid, the same materials and the same type, so the shelf reads as one library. The devices differ from book to book, and so do the cloths, which are chosen as a set.

## Level = the binding itself
| Level | Binding | What you see on the front board |
|---|---|---|
| Beginner | **Quarter-bound** | A strip of house-black leather-grain cloth along the spine, with a gilt fillet at the join |
| Intermediate | **Half-bound** | The spine strip plus two fore-edge corners, each with a gilt fillet |
| Advanced | **Full cloth** | One cloth over the whole board, with no strip and no corners |

The more of the book that's bound, the deeper it goes. The strip and corners still read clearly at 180 px (see the shelf on the page), and the level is also written in the label line under the title.

## Palette
Bookcloths are named like a swatch book. Every cover uses one of them, plus house black on quarter and half bindings.

| Cloth | Hex | | Cloth | Hex |
|---|---|---|---|---|
| Oxblood | `#5B1A24` | | Aubergine | `#3F1C42` |
| Madder | `#9A2F20` | | Claret | `#6A1C3C` |
| Saffron | `#C68F1F` | | Moss | `#515C27` |
| Peacock | `#0F4E58` | | Tobacco | `#6E4526` |
| Viridian | `#145A47` | | Slate | `#39444F` |
| Bottle | `#1A3F2E` | | Ink | `#1A1C23` |
| Prussian | `#18305A` | | **House black** (spine & corners, leather grain) | `#1D1C20` |
| Cobalt | `#233F86` | | | |

Foils (one per book; the mid tone is given, and on screen each is rendered as a 10-stop sheen):
Gold `#C69C45` · Copper `#BF7650` · Palladium `#B3B8BD` · Black pigment (matt) `#1B1B1C`.
The paperback/POD equivalents are Pantone 871 C (gold), 876 C (copper) and 877 C (silver), with process black for the pigment foil.

## Type
- **Title:** Cormorant Garamond Bold, capitals, +4% tracking, lining figures. The strokes are heavy enough to take foil on cloth without filling in.
- **Continuations:** Cormorant Garamond Semibold Italic. Long titles break the way a title page does, which caps the capitals at three lines (see DeiT). Italic lines are wrapped for balance, prefer to break after a dash or comma, and never leave a lone word on a line.
- **Labels and imprint:** Cormorant Garamond Bold capitals, +24–34% tracking, 13.5–14 px (10 pt).
- The presentation page is set in EB Garamond. Both families come from Google Fonts.

## Grid (720 × 888 px = 7.5 × 9.25 in)
Title zone 66–392, with the block centred vertically and fitted automatically (sizes shrink until the block fits). The blind band runs 418–792, the roundel is ⌀300 centred at y 605, and the imprint sits on baseline 848. Everything is centred on the *board*, which is offset by the hinge (full cloth) or by the quarter-cloth (quarter and half), so the composition stays optically centred on what you see. The Intelligence Factory sub-series swaps the roundel for a round-headed **arch** (a "room"), with a running head for the series and the volume numeral stamped inside the arch. All four volumes share the north-light factory-roof band.

## Devices and bands: one line per book
- **AI Context Engineering** (Peacock / copper, half): crop marks frame a window cut from a stream of tokens. What falls inside is solid (selected context) and the rest stays as dotted stream. Band: token brickwork.
- **Mathematical Foundations for ML** (Prussian / gold, quarter): one figure holds all three pillars: Gaussian level sets (probability), their eigen-axes (linear algebra) and gradient descent zig-zagging down the narrow valley to the minimum (calculus). Band: the gradient field of the same quadratic, with every arrow pointing downhill into the roundel.
- **Neural Networks from Scratch** (Bottle / gold, quarter): a 3-5-5-2 perceptron whose edge weights are drawn as stroke widths. Band: a feed-forward lattice.
- **Build LLMs from Scratch** (Oxblood / gold, half): the causal attention matrix. Dot area is the attention weight, with the familiar "sink" on the first token, and masked future positions are open rings. Band: tiled lower-triangular staircases.
- **5D Parallelism** (Ink / palladium, full): the 5-cube in Petrie projection, with 32 devices and 80 links; the five edge directions are the five axes of parallelism. Band: a mesh of 2×2 accelerator nodes.
- **Pi vs Hermes vs Codex** (Saffron / black pigment, full): three context columns compacted three ways (summary block plus recent lines, progressive compression, evicted history plus recent lines), on one plinth. Band: accordion chevrons, i.e. folded context.
- **Build Decision Trees from Scratch** (Moss / gold, quarter): a trained tree with square splits and round leaves in two classes. Band: recursive axis-aligned partitions, the feature space a tree carves.
- **SQL Masterclass** (Tobacco / gold, quarter): ⋈, the join. Two relations drawn as rows in the two triangles meet at the key. Band: ledger rules.
- **Build a DeiT from Scratch** (Claret / palladium, full): 4×4 image patches flanked by the class token (solid) and the distillation token (open), each read out by its own head. Band: a patch grid.
- **Kernel Engineering**, coming soon (Slate / palladium, full): the die, with a 4×4 grid of streaming multiprocessors inside the package. **Forthcoming books carry their device blind (no foil) until publication**; only the title, ring and imprint are foiled. Band: circuit traces with vias.
- **Charlie I, Language Room** (Madder / gold, full): inference. The prompt is prefilled as a block, and decoded tokens rise from it one at a time, like a chimney on the factory.
- **Charlie II, Vision Room** (Viridian / gold, half): an eye whose iris is cut into ViT patches.
- **Charlie III, Sound Room** (Cobalt / gold, half): a voice-agent turn. The user's waveform comes first and the agent's answer follows on the line below.
- **Charlie IV, Reasoning Room** (Aubergine / gold, full): from bandits to reasoning models. A search tree grows from three arms, pruned branches are crossed out, and one chain is carried through to the reward.

## How each effect maps to a real finish
| On screen (procedural) | In production |
|---|---|
| Cloth colour + JS value-noise slubs/mottle + 4 px weave pattern | Real bookcloth (buckram or linen-finish, e.g. Brillianta / Arbelave class), matched to the swatch. The texture layers are screen proxies and are **not** in the print file. |
| Foil gradient, speck grain and pressed-edge filter | **Hot-foil blocking** from one brass (or magnesium, for short runs) die per book. The minimum foil line is 1.5 px ≈ 1.1 pt, and counters are open. |
| Darker tone and inner shadow on the band | **Blind blocking** (deboss, no foil) from a second die. Pressing darkens and burnishes the cloth, which is the tone shown. |
| Sunk roundel / arch | **Sunk panel** made by a two-level (sculpted) blind die pressed about 0.6 mm. The foil device is blocked into it. |
| House-black strip, corners and gilt fillets | A **two-cloth case**: spine and corners in black leather-grain cloth, with the fillets in the book's foil on the same foil pass. |
| Paperback / print-on-demand | Flat cloth colour. The foil becomes a Pantone metallic (871/876/877 C) or a spot-gloss UV over a flat tone, and the blind band becomes a ~25% darker tint under matt laminate plus spot UV. |

The PDFs in `renders/pdf/` are the print proof. Under `@media print` the page swaps to a separate vector layer, so the foil, blind and type stay vector (the type as outline fonts). Only the cloth-texture proxy is raster. The PNG/JPG renders are the material simulation.

## Build notes
- Everything is generated by vanilla JS into inline SVG. There is no raster art: the three textures (cloth, leather grain, foil speck) are computed once per page load with value noise and shared by every cover.
- Each cover contains two versions of the same artwork: `.so` (screen: masks and pressed-edge filters) and `.po` (print: direct vector paint). CSS `@media` picks one.
- The full case wrap (back · spine · front) of *Neural Networks from Scratch* is on the page as `.wrap`. It shows the quarter binding running round the spine, with the title stamped along the spine between gilt rules, and a blind colophon on the back board.

## What I'd do next
- A second cloth weight for the sub-series (e.g. a finer linen for Charlie), plus a slipcase for the four-volume set, whose spines read *I · II · III · IV* in a row.
- Spine designs for the whole library, so the shelf rhythm of rules, device and title positions lines up across all 50 books.
- A real swatch test: block the Gold and Palladium dies on Oxblood, Ink and Saffron samples to confirm the 1.1 pt minimum line and the band depth.
- A device for each of the remaining ~36 titles, built from the same grammar: one mechanism, one figure, drawn at foil weight.
