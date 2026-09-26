# 19 — stdout

**Every Vizuara cover is what the book's own code prints.**

## The idea

Each cover is a printout. The top 566 px is a full-bleed field of real machine output: an attention
matrix, a hex dump, a histogram of samples, a device mesh, a packed context window. At arm's length it
resolves into the book's one emblem, and up close every glyph is the actual number, token or line that
makes it. That is the Knowlton/Harmon mosaic and 1960s line-printer art, except the picture is made of the
subject and not of arbitrary symbols. Below the printout the title is *typed at a prompt*: the prompt glyph
encodes the level, and the blue block cursor at the end of every title is the Vizuara mark. The brand
never shouts. It is the cursor waiting after the last word.

Where a subject has canonical data, the emblem **is** that data:

- the attention matrix is GPT-2 small's own attention, run in NumPy from the released weights;
- the seven is MNIST's first test image, and its softmax is what the back-cover program actually returned;
- the tree partition holds Fisher's 150 iris flowers under the CART tree fitted to them.

The rest are computed from their definitions: the H100 roofline from its published peaks, a GEMM's real
products, the 80 links of a 5-cube, a sorted Gaussian sample. Generation scripts are in `data/`.

## System

- **Grid:** 120 columns × 80 rows. A cell is 6 × 11.1 px (1/16 in × 0.116 in at 7.5 × 9.25 in trim).
  - rows 0–50: the printout field, which bleeds top/left/right
  - row 52: a one-line caption, the expression that produced the picture
  - row 56+: the title, with the prompt hanging at col 6 and the text at col 15
  - row 76: imprint `VIZUARA BOOKS▮` on the left; `LEVEL · N CAPSULES · H` on the right
  - In-field labels sit at col 6 or further in, like the caption, prompt and imprint.
- **Cursor (the mark):** one fixed block, 25 × 37 px, 9 px after the last main-title line, on its baseline.
  Subtitles follow below as plain output with no cursor. For coming-soon books it is the same block,
  hollow, with a 4 px stroke.
- **Tone:** made the way a line printer made it, through how much ink a glyph lays down. Ten steps mix
  carbon into paper (16–100%) while the variable weight climbs 300→800; the top step is reverse video.
  There is no transparency and there are no raster images. Reverse-video fills are drawn as snapped
  rectangles merged per vertical run, so there are no seams.
- **Emblem rules:** one silhouette per emblem, legible at 48 px, and no more than about 40% of the field left
  as even texture. A registry keeps neighbouring subjects apart:
  - triangle (attention), glyph (MNIST 7), bell (samples), lattice (5-cube)
  - window (context), funnel (compaction), partition (tree), cross (GEMM)
  - ramp (roofline), grid (ViT patches), waveform (voice), bracket (RL rollouts)

  Selection blue marks exactly one idea per cover.
- **Sub-series:** *Charlie and the Intelligence Factory* is one tmux session. A carbon status bar at the
  head of the printout lists the four rooms as windows. The current room is selected in blue and
  starred, as tmux marks the active window.

## Palette

| name | hex | role |
|---|---|---|
| Fanfold | `#F1EEE6` | paper |
| Carbon | `#17171C` | ink; every tone in the field is carbon on paper |
| Selection | `#2B3BD9` | the colour of selected text: the one datum that matters, the prompt, the cursor |

Greyscale: Selection falls to about L\* 35, apart from Carbon (L\* 8) and paper (L\* 94). On the carbon
spine the blue is used as a 50% tint (`#8E98FF`).

## Type

**Martian Mono** (Google Fonts, variable `wdth` 75–112.5, `wght` 100–800) and nothing else.

- Field: 10 px (7.5 pt), wdth 75, weight 300–800 as a tone control.
- Titles: 50/60 px, weight 800, set on 5×/6× cells with tightened word space.
- Subtitles: 30 px (24 px for long taglines).
- Imprint: wdth 112.5, weight 800, tracked.

## Level

The prompt before the title encodes the level, which is also spelled out in the footer:

- `>` **beginner**: a REPL prompt
- `$` **intermediate**: a user shell
- `#` **advanced**: root
- hollow cursor: **coming soon**

## Emblems

- **build-llms-from-scratch**: GPT-2 small, layer 1, head 2, over a 51-token sentence (real BPE tokens). Each weight is printed as one digit, with rows scaled to max 9. The diagonal is selected. Data from `data/attention.py`.
- **neural-networks-from-scratch**: MNIST `x_test[0]` (rows 3–27) in hex, printed double-spaced so the pixels stay square. Beside it is the softmax that `data/mnist_from_scratch.py` (the back-cover listing, verbatim) returned after ten epochs: `p[7] = 0.998`, test accuracy 0.976.
- **mathematical-foundations-for-ml**: 420 N(0, 1) samples, each printed inside its own 0.25-wide bin on [-2.5, 2.5]. The asterisks trace 420 · 0.25 · pdf(x).
- **5d-parallelism**: the 2×2×2×2×2 device mesh as a 5-cube (Petrie projection): 32 ranks and 80 links, each link spelled with its axis. Rank 00's five process groups are selected.
- **ai-context-engineering**: a 128k window packed with system prompt, tool schemas, docs, memory and history. The user's question is selected, 594 tokens are left free, and one document is left outside.
- **pi-vs-hermes-vs-codex**: the real mechanism, drawn identically three times. Transcript turns fill up to a `context limit` line; the older turns are rewritten as a plain-language summary that narrows into MEMORY.
- **decision-trees-from-scratch**: the 150 iris flowers at their real petal length × width, printed as class ids (0/1/2). They sit over the depth-3 CART partition fitted to them (2.45 / 1.75 / 4.95 / 4.85), with leaf counts `[50,0,0] [0,47,1] [0,2,4] [0,1,2] [0,0,43]`. The root split is selected.
- **kernel-engineering** *(coming soon)*: one step of a tiled fp16 GEMM, with K = 2 tiles on both A and B. Finished C tiles hold the real A @ B (exact fp16 inputs), the active tile holds the k = 0 partial sum, and unwritten tiles are `0000`.
- **charlie-language-room**: the H100 roofline, `min(989 TFLOP/s, 3.35 TB/s × intensity)`. Each row under the roof names its throughput. Decode at batch b sits at about b FLOP/byte; the ridge at 295 is selected.
- **charlie-vision-room**: a 36 × 32 eye image as luminance bytes (00 black, ff white), cut into 12 × 8 patches. Below it is the sequence a ViT reads, `[CLS] p0 … p95`, with the selected patch's token in blue.
- **charlie-sound-room**: a user turn and an agent turn at 40 ms per column. Each column is built from the letter being spoken, and every word boundary gets at least one silent column. USER 0.00–2.36 s, 240 ms gap, AGENT 2.60–4.64 s.
- **charlie-reasoning-room**: a group of eight sampled chains for 17 × 24. The chains that reach 408 score +1, and the chain being reinforced is selected.

## Print wrap

`index.html` includes a full wrap (`.wrap`) for *Neural Networks from Scratch*:

- **Back:** the complete NumPy program that produced the front's numbers, then its real stdout (the last epoch line and the probability vector), an "On the cover" colophon, a barcode placeholder and the imprint.
- **Spine:** 0.5 in, carbon. It carries the title top-to-bottom with the prompt and cursor, and VIZUARA at the foot.

## Print notes

- Two spot inks plus paper reproduce it exactly (Carbon ≈ rich black, Selection ≈ Pantone 2728-ish).
- Everything is vector, and the PDFs are exact trim (pdfpeek: all match).
- The smallest glyphs are 7.5 pt at weight ≥ 300, with no hairlines under 0.7 px.
- No information-bearing text is lighter than 50%. The compaction transcripts were raised from 40% to 56%.

## What I'd do next

- Pull the remaining illustrative emblems from each book's own notebook as well:
  - the eye from a public-domain photo's luminance;
  - the waveform from a real TTS render and ASR alignment;
  - the 5D mesh ranks from an actual `init_device_mesh` printout;
  - and so on.
- Build the other ~38 emblems against the silhouette registry: SQL result tables, git DAGs as `git log --graph`, RAG retrieval scores, CNN feature maps as hex, RLHF preference pairs, diffusion denoising as a row of hex dumps.
- Carbon spines across the shelf with the blue cursors lined up at one height.

## Review response

I checked every must-fix claim against the renders and code. All six were correct, and all six are fixed.

1. **kernel-engineering, K mismatch.** Correct: A had 2 tile-columns, B had 3 tile-rows, and element-wise the shapes also disagreed (3 values wide against 4 rows tall). Tiles are now 3 × 3 values, K = 2 tiles on both sides, and M is 9 tiles. I went further than the fix: C now prints the real products of the printed fp16 A and B, the active tile holds the k = 0 partial sum, and unwritten tiles read `0000`.
2. **5d-parallelism caption.** Correct: `mesh_dim_names` is keyword-only. The caption now reads `init_device_mesh("cuda", (2, 2, 2, 2, 2), mesh_dim_names=(...))`.
3. **charlie-sound-room numbers.** Correct. The waveform is now laid out at an explicit 40 ms per column: USER 0.00–2.36 s (59 cols), a 6-column (240 ms) gap, AGENT 2.60–4.64 s. Every space gets at least one silent column, so the centre line reads "moove my", not "moveemy". The USER chip moved to col 6, and the gap label sits on the silent line.
4. **pi-vs-hermes-vs-codex mechanism.** Correct on both counts. I removed the vowel-stripping and the three different profiles. All three columns are now the same: full transcript turns up to a `- - context limit - -` line, then a faithful plain-language summary of those turns narrowing into MEMORY. The width is fitted per column so every summary lands on its block and no word is truncated. Caption: `ctx = [summarize(old_turns)] + recent_turns if tokens(ctx) > limit else ctx`.
5. **Safe margin.** Correct. The reward line and the USER chip are at col 6. The tree uses X = 16/45/74/103 with ±6 leaves, and the outer chips now fall inside 24 px. I also moved the kernel's A label, the roofline's TFLOP/s label and its axis/point labels to col 6–114. A scripted check with real fonts confirms that every title, cursor, caption and footer box sits inside 24 px.
6. **math caption and clipped label.** Correct. The caption is now `hist(x, bins=20, range=(-2.5, 2.5))`. Only -2.0 … +2.0 are labelled, and both end ticks bleed unlabelled.

Improvements:

- **Taken — fixed cursor.** 25 × 37 on the baseline of the last main-title line. Subtitles carry no cursor. The hollow version is the same size with a 4 px stroke and is now visible at 180 px.
- **Taken — title breaks.** "Build Decision Trees / from Scratch", "5D Parallelism for / Large Model Training", "Charlie and / the … Room" ×4, and "Mathematical / Foundations / for Machine Learning". All were verified inside the margin with the cursor.
- **Taken — decision tree rethink.** It uses the real 150 iris samples, printed as their class ids, and the real CART thresholds and leaf counts, computed from scratch (`data/iris_tree.py`). The region tones are pushed to .16 / .40 / reverse. Splits are paper gaps, and the root split is selected.
  - **Declined (partly):** the tone-merging of the two virginica leaves. The 4.85 split really exists in the depth-3 tree (it isolates one versicolor), so I kept it and let the leaf counts `[0,1,2]` and `[0,0,43]` explain it rather than hiding it.
- **Taken — vision.** Bytes now encode luminance (00 black, ff white), with ink ∝ 255 − byte. The pupil is a solid disc inside a separate limbal ring. Gutters are two whole columns and one whole row, with no intra-patch confusion. The grid is 12 × 8, and the `[CLS] p0 … p95` token strip has the selected token in blue. I also simplified the eye (no brow, heavier lash line, mid-grey skin) so the white almond reads at 48 px.
- **Taken — scaling rule.** The 48-px silhouette test, ≤ 40% even texture and the silhouette registry are now written into the system (page and NOTES).
  - **Declined:** re-cutting ai-context-engineering and 5d-parallelism. On the 48-px sheet they read as a black-framed window and a rosette lattice respectively, so they pass the rule. Kernel is the weakest at 48 px and is first in line for a heavier cross.
- **Taken — NN softmax chip and pi tone.** The selected class is now a 3-cell ` 7 ` chip. The compaction transcripts are at tone .56 (was .26).

Beyond the review, as the coordinator asked, the flagged "illustrative" emblems are now real computed output:

- **Attention:** GPT-2 small, run in NumPy from the released safetensors.
- **The seven:** MNIST test[0], with the softmax from actually running the back-cover program. The back now prints that run's real stdout.
- **Iris:** Fisher's data.
- **Roofline:** already computed from H100 peak specs, and now documented as such.
- **The eye:** still procedural, but its bytes are now the true luminance of the image that is shown.
