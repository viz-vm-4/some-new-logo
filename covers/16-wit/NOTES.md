# 16 — Double Take

## The idea
One idea per book. Every cover is a single visual thought: a pun, a metaphor or a figure–ground trick, built from a handful of flat shapes. You should get it in a second and remember it for a year. It comes from Paul Rand, Saul Bass, Olle Eksell, Alan Fletcher and Shigeo Fukuda, but the rule that matters most is my own: **the idea has to be technically true.** A joke that teaches the wrong thing about the subject gets killed, however funny it is. Everything around the idea is deliberately quiet: one typeface, one title size, one hang line and three grounds. The shelf reads as one family because the system never changes, and each book is easy to find because no picture is used twice.

## Palette (flat inks, no gradients, no transparency)
| name | hex | role |
|---|---|---|
| Newsprint | `#EFE7D6` | beginner ground; the "paper" ink on dark grounds |
| Signal red | `#D5412A` | intermediate ground; accent |
| Lamp black | `#1A1817` | advanced ground; the main line colour |
| Ultramarine | `#2B4DA8` | accent |
| Chrome yellow | `#F0B429` | accent |
| Newsprint tint | `#D6C8AA` | the only tint: imprints, shadows of paper |

One exception: the 5D cover's key needs five axis colours, so two of them are screens of the palette (blue 50% `#8FA3DA`, black 50% on paper `#8E877B`).

## Type
**Albert Sans** (Google Fonts) is the only family in the system. It's a plain grotesk in the Scandinavian-modernist tradition (a nod to Eksell).
- Title: Bold 56px, tracking −2.4%, line-height 1.0. The size is the same on every book. Every title hangs from the same line, 612px from the top, and runs one to three lines, broken by hand so no word is left stranded.
- Subtitle (colon titles, the Charlie rooms, coming-soon taglines): Medium 23px.
- Foot: imprint at bottom-left; capsules · hours + level at bottom-right, 15px.
- Inside the pictures only: the Δ/Π letterforms are drawn by hand as Didone shapes; Noto Sans / Devanagari / Arabic / JP supply the multi-script glyphs in the Babel windows.

## Imprint
An open book seen end-on is a **V**, and the dot it holds is the one idea. It's set as "**Vizuara** Books" and is always smaller than the title.

## Level encoding (twice, so it survives greyscale and photocopiers)
1. **Ground value.** The deeper the book, the darker the ground: beginner = Newsprint, intermediate = Signal red, advanced = Lamp black.
2. **Ski-run glyph** in the foot: ● beginner, ■ intermediate, ◆ advanced (after green circle / blue square / black diamond).
Coming-soon titles swap the capsule count for a stamped "COMING SOON" label.

## Layout
720×888 (7.5 × 9.25in). The picture owns the top 590px and may bleed off any edge; the title block starts at 612; the foot sits 36px from the bottom. All text is ≥ 36px from the trim, and no line is thinner than 2.2px (~1.6pt).

## Emblems: how each was derived (one line per book)
- **AI Context Engineering**: *B or 13?* (Bruner & Minturn's ambiguous figure). The same mark reads as a letter across (A · C) and a number down (12 · 14). The model's reading of your words depends on what you put around them.
- **Mathematical Foundations for ML**: "Foundations", literally. A Greek temple built from Greek letters: a Δ pediment on four Didone Π's (eight columns, like the Parthenon), on three steps labelled calculus, probability & statistics, linear algebra.
- **Neural Networks from Scratch**: web → net. A spider spinning a fully connected 3-4-4-2 network instead of a web. The one connection still being spun is red.
- **Build LLMs from Scratch**: Babel, rebuilt (build + large + language). A tower of identical tiers with a different script in every window, and a crane lowering the last block.
- **5D Parallelism**: a 5-cube is exactly a 2×2×2×2×2 device mesh of 32 GPUs. In this projection every edge along one axis is parallel, so the five kinds of parallelism (data, tensor, pipeline, context, expert) become literally five families of parallel lines.
- **Pi vs Hermes vs Codex: Context Compaction and Memory**: a flower pressed in a book (a *codex*). Compaction flattens it; memory is the faint imprint it leaves on the facing page.
- **Build Decision Trees from Scratch**: computer scientists draw trees upside down, so this one is. The ground is at the top with the roots inside it, binary splits go downward, and the leaf nodes are leaves coloured by predicted class (the tree is deliberately unbalanced, like real ones).
- **Python for Data Science**: the snake that swallowed the elephant, updated for pandas. A python with a table-shaped bulge.
- **RAG in Production**: the component that fetches documents is called the *retriever*. So: a retriever bringing back a document.
- **Reinforcement Learning**: carrot and stick, reward and penalty on one pole.
- **LLM Finetuning**: you don't build the violin; you give one peg of a finished instrument a small turn.
- **Pretraining a Mini Kimi K3**: a mini model train going round the training loop.
- **Kernel Engineering** (coming soon): a GPU kernel is launched over a grid; a cob is a grid of kernels. One red kernel is the one you're writing.
- **Inference Engineering** (coming soon): serving, batched. One tray with many cloches of different sizes, like continuous batching of different-length requests. The waiter's black sleeve disappears into the black ground (figure–ground), so only the glove and cuff show.
- **Charlie and the Intelligence Factory** (sub-series): all four rooms share one conveyor belt at the same height, plus a golden-ticket badge carrying the series number.
  - **I · Language Room** (inference engineering): a machine emits a tokenised sentence ("Char" "lie" "␣and" "␣the"…), and its only dial reads TOK/S.
  - **II · Vision Room** (vision transformers): an eye goes in as a 3×3 grid of patches and leaves as a queue in raster order, which is a ViT's first move.
  - **III · Sound Room** (voice agents): a horn speaks a waveform onto the belt.
  - **IV · Reasoning Room** (RL, bandits → reasoning models): the one-armed bandit where RL starts, paying out in verified answers ✓✓✓.

## Ideas I rejected, and why
The hard part was the thinking. These are the ones that didn't survive.

**AI Context Engineering**
- *Keyhole*: says "peeking", not "choosing what goes in".
- *Iceberg with the prompt as the tip*: true (most tokens aren't the user's) but it's the most tired slide in tech.
- *Tiffin carrier of stacked context layers*: charming, but it only works with labels, and without them it reads as "lunch".
- *Spotlight on a stage*: that's attention, not curation.
- *"Window dressing" pun on the context window*: implies the work is superficial, which misrepresents it.

**Neural Networks from Scratch**
- *Butterfly net catching a handwritten 7 (MNIST)*: good, but it's about what nets *do*, not about building one.
- *Ball of yarn knitting itself into a net*: a weaker spider.
- *Connect-the-dots*: a single numbered path can't draw a fully connected layer, so the premise is false.
- *Match being struck (from scratch)*: the pun is only on the word.

**5D Parallelism**
- *Elephant balancing on parallel bars*: large + model + training (gym) + parallel + the model's *weights*, all at once. It was the funniest idea I had and I killed it. It turns five orthogonal axes into five side-by-side bars, which makes 5D look like five lanes. (Also, elephants belong to Hadoop.)
- *Large model train on five parallel tracks*: same false "lanes" picture. The model-train pun moved to *Pretraining*, where it's true.
- *Nested matryoshka dolls (the mesh is hierarchical)*: collides with "Matryoshka embeddings", a different ML idea.
- *Cartoon "1T" weight, sliced*: a great pun on weights and on 1T parameters, but it shows no dimensions.
- *Tally mark of five, 5D chess*: jokes about the number, not the mechanism.

**Build LLMs from Scratch**
- *Ouroboros of tokens*: autoregression really does feed the output back in, but the symbol is a cliché.
- *Stochastic parrot*: sneers at the thing the book teaches you to build.
- *Falling dominoes*: implies determinism, but generation is sampled.

**Pi vs Hermes vs Codex**
- *Tetris clearing full rows*: deleting rows is truncation, not compaction.
- *Trash compactor*: says "garbage".
- *Three different pressed flowers, one per agent*: would claim to know each agent's strategy, which a cover can't back up (and it drifts toward specimen plates).
- *Hourglass*: sand doesn't compress.

**Elsewhere**
- *Transformers → electrical transformer coils*: instantly reads "transformer" and says nothing true about attention.
- *Decision trees → Mondrian partition*: actually true (axis-aligned splits; "Mondrian forests" are real), but it reads as an art pastiche before it reads as a tree.
- *Maths → toy alphabet blocks with Σ ∫ ∂*: charming, but it's on a thousand children's books.

## What I'd do next
- Finish the catalogue with the same rule. Sketches I believe in:
  - Git & GitHub: a zipper (branches merge)
  - Memory in AI Systems: string tied round a finger
  - RLHF: the RL carrot, now dangled by a human hand
  - Harness Engineering: a horse in harness (the layer that turns raw power into directed work)
  - DeiT: a teacher's red pen (the distillation token learns from a teacher)
  - Diffusion LM: a letter board filled in out of order, all positions at once
  - Prompt Engineering: a speech bubble being drawn with a compass
  - Transformers: a row of eyes glancing at one another
- Print: spot-varnish or a single foil only on the idea shape, so the picture is literally the only shiny thing. Spines follow the wrap: level glyph at the head, title reading down, imprint at the foot.
- Web library: a one-second motion per cover (the spider finishes its thread, the peg turns, the train does one lap) played on hover.
