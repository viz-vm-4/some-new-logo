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
| Beginner | Chalk | `#E8E5DE` (wall ≈ 234) | high key: bright, airy, soft shadows |
| Intermediate | Stone | `#9C988F` (wall ≈ 155) | mid key: grey seamless, one softbox |
| Advanced | Soot | `#3A3734` (wall ≈ 55) | low key: dark paper, a single spot from the side |

The hex values are what actually renders on the wall at title height, measured, not stated.
Each cover checks itself after rendering. It reads the wall at a fixed point (CSS 660,300), and if that
is more than ±8 levels from its key, it logs `WALL CHECK FAILED` as a page error, which
`tools/render.js` prints. The check caught three camera angles drifting during the revision.

Level is a difference of value, not hue, so it survives greyscale print and reads at 180 px across a shelf
of fifty. The bottom-right corner repeats it with a three-step grey-scale target, the kind photographers
place beside artworks, plus the level in words.

## Palette
- Papers (as rendered): Chalk `#E8E5DE`, Stone `#9C988F`, Soot `#3A3734`.
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
- **AI Context Engineering**: a travertine *window*, packed block by block with slate, marble, sandstone,
  terracotta and serpentine, with headroom at the top and one block left out on the floor. Context
  engineering decides what goes in, in what order, and what stays out.
- **Mathematical Foundations for ML**: the hyperbolic paraboloid *z = xy* in cast plaster, with its
  straight rulings drawn in graphite. It carries linear algebra (straight lines) and calculus (curvature,
  the saddle point) at once, in the lineage of 19th-century mathematical models.
- **Neural Networks from Scratch**: a string construction in the Gabo and Hepworth tradition. Three
  upright oak boards are the layers, with 4, 5 and 2 brass pins (the neurons) standing proud of their
  front edges. Black linen threads run in front of the boards from every pin to every pin on the next
  board, so both ends of every thread are visible. Each thread's thickness is its weight.
- **Build LLMs from Scratch**: a Brancusi-like column of twelve *identical* modules in oxblood glaze, the
  same block repeated (GPT-2 small has twelve).
- **5D Parallelism**: a rhombic icosahedron in Carrara marble. It is the parallel projection of a
  five-dimensional cube, and every edge runs in one of exactly five parallel directions. Faces are computed
  from five icosahedral axes (a zonohedron) and baked into the shader.
- **Pi vs Hermes vs Codex: Context Compaction and Memory**: nine beeswax tablets pressed three ways, as
  three stacks of nine (the book has nine capsules) under granite weights, each compacted to its own
  height. Wax is Plato's model of memory.
- **Prompt Engineering**: a lapis cylinder seal (the prompt) resting at the head of a terracotta slab, and
  the frieze it has rolled into the clay (the continuation). The carved motif repeats every 2πr, so the
  whole output is shaped by that one small object.
- **RAG in Production**: an oak cabinet of twelve drawers with one drawer drawn: retrieval.
- **Build a Data-Efficient Image Transformer (DeiT) from Scratch**: a frieze of limestone tiles on a rail,
  in DeiT's input order `[CLS, DIST, patch 1 … 16]`. A plaster class token and a gilt distillation token
  lead, then sixteen patches each carry their piece of one image (a near-black oxide disc).
- **Kernel Engineering** (forthcoming): a tiled block with one tile lifted out and set on top (GEMM tiling,
  a tile staged into fast memory). It is shown under the **forthcoming rule**: the sculptor's working
  maquette in raw plaster, with the steel armature showing, graphite pointing marks and a paper tag tied
  on, "to be cast in silicon bronze".
- **Charlie and the Intelligence Factory** (sub-series I–IV): one porcelain cube, the "room", with a single
  gilded opening cut in its face. Language gets a *mouth* (slot). Vision gets *sixteen square
  patch-windows* (Vision Transformers see in patches). Sound gets a stepped *ear* (horn). Reasoning gets a
  six-step *stair* rising through the cube. The camera and light are identical across the four, and the
  gold is a nod to the golden ticket. The paper follows each book's level.

## Material rule (for the remaining ~36 books)
At most about one white object in four per paper key, spread across warm (terracotta, oak, wax), dark
(slate, lapis, iron) and metallic materials. White plaster is kept for the forthcoming state. The Charlie
porcelain is the one deliberate exception: it is the sub-series identity.

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
- Nothing is ever cached, so nothing can be stale. Every paint comes from the live shaders, in one of
  three modes:
  - A person (no WebDriver) always gets a full render, one cover per task from top to bottom, so the page
    stays responsive.
  - An automated capture (`navigator.webdriver`) gets everything painted synchronously right after load,
    so screenshots and `fonts.ready` queue behind it.
  - The print pass of that same automated session: `tools/render.js` reloads the page once per cover in a
    context that has just completed a full render, then hides every other cover. Only then (WebDriver and
    a full render flagged in this browser context within 10 minutes) does the page wait for the isolation
    and paint just the visible cover. If no single cover is isolated within 4 s it paints everything, so a
    cover can never come out blank.

  This takes a `--pdf` run from about 16 full renders down to 2.
- One shared GL context renders every book, then copies into a 2D canvas per cover, so there is no
  WebGL context limit.
- If WebGL2 is missing, the covers fall back to flat paper in the level colour with all the typography.

## What I'd do next
- Model an object for all ~50 books. The vocabulary scales: every subject has a mechanism that can be
  made physical.
- An animated web variant: the object turns slowly on hover (same shader, different camera).
- Spines that line up into one continuous paper sweep on the shelf.
- A physical edition: actually cast the forthcoming plaster maquettes.

## Review response (revision round 1)
I checked every claim against the renders before changing anything. All four must-fix items were right.

**Must fix, all done**
1. *Kernel tagline widow*: confirmed. `.tag` now uses `text-wrap: balance`, a non-breaking space is
   inserted before the last word of every tag, and one is inserted before every em dash, as system rules.
   It now breaks "From silicon to speculative decoding — / GPU kernels for modern LLMs."
2. *DeiT token order and missing class token*: confirmed. DeiT's sequence is `[CLS, DIST, patches]`.
   The object is rebuilt as a frontal frieze in that order: a plaster class token, a gilt distillation
   token, then sixteen patches. The label now reads "led by a class token and a distillation token". The
   ink is near-black oxide (#3A1A12). I did not only turn the camera to -25°: standing plates side by side
   shadowed each other's faces under any key light, so the patches now face the camera on a rail, and the
   disc reads on every tile.
3. *"Oxblood" rendering coral*: confirmed. After the first fix, the mirror-like clear coat still washed
   the key-lit facets pink. The coat is now satin (roughness 0.24, strength 0.45), and an object-only fill
   card on the right lifts the shadow facets without touching the paper-key wall value. Measured at 2x:
   lit facets #8D3B36–#A24944, shadow facets 56–68/255.
4. *Context stone list*: confirmed. The medium line and the wrap's back copy both now read "travertine,
   slate, marble, sandstone, terracotta, serpentine".

**Improvements taken**
- *Intermediate paper too light*: agreed and measured (166–211). Stone is retuned to about 155 at title
  height. Every cover now self-checks its wall value (±8) and logs a page error on drift. The check is in
  the page because the tools folder is not mine to edit; render.js surfaces it as `[page error]`.
- *Forthcoming must look unfinished on the object*: agreed. Kernel is now raw plaster with the steel
  armature showing, graphite pointing marks and a tied paper tag. This is the rule for every forthcoming
  book.
- *Charlie Reasoning and Vision*: agreed. Vision now has a 4×4 grid of square patch-windows. Reasoning
  has a six-step stair rising diagonally through the face, as a stairwell in section with gilded treads,
  rather than a flight receding in depth, which is illegible at this camera angle. Crevices no longer go
  pure black: occlusion now has a floor, because real cavities get bounce light. The Sound horn is rebuilt
  as an exact union of cylinders, which removes the broken ring edges.
- *Prompt*: agreed, and the cylinder seal is a better idea than my wedge. It is adopted as described.
- *Neural Networks*: agreed. It read as a molecule, and the string construction is adopted.
- *Build LLMs framing*: agreed. The column is scaled to 0.8, centred like every other object, and the
  title is set at 62 px with "(LLMs)" ending the roman second line.

**Declined or partial**
- *"At most one white object in four per key"*: adopted as the rule for the remaining books, not
  retrofitted here. The Charlie porcelain is the sub-series identity, and the 5D marble's value contrast
  is the point on soot paper.
