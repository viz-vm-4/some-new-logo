# 03 — Halcyon

*A paperback modernism for a library of machine learning.*

## The idea
Halcyon borrows its method from the post-war Penguin and Pelican paperbacks: Tschichold's horizontal
grid, Marber's fixed title band, Facetti's abstract science covers, and genre colour-coding. It
does not borrow their look. Every cover has the same three bands. The top is a paper band where the
title is the hero, set large in a grotesque. Below it, a black rule carries the level and the length
of the book. The bottom is a field of flat colour holding one abstract composition drawn from the
book's own mechanism, such as a neuron, a causal-attention mask or a five-dimensional device mesh.
The field's colour is the book's level, the way Penguin green meant crime, so a shelf of Vizuara
books sorts itself by colour. Everything is vector SVG/CSS drawn in code, using five inks per cover.
Vizuara gets a publisher's device of its own: a kingfisher (the halcyon) inside a capsule, because
Vizuara teaches in capsules.

## Palette
| Role | Name | Hex |
|---|---|---|
| Paper (title band, light figures) | Paper | `#F2EEE4` |
| Ink (type, rule, dark figures) | Ink | `#1C1B19` |
| House accent, used only for "the idea" in each emblem | Signal red | `#C9352B` |
| Beginner field / shade | Chrome | `#EEC232` / `#D6A81D` |
| Intermediate field / shade | Viridian | `#4C9C6C` / `#387F57` |
| Advanced field / shade | Ultramarine | `#28398A` / `#1C2A69` |

Each cover uses paper, ink and red, plus its level colour and that colour's shade. No orange,
sky-blue or magenta. The level colours step from light to mid to dark (L\* ≈ 80 / 60 / 27). Red sits
between them (L\* ≈ 46), so the accent still separates from the field in greyscale. I checked this
with greyscale contact sheets.

## Type
**Schibsted Grotesk** (Google Fonts), and nothing else.
- Titles: weight 500, tracked −2.8%, flush left, broken by hand line by line, at sizes from a small
  scale (92 / 84 / 74 / 66 / 64 / 60). A fit routine shrinks a line if it would pass the 48 px margin.
- Labels: weights 600–700 in spaced capitals. Subtitles: 22 px, or 30 px when the title has a colon.
- The Charlie volume numerals use the face's serifed capital I, which reads like a roman numeral.

## Grid (720 × 888, 7.5 × 9.25 in)
1. **Imprint line** (y 30): device, VIZUARA BOOKS, catalogue number (No. 01–52, taken from the
   library order). A 2 px rule sits at y 70.
2. **Title band**: paper, 336 px deep and the same on every book, so titles hang from one line across
   the shelf.
3. **Level rule**: a 36 px black band. Level capsules and the level word sit on the left; capsules
   and hours on the right.
4. **Emblem field**: 720 × 516 in the level colour. Compositions may bleed. Nothing critical is within
   24 px of trim.

## How level is encoded
It is encoded three ways, each redundant with the others: the field colour (chrome / viridian /
ultramarine), filled capsules in the black band (●○○ / ●●○ / ●●●), and the word. The spines repeat
all three.

## Emblems: how each was derived
- **No. 01 AI Context Engineering**: "context" means what surrounds the question. System prompt, tools,
  retrieved documents and history nest in the order a model reads them, each weighted above the next.
  The question, in red, comes last. History is drawn as lines of conversation.
- **No. 02 Mathematical Foundations for ML**: three forms on one plinth. The identity matrix (red ones
  on the diagonal) stands for linear algebra, a convex bowl holding its minimum for calculus and
  optimisation, and the histogram of a normal curve for probability.
- **No. 03 Neural Networks from Scratch**: a single neuron. Inputs have the thickness of their weights
  (ink positive, paper negative). They converge on the unit, pass through a sigmoid drawn inside it,
  and leave as one red output.
- **No. 04 Build LLMs from Scratch**: a causal self-attention mask. Each row looks only backwards and
  dot area is attention weight. The heavy first column is the attention sink, and the red last row is
  the model choosing the next token.
- **No. 05 5D Parallelism**: five axes of parallelism (data, tensor, pipeline, context, expert) with
  two ranks each give 32 GPUs at the corners of a 5-cube. The cube is projected along five directions
  36° apart, and all 80 edges are drawn. One axis is in red.
- **No. 06 Pi vs Hermes vs Codex**: three agents are shown as three glyphs (circle, triangle, square).
  A long context falls in as stripes and is compacted three different ways into the solid form each
  agent keeps.
- **No. 46–49 Charlie and the Intelligence Factory** (sub-series): all four share a four-bay
  north-light factory roof and a conveyor. The lit red pane is the volume number.
  - I Language / Inference Engineering: the model as a machine. Prompt tokens drop into a hopper, pass
    a stack of identical layers, and come out one token at a time onto the belt, newest in red.
  - II Vision / Vision Transformers: an image cut into 4 × 4 patches, laid on the belt in reading
    order behind a red class token.
  - III Sound / Voice Agents: a spoken exchange. You speak (paper), a pause, then the agent answers
    (red).
  - IV Reasoning / RL, bandits to reasoning models: a search tree of reasoning paths. Leaf size is
    reward, and the red path is the one that is reinforced.
- **No. 14 Build Decision Trees from Scratch**: the tree hung as a Calder-style mobile. Every bar is a
  split and every weight is a leaf. Class is coded twice (ink discs vs red squares).
- **No. 13 RAG in Production**: the corpus as a shelf of books. Retrieval lifts out the three that
  answer the question.
- **No. 34 Transformers: Theory, Intuition, and Building from Scratch**: multi-head attention as an arc
  diagram. One head links each token to the previous one, one reaches back to the first token, and one
  (red) links matching words.
- **No. 37 Build a DeiT from Scratch**: the DeiT token sequence. The class token (ink) comes first,
  then the patches, then the distillation token (red), which leans against the teacher network (the
  black disc).
- **No. 21 SQL Masterclass**: two tables, one inked and one inverted, overlap. The join, where
  their rows meet, is red and keeps the row rhythm.
- **No. 51 Kernel Engineering** (forthcoming): work tiled from grid to block to warp. Forthcoming
  books are printed as a proof, with keylines only and a single inked tile. The band says
  "Forthcoming" instead of a length.

## Beyond the covers (on the page)
- **The shelf**: all 52 titles as spines (number, vertical title, level rule, level colour, device),
  sorted by level so the colour runs in blocks. Forthcoming titles have hatched feet.
- **Print wrap** for No. 03: the back repeats the three bands. It carries a short blurb, a "The cover
  shows…" note in the Pelican tradition, and the beginner shelf listed by number, all at trim with the
  spine.

## What I'd do next
- Draw emblems for the remaining 37 titles. Several are already obvious: SQL as two joined tables,
  Git as a branching and merging rail, RLHF as a preference pair, Diffusion LM as tokens resolving out
  of noise, Kimi/DeepSeek builds as mixture-of-experts routing.
- Write a short emblem style sheet covering maximum element counts, the rule that red is always "the
  idea", and how far a composition may bleed.
- Proof the five inks as real spot colours (Pantone matches) and test the chrome on uncoated stock.
- Draw a matching web thumbnail variant: at 180 px, drop the house line and enlarge the capsules.
- Add a small bank of spine-only emblems (a 44 px crop of each composition) for the web library.
