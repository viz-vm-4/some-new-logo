# 07 — Overprint

**A risograph cover system for Vizuara Books.**

## The idea
Every Vizuara book is designed as if it had been pulled off a risograph: one sheet of natural
uncoated paper, two or three spot inks that overprint each other (multiply), halftone dots and line
screens instead of gradients, paper tooth, ink voids, and drums that are a couple of pixels out of
register. The system around the art is strict — one title face in one position, a fixed slug line,
the V press-mark bottom-left, the inks the cover is printed in listed bottom-right, and the level
carried by the key ink. The freedom lives in the emblem, which is always the book's own mechanism
drawn in ink. The recurring trick is that the overprint carries the idea: where the A-panel and
B-panel inks cross you get the GEMM output tile; where two tables overlap you get the INNER JOIN;
where the token strips enter the context window they turn solid. Everything is procedural, vector
SVG (the PDFs contain no raster images at all).

## Palette (real Risograph ink names)
Paper: natural uncoated `#F4F0E6`.

Key inks (title, text, line-work; they encode level):

| Ink | Hex | Level |
|---|---|---|
| Hunter Green | `#407060` | Beginner — ● circle |
| Federal Blue | `#3D5588` | Intermediate — ■ square |
| Black | `#232121` | Advanced — ◆ diamond |

Flash inks (subject; one or two per book): Sunflower `#FFB511`, Yellow `#FFE800`,
Fluorescent Pink `#FF48B0`, Orange `#FF6C2F`, Fluorescent Orange `#FF7477`, Bubble Gum `#F984CA`,
Aqua `#5EC8E5`, Cornflower `#62A8E5`, Green `#00A95C`. In reserve: Mint `#82D8D5`, Light Lime `#E3ED55`.
Sunflower doubles as the series ink for *Charlie and the Intelligence Factory*.

## Type (Google Fonts)
- **Bricolage Grotesque** ExtraBold, opsz 96, width 82–92, fitted per title to the 640px measure,
  leading 0.9, tracking −0.018em. Its ink traps were drawn for ink spread, which is the point here.
- **Instrument Serif** (italic) — kickers ("Charlie and the"), title continuations ("for Large Model
  Training"), maths labels, room numerals.
- **DM Mono** 400/500 — the slug lines, labels and the ink colophon.

## How level is encoded
Twice, redundantly. The key ink (the colour of the title, text and line-work) is Hunter Green,
Federal Blue or Black — so a shelf of 50 sorts by colour at a glance. And the top-left slug carries
a ski-run mark (green circle, blue square, black diamond) plus the word, so it still reads in
greyscale. Every cover was checked in greyscale.

## Fixed chrome
- Top row (y 56): level mark + level word left; `N CAPSULES · N HRS` right (`FORTHCOMING` for
  coming-soon titles).
- Title: top-left from y≈88, 40px margins; optional serif kicker above, serif continuation below.
- Foot (y 850, always on clean paper): the **V press-mark** — a V pulled from two drums, left arm in
  the cover's first flash ink, right arm in the key ink, overprinting at the point — then
  `VIZUARA BOOKS`. Bottom-right: one printed dot per drum and the ink names.
- Misregistration: the key drum is the reference; each flash drum is shifted 1.6–3.5px and rotated
  up to ±0.15°, seeded from the slug so it is stable across renders.
- Forthcoming titles are printed as press proofs (corner marks + registration targets in every drum,
  so the misregistration shows). Series share a building, an ink and a numbered door.

## Emblems (one line per book)
- **AI Context Engineering** — the context window as a solid block of Sunflower; token strips from six
  sources (system, tools, memory, retrieved, history, query) run across the page, overprinting solid
  Federal Blue inside the window and surviving only as a 30% screen outside; a token-budget ruler.
- **Mathematical Foundations for ML** — a normal density printed solid Yellow, rising behind the title;
  the 68–95–99.7 rule overprinted as three Hunter Green halftone steps; μ/σ axis in serif italic.
- **Neural Networks from Scratch** — a 3-5-5-2 MLP; positive weights in green, negative in pink,
  stroke width = |w|; hidden-unit activations as halftone inside the nodes.
- **Build LLMs from Scratch** — the causal attention mask of a decoder; dot size = attention weight
  (softmax with a recency bias and a first-token sink); the diagonal staircase reads "Every token
  attends to itself and those before it", which is exactly what the matrix shows.
- **5D Parallelism** — a 2×2×2×2×2 device mesh drawn as a projected 5-cube: 32 GPU chips, 80 links,
  one link direction per axis (data, tensor, pipeline, context, expert), each printed in a different
  ink combination (black, aqua, pink, aqua+pink, black dashed) with a legend.
- **Pi vs Hermes vs Codex** — three columns of conversation turns (speaker marks) whose line screen
  closes up into a solid block of MEMORY; the third column is printed in both drums. Illustrative, not
  a benchmark of the three harnesses.
- **Charlie I — Language Room** — a paragraph being decoded token by token; the next token is a dashed outline.
- **Charlie II — Vision Room** — an eye rendered as ViT patches, one flat halftone value per patch.
- **Charlie III — Sound Room** — a voice-agent conversation as a waveform: user turns orange, agent turns blue.
- **Charlie IV — Reasoning Room** — a search tree from a three-armed bandit root; leaf rewards as
  halftones; the chosen chain printed in Green.
- **Kernel Engineering** (forthcoming) — a tiled GEMM: A's row-panel (Yellow) and B's column-panel
  (Fluorescent Pink) cross, and the overprint *is* the output tile C[i,j].
- **Build a DeiT from Scratch** — an 8×8-patch image (a sun over ridges), a class token and DeiT's
  distillation token, fed by a convolutional teacher.
- **SQL Masterclass** — two tables as two stacks of rows in Aqua and Yellow; their overlap is the INNER JOIN.
- **Machine Learning Fundamentals** — a linear classifier: each class's probability is a halftone
  screen in that class's ink at opposing screen angles (15° / 75°); the boundary p = 0.5 is where the
  screens cross and mix; margins dashed.
- **Reinforcement Learning** — a gridworld after value iteration: V(s) = γ^d as dot size, walls in
  Federal Blue, greedy-policy arrows, and the agent's path from start to the +1 goal.

Also on the page: a full **print wrap** (back + 0.5in spine + front) for *Build LLMs from Scratch*.
The back continues the front's attention matrix: the last token's row, read left to right.

## Files
- `index.html` — the self-contained presentation page (built from `src/` by `python3 src/build.py`).
- `src/riso.js` — the engine: ink library, halftone/line-screen generators, specks, title fitting,
  chrome, and `sheet()` which stacks the drums. `src/books.js` — book specs + one emblem function
  per book. `src/wrap.js` — the print wrap. `src/page.js`, `src/page.html` — the presentation.
- `renders/` — PNG (2×), JPG (1×) and `pdf/` (vector, exact 7.5 × 9.25in trim, zero raster images).

## Notes for print
- Knockouts are drawn as knockouts in the artwork except in two places where SVG masks would have
  forced Chrome to rasterise the PDF: the Charlie sign lettering and the Pi "MEMORY" labels are drawn
  as the ink/paper colour on top. On press those are ordinary knockouts on the key plate.
- The halftones are deliberately coarse (10–14 lpi) so they read as texture at 180px. They are
  artwork, not the printer's screen, and are vector, so they hold at any size.
- Minimum dot ≈ 1.2px (0.3mm) at trim; minimum rule 1.6px; all text in key inks.

## What I'd do next
1. Export each drum as its own greyscale plate (they are already separate SVG groups), and pull a real
   two-colour riso proof to tune ink hexes, dot gain and the misregistration range.
2. Write the remaining ~35 emblems — each is a 30–60 line function against the same engine —
   keeping the rule "the idea lives where the inks cross".
3. A spine system for the full shelf (flash-ink spine caps + level mark, as on the wrap) and a
   library-page crop (square, title only) for small UI contexts.
4. True text knockouts in the PDF by outlining the few knocked-out labels.
