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
- **ai-context-engineering:** a *jaal* of context windows. Each node packs a 4×4 grid of chosen tokens, one of them the query. Four streams (instructions, tools, retrieval, memory) run into it from the sides, and lozenges sit at the lattice nodes.
- **mathematical-foundations-for-ml:** contour ellipses of a quadratic bowl, tilted along its eigen-axes, with gradient descent zig-zagging down the valley. Alternate stamps are turned 90°, so the ellipses interlock into a basket-weave *jaal*.
- **neural-networks-from-scratch:** one fully-connected layer. Stamped edge to edge, each block's outputs are the next block's inputs, so the net becomes a literal net. Two forward-pass activations run through it in madder.
- **build-llms-from-scratch:** the 8×8 causal attention mask. The past is printed white, each token's own position in indigo, and the masked future as dots. A straight repeat prints it as a sawtooth.
- **5d-parallelism:** a pipeline schedule of 4 stages × 12 time steps. Forward micro-batches run down one diagonal in white and backward passes run back up in madder. Each stage is split in two for tensor parallelism, and the idle bubble is a dot. The block stamped again and again is data parallelism.
- **pi-vs-hermes-vs-codex:** context over time for three agents in three lanes. Each column is one turn: a madder summary cell, the memory that survives, with the turns stacked above it. The stack grows until compaction collapses it back to the summary, making a stepped sawtooth whose lanes reset at different moments. It deliberately makes no claims about how each agent actually compacts.

Range:
- **cnn-fundamentals:** the block *is* the kernel. It is a 5×5 Laplacian-of-Gaussian edge filter carved as a Hinton diagram: a white positive centre and a black negative ring. Indigo corners mark the receptive field, and where four impressions meet they print a cross.
- **decision-trees-from-scratch:** a depth-3 binary tree with split tests as squares and leaves as class-coloured discs. Alternate rows hang inverted so leaves meet leaves.
- **transformers-from-scratch:** attention drawn as arcs between tokens on a line. One head looks ahead (white arcs above) and another looks back (indigo arcs below). The nested arcs make a scalloped band.
- **diffusion-lm-from-scratch:** masked diffusion. Eight denoising steps run top to bottom, and each reveals one more token (madder when new, white once settled) until the sequence is whole.
- **kernel-engineering** (forthcoming): tiled matrix multiply. A row panel of A and a column panel of B stream through shared memory as fine threads, and where they cross, the output tile accumulates. It weaves into a check.

Charlie and the Intelligence Factory (woven double-ikat sub-series):
- **charlie-language-room** (Inference Engineering): continuous batching. Each row is a batch slot holding a request's prefill (madder), its decoded tokens (white) and its end-of-sequence (yellow), and the next request slides straight in. The result is ikat stripes with feathered ends.
- **charlie-vision-room** (Vision Transformers): the image cut into patches, each shaded by how strongly the class token attends to it.
- **charlie-sound-room** (Voice Agents): two spoken phrases as waveforms. Words are bursts, the loudest peaks are dyed yellow, and silences are a single indigo thread.
- **charlie-reasoning-room** (RL, from bandits to reasoning models): a solved gridworld. Every cell is a chevron along the optimal policy (computed by breadth-first search over the grid), flowing around madder walls to the yellow goals.

## Production notes

- Everything is generated in `index.html` with vanilla JS and SVG: the blocks, the stamping, the ink filter (edge bleed plus voids where the cotton didn't take the dye), the woven cotton, the dye mottling and the ikat. Nothing is raster or stock. Every cover is deterministic, seeded by its slug.
- The PDFs (`renders/pdf/`) are exact trim, 7.5 × 9.25 in. The type is vector. The textured dye layers are rasterized by the browser at about 300 dpi (2252 px across the trim), which is print resolution. A production pipeline would swap the ink filter for scans of real prints.
- Print wrap (on the page as `.wrap`): back, a 0.625 in spine and front are one continuous length of cloth. The field runs round the spine and the kinar crosses all three at the same height. The back carries a short description and an "About the cover" note explaining the block. Bleed is not drawn, but the field is procedural, so extending it by 0.125 in is trivial.
- The full-page `--sheet` screenshot times out in the headless renderer, because fifteen covers of SVG filters at 2× are too heavy for one capture. Per-cover renders and PDFs are unaffected.

## What I'd do next

1. Have one real block carved and printed (the 5D pipeline schedule is the obvious candidate) to calibrate the ink filter against actual cloth.
2. Write a small block grammar so the other ~35 titles can be drafted quickly, keeping the rule that each block must be explainable in one sentence from the subject.
3. Design a second kinar for series (the Charlie books could carry a woven border instead of a printed one), and a spine system that puts the book's block on every spine, so a shelf reads as a stack of folded cloth.
4. Tune the greyscale separation between madder and indigo, for example with a lighter madder or a slightly denser reserve on indigo, so the level is also legible in one-colour print.
