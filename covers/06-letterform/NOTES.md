# 06 — Codepoint
*Direction: Letterform. One book, one character.*

## The idea
Every Vizuara book gets a single character (an operator, a Greek letter or a token) taken from the working heart of its subject. It is set at monumental size and rests on one rule that sits at the same height on every cover. That character is the book's image. The title hangs below the rule like the caption on a type specimen. A one-line mono caption names the character exactly ("U+2202 PARTIAL DIFFERENTIAL"), so the library doubles as a character set. The back cover of the print wrap shows that set: all 52 catalogue titles as a Unicode-style chart, ordered by codepoint, each cell in its level's ink. The character is always set in the face it lives in. Maths uses Libertinus, the face of the equation. Code uses Chivo Mono, the face of the terminal. It may be cropped by any edge, including the rule, but it is never distorted, and it is never a picture of "AI". Exactly one book, 5D Parallelism, is allowed a run of defined terms in place of a single character.

## Palette: four inks, never more than two on one cover
| Role | Hex | Notes |
|---|---|---|
| Paper | `#F1EDE4` | uncoated stock; beginner ground |
| Vizuara Ultramarine | `#2233C8` | spot 1: intermediate flood, and characters on paper |
| Ink | `#121212` | rich black: advanced ground, titles on paper |
| Ultramarine Light | `#3548EE` | spot 2: characters on black only. It can't be printed as a tint of spot 1, so it is specified as its own ink. |

Per cover:
- Beginner prints black + spot 1.
- Intermediate prints spot 1 only (the character and title are unprinted paper).
- Advanced prints black + spot 2.

Match both spots on a drawdown on the actual stock. The retired orange/sky/magenta pinwheel is gone entirely.

## Type
- **Libertinus Math** sets the operators and maths characters: ∂ ∈ ≈ ≻ ≤ ℱ 𝔼 𝑄𝐾.
- **Libertinus Serif** sets:
  - italic σ and λ, and the italic terms on the 5D cover;
  - the roman superscript T in 𝑄𝐾ᵀ;
  - the 16×16 figures, subtitles, Roman numerals and the imprint's italic *v*.
- Only glyphs in Google's served subsets are used. Every cover PDF embeds only Archivo, Chivo Mono and Libertinus Math/Serif. I checked with `strings … | grep FontName`, and there is no fallback font anywhere.
- **Chivo Mono 400** sets code tokens (Ġ, `df`, `[1]`, `[MASK]`, `__global__`), and all captions and metadata at 12 px / 500. Omnibus-Type made both Chivo Mono and Archivo, so the two sans voices are related.
- **Archivo** sets titles at 700 and 58 px on the `wdth` axis, starting at 88. Long titles are condensed along the width axis first, down to 74, and only then reduced in size. Line breaks are set by hand, with no orphans.
- **Placement by real ink.** Each character is rasterised on a canvas and scanned for its true ink box. `measureText` metrics drifted by up to 5 px on the math font, which is why 𝔼 used to float.

## Grid (720 × 888 px = 7.5 × 9.25 in)
- **Margins:** 36 px. Critical text is always at least 32 px from the trim.
- **The line:** a 2 px rule, 560 px from the head. Each character's ink either touches the rule or is cut by it. Nothing hovers; it measures 0–1 px on every render.
- **Edges:** the same rule applies. A character either bleeds past the trim or stays at least 36 px inside it.
- **Below the rule:** the caption sits 15 px below the rule and the title block starts 56 px below it. The footer's bottom edge is 32 px from the trim.
- **Caption grammar:**
  - A single character prints `U+XXXX` and its **official Unicode name**. `check_captions.py` verifies these against Python's `unicodedata`.
  - A multi-character token prints itself literally, plus its role: `[1] CONSOLE OUTPUT INDEX`, `df PANDAS DATAFRAME`, `QKᵀ QUERY–KEY PRODUCT`.
- **Whole pixels:** covers are snapped to whole pixels on the page, so no render carries a hairline of page colour.

## Level = ink density
- **Beginner**: bare paper, ultramarine character, black title.
- **Intermediate**: ultramarine flood, paper character and title.
- **Advanced**: black, Ultramarine Light character, paper title.

This reads instantly at 180 px, gets darker as the books get deeper, and survives greyscale. The level is also spelled out in the caption. Within one level, no two books share a silhouette family, and each level has at most one bracketed token.

**Forthcoming titles** hatch the character in the title ink (paper on dark grounds): 3 px lines on a 5 px pitch, about 10:1 average contrast on black. The character is drawn but not yet in ultramarine.

**Sub-series** (Charlie and the Intelligence Factory) add a 150 px Libertinus Roman numeral I–IV beside the title, with "THE INTELLIGENCE FACTORY" set in the caption mono beneath it.

## Imprint
Vizuara's own character is an italic *v* knocked out of a 22 px square, set beside "Vizuara Books" in 17 px Archivo. It sits at the bottom right as a signature, always quieter than the title. The same mark closes the spine.

## Emblems, one line per book
- **mathematical-foundations-for-ml**: ∂ U+2202. The partial derivative; calculus is the first foundation any learning algorithm stands on.
- **neural-networks-from-scratch**: σ U+03C3. The sigmoid activation that turns a weighted sum into a neuron's output.
- **python-for-data-science**: `df`. The name the pandas DataFrame gets in almost every data-science notebook. Fitted to the height of ∂ and σ, with the f running off the page.
- **decision-trees-from-scratch**: ≤ U+2264. Every node asks: is the feature ≤ the threshold?
- **r-masterclass**: `[1]`. The index the R console prints before every result.
- **ai-context-engineering**: ∈ U+2208. Context engineering decides membership: what is ∈ the window and what is left out.
- **build-llms-from-scratch**: Ġ U+0120. How GPT-2's byte-level BPE vocabulary marks a token that starts with a space.
- **transformers-from-scratch**: 𝑄𝐾ᵀ. The query–key product at the heart of attention. The transpose is a roman superscript T.
- **charlie-vision-room (II)**: 16 / ×16. "An Image is Worth 16x16 Words": ViT reads an image as 16×16 patches.
- **charlie-sound-room (III)**: ℱ U+2131. The Fourier transform: a voice agent hears the waveform as a spectrogram first. It is cropped by the head, the way λ is.
- **5d-parallelism**: the five axes *data, tensor, pipeline, context, expert*, rotated into five parallel columns and cropped by the page. This is the one word-run in the system.
- **pi-vs-hermes-vs-codex**: ≈ U+2248. Compaction replaces a history with a summary that is only approximately equal to it.
- **rlhf-from-scratch**: ≻ U+227B. Preference learning: one response succeeds another. Cropped by the edge and the rule.
- **diffusion-lm-from-scratch**: `[MASK]`. Masked-diffusion LMs start from mask tokens and denoise them into text.
- **charlie-language-room (I)**: λ U+03BB. The request arrival rate that every LLM serving system is batched, queued and sized against.
- **charlie-reasoning-room (IV)**: 𝔼 U+1D53C. Expectation: from bandits to reasoning models, RL maximises an expected reward.
- **kernel-engineering** (forthcoming): `__glo / bal__`. The CUDA `__global__` qualifier that declares a GPU kernel, broken over two lines and hatched.

The back cover's chart assigns characters to the other 35 catalogue titles as well. For example:
- ŷ for ML Fundamentals, ∇ for Deep Learning Fundamentals, ⋈ for SQL, ∗ for CNNs
- 𝑂(𝑛) for DSA, Δ𝑊 for fine-tuning, ⟨𝑞,𝑑⟩ for RAG, ¶ for Writing Papers
- ⇄ for AI Agents, ↦ for Memory, ∫ for SciML, ∏ for Kimi K3, `[CLS]` for ViT, 𝐾𝑉 for Inference Engineering

## Print
Each cover prints in at most two inks on uncoated stock (see Palette). No stroke is under 1 px at trim; the hatch lines are 3 px and the rules 2 px. Emblems are live SVG text and the PDFs are vector. All 17 PDFs pass `tools/pdfpeek.js` (diff 0.6–3.5).

The wrap uses a 0.75 in spine carrying the character, the title reading top to bottom, and the *v* mark.

## Review response
**Must-fix: all four confirmed against my own renders before fixing.**
1. **⊤ fallback.** Confirmed: the PDF embedded DejaVuSans, and my note was wrong. I had checked Libertinus Serif's coverage through the `text=` API, which isn't the unicode-range subset the page actually loads.
   - The transpose is now a roman superscript T from Libertinus Serif, on the cover, in the chart and in the figcaption.
   - The caption had the same trap: a `ᵀ` (U+1D40) fell back to DejaVuSansMono. It is now `QK<sup>T</sup>` in Chivo Mono.
   - No PDF lists a fallback font now.
2. **720×889 renders.** Confirmed. The tool now snaps covers, and I also snap each cover to a whole pixel in JS after layout. Every JPG is 720×888 and every PNG is 1440×1776, with no page-colour rows or columns at any edge (checked by script).
3. **Forthcoming hatch contrast.** Confirmed.
   - The hatch is now in the title ink (paper on black), 3 px on a 5 px pitch, which gives about 10:1 average contrast.
   - `__glo` and `bal__` now sit exactly on the 36 px margins, so the token is complete and away from the guillotine.
   - **Declined: the 2 px outline.** Chivo Mono's variable outlines overlap, and a stroke draws their internal seams through the letters. I saw this in the first round. The paper hatch alone already gives crisp edges.
   - **Kept: the mid-word break.** It is deliberate, and the token still reads as one unit across the two lines.
4. **Unicode names.** Confirmed. Ġ now reads LATIN CAPITAL LETTER G WITH DOT ABOVE and 𝔼 reads MATHEMATICAL DOUBLE-STRUCK CAPITAL E. All single-character captions pass `check_captions.py`.

**Improvements**
1. **Accepted: rule discipline.** Every character now measures 0–1 px from the rule, or is cut by it.
   - ≈ rests on the rule.
   - 𝔼 no longer floats, thanks to the ink scan.
   - 16×16 now sits at the 36 px margin.
   - [1] now fits inside the margins.
   - ≻ bleeds cleanly.
   - The 5D columns start inside the margin.
   - The T sits on the right margin.
2. **Accepted: ∿ → ℱ.** The script F is also the most distinctive silhouette on the shelf.
3. **Accepted: λ re-derived** as the request arrival rate. The glyph stays.
4. **Accepted: `>>>` → `df`**, fitted by height with the f cropped at the trim.
5. **Accepted: the silhouette rule**, with these swaps:
   - memory: ↺ → ↦
   - agents: ↻ → ⇄
   - deepseek-harness: {} → ↻
   - sciml: ∂𝑢 → ∫, rather than 𝑢̇, whose combining dot is fragile in a math font
   - kimi-k3-from-scratch: 𝐾3 → ∏, the autoregressive factorisation
   - nlp-cv-mastery: & → ℝ
   - mini-clawdbot: >_ → @
   - nanovlm: <image> → ∘, the encoder–projector–LM composition

   **Declined:** separating 𝑄𝐾ᵀ from 𝐾𝑉. They sit in different levels, and in both the K is literally the key.
6. **Accepted: spec matches covers.**
   - (a) The caption grammar is applied to every cover.
   - (b) 5D is written into the rules as the single word-run exception. I did not add U+2225, which isn't on the cover.
   - (c) The series name is set under the numeral, not in the caption's right slot. For 𝔼, the official name plus "THE INTELLIGENCE FACTORY · IV · ADVANCED" would overflow the 648 px measure.
   - (d) Two spots are now specified; see Palette.

**Final proof**
- Google's Libertinus Math has the U+21C4 and U+21C6 outlines swapped, so the chart's ⇄ (→ over ←) is now drawn as an SVG path.
- In the page's figcaptions, maths symbols are wrapped in Libertinus Math. CDP `getPlatformFontsForNode` now reports only Libertinus Serif, Libertinus Math, Chivo Mono and Archivo across the whole page.
- `renders/_wrap.jpg` is now rendered.

**Still open**
- Advanced characters are about 3:1 against black. That is fine for a 500 px image, but it depends on spot 2 being proofed as bright as #3548EE.

## What I'd do next
- Outline the emblems into a single "Vizuara Codepoint" SVG glyph library, so production never depends on font loading.
- Tune crops across all 52 books as a whole, so neighbouring titles on the web shelf don't repeat a composition.
- Do drawdowns of both spots on the actual uncoated stock.
- Build the spine system for the full shelf, so the characters line up at one height across 52 spines.
