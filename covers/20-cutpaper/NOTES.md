# 20 · Paperworks

**Direction:** Paperworks. Cut paper, folded card and real depth.

## The idea

Each Vizuara book is a small construction made from cut, folded and layered coloured card, and the construction is the book's idea. AI Context Engineering gets a die-cut window over a long scroll of tokens. In Neural Networks from Scratch the neurons are pinned together with brass paper fasteners. In Pi vs Hermes vs Codex a context history is pleated into a concertina. The references are Matisse's cut-outs (flat saturated colour, the pleasure of scissors), pop-up and tunnel-book engineering, and Japanese paper craft. The system is strict so the pictures can be free:

- the board colour tells you the shelf,
- an ivory title slip always sits in the same place,
- the number of sheets stacked under the slip tells you how deep the book goes,
- the light always comes from the top left.

Everything is drawn in code: SVG geometry, a computed shadow for each piece's elevation, vector "hand-cut" edge wander, and procedural grain. The shelf reads as one family, and each cover is still an object you want to pick up.

## The system (grid and rules)

- **Trim:** 720×888 px (7.5×9.25 in). The board is a full-bleed colour.
- **Stage:** y 0–548. The construction lives here. It may bleed off the top and sides, and it always tucks *under* the slip.
- **Title slip:** an ivory card at x 36, y 548, 648×304, in the same place on every book. Inside, text starts 66 px from the left edge and never comes closer than 36 px to any edge. The slip holds:
  - Meta row: the ply icon and level on the left; the shelf name (or the series and number) on the right.
  - Title: set as large as fits, capped at 76 px, with lines broken by hand.
  - Optional subtitle.
  - Foot: the imprint on the left; *capsules · hours* (or a COMING SOON tag) on the right.
- **Light and depth:** every piece has an elevation z. Each z gets two shadows (a tight contact shadow and a soft ambient one), both offset down and to the right, plus a hairline of light on the top-left cut edge. Edges are never ruler-straight: every rectangle and disc gets a slow sub-pixel wander in vector geometry, so it stays crisp in print. On top of that, one procedural grain layer (feTurbulence, soft-light) and one soft light falloff.
- **Imprint:** a **V** made of two crossed strips of card, ink under vermilion, with the right strip lifted and throwing a shadow. The wordmark reads **Vizuara** Books at 17 px, a signature that never competes with the title.
- **Sub-series (Charlie and the Intelligence Factory):** kraft board. A factory-roof (sawtooth) die-cut window opens into a pop-up room. The room's back wall takes the shelf colour of its subject (Language → vermilion, Vision → leaf, Sound/agents → mustard, Reasoning/RL → rose).
- **Coming soon:** the kit isn't assembled yet. The emblem appears as a punch-out sheet with dashed die lines, fold lines and registration marks, and a few pieces are already pressed out.
- **Back cover (shown in the wrap):** the offcuts, meaning the sheets the front's pieces were punched from, plus a short *About the cover* colophon on the back slip. Every book would explain its own construction, the way O'Reilly explains its animal.

## Paper vocabulary (so future books get consistent treatment)

| Operation | Meaning | Examples |
|---|---|---|
| Cut | split or partition | parallelism, patches, chunks |
| Pleat | compress without discarding | compaction, summaries |
| Window | what the model can see | context, attention span |
| Layer | depth | network depth; ply = level |
| Pin | a weighted connection | neurons, edges |
| Punch out | select or remove | retrieval, pruning, paged memory |
| Lift | a number made physical | value, weight |
| Loop | who attends to whom | attention, feedback |

## Palette (hex)

The palette is Matisse's cut-out palette (ultramarine, vermilion, yellow, green, black, pink) plus kraft. The retired orange, sky blue and magenta are deliberately absent.

| Role | Name | Hex |
|---|---|---|
| Shelf: Foundations | Ultramarine | `#2A3A92` |
| Shelf: Neural nets & vision | Leaf | `#22704B` |
| Shelf: Language models | Vermilion | `#D93D2B` |
| Shelf: Context & agents | Mustard | `#E6B422` |
| Shelf: Systems & scale | Night (indigo) | `#1D2342` |
| Shelf: Reward & the world (RL, robotics, SciML) | Rose | `#EE9C94` |
| Sub-series: Intelligence Factory | Kraft | `#BD9061` |
| Title slip | Ivory | `#F4EDDF` |
| Type | Ink | `#1B1A22` |
| Accent | Lemon | `#F5D55A` |
| Accent | Blush | `#F7CDC2` |
| Accent | Cobalt | `#4C66C4` |
| Accent | Mist | `#BCCCD8` |
| Accent | Mint | `#9ED0B3` |
| Accent | Plum | `#55284A` |
| Fasteners | Brass | `#F3D98A` → `#C89B3C` → `#7A5A1E` |

## Fonts (Google Fonts)

- **Bricolage Grotesque:**
  - 800 for titles, tracked −0.028em, line-height 0.93. Its ink-trap notches look cut rather than drawn.
  - 700 for labels (12.5 px caps, +0.14em).
  - 500/800 for the imprint.
- **Fraunces Italic** (SOFT 100): subtitles and the back-cover blurb. It is the only soft, warm voice on the cover.

## How level is encoded

**Ply.** The title slip is mounted on one sheet for Beginner, two for Intermediate and three for Advanced. The extra sheets peek out 13 px each above the slip as coloured edges, so the bands are visible at thumbnail size. The level is also named in the meta row next to a three-bar icon (1, 2 or 3 bars filled). On the spine it shows as 1–3 stripes at the head, so a shelf of Vizuara books sorts itself by depth. In the printed premium edition the sheets are real, and you can feel the level with your thumb.

## Emblems (how each was derived)

- **ai-context-engineering:** a long scroll of tokens runs off the top of the cover and down under the slip. A die-cut ultramarine window shows only what fits in the context. Two pieces were cut out of the old context above (their holes remain) and pasted into the window, which is cut-and-paste as context engineering.
- **mathematical-foundations-for-ml:** graph paper (the grid of linear algebra), three normal distributions cut in card (probability), and a tangent strip pinned at the inflection point of the red curve (calculus). The slope is computed exactly.
- **neural-networks-from-scratch:** a 3-4-2 network built like a jointed paper toy. Each weight is a strip whose width is |w|, ivory for positive and ink for negative, woven over and under. Neurons are pinned with brass fasteners.
- **build-llms-from-scratch:** a row of token tiles. Paper loops of attention, with widths set by the attention weights, all land on the empty next slot, and the next token is being lifted into place above it.
- **5d-parallelism:** five parallel planes of one model fanned in depth, each cut a different way. Near to far: tensor (columns), pipeline (stages), data (replica blocks), sequence (chunks of tokens), experts (tiles, with the active experts in red).
- **pi-vs-hermes-vs-codex:** the same long context compacted three ways. Recent turns stay flat and legible, older history is pleated into a concertina, and each strip ends up a different height.
- **charlie-language-room** (series I): blank tokens ride a conveyor into an inference machine (hopper, gauge, pipe to the roof) and come out generated.
- **charlie-vision-room** (II): a picture cut into 3×3 patches, as a vision transformer sees it. The top row has left in raster order, as a sequence.
- **charlie-sound-room** (III): a waveform of standing cards on the floor. On the wall are two paper waves, a voice and the agent answering it.
- **charlie-reasoning-room** (IV): a pop-up staircase (step fold), the oldest trick in paper engineering, standing for step-by-step reasoning up to a reward flag.
- **inference-engineering** (coming soon): a punch-out sheet of numbered KV-cache pages. A few are pressed out and lie out of order, as in paged attention.
- **rag-in-production:** a card-catalogue drawer. The top three index cards (tabs in three colours) have been pulled out and fanned for reading, which is retrieval done the way libraries always did it.
- **reinforcement-learning:** a grid world where each tile is lifted by its value (computed by BFS distance to the goal), so the nearer the goal, the higher the card and the longer its shadow. The tile colour ramps blush → ivory → lemon, and ink arrows show the greedy policy. Walls are plum, the goal is vermilion, and the agent is an ink counter.
- **Wrap** (neural-networks-from-scratch): the back shows the offcuts, the lemon sheet with 3 holes, the vermilion with 4 and the ivory with 2 (exactly the network's layers), plus leftover strips and two loose brads. It also carries the colophon and a barcode area. The spine is a vertical slip with the title, the V mark and the ply stripes at the head.

## How it could be produced as a real die-cut, layered or embossed cover

1. **Premium edition (built, not printed).**
   - **Board:** the cover board is coloured-through stock in the shelf colour, so edges and scuffs stay the same colour. Kraft for the Intelligence Factory is real kraft board.
   - **Emblem:** 2–4 plies of coloured card, each die-cut and laminated in register. Each elevation step in the file (z) maps to one physical ply of about 0.3–0.4 mm.
   - **Windows:** apertures such as the context window, the factory-roof opening and the punch-out holes are real die-cuts through the front board, with a printed layer behind.
   - **Title slip:** a separate ivory label, printed offset or letterpress, tipped on into a shallow blind-debossed recess (like old cloth-bound books). It sits on 1, 2 or 3 real sheets, so level is tactile.
   - **Shadows:** once the depth is physical, the printed shadows are switched off. They are a separate layer in the file (the shadow filter), so the same artwork drives both editions.
2. **Trade paperback (printed).**
   - **Print:** CMYK, or CMYK plus a spot for the shelf colour to keep each shelf consistent across print runs. The shadows are printed.
   - **Emboss:** each elevation is turned into one step of multi-level blind embossing, so the pieces rise physically by z.
   - **Finish:** soft-touch laminate on the board and an uncoated feel on the slip (spot matte), so the slip reads as a different paper.
3. **Coming-soon books** could ship as an actual punch-out card, as a pre-order bookmark or insert.
4. **Files:**
   - **Vector:** the text, slips and all piece geometry are vector.
   - **Raster:** in the PDF Chrome rasterises the shadow filters at about 300 dpi, which is fine for press.
   - **Grain:** the simulated paper grain and light falloff are screen-only (a `@media print` rule drops them). On press, the stock supplies its own texture and the room its own light. This also keeps each PDF at about 1 MB instead of 7 MB.
   - **Greyscale:** the title is always ink on ivory, and each emblem reads through value and shadow, so the covers survive greyscale print (checked).

## What I'd do next

- Make the other ~37 emblems using the paper vocabulary. For example:
  - Decision Trees: a folded fan of branching strips.
  - Git: a strip that branches and merges, pinned at commits.
  - SQL: two ruled cards slotted together at matching rows.
  - Kernel Engineering: a woven grid of tiles.
  - DSA: nested envelopes.
- Build a spine generator and render the whole library as a shelf, to tune the colour distribution across 50 spines.
- Make a physical prototype: cut the Neural Networks and AI Context covers from real stock, photograph them, and compare the shadow model against reality.
- Add a subtle web-only motion: pieces settle into place on hover in the library grid.
- Refine the Intelligence Factory rooms so each object sits in the room's perspective, and test Bricolage kerning on parentheses and ampersands in long titles.
