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
- Title: Bold 56px, tracking −2.4%, line-height 1.0. The size is the same on every book. Every title hangs from the same line, 612px from the top, and runs one to three lines, broken by hand.
- **Line-break rule:** break *before* prepositions and articles ("for …", "the …", "a …"), never after them. Never split a term of art ("Large Language Models", "Decision Trees"). A single word may stand alone only on the first line (the imperative "Build").
- **Long-text rule:** the title block must end 22px above the foot. If a title plus subtitle would run past that, both step down to 50/20px. If that still isn't enough, the hang line rises by exactly the overflow and the picture zone gives up that space. The page does this in JavaScript after fonts load, and I tested it with a 3-line title plus a 2-line subtitle. None of the 18 covers here needs it.
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
- **Build LLMs from Scratch**: Babel, rebuilt (build + large + language). Seven *identical* blocks, stacked with visible joints, because a decoder is a stack of identical layers. Every window holds a different script. The crane lowers an eighth identical block whose windows are still blank.
- **5D Parallelism**: a 5-cube is exactly a 2×2×2×2×2 device mesh of 32 GPUs, and all 32 are visible: the data axis is drawn 1.25× longer, because the symmetric projection puts two vertices on the same point. In this projection every edge along one axis is parallel, so the five kinds of parallelism (data, tensor, pipeline, context, expert) become literally five families of parallel lines. The key draws each swatch at its axis's angle, so it survives greyscale.
- **Pi vs Hermes vs Codex: Context Compaction and Memory**: a flower pressed in a book (a *codex*). The stem was too tall for the page, so it's folded back in one crease under the top edge, and the petals are flattened into each other: compaction into a fixed page. Memory is the faint imprint it leaves on the facing page.
- **Build Decision Trees from Scratch**: computer scientists draw trees upside down, so this one is. The ground is at the top with the roots inside it, binary splits go downward, and the leaf nodes are leaves coloured by predicted class. The blue class also carries a paper midrib, so the classes stay distinct in greyscale. The tree is deliberately unbalanced, like real ones.
- **Python for Data Science**: the snake that swallowed the elephant, updated for pandas. The skin itself swells around a table, the table's corners push small bumps into the outline, and the grid shows through with no frame.
- **RAG in Production**: the component that fetches documents is called the *retriever*. So: a retriever bringing back a document.
- **Reinforcement Learning**: where the word comes from. In Skinner's box a pigeon pecks a lit key and a grain drops into the hopper: agent, action, reward. The pigeon's lean carries the diagonal.
- **LLM Finetuning**: you don't build the violin; you give one peg of a finished instrument a small turn.
- **Pretraining a Mini Kimi K3**: a mini model train going round the training loop.
- **Kernel Engineering** (coming soon): one press, every cell at once. An open waffle iron: the lid is the mould (the kernel, written once), and the waffle is the same pattern pressed into every cell of the grid simultaneously. Tiling is the craft. The red cell is the one block you're profiling.
- **Inference Engineering** (coming soon): serving, batched. One tray with many cloches of different sizes, like continuous batching of different-length requests. The waiter's black sleeve disappears into the black ground (figure–ground), so only a short glove, the cuff and a thumb over the tray's edge show.
- **Charlie and the Intelligence Factory** (sub-series): all four rooms share one conveyor belt at the same height, plus a golden-ticket badge carrying the series number.
  - **I · Language Room** (inference engineering): a machine emits a tokenised sentence ("Char" "lie" "⎵and" "⎵the"; the space marker is drawn in SVG). The next token is still half inside the slot, and the only dial reads TOK/S.
  - **II · Vision Room** (vision transformers): an eye goes in as a 3×3 grid of patches and leaves as a queue in raster order, which is a ViT's first move.
  - **III · Sound Room** (voice agents): a horn speaks a waveform down the line. The bars are mirrored about a centre line, so they read as sound rather than a bar chart.
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

**Reinforcement Learning**
- *Carrot and stick* (shipped in round one, retired in round two): the idiom means a reward dangled forever out of reach, which is the opposite of how reinforcement learning works. No stick was drawn either, and it's a business-slide cliché.

**Kernel Engineering**
- *Corn cob* (shipped in round one, retired in round two): the pun names the wrong thing. In CUDA you write *one* kernel and launch it over a grid, so a cob of many "kernels", one of them yours, gets the model backwards.

**Elsewhere**
- *Transformers → electrical transformer coils*: instantly reads "transformer" and says nothing true about attention.
- *Decision trees → Mondrian partition*: actually true (axis-aligned splits; "Mondrian forests" are real), but it reads as an art pastiche before it reads as a tree.
- *Maths → toy alphabet blocks with Σ ∫ ∂*: charming, but it's on a thousand children's books.

## What I'd do next
- Finish the catalogue with the same rule. Sketches I believe in:
  - Git & GitHub: a zipper (branches merge)
  - Memory in AI Systems: string tied round a finger
  - RLHF: the Skinner box again, but a human hand drops the grain
  - Harness Engineering: a horse in harness (the layer that turns raw power into directed work)
  - DeiT: a teacher's red pen (the distillation token learns from a teacher)
  - Diffusion LM: a letter board filled in out of order, all positions at once
  - Prompt Engineering: a speech bubble being drawn with a compass
  - Transformers: a row of eyes glancing at one another
- Print: spot-varnish or a single foil only on the idea shape, so the picture is literally the only shiny thing. Spines follow the wrap: level glyph at the head, title reading down, imprint at the foot.
- Web library: a one-second motion per cover (the spider finishes its thread, the peg turns, the train does one lap) played on hover.

## Review response (round 2)
I checked each claim against the code and renders before acting. All eight must-fix items were right, and I fixed all of them.

**Must fix**
1. *5D shows 31 GPUs*: **true.** I computed it: vertices 01010 and 10101 coincide at the centre. Fixed by drawing the data axis 1.25× longer; 32 distinct positions are now drawn, and every edge family is still parallel.
2. *5D key fails greyscale*: **true** (L* 77/67 and 50/57). Each key swatch is now drawn at its axis's real angle, so direction carries the mapping and colour is only a second signal.
3. *Babel tapers but claims "identical layers"; Arabic descenders*: **true.** I rebuilt it as seven identical blocks with an identical eighth on the hook, rather than dropping the claim, because the claim is what makes the pun true. The ziggurat's Babel silhouette was stronger at thumbnail; I'm accepting that loss. ع/ب are swapped for ط/ه.
4. *Kernel gets CUDA backwards*: **true.** I replaced the emblem; see improvement 3.
5. *Train derailed*: **true.** The train is now engine plus two cars, placed by arc length along the near rail. Each car is rotated to the local tangent, so every wheel sits on the rail round the curve, and the cowcatcher is part of the engine.
6. *Language Room tokens fuse; ␣ falls back to DejaVu*: **true** (x 418–424 overlap; DejaVu was in the PDF). The tokens now end 14px before the slot, the next token is drawn *behind* the machine so it emerges from the slot, and the space marker is a 3px SVG ⎵. I checked the PDF: no DejaVu.
7. *Decision-tree classes fail greyscale*: **true.** The blue class now carries a 3.4px paper midrib: hue first, shape second, the same double encoding the level system uses.
8. *Seams at Babel tiers, temple steps, Π lintels*: **true.** Each Π (lintel, beaks, stems, brackets, feet) and the three-step stack are now single paths with consistent winding and 1px overlaps. Sampling the 2× PNG at every former joint gives solid ink (26,24,23). The Babel joints are now deliberate 4px gaps: each block is a separate layer.

**Improvements**
1. *RL → Skinner's pigeon*: **accepted.** The reviewer applied my own rule correctly. The idiom means the reward is never reached, which is not RL. Skinner's pigeon is also where the word "reinforcement" comes from.
2. *Long-text rule and line breaks*: **accepted**, and written up under Type. Where my breaks differ from the review, measured in the page:
   - Mathematical Foundations is set "Mathematical / Foundations / for Machine Learning", because the two-line version measures 650px against a 628px measure.
   - Python for Data Science is now one line (545px).
   - 5D Parallelism is set "5D Parallelism / for Large Model Training".
   - Build LLMs is set "Build / Large Language Models / (LLMs) from Scratch", so the term of art isn't split.
   - Pretraining, the four Charlie titles and Decision Trees are exactly as proposed.
3. *Kernel → waffle iron*: **accepted.** It's a true metaphor with no pun, which by my rule beats a pun that mislabels. One addition of mine: the lid is drawn as the negative of the waffle (pegs where the pockets are), so the kernel really is the mould of every cell.
4. *Pi: make compaction visible*: **accepted.** There's one sharp crease in a stem too tall for the page, and the petals are flattened into each other. I kept the imprint.
5. *Python bulge; Sound Room bars*: **accepted both.** The snake is now one computed outline that swells from 44px to about 128px, with corner bumps, and has no frame line. The waveform is mirrored about a centre line level with the horn's mouth.
6. *Inference hand*: **accepted.** The glove is now about 50px below the palm, then the cuff, then nothing, plus a knuckle notch. I went one step further: I respaced the cloches so the thumb stands in a gap against the black ground rather than against a paper cloche. A thumb over paper needed an outline, and that made it look like a tombstone.

**Declined (in part)**
- *Babel: "or keep the ziggurat and drop the claim"*: declined; truth over silhouette, as above.
- *Babel: 300px blocks with 6 windows*: I used 264px with 5, which keeps it a tower rather than a block of flats.
- *Arabic: "or centre glyphs on their bounding box"*: I swapped letters instead, because centring ink boxes across scripts makes the baselines dance.

**Still open**
- At 180px the new Babel reads as "a tower going up, full of scripts" more than as *Babel*. It's true, but the reference is quieter than before.
- The Sound Room waveform floats above the belt rather than riding it, so the sub-series device bends a little there.
- The pigeon reads as "bird pecks button, gets grain" at a glance; "pigeon" specifically depends on the wing bars and neck.
