# Vizuara Books — cover system brief

## Context
Vizuara Books (books.vizuara.ai) is a library of ~50 technical books on AI/ML, taught in short
lessons called "capsules". Today every cover is the same template: a thin frame, a giant italic
"VIZUARA" wordmark, the title, and a small AI-generated watercolor cartoon (robots, a kid with a
lightbulb) floating in empty space. See `covers/_shared/before/`. The owner hates them, and they're
right: the brand is shouting louder than the book, the art is generic clip-art that says nothing
about the subject, the raster images are low-res and would print badly, and 50 covers look like
one cover with a different accent color. Treat `before/` purely as what to move away from.

The goal: a real cover *system* — the way O'Reilly and Manning have one — that is unmistakably
Vizuara's own, looks great as a 180px thumbnail in the web library, and looks great printed and
held in the hand.

## The principle to learn from O'Reilly / Manning (not the look)
A strict, recognisable system (grid, type, colour logic, imprint placement) + ONE unique,
memorable emblem per book, so every title is distinct but the shelf reads as one family.
Do NOT imitate O'Reilly's animal engravings or Manning's historical costume figures — take the
principle, invent your own vocabulary.

## Hard requirements
1. **No AI-generated or stock raster images. No clip-art.** Everything is made in code:
   HTML/CSS/SVG (preferred — it's vector and prints at any size), or canvas/JS if you render at
   print resolution. Generative/procedural art is very welcome. Textures made procedurally
   (SVG turbulence, noise, halftone patterns) are fine.
2. **Each cover is an element `<div class="cover" data-slug="<slug>">` exactly 720×888 CSS px**
   (= 7.5in × 9.25in trim, the O'Reilly/Manning trade size) with no transform on the element
   itself. Keep critical text ≥24px (0.25in) from every edge. Slugs come from `books.json`.
3. **Title is the hero, brand is the signature.** The Vizuara imprint should be present and
   recognisable but never louder than the book's title.
4. **Every book gets its own emblem/image derived from its actual subject** (e.g. the maths of it,
   the mechanism, the data structure, the architecture) — not a generic "AI" image.
5. **Encode level** (beginner / intermediate / advanced) somehow within the system — colour,
   mark, band, number, whatever fits your language.
6. **Brand colours:** the current logo's orange/sky-blue/magenta pinwheel palette is being
   retired. Do NOT build on it. Pick your own palette with conviction. You may design your own
   imprint mark/wordmark for Vizuara if your system wants one (a publisher's mark, colophon,
   monogram…). Don't reproduce third-party logos (Python, Git, GitHub, Claude, DeepSeek, Kimi…).
7. **Don't invent author names.** Use the imprint ("Vizuara" / "Vizuara Books") as the credit.
   You may add a short, accurate subtitle/tagline if it helps, but keep it truthful to the title.
8. **Assets allowed on the page:** fonts from Google Fonts only (`<link>` to
   fonts.googleapis.com); JS libraries only from cdn.jsdelivr.net/npm or cdnjs.cloudflare.com
   (vanilla JS + SVG is usually better). Nothing else external. The page must work offline-ish
   except for those.
9. **Must survive print:** think about how ink behaves — no hairlines under ~0.5px at trim size,
   no light-grey-on-white body text, and it should still read well if printed in greyscale.
   Output must also still read at thumbnail size (~180px wide): check it.

## Deliverables (inside your own folder `covers/<your-folder>/`)
- `index.html` — a single self-contained page presenting your system: a name for your
  direction, 2–5 sentences of rationale, your palette + type choices, then all your covers laid
  out at full size. Don't scale the covers or any of their ancestors (no zoom/transform) —
  the renderer checks that each cover measures 720×888 on screen. The page should look good in its own right — it's a presentation.
- Covers for **all 6 core-set books** (see `books.json` → `core_set`), plus **at least 3 more of
  your choice** from the catalog that show the range of your system (e.g. a beginner book, a very
  long title, a short one, one of the "coming soon" books, or the 4-book "Charlie and the
  Intelligence Factory" series treated as a sub-series). More is welcome if quality holds.
- Renders: run `node tools/render.js covers/<your-folder>/index.html --pdf` from the repo root
  (/home/user/some-new-logo). It writes `covers/<your-folder>/renders/<slug>.png` (2×),
  `<slug>.jpg` (1×) and `renders/pdf/<slug>.pdf` (vector, exact trim). It handles Google Fonts /
  CDN fetching for you. `--only slug1,slug2` re-renders just some; `--sheet` also screenshots the
  whole page.
- `NOTES.md` — direction name, the idea in a paragraph, palette (hex), fonts, how level is
  encoded, how each book's emblem was derived (one line per book), and what you'd do next.
- Optional but impressive: a full print wrap for one book (back cover + spine + front) as an
  extra element with class `wrap` (not `.cover`) on the page.

## Process
- Thumbnail check: `node tools/contact.js covers/<your-folder>/renders` writes
  `renders/_contact-180.png`, every cover at 180px on a 1× screen. Read it. If a title
  doesn't read there, fix it.
- Look at your renders (open the PNG/JPGs with the Read tool — you can see images). Judge them
  at full size AND imagine them at 180px wide in a grid of 50. Be the harshest critic in the
  room. Iterate at least 2–3 rounds; kill weak ideas. Typography details matter: kerning of big
  titles, rag, line breaks on long titles (never orphan a single short word), consistent margins.
- Taste is yours. Don't play it safe and don't produce a generic "tech book" look. It should be
  a system someone would be proud to put on a shelf and that nobody would confuse with anyone
  else's.
- Don't run any git commands (the lead will commit). Only write inside your own folder.
