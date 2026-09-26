// Builds covers/11-kolam/index.html.  Every kolam is computed here (kolam.js + books.js) and
// written into the page as static SVG, so the page itself needs no script to show the covers.
//   node covers/11-kolam/src/build.js
const fs = require('fs');
const path = require('path');
const K = require('./kolam.js');
const { BOOKS, SYM } = require('./books.js');
const DATA = JSON.parse(fs.readFileSync(path.join(__dirname, '../../_shared/books.json'), 'utf8')).books;
const bySlug = Object.fromEntries(DATA.map((b) => [b.slug, b]));

// ---------------- palette ----------------
const C = {
  rice: '#F4EFE4',        // arisi maavu: rice-flour white
  earth: '#1D1B17',       // swept, wet ground before dawn
  kaavi: '#8A3120',       // kaavi: red-oxide of thresholds and floors
  paper: '#EEE7D7',       // kolam notebook paper
  ink: '#1A1815',         // notebook ink
  ember: '#D2603F',       // the one accent: kaavi lifted to read on earth
};
const LEVEL = {
  beginner: { bg: C.paper, fg: C.ink, acc: C.kaavi, n: 1, name: 'Beginner', ground: 'the notebook' },
  intermediate: { bg: C.kaavi, fg: C.rice, acc: C.rice, n: 2, name: 'Intermediate', ground: 'the threshold' },
  advanced: { bg: C.earth, fg: C.rice, acc: C.ember, n: 3, name: 'Advanced', ground: 'the street' },
};

// ---------------- the covers ----------------
// t: title lines separated by | (broken by hand for the rag).  size: 80 standard, 64 for long titles.
const COVERS = [
  { slug: 'ai-context-engineering', t: 'AI Context|Engineering', seed: 3 },
  { slug: 'mathematical-foundations-for-ml', t: 'Mathematical|Foundations for|Machine Learning', size: 72, seed: 3 },
  { slug: 'neural-networks-from-scratch', t: 'Neural Networks|from Scratch', seed: 5 },
  { slug: 'build-llms-from-scratch', t: 'Build Large|Language Models|(LLMs) from Scratch', size: 64, seed: 4 },
  { slug: '5d-parallelism', t: '5D Parallelism|for Large|Model Training', seed: 1 },
  { slug: 'pi-vs-hermes-vs-codex', t: 'Pi vs Hermes|vs Codex', sub: 'Context Compaction and Memory', seed: 1 },
  { slug: 'dsa-in-python', t: 'Data Structures|& Algorithms|in Python', seed: 2 },
  { slug: 'r-masterclass', t: 'R Masterclass', seed: 3 },
  { slug: 'deit-from-scratch', t: 'Build a Data-|Efficient Image|Transformer (DeiT)|from Scratch', size: 64, seed: 3 },
  { slug: 'charlie-language-room', t: 'Charlie and the|Language Room', seed: 4 },
  { slug: 'charlie-vision-room', t: 'Charlie and the|Vision Room', seed: 1 },
  { slug: 'charlie-sound-room', t: 'Charlie and the|Sound Room', seed: 1 },
  { slug: 'charlie-reasoning-room', t: 'Charlie and the|Reasoning Room', seed: 4 },
  { slug: 'kernel-engineering', t: 'Kernel|Engineering', seed: 1 },
];

const cache = {};
function emblem(slug, seed) {
  const key = slug + ':' + seed;
  if (cache[key]) return cache[key];
  const b = BOOKS[slug];
  const sh = b.shape();
  const sol = K.solve(sh, { loops: b.loops, density: b.density, sym: SYM[b.sym], seed: seed || 1, force: b.force, noIsolated: true, iters: 3000, restarts: 4 });
  if (sol.loops !== b.loops) console.warn(`! ${slug}: wanted ${b.loops} lines, got ${sol.loops}`);
  return (cache[key] = { b, sol, n: sh.cells.length });
}

// Vizuara's imprint: five interlaced dots in a V, drawn as one closed line (idukku pulli)
const markSol = K.solve(K.fromMask('o...o\n.o.o.\n..o..', 'idukku'), { loops: 1, density: 0.1, sym: [], seed: 1, iters: 800, restarts: 2 });
function mark(color, h, sw = 2.7) {
  const p = 20, lay = K.layout(markSol, p);
  const W = lay.box.w + p * 0.95, H = lay.box.h + p * 0.95;
  const g = K.svg(markSol, { pitch: p, stroke: sw, dot: sw * 0.8, color, cx: W / 2, cy: H / 2 });
  return `<svg class="mark" viewBox="0 0 ${W.toFixed(1)} ${H.toFixed(1)}" style="height:${h}px;width:${(h * W / H).toFixed(1)}px" aria-hidden="true">${g.svg}</svg>`;
}

// draw a solution into a box.  returns svg markup
function drawKolam(sol, color, box, extra = {}) {
  const lay1 = K.layout(sol, 1);
  const pitch = Math.min(box.w / (lay1.box.w + 0.95), box.h / (lay1.box.h + 0.95), box.maxPitch || 116);
  if (extra.hollow) {
    // irattai kodu: the double-line kolam (Charlie sub-series)
    const stroke = Math.max(11, Math.min(20, pitch * 0.2)), wall = Math.max(2.4, stroke * 0.27);
    return { svg: K.svg(sol, Object.assign({ pitch, stroke, wall, dot: Math.max(3.4, pitch * 0.075), color, cx: box.cx, cy: box.cy }, extra)).svg, pitch, stroke };
  }
  const stroke = Math.max(box.minStroke || 4.4, Math.min(10, pitch * 0.098));
  return { svg: K.svg(sol, Object.assign({ pitch, stroke, dot: stroke * 0.78, color, cx: box.cx, cy: box.cy }, extra)).svg, pitch, stroke };
}

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const NUMW = ['zero', 'one', 'two', 'three', 'four', 'five', 'six'];
const TA_LINES = ['', 'ஒரு கோடு', 'இரு கோடுகள்', 'மூன்று கோடுகள்', 'நான்கு கோடுகள்', 'ஐந்து கோடுகள்'];
const pips = (n, cls = '') => `<b class="pips ${cls}">${[1, 2, 3].map((i) => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</b>`;

const BOX = { cx: 360, cy: 584, w: 600, h: 412 };
const SERIES_BOX = { cx: 360, cy: 600, w: 580, h: 372 };

function cover(c, opts = {}) {
  const d = bySlug[c.slug];
  const L = LEVEL[d.level];
  const { b, sol, n } = emblem(c.slug, c.seed);
  const series = d.series;
  const soon = d.coming_soon;
  const size = c.size || 80;
  const lines = c.t.split('|');
  const top = series ? 128 : 96;
  const sub = c.sub || (series ? d.subtitle : null) || (soon ? d.subtitle : null);
  const titleBottom = top + lines.length * size * 1.0;
  let art = '';
  if (series) {
    // the Charlie books share one signature: the kolam is drawn in double line (irattai kodu)
    art = drawKolam(sol, L.fg, SERIES_BOX, { hollow: L.bg }).svg;
  } else if (soon) {
    // coming soon: the dots are down, the line has only just begun
    const k = drawKolam(sol, L.fg, BOX, { partial: b.partial || 0.4, compactStart: b.partial || 0.4, biasX: 0.6 });
    art = k.svg;
  } else {
    art = drawKolam(sol, L.fg, BOX).svg;
  }
  const right = soon ? 'Coming soon' : `${d.capsules} capsules · ${d.hours} hours`;
  const taSpec = soon ? `${n} புள்ளி · கோடு தொடங்கியது` : `${n} புள்ளி · ${TA_LINES[sol.loops]}`;
  const enSpec = soon ? `${n} pulli · the line has begun` : `${n} pulli · ${NUMW[sol.loops]} line${sol.loops > 1 ? 's' : ''}`;
  return `
<div class="cover lv-${d.level}${series ? ' series' : ''}${soon ? ' soon' : ''}" data-slug="${c.slug}" style="--bg:${L.bg};--fg:${L.fg};--acc:${L.acc}">
  <svg class="kolam" width="720" height="888" viewBox="0 0 720 888" aria-hidden="true">${art}</svg>
  <header class="top"><span class="lvl">${pips(L.n)}${L.name}</span><span>${right}</span></header>
  ${series ? `<p class="series-line">${esc(d.series)} <span class="no">${d.series_no}</span></p>` : ''}
  <h1 class="title" style="font-size:${size}px;top:${top}px">${lines.map(esc).join('<br>')}</h1>
  ${sub ? `<p class="sub" style="top:${titleBottom + 16}px">${esc(sub)}</p>` : ''}
  <footer class="foot"><span class="imprint">${mark(L.fg, 24)}<span>Vizuara Books</span></span>
    <span class="spec"><span lang="ta">${taSpec}</span><span>${enSpec}</span></span></footer>
</div>`;
}

// ---------------- full print wrap (back · spine · front) ----------------
function wrap(slug) {
  const c = COVERS.find((x) => x.slug === slug);
  const d = bySlug[slug];
  const L = LEVEL[d.level];
  const { b, sol, n } = emblem(slug, c.seed);
  const SPINE = 54;
  const front = cover(c).replace(`class="cover `, `class="face `).replace(/ data-slug="[^"]+"/, '');
  // legend kolam: a tiny 2 x 2 kolam labelled
  const small = K.solve(K.fromRows([3, 3], 'ner'), { loops: 1, density: 0, sym: [], seed: 1, iters: 10, restarts: 1 });
  const leg = K.svg(small, { pitch: 38, stroke: 3.6, dot: 2.8, color: L.fg, cx: 70, cy: 50 });
  const spineKolam = drawKolam(sol, L.fg, { cx: SPINE / 2, cy: 700, w: 34, h: 120, minStroke: 1.6 }).svg;
  return `
<div class="wrap" style="--bg:${L.bg};--fg:${L.fg};--acc:${L.acc};width:${720 * 2 + SPINE}px">
  <div class="face back">
    <p class="back-kicker">${pips(L.n)}${L.name} · ${d.capsules} capsules · about ${d.hours} hours</p>
    <h2 class="back-title">How to read this cover</h2>
    <div class="legend">
      <svg width="140" height="100" viewBox="0 0 140 100">${leg.svg}</svg>
      <p>This is a <em>sikku kolam</em>, the knotted threshold drawing of Tamil Nadu. First a grid of dots, <em>pulli</em>, is laid down; then a line is drawn that loops around every dot without touching it, crosses itself between neighbours, and returns to where it began.</p>
    </div>
    <ol class="rules">
      <li><b>One dot, one capsule.</b> This book has ${d.capsules} capsules, so its kolam has ${n} pulli.</li>
      <li><b>The shape is the subject.</b> ${esc(b.why)}</li>
      <li><b>The line obeys the rules.</b> Where two dots are linked the line crosses; where they are not it turns back. Turns were placed by a search, symmetric about both axes, until the drawing closed into exactly ${NUMW[sol.loops]} line${sol.loops > 1 ? 's' : ''}.</li>
      <li><b>The ground is the level.</b> Beginner books are drawn in ink on notebook paper, intermediate in rice flour on red-oxide kaavi, advanced on the dark swept earth before dawn.</li>
    </ol>
    <p class="back-spec"><span lang="ta">${n} புள்ளி · ${TA_LINES[sol.loops]}</span> — ${esc(b.spec)}</p>
    <div class="back-foot"><span class="imprint">${mark(L.fg, 30)}<span>Vizuara Books</span></span><span>books.vizuara.ai</span><span class="barcode">ISBN / barcode</span></div>
  </div>
  <div class="spine" style="width:${SPINE}px">
    <span class="spine-mark">${mark(L.fg, 20, 3)}</span>
    <span class="spine-title">${esc(d.title)}</span>
    <svg class="spine-k" width="${SPINE}" height="888" viewBox="0 0 ${SPINE} 888">${spineKolam}</svg>
    <span class="spine-pips">${pips(L.n)}</span>
  </div>
  ${front}
</div>`;
}

// ---------------- presentation page ----------------
function grammarFigure() {
  // three steps: dots, crossings, one closed line
  const sh = K.fromRows([1, 3, 5, 3, 1], 'ner');
  const s = K.solve(sh, { loops: 1, density: 0.2, sym: SYM.D2, seed: 2, iters: 2000, restarts: 3 });
  const cells = s.M.shape.cells;
  const p = 30;
  const one = (cx, what) => {
    const g = K.svg(s, { pitch: p, stroke: 3.2, dot: 2.6, color: C.ink, cx, cy: 110, partial: what === 'dots' ? 0 : what === 'half' ? 0.45 : null, start: [cells[0].u, cells[0].v - 0.4] });
    return what === 'dots' ? g.svg.replace(/<path[^>]*\/>/g, '') : g.svg;
  };
  return `<svg class="grammar-fig" viewBox="0 0 720 220" width="720" height="220" aria-label="Laying the dots, drawing the line, closing it">
    ${one(120, 'dots')}${one(360, 'half')}${one(600, 'full')}
    <text x="120" y="212" text-anchor="middle">1 · pulli: one per capsule</text>
    <text x="360" y="212" text-anchor="middle">2 · the line crosses or turns</text>
    <text x="600" y="212" text-anchor="middle">3 · it always closes</text></svg>`;
}

const CSS = `
:root{--rice:${C.rice};--earth:${C.earth};--kaavi:${C.kaavi};--paper:${C.paper};--ink:${C.ink};--ember:${C.ember}}
*{box-sizing:border-box}
html{background:#E4DDCF}
body{margin:0;color:${C.ink};font-family:'Anek Latin',sans-serif;font-stretch:100%}
.intro{max-width:1540px;margin:0 auto;padding:72px 56px 24px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,1fr);gap:40px 72px}
.intro h1{grid-column:1/-1;margin:0;font:400 132px/0.9 'Tiro Tamil',serif;letter-spacing:-.02em;display:flex;align-items:flex-end;gap:28px;flex-wrap:wrap}
.intro h1 small{font:500 15px/1.4 'Anek Latin',sans-serif;letter-spacing:.14em;text-transform:uppercase;padding-bottom:18px}
.intro h1 .ta{font-family:'Anek Tamil',sans-serif;font-weight:400;font-size:64px;letter-spacing:0;color:${C.kaavi};padding-bottom:10px}
.lede{font:400 25px/1.42 'Tiro Tamil',serif;margin:0 0 18px;max-width:30em}
.lede em{font-style:italic}
.intro p{font-size:17px;line-height:1.55;max-width:38em;margin:0 0 14px}
.intro h3{font:600 13px/1 'Anek Latin',sans-serif;letter-spacing:.16em;text-transform:uppercase;margin:28px 0 14px;color:${C.kaavi}}
.sw{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:10px}
.sw div{height:96px;padding:10px 12px;font-size:13px;line-height:1.3;display:flex;flex-direction:column;justify-content:flex-end;border:1px solid rgba(0,0,0,.08)}
.sw b{font-weight:600}
.type{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.type div{border-top:2px solid ${C.ink};padding-top:10px;font-size:14px}
.type .s1{font:400 40px/1 'Tiro Tamil',serif;margin:4px 0 6px}
.type .s2{font:600 30px/1 'Anek Latin',sans-serif;margin:4px 0 6px;letter-spacing:.02em}
.type .s3{font:500 30px/1 'Anek Tamil',sans-serif;margin:4px 0 6px}
.levels{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.levels div{padding:14px 14px 12px;font-size:14px;line-height:1.35}
.levels b{display:block;font-weight:600;font-size:15px;margin-top:8px}
.grammar-fig{display:block;width:100%;height:auto;max-width:720px}
.grammar-fig text{font:500 14px 'Anek Latin',sans-serif;fill:${C.ink}}
.section-h{max-width:1540px;margin:40px auto 0;padding:0 56px;font:600 13px/1 'Anek Latin',sans-serif;letter-spacing:.16em;text-transform:uppercase;color:${C.kaavi};display:flex;justify-content:space-between;border-top:2px solid ${C.ink};padding-top:14px}
.section-h span:last-child{color:${C.ink};letter-spacing:.06em;text-transform:none;font-weight:500;font-size:15px}
.covers{display:flex;flex-wrap:wrap;gap:56px 48px;padding:36px 56px 24px;max-width:1540px;margin:0 auto;justify-content:flex-start}
.cap{width:720px;font-size:14px;line-height:1.45;margin-top:12px;color:#3b362f}
.cap b{font-weight:600;color:${C.ink}}
figure{margin:0}

/* ---- the cover ---- */
.cover,.face{position:relative;width:720px;height:888px;overflow:hidden;background:var(--bg);color:var(--fg);flex:none}
.cover .kolam,.face .kolam{position:absolute;left:0;top:0}
.top{position:absolute;left:56px;right:56px;top:42px;display:flex;justify-content:space-between;align-items:center;
  font:500 14px/1 'Anek Latin',sans-serif;letter-spacing:.14em;text-transform:uppercase}
.lvl{display:flex;align-items:center;gap:12px}
.pips{display:inline-flex;gap:5px}
.pips i{width:9px;height:9px;border-radius:50%;border:1.6px solid currentColor}
.pips i.on{background:currentColor}
.title{position:absolute;left:52px;right:48px;margin:0;font:400 80px/1 'Tiro Tamil',serif;letter-spacing:-.014em;font-kerning:normal;text-wrap:nowrap;white-space:nowrap}
.sub{position:absolute;left:56px;right:56px;margin:0;font:italic 400 27px/1.2 'Tiro Tamil',serif}
.series-line{position:absolute;left:56px;right:56px;top:86px;margin:0;font:500 14px/1 'Anek Latin',sans-serif;letter-spacing:.14em;text-transform:uppercase;display:flex;gap:10px;align-items:center}
.series-line .no{font:400 22px/1 'Tiro Tamil',serif;letter-spacing:.02em;text-transform:none}
.foot{position:absolute;left:56px;right:56px;bottom:38px;display:flex;justify-content:space-between;align-items:flex-end;
  font:500 13.5px/1.3 'Anek Latin',sans-serif;letter-spacing:.04em}
.imprint{display:flex;align-items:center;gap:10px;font-weight:600;letter-spacing:.01em;font-size:17px}
.spec{display:flex;flex-direction:column;align-items:flex-end;gap:1px}
.spec [lang=ta],[lang=ta]{font-family:'Anek Tamil',sans-serif;letter-spacing:0}

/* ---- wrap ---- */
.wrap-holder{max-width:1540px;margin:0 auto;padding:36px 56px 24px}
.wrap{display:flex;height:888px;background:var(--bg);color:var(--fg);box-shadow:0 1px 0 rgba(0,0,0,.05)}
.wrap .face{flex:none}
.back{padding:0}
.back-kicker{position:absolute;left:64px;right:64px;top:42px;margin:0;display:flex;gap:12px;align-items:center;font:500 14px/1 'Anek Latin',sans-serif;letter-spacing:.14em;text-transform:uppercase}
.back-title{position:absolute;left:62px;top:96px;margin:0;font:400 52px/1 'Tiro Tamil',serif;letter-spacing:-.01em}
.legend{position:absolute;left:64px;right:64px;top:184px;display:flex;gap:24px;align-items:flex-start}
.legend svg{flex:none}
.legend p{margin:0;font:400 20px/1.42 'Tiro Tamil',serif}
.rules{position:absolute;left:64px;right:64px;top:380px;margin:0;padding:0;list-style:none;counter-reset:r}
.rules li{counter-increment:r;position:relative;padding-left:40px;margin:0 0 16px;font:400 16.5px/1.45 'Anek Latin',sans-serif}
.rules li::before{content:counter(r);position:absolute;left:0;top:-3px;font:400 26px/1 'Tiro Tamil',serif}
.rules b{font-weight:600}
.back-spec{position:absolute;left:64px;right:64px;top:744px;margin:0;font:italic 400 17px/1.3 'Tiro Tamil',serif;opacity:1}
.back-foot{position:absolute;left:64px;right:64px;bottom:38px;display:flex;justify-content:space-between;align-items:flex-end;font:500 14px/1 'Anek Latin',sans-serif;letter-spacing:.04em}
.barcode{width:150px;height:82px;border:1.6px solid var(--fg);display:flex;align-items:center;justify-content:center;font-size:11px;letter-spacing:.1em;text-transform:uppercase}
.spine{position:relative;flex:none;height:888px;border-left:1px solid rgba(128,128,128,.28);border-right:1px solid rgba(128,128,128,.28)}
.spine-mark{position:absolute;top:34px;left:0;right:0;display:flex;justify-content:center}
.spine-title{position:absolute;left:50%;top:92px;transform-origin:0 0;transform:rotate(90deg) translateY(-50%);white-space:nowrap;font:400 25px/1 'Tiro Tamil',serif;letter-spacing:-.005em}
.spine-k{position:absolute;left:0;top:0}
.spine-pips{position:absolute;bottom:40px;left:0;right:0;display:flex;justify-content:center}
.spine-pips .pips{flex-direction:column}
.notes-foot{max-width:1540px;margin:24px auto 80px;padding:18px 56px 0;font-size:14px;line-height:1.55;color:#3b362f}
.notes-foot p{max-width:70em;margin:0 0 8px}
@media (max-width:900px){.intro{grid-template-columns:1fr}.intro h1{font-size:88px}}
`;

function page() {
  const caps = {
    // short captions under each cover in the presentation
  };
  const covers = COVERS.map((c) => {
    const d = bySlug[c.slug]; const { b, sol, n } = emblem(c.slug, c.seed);
    return `<figure>${cover(c)}<figcaption class="cap"><b>${esc(d.title)}</b> — ${n} pulli, ${NUMW[sol.loops]} line${sol.loops > 1 ? 's' : ''}, ${esc(b.spec)}. ${esc(b.why)}</figcaption></figure>`;
  }).join('\n');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Pulli — Vizuara Books</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Anek+Latin:wdth,wght@75..125,300..800&family=Anek+Tamil:wdth,wght@75..125,400..700&family=Tiro+Tamil:ital@0;1&display=block" rel="stylesheet">
<style>${CSS}</style></head><body>
<section class="intro">
  <h1>Pulli <span class="ta" lang="ta">புள்ளி</span><small>Direction 11 · a cover system for Vizuara Books</small></h1>
  <div>
    <p class="lede">Every morning across Tamil Nadu, a grid of dots is laid on the swept threshold and a single line is drawn around them, crossing and turning until it closes on itself. The <em>sikku kolam</em> is an algorithm done by hand — so every Vizuara book gets one, computed from the book itself.</p>
    <p>One dot (<i>pulli</i>) per capsule. The arrangement of the dots is the subject's structure — layers, a context window, a bell curve, a warp of threads. The line follows the real kolam rules (it weaves at 45°, crosses between neighbours, turns back at every border, never touches a dot, always closes), and a search places the turns until the drawing resolves into the number of lines the book calls for: usually one, five for 5D parallelism, three for three agents. The title is set large in a Tamil–Latin book face; the imprint is a small V drawn by the same rules.</p>
    <h3>Grammar</h3>
    ${grammarFigure()}
  </div>
  <div>
    <h3>Palette — the ground is the level</h3>
    <div class="levels">
      <div style="background:${C.paper};color:${C.ink};border:1px solid rgba(0,0,0,.1)">${pips(1)}<b>Beginner</b>Ink on notebook paper — where kolams are practised.</div>
      <div style="background:${C.kaavi};color:${C.rice}">${pips(2)}<b>Intermediate</b>Rice flour on kaavi, the red-oxide doorstep.</div>
      <div style="background:${C.earth};color:${C.rice}">${pips(3)}<b>Advanced</b>Rice flour on swept earth before dawn.</div>
    </div>
    <div class="sw" style="margin-top:10px">
      <div style="background:${C.rice}"><b>Arisi maavu</b>${C.rice}</div>
      <div style="background:${C.paper}"><b>Notebook</b>${C.paper}</div>
      <div style="background:${C.ink};color:${C.rice}"><b>Ink</b>${C.ink}</div>
      <div style="background:${C.kaavi};color:${C.rice}"><b>Kaavi</b>${C.kaavi}</div>
      <div style="background:${C.earth};color:${C.rice}"><b>Earth</b>${C.earth}</div>
      <div style="background:${C.ember};color:${C.earth}"><b>Ember (accent)</b>${C.ember}</div>
    </div>
    <h3>Type</h3>
    <div class="type">
      <div><div class="s1">Tiro Tamil</div>Titles. A Tamil–Latin book face made for Indian classical publishing.</div>
      <div><div class="s2">Anek Latin</div>Labels and imprint. Ek Type, Mumbai.</div>
      <div><div class="s3" lang="ta">அனேக் தமிழ்</div>Anek Tamil for the kolam's own caption: its dot count and lines, as kolam notebooks record them.</div>
      <div><div class="s2" style="display:flex;align-items:center;gap:12px">${mark(C.ink, 34)} Vizuara</div>The imprint: five pulli in a V, one closed line.</div>
    </div>
  </div>
</section>
<div class="section-h"><span>The core set and the range</span><span>14 covers · 720 × 888 px = 7.5 × 9.25 in</span></div>
<main class="covers">${covers}</main>
<div class="section-h"><span>Full wrap</span><span>Back · spine · front — AI Context Engineering</span></div>
<div class="wrap-holder">${wrap('ai-context-engineering')}</div>
<div class="notes-foot"><p>All drawing is computed: <code>src/kolam.js</code> implements the mirror-curve model of sikku kolam (dots at cell centres; at each edge between neighbours the line either crosses or turns; the border always turns), traces the closed lines and searches symmetric turn placements for an exact line count. <code>src/books.js</code> holds each book's grammar; <code>src/build.js</code> writes this page as static SVG.</p></div>
<script>
// QA: warn if a title overflows its measure
document.fonts.ready.then(()=>{document.querySelectorAll('.title').forEach(t=>{const r=t.getBoundingClientRect(),c=t.closest('.cover,.face').getBoundingClientRect();
 const range=document.createRange();range.selectNodeContents(t);const w=range.getBoundingClientRect();
 if(w.right>c.right-40) console.error('title overflow', t.textContent, Math.round(w.right-c.left));});});
</script>
</body></html>`;
}

const out = process.argv[2] || path.join(__dirname, '../index.html');
fs.writeFileSync(out, page());
console.log('wrote', out);
