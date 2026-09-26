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
Vizuara's publisher's device is a kingfisher (the halcyon) diving through a capsule. Vizuara teaches
in capsules, and the bill breaks out through the capsule's edge.

## Palette
| Role | Name | Hex | L\* |
|---|---|---|---|
| Paper (title band, light figures) | Paper | `#F2EEE4` | 94 |
| Ink (type, rule, floor, dark figures) | Ink | `#1C1B19` | 10 |
| House accent: one element or one set per cover, the idea | Signal red | `#C9352B` | 46 |
| Beginner field / shade | Chrome | `#EEC232` / `#D6A81D` | 80 |
| Intermediate field / shade | Jade | `#63B384` / `#4C9C6C` | 67 |
| Advanced field / shade | Ultramarine | `#28398A` / `#1C2A69` | 27 |

Each cover uses paper, ink and red, plus its level colour and that colour's shade. No orange,
sky-blue or magenta. Red sits at least 19 L\* from every field, so the accent survives greyscale.
Red never touches a shade colour. I checked this on a greyscale 180 px contact sheet.

## Type
**Schibsted Grotesk** (Google Fonts), and nothing else.
- Titles: weight 500, tracked −2.8%, flush left, broken by hand on sense.
- Title size is one of three steps: **92 / 76 / 64**. The fit routine takes the largest step whose
  widest line fits the 624 px measure and whose title block ends at least 24 px above the band.
  The Charlie sub-series is fixed at 76 so its four volumes match.
- Labels: weights 600–700 in spaced capitals. Subtitles: 22 px, or 30 px when the title has a colon.
- Charlie titles: "Charlie and the" at 30 px, then the room name as the hero. The volume numeral is
  72 px and uses the face's serifed capital I.

## Grid (720 × 888, 7.5 × 9.25 in)
1. **Imprint line** (y 30): device, VIZUARA BOOKS, and a catalogue number (No. 01–52, in library
   order). A 2 px rule sits at y 70.
2. **Title band**: paper, 336 px deep and the same on every book.
3. **Level rule**: a 36 px black band. Level capsules and the level word sit on the left; capsules
   and hours on the right, or "Forthcoming".
4. **Emblem field**: 720 × 516 in the level colour.
   - Every element either bleeds at least 12 px past the trim, or sits at least 48 px inside it and
     at least 24 px under the band.
   - Grounded compositions share one ink **floor** at field y 468 (page y 840). The floor bleeds off
     the foot. The Charlie conveyor is that floor.
   - A small checker script tests every SVG element against this rule. It allows two exceptions:
     repeating rows that bleed as a group (stripe columns, the shelf, the candidate wall) and
     details set into the floor band.

## How level is encoded
It is encoded three ways, each redundant with the others: the field colour (chrome / jade /
ultramarine), filled capsules in the black band (●○○ / ●●○ / ●●●), and the word. The spines repeat
all three.

## Emblems: how each was derived
- **No. 01 AI Context Engineering**: the context window as a fixed budget, read left to right. An ink
  keyline from 48 to 672 is filled in reading order: system prompt, tool schemas, retrieved passages,
  history, and then the question in red against the end. The candidates that didn't fit sit above
  it, in tone.
- **No. 02 Mathematical Foundations for ML**: three forms on the floor. The identity matrix stands
  for linear algebra, a convex bowl holding its minimum (the one red mark) for calculus and
  optimisation, and the histogram of a normal curve for probability.
- **No. 03 Neural Networks from Scratch**: one neuron. Inputs have the thickness of their weights
  (ink positive, paper negative). They pass through a sigmoid drawn inside the unit and leave as
  one red output.
- **No. 04 Build LLMs from Scratch**: a causal attention mask. Dot area is attention weight, with
  the radius capped at 17 px so no two dots touch. The first column is the attention sink, and the
  red last row chooses the next token.
- **No. 05 5D Parallelism**: five axes with two ranks each give 32 GPUs at the corners of a 5-cube.
  The cube is projected along five directions 36° apart and all 80 links are drawn. The red axis is
  drawn at 0.8× length so the two corners that would coincide at the centre separate. All 32 nodes
  are visible and inside the field.
- **No. 06 Pi vs Hermes vs Codex**: three agents are shown as three glyphs (circle, triangle, square).
  A long context falls in as stripes and is compacted three different ways into the solid glyph each
  keeps. The glyphs stand on the floor.
- **No. 46–49 Charlie and the Intelligence Factory**: all four share a north-light roof whose four
  panes sit inside the safe area; the lit red pane is the volume. The conveyor is the floor.
  - I Language / Inference Engineering: prompt tokens drop into a hopper, pass a stack of identical
    layers, and come out one token at a time onto the belt, newest in red.
  - II Vision / Vision Transformers: an image cut into patches that leave the grid in reading order.
    One patch is in the air. Four sit on the belt, each carrying its own piece of the picture,
    behind a red class token.
  - III Sound / Voice Agents: turn-taking on two lanes. You speak (paper), then comes a bracketed
    pause (end-of-turn detection and latency). The agent answers in red until you barge in, and it
    stops.
  - IV Reasoning / RL, bandits to reasoning models: a search tree of reasoning paths. Leaf size is
    reward, and the red path is the one that is kept.
- **No. 14 Build Decision Trees from Scratch**: the tree hung as a mobile. Every bar is a split and
  every weight is a leaf. Class is coded twice (ink discs vs red squares), and red is that one set.
- **No. 13 RAG in Production**: the corpus as a shelf standing on the floor. Retrieval lifts out the
  three red passages.
- **No. 34 Transformers: Theory, Intuition, and Building from Scratch**: an arc diagram of
  multi-head attention over tokens set into the floor. One head links each token to the previous
  one, one reaches back to the start, and one (red) links matching words.
- **No. 37 Build a DeiT from Scratch**: distillation. The teacher convnet is drawn as its pyramid of
  shrinking feature maps. Its output drops straight into the red distillation token, which comes
  last in the student's sequence after the class token (ink) and the patches.
- **No. 21 SQL Masterclass**: an inner join as matching, not overlap. A (paper) and B (ink) face each
  other key to key. Rows with matching red keys come together below as one wider table, joined on a
  red key seam. Unmatched rows stay behind.
- **No. 51 Kernel Engineering** (forthcoming): work tiled from grid to block to warp. Forthcoming
  books are printed as a centred proof, with keylines only and one inked tile.

## Emblem registry (all 52, provisional)
Each diagram type is used at most three times. The drawn covers are in bold.

| Type | Books |
|---|---|
| Packing | **01** AI Context Engineering |
| Forms on the floor | **02** Maths Foundations · 16 Foundations for AI & ML |
| Convergence | **03** Neural Networks · 11 Prompt Engineering (a lens focusing scattered rays) |
| Matrix | **04** Build LLMs (causal mask) · 27 LLM Finetuning (a large matrix plus two thin LoRA strips) |
| Projection | **05** 5D Parallelism |
| Compression / strata | **06** Pi vs Hermes vs Codex · 29 Memory in AI Systems |
| Flow / routing | 07 DeepSeek Harness · 28 LLM Production & Deployment · 39 Build Kimi K3 (MoE router to experts) |
| Timeline / lanes | **48** Sound Room · 08 How to Host Kimi K3 (request lanes, continuous batching) |
| Points and boundary | 09 ML Fundamentals · 31 ML & DL Mastery |
| Noise to order | 17 Generative AI Fundamentals · 38 Diffusion LM |
| Curve | 10 Pretraining Mini Kimi K3 (loss as a descending stair) · 20 R Masterclass · 43 SciML |
| Table | **21** SQL Masterclass · 12 Python for Data Science |
| Shelf / selection | **13** RAG in Production |
| Tree | **14** Decision Trees · **49** Reasoning Room · 26 DSA in Python (a heap) |
| Stack of layers | 15 Deep Learning Fundamentals · 19 Modern Software Developer · 23 Claude Certified Architect |
| Rails | 18 Git & GitHub (branch and merge) |
| Orbit / loop | 22 AI Agents Bootcamp · 30 Mini ClawdBot · 50 Harness Engineering (a model held in a ring of tools) |
| Pyramid | **37** DeiT · 24 CNN Fundamentals |
| Patch grid | **47** Vision Room · 35 ViT from Scratch · 25 Computer Vision Bootcamp |
| Arcs | **34** Transformers · 32 NLP & CV Mastery |
| Bars / levers | 33 Reinforcement Learning (bandit arms) |
| Page | 36 Writing Journal & Conference Papers |
| Linkage | 40 Modern Robot Learning · 45 VLA & World Models |
| Merge | 41 NanoVLM · 44 Transformers for Vision & Multimodal |
| Pair | 42 RLHF (two answers, one preferred) |
| Machine | **46** Language Room · 52 Inference Engineering |
| Tiling | **51** Kernel Engineering |

## Beyond the covers (on the page)
- **The shelf**: all 52 titles as spines, sorted by level. Forthcoming titles have hatched feet.
- **Print wrap** for No. 03: the back repeats the three bands. It carries a blurb, a "The cover
  shows…" note, and the beginner shelf listed by number.

## Review response (art-director review, 7.5/10)

### Must-fix: all nine accepted
I checked each claim against the renders and code, and every one I checked held.
1. **Kernel crowding the band**: fixed by the new size rule. The title drops to 64 and the block now
   ends at y 293, 43 px above the band. The fit routine enforces this for every book.
2. **Charlie IV pane at the trim**: fixed. The roof is offset by −60, so the panes sit at x 98, 278,
   458 and 638 on all four books, with a partial fifth bay. The roof peaks also moved down from 14 to
   26 to clear the band.
3. **5D: 30 visible nodes, apex off the page**: fixed. The red axis is at 0.8×, so all 32 nodes are
   distinct. I did not use the suggested Rr 72 / cy 258, because its own figures (node bottoms at
   y 479) break the reviewer's 48 px rule from improvement 1. I used Rr 67 / cy 250 instead, which
   puts the whole cube, dots included, in field y 36–464.
4. **Red lost in greyscale on intermediate**: took option (a). The field is now jade `#63B384`
   (L\* 67); the old field becomes the shade. On RAG, books next to a red book can no longer be
   shade. The greyscale sheet now shows every red mark darker than its field.
5. **Pi strip at the trim**: deleted. The glyphs now stand on the shared floor.
6. **LLM sink column collisions**: fixed. The radius is capped at 17 at a 40 px pitch, and the first
   row starts at field y 48. I kept row 0 even though its weight is trivially 1: it is part of the
   true mask, and with the cap it no longer dominates.
7. **Vision room**: rebuilt. Patches leave the grid in reading order and leave holes behind them.
   Belt tokens carry their own crop of the image (nested SVG viewBoxes). Tokens sit on the belt on
   all four Charlie covers. I chose consumption in reading order over holes only for the patches in
   transit: if the whole image stayed intact, the tokens on the belt would be duplicates.
8. **SQL as a Venn diagram**: redrawn as key matching (see above). The stray sliver is gone.
9. **720×889 JPGs**: fixed in the render tool. I confirmed all 16 JPGs are 720×888.

### Improvements
1. **Field rule and shared floor**: accepted and enforced with a checker (see Grid).
2. **Three title sizes (92/76/64) by rule**: accepted, including the break "Mathematical /
   Foundations / for Machine Learning" and the Charlie hero (room name at 76, "Charlie and the" at 30).
   The volume numeral shrinks from 112 to 72 so it clears the hero line.
3. **Rethink AI Context Engineering away from Albers**: accepted. The nesting was too close to
   Homage to the Square, and "containment" was the wrong claim. It is now the budget bar. I left out
   the suggested passage being lifted in, because RAG already uses the lifted-out motif. The overflow
   wall carries "what didn't fit".
4. **Sound room turn-taking**: accepted, with the two-lane version. I declined the spectrogram
   alternative, which would make the room a copy of Vol. I's machine. The belt is left empty, not
   loaded with unrelated frames.
5. **Redraw the device**: accepted. The kingfisher now dives through the capsule and its bill
   inverts to ink where it breaks out. That is no longer a bird sitting in a cartouche, and it reads
   as a kingfisher at 44 px.
6. **Emblem registry and red rule**: accepted.
   - The registry is above.
   - DeiT moved off the patch grid onto a feature-map pyramid.
   - Maths is down to one red.
   - Decision trees keeps red as one set (the class), which the rule allows.
   - One qualification: on the Charlie covers the lit roof pane is a series marker, not emblem
     content, so those covers carry the pane plus one red idea.

## What I'd do next
- Draw the other 36 covers from the registry.
- Proof the five inks as spot colours and check jade and chrome on uncoated stock.
- Make a web thumbnail variant that drops the imprint line at 180 px and enlarges the level capsules.
