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
B-panel inks cross you get the GEMM output tile; a matched customer/order pair prints in both drums,
so the INNER JOIN's result is literally the green; where the token strips enter the context window
they turn solid. Everything is procedural, vector
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
  leading 0.9. Tracking −0.018em at width ≥ 88, loosened to −0.008em at the narrower widths, where
  riso ink spread would otherwise close pairs like "nf", "rc" and "Tr". Its ink traps were drawn for
  ink spread, which is the point here.
- **Instrument Serif** (italic) — kickers ("Charlie and the"), title continuations ("for Large Model
  Training"), variable names, room numerals.
- **STIX Two Text** Italic — maths labels only (μ−2σ … μ+2σ). Instrument Serif has no Greek, so a
  label set in it fell back to a system font for μ and σ; now every maths label is set whole in STIX.
- **DM Mono** 400/500 — the slug lines, labels and the ink colophon.

## How level is encoded
Twice, redundantly. The key ink (the colour of the title, text and line-work) is Hunter Green,
Federal Blue or Black — so a shelf of 50 sorts by colour at a glance. And the top-left slug carries
a ski-run mark (green circle, blue square, black diamond) plus the word, so it still reads in
greyscale. Every cover was checked in greyscale.

## Fixed chrome
- Top row (y 56): level mark + level word left; `N CAPSULES · N HRS` right, pluralised properly
  (`1 HR`), or `FORTHCOMING` for coming-soon titles. Level, capsules, hours, forthcoming status and the
  full title are read from `covers/_shared/books.json`, which is inlined at build time. The hand-set
  line breaks are checked against the catalogue title, so the covers cannot drift from the catalogue.
- Title: top-left from y≈88, 40px margins; optional serif kicker above, serif continuation below.
- Foot (y 850, always on clean paper): the **V press-mark** — a V pulled from one drum in the two
  states a drum can print, the left arm a halftone screen and the right arm solid, always in the key
  ink — then `VIZUARA BOOKS`. Bottom-right: one printed dot per drum and the ink names.
- Art and type: flash ink may run behind type. Key-ink art never crosses a line of type: layoutTitle
  returns every line's glyph box and emblems test against it. A straight flash edge that meets the
  title sits on the baseline, so only descenders dip in.
- Misregistration: the key drum is the reference; each flash drum is shifted 1.6–3.5px and rotated
  up to ±0.15°, seeded from the slug so it is stable across renders.
- Forthcoming titles are printed as press proofs (corner marks + registration targets in every drum,
  so the misregistration shows). Series share a building, an ink and a numbered door.

## Emblems (one line per book)
- **AI Context Engineering** — the context window as a solid block of Sunflower; token strips from six
  sources (system, tools, memory, retrieved, history, query) run across the page, overprinting solid
  Federal Blue inside the window and surviving only as a 30% screen outside; a token-budget ruler.
- **Mathematical Foundations for ML** — a normal density printed solid Yellow, rising behind the title;
  the 68–95–99.7 rule overprinted as three Hunter Green halftone steps; the key-ink curve stops
  where it would cross the title; μ/σ axis set in STIX Two Text.
- **Neural Networks from Scratch** — a 3-5-5-2 MLP; positive weights in green, negative in pink,
  stroke width = |w|; hidden-unit activations as halftone inside the nodes.
- **Build LLMs from Scratch** — the causal attention mask of a decoder; dot size = attention weight
  (softmax with a recency bias and a first-token sink); the diagonal staircase reads "Every token
  attends to itself and those before it", which is exactly what the matrix shows.
- **5D Parallelism** — a 2×2×2×2×2 device mesh drawn as a projected 5-cube: 32 GPU chips, 80 links,
  one link direction per axis. Each axis differs in ink and in form, so the legend survives
  greyscale: data is a thin black rule, tensor a wide aqua bar, pipeline a pink bar with a black
  dotted core, context an aqua+pink double rule, and expert black dashes.
- **Pi vs Hermes vs Codex** — three columns of the same conversation (U/A turn marks) whose line
  screen closes up into a solid block of MEMORY; the third column is printed in both drums. All three
  share one compaction curve on purpose: the cover frames the comparison and makes no ranking.
- **Charlie I — Language Room** — speculative decoding as a paragraph. Draft tokens the target model
  accepts print solid pink. The first rejected draft is an outline struck through in key ink. The
  target's own token prints solid key ink. The last run is still unverified: dashed outlines and a cursor.
- **Charlie II — Vision Room** — what a ViT does: an image (a bold C, for Charlie) cut into a 4×4
  grid of patches in four printable tones, and the same 16 patches leaving the room on the factory's
  conveyor as a token sequence behind a solid [CLS] token.
- **Charlie III — Sound Room** — a voice-agent conversation as a waveform: user turns orange, agent turns blue.
- **Charlie IV — Reasoning Room** — a search tree from a three-armed bandit root; leaf rewards as
  halftones; the chosen chain printed in Green.
- **Kernel Engineering** (forthcoming) — a tiled GEMM: A's row-panel (Yellow) and B's column-panel
  (Fluorescent Pink) cross, and the overprint *is* the output tile C[i,j].
- **Build a DeiT from Scratch** — an 8×8-patch image (a sun over ridges) with the class token and
  DeiT's distillation token prepended. The dist token's output and the CNN teacher's prediction both
  feed a loss node; nothing flows from the teacher into the token.
- **SQL Masterclass** — an INNER JOIN, told truthfully: CUSTOMERS (Aqua) and ORDERS (Yellow) linked
  on the key. Each matched pair prints in both drums, so the result table is green; customer 1, who has
  two orders, appears twice. Unmatched rows stay a single screened ink.
- **Machine Learning Fundamentals** — a linear classifier: each class's probability is a halftone
  screen in that class's ink at opposing screen angles (15° / 75°); the boundary p = 0.5 is where the
  screens cross and mix. Its label sits in a true knockout of both screens. Class samples are marked
  ○ and ×, so the split survives greyscale.
- **Reinforcement Learning** — a gridworld after value iteration: V(s) = γ^d as dot size, walls in
  Federal Blue. One greedy policy, with one tie-break, draws both the arrows and the agent's path,
  so the path always follows the arrows; path cells carry the path's own arrowheads.

Also on the page: a full **print wrap** (back + 0.5in spine + front) for *Build LLMs from Scratch*.
The back continues the front's attention matrix: the last token's row, read left to right.

## Files
- `index.html` — the self-contained presentation page (built from `src/` by `python3 src/build.py`).
- `src/riso.js` — the engine: ink library, halftone/line-screen generators, specks, title fitting,
  chrome, and `sheet()` which stacks the drums. `src/books.js` — book specs + one emblem function
  per book. `src/wrap.js` — the print wrap. `src/page.js`, `src/page.html` — the presentation.
- `renders/` — PNG (2×), JPG (1×) and `pdf/` (vector, exact 7.5 × 9.25in trim, zero raster images).

## Notes for print
- Knockouts are real knockouts in the artwork (the door, the conveyor strip and the ML label pill
  are geometric holes in the drum), with one exception: the Charlie sign lettering. SVG masks would
  have forced Chrome to rasterise the PDF, so those letters are drawn in the printed Sunflower colour
  on top. On press they are an ordinary knockout on the key plate.
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

## Review response (art-director review, 7.5/10)

I checked every claim against the renders and PDFs before changing anything. All nine must-fix
items held up, and all are fixed.

**Must fix**
1. *Math font fallback* — confirmed: the PDF embedded LiberationSerif-Italic for μ/σ. The labels are
   now set whole in STIX Two Text Italic, and the PDF embeds only Bricolage, Instrument Serif, DM Mono
   and STIX Two.
2. *Smoke into "Room"* — confirmed on Language and Reasoning. The chimney is lower and the smoke
   drifts right and off the page below the title. The halftone is also forbidden inside any title
   glyph box, so a longer future title can't collide with it either.
3. *MEMORY at 1.1:1 on Yellow* — confirmed. Now 14px key ink on all three blocks.
4. *"1 HRS"* — fixed in the engine for capsules and hours.
5. *Pi/Hermes/Codex ranking* — agreed. All three columns now share one compaction curve, and the turn
   marks are U/A in DM Mono, outside the level-glyph vocabulary.
6. *DeiT arrow* — agreed, it was wrong. The dist token's output and the teacher's prediction now meet
   at a loss node, and nothing points into the token.
7. *RL path vs policy* — confirmed: the arrows and the path used different tie-breaks. One greedy
   function now drives both, and path cells carry the path's arrowheads instead of a policy arrow.
8. *ML label and greyscale* — confirmed. "p = 0.5" is 16px in a true knockout of both screens, on
   the boundary line, which breaks for it. The classes are now marked ○ and ×.
9. *5D legend in greyscale* — confirmed. The axes are now distinguished by form as well as ink
   (listed in the emblems section), and the glow ends at y 785 so the legend sits on clean paper.

**Improvements taken**
- *Vision Room rebuild* (2): taken. It is now image → 4×4 patches → a token sequence on the factory
  conveyor behind [CLS].
- *SQL join* (3): taken. The Venn was the misleading metaphor, and truth to the mechanism is this
  system's own rule, so the join is now two keyed tables whose matched pairs overprint into a green
  result. It is a little less iconic as a shape, but it is honest.
- *Language Room as speculative decoding* (4): taken.
- *Art/type crossing rule and tracking* (5): taken, and the rule is written into Fixed chrome. The
  Context window now sits on the "Engineering" baseline. The math curve's outline drops out where it
  would cross type, while the yellow still rises behind it. Tracking at width ≤ 86 is −0.008em.
- *Imprint and data* (6.2, 6.3): taken. The V is now one ink (screen plus solid), so it no longer
  cycles through flash colours and survives greyscale. Level, capsules, hours and titles come from
  books.json at build time.
- *Form matrix* (1): taken as a rule for the remaining catalogue, rather than as a redraw now. A cell
  grid may be the primary figure on at most 1 cover in 6. The vision books (ViT, CNN, CV Bootcamp,
  NanoVLM) should use curves, fields, trees and line screens, such as receptive fields as nested
  screens, or feature maps as a line-screen stack. In this set the SQL cover moved from a Venn to
  rows, and the Vision Room's grid is now secondary to the sequence.

**Improvement declined**
- *Knock Sunflower out under the Charlie linework* (6.1): declined. The level reads from the title
  and the slug, which always print on paper. On the building, a dark ink printing over a light one
  and making a third colour is the medium's own rule, and the series should show it. A true knockout
  under the numerals and sign type would need masks, which rasterise the PDF, or outlined type.
