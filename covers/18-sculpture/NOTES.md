# 18 — Maquette

**Every book is one object, made in code and photographed on seamless paper.**

## The idea
A maquette is the small model a sculptor makes before the real work, and every book in this library is
about a model. So each cover is a single sculpted form that embodies its subject, set on a seamless paper
sweep in a studio and lit like a plate in a museum catalogue. The system is the catalogue:

- the title is set large on the paper wall;
- the object stands in the lower half;
- a gallery label sits at the foot, giving the object's name (italic), its medium, and its dimensions in
  **capsules × hours** (the book's real size, from `books.json`);
- a catalogue number (the book's position in the library) and the imprint sit at the top.

The covers look alike because of the studio, the light and the typography. They differ because each
object is its own. Nothing is drawn, stock or AI-generated. Each cover is ray-marched live in the browser
with WebGL2 (signed-distance functions, soft shadows toward a softbox, ambient occlusion, a
softbox/scrim/card environment for reflections, a filmic shoulder and grain) onto a
**2250 × 2775 px canvas (300 dpi at trim)** displayed at 720 × 888 CSS px. All type is live HTML over the
image, so it stays vector in the PDFs.

## Level = lighting (paper key)
| Level | Paper | Hex | Light |
|---|---|---|---|
| Beginner | Chalk | `#E7E3DB` | high key: bright, airy, soft shadows |
| Intermediate | Stone | `#A8A39A` | mid key: grey seamless, one softbox |
| Advanced | Soot | `#232120` | low key: dark paper, a single spot from the side |

Level is a difference of value, not hue, so it survives greyscale print and reads at 180 px across a shelf
of fifty. The bottom-right corner repeats it with a three-step grey-scale target, the kind photographers
place beside artworks, plus the level in words.

## Palette
- Papers: Chalk `#E7E3DB`, Stone `#A8A39A`, Soot `#232120`.
- Ink: `#171614` on chalk and stone; Bone `#EEE9E0` on soot.
- There is no brand accent colour. Colour on the shelf comes only from the materials: plaster, terracotta,
  travertine, slate, oxblood glaze, oak, Carrara marble, beeswax, granite, red lacquer, limestone with
  iron-oxide ink, porcelain with gold leaf.
- The old orange / sky / magenta pinwheel is gone entirely.

## Type (Google Fonts)
- **Newsreader** Display (opsz 72, weight 430): titles, 78 / 70 px, tight leading. Italic 360 for
  subtitles ("from Scratch" always drops to the italic line).
- **Newsreader Italic**: the object's name on the label.
- **Instrument Sans** 600, tracked caps: imprint, catalogue number, medium, dimensions, level.

## Imprint
A V standing on a plinth (inline SVG): the publisher as the one who puts ideas on display. It is always
small, top left, next to "VIZUARA BOOKS", and never louder than the title.

## Objects, one line each
- **AI Context Engineering**: a travertine *window*, packed block by block with slate, marble, sandstone
  and terracotta, with headroom at the top and one block left out on the floor. Context engineering
  decides what goes in, in what order, and what stays out.
- **Mathematical Foundations for ML**: the hyperbolic paraboloid *z = xy* in cast plaster, with its
  straight rulings drawn in graphite. It carries linear algebra (straight lines) and calculus (curvature,
  the saddle point) at once, in the lineage of 19th-century mathematical models.
- **Neural Networks from Scratch**: three layers of terracotta spheres (4 → 4 → 1), every node joined to
  every node in the next layer, modelled by hand.
- **Build LLMs from Scratch**: a Brancusi-like column of twelve *identical* modules in oxblood glaze, the
  same block repeated (GPT-2 small has twelve).
- **5D Parallelism**: a rhombic icosahedron in Carrara marble. It is the parallel projection of a
  five-dimensional cube, and every edge runs in one of exactly five parallel directions. Faces are computed
  from five icosahedral axes (a zonohedron) and baked into the shader.
- **Pi vs Hermes vs Codex: Context Compaction and Memory**: nine beeswax tablets pressed three ways, as
  three stacks of nine (the book has nine capsules) under granite weights, each compacted to its own
  height. Wax is Plato's model of memory.
- **Prompt Engineering**: a heavy slate slab raised by a small red-lacquer wedge. A small, deliberate input
  gives a large change in outcome (after Serra's prop pieces).
- **RAG in Production**: an oak cabinet of twelve drawers with one drawer drawn: retrieval.
- **Build a Data-Efficient Image Transformer (DeiT) from Scratch**: one image (an iron-oxide disc) cut into
  sixteen limestone patches standing in sequence, led by a gilt distillation token.
- **Kernel Engineering** (forthcoming): a tiled block with one tile lifted out and set on top (GEMM tiling,
  a tile staged into fast memory). As a forthcoming title it is shown as a **white plaster maquette**
  "to be cast in silicon bronze". That is the rule for all coming-soon books.
- **Charlie and the Intelligence Factory** (sub-series I–IV): one porcelain cube, the "room", with a single
  gilded opening cut in its face: a *mouth* for Language, an *eye* for Vision, an *ear* (stepped horn) for
  Sound, a *stair* for Reasoning. The camera and light are identical across the four, and the gold is a
  nod to the golden ticket. The paper still follows each book's level.

## Extras on the page
- A thumbnail strip showing all 14 covers at 180 px.
- A full print wrap for *AI Context Engineering* (back 7.5 in + spine 0.6 in + front 7.5 in). It is a
  single wider render, so the studio paper runs continuously around the spine. The back carries the
  catalogue entry for the object.

## Production notes
- Rendering starts after the `load` event and runs synchronously (tiled draws, `readPixels` sync). Anything
  that waits on the page, such as `document.fonts.ready` or a screenshot, queues until the last canvas is
  painted. This keeps it independent of the harness's navigation timeout, even on software GL
  (SwiftShader). Expect roughly 5 s per cover on SwiftShader under load.
- One shared GL context renders every book, then copies into a 2D canvas per cover, so there is no
  WebGL context limit.
- If WebGL2 is missing, the covers fall back to flat paper in the level colour with all the typography.

## What I'd do next
- Model an object for all ~50 books. The vocabulary scales: every subject has a mechanism that can be
  made physical.
- An animated web variant: the object turns slowly on hover (same shader, different camera).
- Spines that line up into one continuous paper sweep on the shelf.
- A physical edition: actually cast the forthcoming plaster maquettes.
