# Chhaap (छाप): a block-printed cover system for Vizuara Books

*Chhaap* means the impression a carved block leaves on cloth. It is also the word for a stamp, and so for an imprint.

## The idea

Every Vizuara book is a length of block-printed cotton. Each title gets one carved block, built from the actual mechanism of its subject (a causal mask, a pipeline schedule, an edge-detection kernel). That block is stamped across the cloth into a field, the way an Ajrakh printer builds a whole length from one carved unit. The comparison is literal. Stamping one block across a surface with a fixed stride is a convolution, and the same block printed again and again is one model replicated across the data. The cover has three fixed parts. The **field** holds the book's block in repeat. A black **kinar** border runs across every book at the same height. Below it the **pallu**, the end of the cloth, is left undyed and holds the title in crisp type. The printer's stamp, a carved square with a stepped V, sits at the foot. The **level** of a book is the number of dye baths its cloth has been through. The four *Charlie* books form a sub-series that is **woven** rather than printed, as double ikat.

## Traditions, named, and what was taken from each

- **Ajrakh** of Kutch (Ajrakhpur and Dhamadka, Gujarat) and of Sindh, printed by the Khatri community. *Structural principle taken:* a field built by repeating one carved block on a grid, bounded by borders. Each colour is printed as a separate registered pass (outline block, then fill blocks), so the colours never quite line up. The palette of indigo, madder on an alum mordant, and iron black also comes from here. On the cover the field is stamped by a seeded "hand". Every impression lands up to about a pixel off register, and each colour layer is registered independently. Every block is also turned by a fraction of a degree, and the ink thins across every three impressions before the block is re-inked. Some blocks alternate their stamps by 90° or with a mirror flip, which is how printers turn one block into a *jaal* (lattice).
- **Dabu** mud-resist of Bagru and Akola, and **Sanganeri** printing of Jaipur, both by the Chhipa printers of Rajasthan. *Taken:* the reserved ground. The pallu is cloth kept out of the dye, not a label stuck on top. The beginner level is printed straight onto a white ground, as Sanganer is.
- **Patan Patola**, the double ikat woven by the Salvi family of Patan, Gujarat. *Taken:* the **naksha**. Before weaving, the design is fixed on graph paper, and every warp and weft thread is resist-dyed to that grid. The design is literally a bitmap made of thread, which makes it a natural bridge to pixels and tensors. The Charlie fields are rendered thread by thread (2 px threads). Tied bundles of threads slip together, which feathers every edge, as in real ikat.
- **Avoided on purpose:** paisley, florals, elephants, peacocks and parrots, mandalas, deities and any sacred iconography, and any living artist's signature work. The vocabulary is limited to what carved blocks and graph-paper nakshas are built from: squares, dots, lozenges, lines, arcs and steps. Every motif comes from the book's subject, not from textile ornament.

## Crediting and commissioning practitioners

A production version should commission each book's block from a block-carver (Pethapur in Gujarat is the traditional centre of teak block-carving), working from the flat block drawings shown under each cover. A length of each book would then be printed in natural dyes by an Ajrakh workshop in Ajrakhpur and scanned for the edition. The procedural renders become the specification, and the cloth becomes the artwork. The carver and the printing workshop should be named on every copyright page and paid per title. The same applies to a Patan weaving family if the Charlie sub-series is ever woven. This is credit and commission, not "inspired by".

## Palette

| role | name | hex |
|---|---|---|
| undyed ground, pallu, reserved motif | Kora (undyed cotton) | `#EAE1CC` |
| intermediate ground; accent on indigo | Manjith (madder red) | `#9B2F25` |
| advanced ground; main ink on kora | Neel (indigo) | `#1C2A4A` |
| type, outlines, kinar | Kat (iron black) | `#201B19` |
| Charlie sub-series only | Anar (pomegranate yellow) | `#C8962C` |

## Type

Both typefaces come from Indian foundries.
- **Eczar Bold**, by Vaibhav Singh for Rosetta, for titles. It is a sharp display serif drawn alongside its Devanagari, and its carved-looking serifs sit well next to a wooden block. Titles are set with manual line breaks so no line ends on an orphaned short word. The widest line fills a 624 px measure, capped at 76 px for two lines and 64 px for three. The type is set crisp in HTML over the printed cloth, so it stays vector in the PDF.
- **Anek Latin**, by Ek Type (Mumbai), for the imprint, series line and meta. It is set wide (wdth 112) and tracked, like a mill stamp on the end of a bolt of cloth.

## How level is encoded

Level is the number of **dye baths**, so it shows as the colour of the ground and reads instantly at 180 px.
- **Beginner:** printed straight onto raw kora in indigo and iron black, with a madder accent.
- **Intermediate:** one bath in madder. The motif is reserved white, with iron black and indigo.
- **Advanced:** through the indigo vat. The motif is reserved white, with madder and iron black.

The foot of each cover repeats the level in words, next to a swatch of that dye. This keeps it legible in greyscale print, where madder and indigo come out close in tone.

## Emblems: one carved block per book

Core six:
- **ai-context-engineering:** the packed window. One context window with a fixed budget (the frame) is packed end to end with what the engineer chose to put in it. Each source has its own carved texture: system instructions solid, memory as chevrons, retrieved chunks as dots, tool output as stripes, and the query last in the accent colour. It is stamped as a course of bricks, and alternate courses pack from the other end.
- **mathematical-foundations-for-ml:** contour ellipses of a quadratic bowl, tilted along its eigen-axes, with gradient descent zig-zagging down the valley. Alternate stamps are turned 90°, so the ellipses interlock into a basket-weave *jaal*.
- **neural-networks-from-scratch:** one fully-connected layer. Stamped edge to edge, each block's outputs are the next block's inputs, so the net becomes a literal net. Two forward-pass activations run through it in madder.
- **build-llms-from-scratch:** the 8×8 causal attention mask. The past is printed white, each token's own position in indigo, and the masked future as dots. A straight repeat prints it as a sawtooth.
- **5d-parallelism:** all five axes in one block. The pipeline axis is a GPipe schedule (4 stages × 12 time steps, 3 micro-batches): forward passes run down one diagonal in white, backward passes run back up in madder, and idle slots are dots. For tensor parallelism every cell is split top/bottom. For sequence parallelism it is also split left/right, so each micro-batch is a 2×2 of shards. For expert parallelism, stage three is a mixture-of-experts layer: its four sub-cells are four experts, and each micro-batch is routed to one of them (the same one on the way back) while the others stay idle. The block stamped again and again is data parallelism.
- **pi-vs-hermes-vs-codex:** context over time under a fixed budget, with three canonical compaction strategies in three lanes. The lanes are deliberately not attributed to any one agent. Each column is one turn, with turns in white and the surviving summary or memory in madder. Lane one is summarise-and-reset, a sawtooth. Lane two is accumulating memory: each compaction leaves one more madder cell, so the base climbs and the cycles shorten. Lane three is a rolling window: the stack reaches the budget and holds flat, and the evicted oldest turn drops out below as a dot.

Range:
- **cnn-fundamentals:** the block *is* the kernel. It is a 5×5 Laplacian-of-Gaussian edge filter carved as a true Hinton diagram, with square area proportional to |weight| (side = 27·√(|w|/16)). The +16 centre is a large white square and the −2/−1 ring is small black squares. Because the kernel sums to zero, the ring carries exactly as much ink as the centre. It is stamped at 2× scale. Indigo corners mark the receptive field, and where four impressions meet they print a cross.
- **decision-trees-from-scratch:** a depth-3 binary tree with split tests as squares and leaves as class-coloured discs. Alternate rows hang inverted so leaves meet leaves.
- **transformers-from-scratch:** attention drawn as arcs between tokens on a line. One head looks ahead (white arcs above) and another looks back (indigo arcs below). The nested arcs make a scalloped band.
- **diffusion-lm-from-scratch:** masked diffusion. Eight denoising steps run top to bottom, and each reveals one more token (madder when new, white once settled) until the sequence is whole. It is stamped at 2× scale.
- **kernel-engineering** (forthcoming): tiled matrix multiply. A row panel of A and a column panel of B stream through shared memory as fine threads, and where they cross, the output tile accumulates. It weaves into a check.

Charlie and the Intelligence Factory (woven double-ikat sub-series):
- **charlie-language-room** (Inference Engineering): continuous batching. Each row is a batch slot holding a request's prefill (madder), its decoded tokens (white) and its end-of-sequence (yellow), and the next request slides straight in. The result is ikat stripes with feathered ends.
- **charlie-vision-room** (Vision Transformers): the image cut into patches, each shaded by how strongly the class token attends to it.
- **charlie-sound-room** (Voice Agents): two spoken phrases as waveforms. Words are bursts, the loudest peaks are dyed yellow, and silences are a single indigo thread.
- **charlie-reasoning-room** (RL, from bandits to reasoning models): a solved gridworld. Every cell is a chevron along the optimal policy (computed by breadth-first search over the grid), flowing around madder walls (joined into solid bars) to the yellow goals.

## Production notes

- Everything is generated in `index.html` with vanilla JS and SVG: the blocks, the stamping, the ink filter (edge bleed plus voids where the cotton didn't take the dye), the woven cotton, the dye mottling (soft vector blooms) and the ikat. Nothing is raster or stock. Every cover is deterministic, seeded by its slug.
- The PDFs (`renders/pdf/`) are exact trim, 7.5 × 9.25 in. The type and the cotton weave are vector: the weave is drawn as individual seeded thread hairlines plus slubs rather than a noise filter, along with the dye mottle, which keeps the PDFs at about 1.2–4.9 MB each (about 40 MB for all fifteen). The printed dye layers go through the ink filter, which the browser rasterizes at about 300 dpi (2252 px across the trim), which is print resolution. A production pipeline would swap the ink filter for scans of real prints.
- Print wrap (on the page as `.wrap`): back, a 0.625 in spine and front are one continuous length of cloth. The field runs round the spine and the kinar crosses all three at the same height. The back carries a short description and an "About the cover" note explaining the block. Bleed is not drawn, but the field is procedural, so extending it by 0.125 in is trivial.
- The page is heavy: fifteen covers of SVG ink filters, generated on load. A full-page `--sheet` capture at 2× can time out in the headless renderer. Per-cover renders, the wrap render and the PDFs are unaffected.

## What I'd do next

1. Have one real block carved and printed (the 5D pipeline schedule is the obvious candidate) to calibrate the ink filter against actual cloth.
2. Write a small block grammar so the other ~35 titles can be drafted quickly, keeping the rule that each block must be explainable in one sentence from the subject.
3. Design a second kinar for series (the Charlie books could carry a woven border instead of a printed one), and a spine system that puts the book's block on every spine, so a shelf reads as a stack of folded cloth.
4. Make the greyscale contact sheet a standing check for every new block, alongside the 180 px one.
5. Allow a block grammar with a scale ladder (1×, 2× or 3× stamps). This round, cnn and diffusion moved to 2×; the rest of the list should be judged the same way.

## Review response (revision round 1)

**Must-fix: all three confirmed against code and render, and fixed.**
1. **Reasoning Room chevrons.** Confirmed. `rot()` mapped `'u'` to the transpose, and because the chevron is vertically symmetric that equals `'d'`. It is fixed to `sx=4-y; sy=x`. I checked by recomputing the BFS policy in node (9 up-cells) and comparing it cell by cell with the render: every column under both goals now points into them. While there, I joined adjacent walls into solid bars so they read as walls.
2. **5D showed three axes.** Confirmed. Sequence parallelism (each cell split left/right as well as top/bottom) and expert parallelism (stage three is an MoE layer that routes each micro-batch to one of four experts, the same one on the backward pass) are added. The caption, NOTES and wrap colophon now name all five. The block is stamped at 1.5× so the 2×2 shards still read.
3. **CNN "Hinton diagram".** Confirmed: the ring carried about 4.6× the centre's ink. Sides are now 27·√(|w|/16), so area is proportional to |w| and the zero-sum kernel prints equal white and black. It is also stamped at 2× so the buti holds at 180 px.

**Improvements taken:**
- **Kora resist keyline** under every accent shape on a dyed ground (Ajrakh's own reserve). It is a 3.4px-wider kora pass through the same block, registered with its colour. On the CNN block the black ring is keylined too. Checked on a greyscale contact sheet: the build-llms diagonal, 5D backward passes, diffusion reveals, transformer look-back arcs and the Pi memory ramp now separate from the ground. Beginner covers on kora don't need it and don't get it.
- **Repeat anchored to the kinar.** `oy = KINAR_Y − ceil(FIELD_H/BH)·BH`, so a whole row of blocks sits on the border and the partial row falls at the top trim.
- **AI Context Engineering as "the packed window"**, a brick course rather than a grid, largely as suggested.
- **Pi vs Hermes vs Codex, three strategies** (reset, accumulating memory, rolling window), still unattributed.
- **Scale ladder, partly:** cnn and diffusion now stamp at 2× (3 repeats across), and the compaction block is larger. The rest of the ladder goes into the block grammar (next steps).
- **Title breaks:** "Build Large / Language Models / (LLMs) from Scratch" and "5D Parallelism for / Large Model Training".

**Declined:**
- **Keylines on the Charlie ikat fields.** A kora outline fused with the neighbouring chevrons into clutter, because ikat has no gap to hold a keyline. The joined madder wall bars are big enough to read in greyscale without one.
- **Truncating the last segment in the packed window.** With the query in the final slot, a cut-off segment would put the query past the budget, which is the wrong lesson.
- **Making print PDFs flat vector (texture only on screen).** The ink texture is the design, so a flat print would be a different cover. Instead the weave and the dye mottle went vector, which brought the set from 55 MB to about 39 MB with no loss.

**pdfpeek:** 14 of 15 are `ok` or `??`. The `??` results are dense-grain fields where pdf.js and Chrome antialias the rasterised ink differently. `neural-networks-from-scratch` shows `!!` (about 13). I checked it with a diff heatmap: the difference sits only on edges (including vector text edges), the mean colour of PDF and JPG is identical to within 0.6/255, and the content matches mark for mark. It is the most edge-dense field in the set (a full 4×4 mesh of 1.6px lines), not a mismatch. Inking the mesh more solidly made the number worse, so I reverted that.
