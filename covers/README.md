# Vizuara Books — cover system proposals

Twenty-three independent cover systems for [Vizuara Books](https://books.vizuara.ai), each drawn entirely in code
(HTML, SVG, canvas or WebGL — no AI-generated or stock imagery). Every cover is 7.5 × 9.25 in (the O'Reilly/Manning
trade trim), rendered to a 2× PNG, a 1× JPG and a print PDF at exact trim.

Open `covers/index.html` for the comparison gallery (by direction, or one book across every direction, with a
180px thumbnail check). Each direction's own `index.html` is the designer's presentation page.

## How these were made

1. **Brief** — `_shared/BRIEF.md`, plus the scraped catalogue `_shared/books.json` and the covers being replaced (`_shared/before/`).
   Every direction covers the same six core books so they can be compared like for like, plus extras of its choice.
2. **Design** — one designer agent per direction, each seeded with a different starting point (or none).
3. **Review** — an independent art-director agent per direction: `NN-*/REVIEW.md`.
4. **Revision** — the original designer answered every point: see "Review response" in `NN-*/NOTES.md`.
5. **Proof** — an independent proofreader confirmed each review fix in the renders and hunted for objective defects:
   `NN-*/PROOF.md`. Those were then fixed too.

Direction 22 was given no brief at all (only "we don't like our covers; make new ones"), and was deliberately **not**
reviewed or revised, so it shows exactly what an unconstrained designer chose to do. Only a font-fallback bug was fixed.

## Directions

| # | Direction | Covers | Idea |
|---|---|---|---|
| 01 | [Figure/Ground](01-grid/) | 18 | One 12 × 15 module grid, one typeface and three inks for every book. |
| 02 | [Specimen Plates](02-plates/) | 13 | Every book is a numbered plate in one atlas of machine learning: a single engraved specimen of its actual mechanism, lettered a, b, c with an italic legend, the way Gray or Haeckel documented theirs. |
| 03 | [Halcyon](03-pelican/) | 16 | Mid-century paperback method (Tschichold's bands, Marber's grid, Facetti's abstract science covers) without the pastiche. |
| 04 | [Drawing Office](04-drafting/) | 12 | Every book is issued as an engineering drawing of the machine it teaches you to build. |
| 05 | [Figure 0](05-algorithmic/) | 14 | Every cover is one run of the book's own algorithm, computed in the page from a seed. |
| 06 | [Codepoint](06-letterform/) | 17 | One book, one character. |
| 07 | [Overprint](07-riso/) | 15 | Every book looks pulled off a risograph: natural paper, two or three real riso inks that overprint, halftone screens made in code, and drums slightly out of register. |
| 08 | [Buckram](08-clothbound/) | 14 | Every book is designed as a real case-bound hardcover: a deep bookcloth, one foil (gold, copper, palladium or black pigment) and one blind die. |
| 09 | [Interchange](09-atlas/) | 14 | Each book is a Beck/Vignelli transit map of its own subject. |
| 10 | [Some Assembly Required](10-wildcard/) | 16 | Vizuara is a library for building things, and half its titles end in “from Scratch”, so every book is a model kit. |
| 11 | [Pulli](11-kolam/) | 15 | Every book gets a Tamil sikku kolam computed from the book itself. |
| 12 | [Chhaap](12-blockprint/) | 15 | Every book is a length of block-printed cotton. |
| 13 | [Muraqqa](13-miniature/) | 13 | Every cover is a folio from one Mughal album (a muraqqa) with its page architecture held fixed. |
| 14 | [Signboard](14-bombay/) | 15 | Every book is lettered like a Bombay shop board and labelled like a Sivakasi matchbox. |
| 15 | [Jantar](15-jantar/) | 13 | Each book gets one monumental instrument in the spirit of Jai Singh's observatories at Jaipur and Delhi, built from the book's subject and drawn in axonometric under one hard sun with true cast shadows: red sandstone, marble edging, a stepwell cut open in section as the plinth. |
| 16 | [Double Take](16-wit/) | 18 | One idea per book: a single flat-shape pun, metaphor or figure–ground trick you get in a second, and each has to be technically true. |
| 17 | [Interference](17-optical/) | 16 | Every book is one field of black lines plus one spot colour, and the book's own idea is the force that bends them: a Gaussian swells them, a causal mask turns them, compaction squeezes them, attention makes two ring systems interfere. |
| 18 | [Maquette](18-sculpture/) | 14 | Every book is one sculpted object, made in code and photographed on seamless paper under a museum-catalogue title. |
| 19 | [stdout](19-terminal/) | 12 | Every cover is what the book's own code prints. |
| 20 | [Paperworks](20-cutpaper/) | 13 | Every book is a small construction of cut, folded and layered coloured card, and the construction is the idea: a die-cut window over a scroll of context, neurons pinned with brass paper fasteners, chat history pleated into a concertina. |
| 21 | [On the Bench](21-wildcard2/) | 16 | A second designer, told nothing about direction 10, independently arrived at the same idea: every Vizuara book builds a model, so every cover is a model kit “on the bench”. |
| 22 | [Textmode (open brief)](22-open/) | 18 | This designer was told only who Vizuara is and that the current covers are disliked. |
| 23 | [Blazon](23-wildcard3/) | 17 | Every book is granted a coat of arms whose divisions and charges are the mechanism it teaches, and next to the shield sits its blazon: heraldry's 800-year-old formal language that specifies exactly one picture, set like source code beside its output. |

## Folder layout

```
covers/
  index.html              comparison gallery (built by tools/build_gallery.py)
  _shared/                brief, catalogue, directions.json (names + pitches), covers being replaced
  NN-name/
    index.html            the designer's presentation page (all covers live, plus a print wrap)
    NOTES.md              palette, type, level encoding, one line per emblem, review response
    REVIEW.md             independent art-director review
    PROOF.md              final proof check
    renders/<slug>.jpg    1× render (gallery)          renders/<slug>.png   2× render (git-ignored, regenerate)
    renders/_wrap.jpg     print wrap: back, spine, front
    renders/pdf/<slug>.pdf  print file at exact trim
```

## Tools

```
node tools/render.js covers/NN-name/index.html --pdf   # every .cover → PNG, JPG, PDF; .wrap → _wrap.jpg
node tools/contact.js covers/NN-name/renders            # 180px contact sheet at 1×
node tools/pdfpeek.js covers/NN-name/renders/pdf/*.pdf  # rasterise PDFs, diff against the JPGs
python3 tools/final_check.py                            # whole-set QA (sizes, seams, fonts, PDFs, core six)
python3 tools/build_gallery.py                          # rebuild covers/index.html
```

`render.js` fetches Google Fonts / jsDelivr through curl because the sandboxed browser can't reach the web
directly; on a normal machine it works as-is. Covers are captured isolated at the page origin so no render picks up
a sliver of page background, and PDFs are printed from the isolated cover so Chrome never shrinks them to fit.

## Print notes

- Trim 7.5 × 9.25 in, no bleed yet: add 0.125 in bleed per printer spec before press. Most designs already run
  their grounds and art past the trim.
- Most PDFs are pure vector with embedded Google Fonts. Exceptions, by design:
  **18 Maquette** (the sculpted objects are ray-marched rasters at 300 dpi, type is vector);
  **12 Chhaap** and **20 Paperworks** (dye layers / paper shadows rasterise at about 300 dpi);
  **08 Buckram** prints a deliberately flat version (flat cloth colour + one flat foil) that differs from its
  textured screen simulation — its notes map each effect to a real finish (foil block, blind deboss).
- Several directions show specific real-world production routes (foil and deboss plates, risograph drums,
  die-cut board, sign-painter or block-printer commissions) in their NOTES.
