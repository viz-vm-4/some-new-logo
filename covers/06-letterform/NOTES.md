# 06 — Codepoint
*Direction: Letterform. One book, one character.*

## The idea
Every Vizuara book gets a single character (an operator, a Greek letter or a token) taken from the working heart of its subject. It is set at monumental size and rests on one rule that sits at the same height on every cover. That character is the book's image. The title hangs below the rule like the caption on a type specimen. A one-line mono caption names the character exactly ("U+2202 PARTIAL DIFFERENTIAL"), so the library doubles as a character set. The back cover of the print wrap shows that set: all 52 catalogue titles as a Unicode-style chart, ordered by codepoint, each cell in its level's ink. The character is always set in the face it lives in. Maths uses Libertinus, the face of the equation. Code uses Chivo Mono, the face of the terminal. Defined terms use Libertinus italic. It may be cropped by any edge, including the rule, but it is never distorted, and it is never a picture of "AI".

## Palette: three inks (plus one opened-up tint)
| Role | Hex | Notes |
|---|---|---|
| Paper | `#F1EDE4` | uncoated stock; beginner ground |
| Vizuara Ultramarine | `#2233C8` | spot ink, ≈ PMS 2728; intermediate flood, and characters on paper |
| Ink | `#121212` | rich black; advanced ground, titles on paper |
| Ultramarine, opened | `#3548EE` | the same blue lifted for characters on black, so they still separate in greyscale |

The retired orange/sky/magenta pinwheel is gone entirely.

## Type
- **Libertinus Math / Libertinus Serif** (Google Fonts) set the characters: ∂ ∈ ≈ ≻ ≤ ∿ 𝔼 𝑄𝐾, Greek italics σ λ, and the italic terms on the 5D cover. They also set subtitles, Roman numerals and the imprint's italic *v*. Libertinus Math has complete operator coverage. Note that its ⊤/⊥ glyphs render incorrectly in Chrome, so ⊤ comes from Libertinus Serif.
- **Chivo Mono 400** sets code tokens (Ġ, `>>>`, `[1]`, `[MASK]`, `__global__`) and all captions and metadata at 12 px / 500. Omnibus-Type made both Chivo Mono and Archivo, so the two sans voices are related.
- **Archivo** sets titles at 700 and 58 px on the `wdth` axis, starting at 88. Long titles are condensed along the width axis first, down to 74, and only then reduced in size. Every title keeps the same colour and weight on the shelf. Line breaks are set by hand, with no orphans.
- Emblems are placed by their **measured ink bounds**, not their font boxes. The script measures each character on a canvas, so "rests on the line" is exact to the pixel for every face.

## Grid (720 × 888 px = 7.5 × 9.25 in)
Margins are 36 px. The rule is 2 px, 560 px from the head. The caption sits 15 px below the rule and the title block starts 56 px below it. The footer's bottom edge is 32 px from the trim. Critical text is always at least 32 px from the trim. The character field above the rule is clipped at the rule.

## Level = ink density
- **Beginner**: bare paper, ultramarine character, black title.
- **Intermediate**: ultramarine flood, paper character and title.
- **Advanced**: black, opened-ultramarine character, paper title.

This reads instantly at 180 px, gets darker as the books get deeper, and survives greyscale (light, mid and dark grounds). The level is also spelled out in the caption.
**Forthcoming** titles fill the character with a 3 px line hatch instead of solid ink: drawn, not yet inked. **Sub-series** (Charlie and the Intelligence Factory) add a 150 px Libertinus Roman numeral I–IV beside the title.

## Imprint
Vizuara's own character is an italic *v* knocked out of a 22 px square, set beside "Vizuara Books" in 17 px Archivo. It sits at the bottom right as a signature, always quieter than the title. The same mark closes the spine.

## Emblems, one line per book
- **mathematical-foundations-for-ml**: ∂ U+2202. The partial derivative; calculus is the first foundation any learning algorithm stands on.
- **neural-networks-from-scratch**: σ U+03C3. The sigmoid activation that turns a weighted sum into a neuron's output.
- **python-for-data-science**: `>>>`. The Python interpreter prompt, where every session starts (no snake, no logo).
- **decision-trees-from-scratch**: ≤ U+2264. Every node asks: is the feature ≤ the threshold?
- **r-masterclass**: `[1]`. The index the R console prints before every result.
- **ai-context-engineering**: ∈ U+2208. Context engineering decides membership: what is ∈ the window and what is left out.
- **build-llms-from-scratch**: Ġ U+0120. How GPT-2's byte-level BPE vocabulary marks a token that starts with a space.
- **transformers-from-scratch**: 𝑄𝐾⊤. The query–key product at the heart of attention.
- **charlie-vision-room (II)**: 16 / ×16. "An Image is Worth 16x16 Words": ViT reads an image as 16×16 patches.
- **charlie-sound-room (III)**: ∿ U+223F. The sine wave, sound before it is a voice agent's input.
- **5d-parallelism**: the five axes *data, tensor, pipeline, context, expert* in italic, rotated into five parallel columns and cropped by the page.
- **pi-vs-hermes-vs-codex**: ≈ U+2248. Compaction replaces a history with a summary that is only approximately equal to it.
- **rlhf-from-scratch**: ≻ U+227B. Preference learning: one response succeeds another. Cropped hard by the edge and the rule.
- **diffusion-lm-from-scratch**: `[MASK]`. Masked-diffusion LMs start from mask tokens and denoise them into text.
- **charlie-language-room (I)**: λ U+03BB. The initial of λόγος, "word".
- **charlie-reasoning-room (IV)**: 𝔼 U+1D53C. Expectation: from bandits to reasoning models, RL maximises an expected reward.
- **kernel-engineering** (forthcoming): `__glo / bal__`. The CUDA `__global__` qualifier that declares a GPU kernel, broken over two lines and hatched.

The back cover's chart also assigns characters to the other 35 catalogue titles. For example: ŷ for ML Fundamentals, ∇ for Deep Learning Fundamentals, ⋈ for SQL, ∗ for CNNs, 𝑂(𝑛) for DSA, Δ𝑊 for fine-tuning, ⟨𝑞,𝑑⟩ for RAG, ¶ for Writing Papers, `[CLS]` for ViT, `<image>` for NanoVLM, 𝐾𝑉 for Inference Engineering. The system scales to the full list.

## Print
The design separates into two inks, black and a spot ultramarine, on uncoated stock. No stroke is under 1 px at trim; the hatch lines are 3 px and the rules 2 px. Emblems are live SVG text and the PDFs are vector. The wrap uses a 0.75 in spine carrying the character, the title reading top to bottom, and the *v* mark.

## What I'd do next
- Outline the emblems into a single "Vizuara Codepoint" SVG glyph library, so production never depends on font loading. At the same time, optically correct a few glyphs at poster size: the Libertinus ∈ bar terminals, and the Chivo `[` `]` spacing on `[1]`.
- Tune crops across all 52 books as a whole, so neighbouring titles on the web shelf don't repeat a composition (two big waves ≈/∿ side by side, for example).
- Test the ultramarine as a real spot swatch on uncoated stock, and pick the exact PMS after a drawdown.
- Build the spine system for the full shelf, so the characters line up at one height across 52 spines.
- Consider a foil or deboss of the character for a premium edition. The system already treats it as a single object.
