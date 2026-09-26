/* Presentation page: hero, ink chart, shelf, covers, wrap. */
(async function () {
  'use strict';
  const loads = [
    "800 100px 'Bricolage Grotesque'", "700 20px 'Bricolage Grotesque'",
    "italic 30px 'Instrument Serif'", "400 30px 'Instrument Serif'",
    "500 12px 'DM Mono'", "400 12px 'DM Mono'"
  ].map((s) => document.fonts.load(s).catch(() => null));
  await Promise.all(loads);

  const RI = window.RISO;
  const { sheet, INK, LEVELS, halftone, circ, rectD, polyD, T, measure, vMark, levelMark, W, H } = RI;
  const p = (d) => d ? `<path d="${d}"/>` : '';
  const mono = (sz = 13, w = 500, ls = 0.12) => ({ font: 'mono', size: sz, weight: w, ls });
  const uniq = (svg, suf) => svg.replace(/id="([^"]+)"/g, `id="$1${suf}"`).replace(/url\(#([^)]+)\)/g, `url(#$1${suf})`);
  const bySlug = Object.fromEntries(window.BOOKS.map((b) => [b.slug, b]));

  // ---------------------------------------------------------------- hero
  {
    const w = 1488, h = 380;
    const K = INK.federal.hex, FX = [INK.fpink.hex];
    const st = { font: 'display', weight: 800, opsz: 96, wdth: 88, ls: -0.03 };
    const size = Math.floor(100 * 980 / measure('Overprint', { ...st, size: 100 }));
    let fl = '', key = '';
    fl += p(halftone({ box: [860, 0, w, h], cell: 9, angle: 15, tone: (x, y) => { const d = Math.hypot(x - 1270, y - 196) / 250; return d < 1 ? 0.95 * (1 - d * d) : 0; } }));
    fl += T(34, 270, 'Overprint', { ...st, size });
    key += T(41, 275, 'Overprint', { ...st, size });
    key += T(40, 52, 'Vizuara Books · cover system · direction 07', mono(13, 500, 0.14));
    key += T(w - 40, 52, 'Proposal · September 2026', { ...mono(13, 500, 0.14), anchor: 'end' });
    key += T(40, h - 28, 'Two or three spot inks · procedural halftones · controlled misregistration · every emblem is the book’s own mechanism', mono(12.5, 400, 0.08));
    const v = vMark(w - 40 - 170, h - 26, 26);
    fl += v.left; key += v.right;
    key += T(w - 40 - 170 + v.w + 10, h - 29, 'VIZUARA', { font: 'display', weight: 800, size: 22, wdth: 100, opsz: 24, ls: 0.06 });
    document.getElementById('hero').innerHTML = sheet({ w, h, id: 'hero', FX, K, flash: [fl], key, label: 'Overprint' });
  }

  // ---------------------------------------------------------------- ink chart
  {
    const w = 1488, h = 460;
    const flashes = ['sunflower', 'yellow', 'fpink', 'orange', 'forange', 'bubblegum', 'aqua', 'cornflower', 'green'];
    const keys = ['hunter', 'federal'];
    const FX = [...flashes, ...keys].map((k) => INK[k].hex);
    const drums = FX.map(() => '');
    let key = '';
    key += T(40, 50, 'Ink library — real risograph inks, printed in multiply', mono(13, 500, 0.14));
    key += T(w - 40, 50, 'Paper · natural uncoated · #F4F0E6', { ...mono(13, 500, 0.14), anchor: 'end' });
    const mx0 = 520, colW = 94, gap = 11, top = 100, bot = 356;
    const bands = [['hunter', 'beginner', 'circle'], ['federal', 'intermediate', 'square'], ['black', 'advanced', 'diamond']];
    const by = (i) => top + 34 + i * 76;
    // key legend on the left, aligned with the bands
    bands.forEach(([k, lvl, mark], i) => {
      const y = by(i) + 20;
      const shape = levelMark(40, y + 12, mark, 30);
      const name = T(88, y + 4, INK[k].name, { font: 'display', weight: 800, size: 30, wdth: 90, opsz: 48, ls: -0.01 });
      const meta = T(88, y + 26, `${INK[k].hex} · key ink · ${lvl}`, mono(12, 500, 0.1));
      if (k === 'black') key += shape + name + meta;
      else { const di = flashes.length + keys.indexOf(k); drums[di] += shape + name; key += meta; }
    });
    flashes.forEach((k, j) => {
      const x = mx0 + j * (colW + gap);
      drums[j] += p(rectD(x, top, colW, bot - top));
      INK[k].name.split(' ').forEach((wd, q, arr) => { key += T(x, bot + 26 + q * 16, wd, mono(11, 500, 0.06)); });
      key += T(x, bot + 26 + INK[k].name.split(' ').length * 16, INK[k].hex, mono(11, 400, 0.06));
    });
    bands.forEach(([k], i) => {
      const d = rectD(mx0 - 16, by(i), w - 40 - (mx0 - 16), 40);
      if (k === 'black') key += p(d); else drums[flashes.length + keys.indexOf(k)] += p(d);
    });
    key += T(mx0 - 16, top - 22, 'Flash inks carry the subject; key inks cross them. Each crossing is a colour you get for free.', { font: 'serif', italic: true, size: 20, ls: 0 });
    document.getElementById('inks').innerHTML = sheet({ w, h, id: 'inks', FX, K: INK.black.hex, flash: drums, key, label: 'Ink library' });
  }

  // ---------------------------------------------------------------- covers
  const groups = {
    core: ['ai-context-engineering', 'mathematical-foundations-for-ml', 'neural-networks-from-scratch', 'build-llms-from-scratch', '5d-parallelism', 'pi-vs-hermes-vs-codex'],
    series: ['charlie-language-room', 'charlie-vision-room', 'charlie-sound-room', 'charlie-reasoning-room'],
    range: ['kernel-engineering', 'deit-from-scratch', 'sql-masterclass', 'machine-learning-fundamentals', 'reinforcement-learning'],
  };
  const shelf = document.getElementById('shelf');
  const built = {};
  for (const [gid, slugs] of Object.entries(groups)) {
    const host = document.getElementById(gid);
    for (const slug of slugs) {
      const b = bySlug[slug];
      const el = RI.buildCover(b);
      built[slug] = el;
      const fig = document.createElement('figure');
      fig.appendChild(el);
      const lv = LEVELS[b.level];
      const inks = [...b.flash, lv.ink].map((k) => `<i style="background:${INK[k].hex}"></i>${INK[k].name}`).join(' &nbsp;');
      const cap = document.createElement('figcaption');
      cap.innerHTML = `<div><div class="ft">${b.fullTitle}</div><div class="fm">${lv.label}${b.coming ? ' · forthcoming' : ` · ${b.capsules} capsules · ${b.hours} h`}<br>${inks}</div></div><div class="fn">${b.note}</div>`;
      fig.appendChild(cap);
      host.appendChild(fig);
    }
  }
  // shelf thumbnails: the same SVG, drawn at 180 px through its viewBox (not a .cover, IDs made unique)
  for (const slugs of Object.values(groups)) for (const slug of slugs) {
    const b = bySlug[slug];
    const svg = uniq(built[slug].innerHTML, '-t').replace(`width="${W}" height="${H}"`, 'width="180" height="222"');
    const t = document.createElement('div');
    t.className = 't';
    t.innerHTML = svg + `<span>${b.fullTitle.length > 34 ? b.fullTitle.slice(0, 32) + '…' : b.fullTitle}</span>`;
    shelf.appendChild(t);
  }
  // ---------------------------------------------------------------- wrap
  if (window.buildWrap) {
    const wr = window.buildWrap(bySlug['build-llms-from-scratch']);
    wr.querySelector('.wrap-front').innerHTML = uniq(wr.querySelector('.wrap-front').innerHTML, '-w');
    document.getElementById('wrap').appendChild(wr);
  }
  document.body.dataset.ready = '1';
})();
