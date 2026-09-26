# 19 — stdout

**Every Vizuara cover is what the book's own code prints.**

## The idea

Each cover is a printout. The top 566 px is a full-bleed field of real machine output (an attention
matrix, a hex dump, a histogram of samples, a device mesh, a packed context window) arranged so that
at arm's length it resolves into the book's one emblem, and up close every glyph is the actual number,
token or line that makes it. That is the Knowlton/Harmon mosaic and 1960s line-printer art, except the
picture is made of the subject and not of arbitrary symbols. Below the printout the title is *typed at a
prompt*: the prompt glyph encodes the level, and the blue block cursor at the end of every title is the
Vizuara mark. The brand never shouts. It is the cursor waiting after the last word.

## System

- **Grid:** 120 columns × 80 rows. A cell is 6 × 11.1 px (1/16 in × 0.116 in at 7.5 × 9.25 in trim).
  - rows 0–50: printout field, bleeds top/left/right
  - row 52: one-line caption, the expression that produced the picture (`attn = softmax(...)`)
  - row 56+: title, hanging prompt at col 6, text at col 15
  - row 76: imprint `VIZUARA BOOKS▮` left; `LEVEL · N CAPSULES · H` right
- **Tone:** made the way a line printer made it, through how much ink a glyph lays down. Ten steps: carbon
  mixed into paper at 16–100% while variable weight climbs 300→800; the top step is reverse video
  (solid ink cell, paper-coloured glyph). No transparency and no raster images. Reverse-video fills are
  drawn as snapped rectangles merged per vertical run, so there are no hairline seams in the PNG or PDF.
- **Sub-series:** *Charlie and the Intelligence Factory* is one tmux session. A carbon status bar at the
  head of the printout lists the four rooms as windows (`1:language 2:vision 3:sound 4:reasoning`); the
  current room is selected in blue and starred, as tmux marks the active window. The blue tab steps
  left→right, I→IV, across the shelf.
- **Coming soon:** the cursor goes hollow (an unfocused terminal), and the footer reads COMING SOON.

## Palette

| name | hex | role |
|---|---|---|
| Fanfold | `#F1EEE6` | paper |
| Carbon | `#17171C` | ink; every tone in the field is carbon on paper |
| Selection | `#2B3BD9` | the colour of selected text: the one datum that matters in each emblem, the prompt, the cursor |

Greyscale: Selection falls to roughly L\* 35 and stays apart from Carbon (L\* 8) and paper (L\* 94).
On the carbon spine the blue is used as a 50% tint (`#8E98FF`) for contrast.

## Type

**Martian Mono** (Google Fonts, variable `wdth` 75–112.5, `wght` 100–800) and nothing else.
Field: 10 px (7.5 pt), wdth 75, weight 300–800 as a tone control. Minimum weight 300 keeps strokes around
0.7 px at trim. Titles: 50 px or 60 px, weight 800, wdth 75, tightened word space. Subtitles: 30 px
(24 px for long taglines). Imprint: wdth 112.5, weight 800, tracked +0.14em.

## Level

The prompt before the title (also spelled out in the footer):

- `>` **beginner**: a REPL prompt
- `$` **intermediate**: a user shell
- `#` **advanced**: root
- hollow cursor: **coming soon**

## Emblems (one line each)

- **build-llms-from-scratch**: causal self-attention over a 51-token sentence, each weight printed as one digit (row max = 9); the masked future is the empty half, the selected diagonal is each token attending to itself.
- **neural-networks-from-scratch**: a 40 × 51 hex dump of a handwritten seven (one byte of ink per pixel) beside the ten-way softmax a small network returns for it.
- **mathematical-foundations-for-ml**: 420 draws from N(0, 1), every sample printed inside its own bin; blue asterisks trace n·Δ·pdf(x), the line-printer plot of the density.
- **5d-parallelism**: the 2×2×2×2×2 device mesh drawn as what it is, a 5-cube (Petrie projection): 32 ranks, 80 links, each link spelled with its axis (`dp pp tp cp ep`); rank 00's five process groups selected.
- **ai-context-engineering**: a 128k window packed with system prompt, tool schemas, retrieved docs, memory and history. The user's question is selected, 594 tokens are left free, and one document sits outside because it didn't fit.
- **pi-vs-hermes-vs-codex**: three agent transcripts squeezed through compaction (stop-words go, then vowels, then whole words) until each lands in a MEMORY block. No behaviour is attributed to a specific agent.
- **decision-trees-from-scratch**: iris petal length × width split to depth 3; every leaf region is textured with its own decision rule; the root split selected.
- **kernel-engineering** *(coming soon)*: one step of a tiled fp16 GEMM. Row-tile i of A and column-tile j of B stream through, and the selected tiles are this k-step and the accumulator.
- **charlie-language-room** (Inference Engineering): the H100 roofline `min(989 TFLOP/s, 3.35 TB/s × intensity)`; each row under the roof names its own throughput; decode on the slope, prefill on the flat, the ridge selected.
- **charlie-vision-room** (Vision Transformers): an eye as bytes, cut into 13 × 9 patches, the 117 tokens a ViT sees; one patch selected.
- **charlie-sound-room** (Voice Agents): a user turn and an agent turn as waveforms; each column is built from the letter being spoken, so the centre line reads the transcript; 240 ms of turn-taking silence between.
- **charlie-reasoning-room** (RL, bandits → reasoning models): a group of eight sampled chains for 17 × 24; the chains reaching 408 score +1; the chain being reinforced is selected.

## Print wrap

`index.html` includes a full wrap (`.wrap`) for *Neural Networks from Scratch*: the back continues the
front's hex field and prints the complete NumPy program (forward pass, backprop, training loop) over it,
with an "On the cover" colophon, a barcode placeholder, and the imprint. The 0.5 in carbon spine runs the
title top-to-bottom with the prompt and cursor, and VIZUARA at the foot.

## Print notes

Two spot inks plus paper would reproduce it exactly (Carbon ≈ rich black, Selection ≈ a Pantone 2728-ish
ultramarine). Everything is vector (HTML text + rectangles), and the PDFs are exact trim. The smallest glyphs
are 7.5 pt at weight ≥ 300, and there are no hairlines under 0.7 px. Light tones are tinted glyphs, so they
become fine texture in CMYK. That is acceptable because no information-bearing text is set lighter than 50%.

## What I'd do next

- Generate every emblem from the actual notebook of each book (real attention weights from the book's
  own model, the real MNIST test[0], the book's own histogram), so the "it's real" claim is literal
  for every cell, and print the generating code on each back cover as in the wrap.
- Build the other ~38 emblems. Many fall straight out of the same engine: SQL result tables, git DAGs as
  `git log --graph`, RAG retrieval scores, CNN feature maps as hex, RLHF preference pairs, diffusion
  denoising steps as a row of hex dumps.
- Spine system for the whole shelf: carbon spines whose blue cursors line up at the same height.
- A foil or spot-UV pass on the reverse-video cells only, so the emblem is readable by touch.
