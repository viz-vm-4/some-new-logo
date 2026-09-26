/* OVERPRINT — Vizuara Books cover system (direction 07)
   Every cover is ONE inline SVG, built as a stack of ink drums that overprint (multiply).
   All halftones, screens, specks and misregistration are procedural and vector. */
(function () {
  'use strict';
  const W = 720, H = 888, M = 40;
  const PAPER = '#F4F0E6';

  // Ink library — real Risograph ink names; hex = how each prints on natural stock.
  const INK = {
    hunter:     { name: 'Hunter Green',       hex: '#407060', role: 'key' },
    federal:    { name: 'Federal Blue',       hex: '#3D5588', role: 'key' },
    black:      { name: 'Black',              hex: '#232121', role: 'key' },
    fpink:      { name: 'Fluorescent Pink',   hex: '#FF48B0', role: 'flash' },
    yellow:     { name: 'Yellow',             hex: '#FFE800', role: 'flash' },
    aqua:       { name: 'Aqua',               hex: '#5EC8E5', role: 'flash' },
    sunflower:  { name: 'Sunflower',          hex: '#FFB511', role: 'flash' },
    forange:    { name: 'Fluorescent Orange', hex: '#FF7477', role: 'flash' },
    orange:     { name: 'Orange',             hex: '#FF6C2F', role: 'flash' },
    mint:       { name: 'Mint',               hex: '#82D8D5', role: 'flash' },
    lime:       { name: 'Light Lime',         hex: '#E3ED55', role: 'flash' },
    cornflower: { name: 'Cornflower',         hex: '#62A8E5', role: 'flash' },
    bubblegum:  { name: 'Bubble Gum',         hex: '#F984CA', role: 'flash' },
    green:      { name: 'Green',              hex: '#00A95C', role: 'flash' },
  };
  const LEVELS = {
    beginner:     { ink: 'hunter',  label: 'Beginner',     mark: 'circle' },
    intermediate: { ink: 'federal', label: 'Intermediate', mark: 'square' },
    advanced:     { ink: 'black',   label: 'Advanced',     mark: 'diamond' },
  };

  // ---------- utilities ----------
  const f = (n) => Math.round(n * 10) / 10;
  function hashStr(s) { let h = 2166136261; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return h >>> 0; }
  function rng(seed) {
    let a = typeof seed === 'number' ? seed : hashStr(seed);
    return function () { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  const circ = (x, y, r) => `M${f(x - r)} ${f(y)}a${f(r)} ${f(r)} 0 1 0 ${f(2 * r)} 0a${f(r)} ${f(r)} 0 1 0 ${f(-2 * r)} 0Z`;
  const rectD = (x, y, w, h) => `M${f(x)} ${f(y)}h${f(w)}v${f(h)}h${f(-w)}Z`;
  const polyD = (pts) => 'M' + pts.map((p) => f(p[0]) + ' ' + f(p[1])).join('L') + 'Z';
  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // AM halftone on a global screen (so neighbouring tints of one drum share a screen, like film).
  function halftone({ box = [0, 0, W, H], cell = 8, angle = 45, tone, gain = 1 }) {
    const [x0, y0, x1, y1] = box;
    const a = angle * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    let umin = 1e9, umax = -1e9, vmin = 1e9, vmax = -1e9;
    for (const [x, y] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) {
      const u = x * c + y * s, v = -x * s + y * c;
      umin = Math.min(umin, u); umax = Math.max(umax, u); vmin = Math.min(vmin, v); vmax = Math.max(vmax, v);
    }
    let d = '';
    for (let j = Math.floor(vmin / cell) - 1; j <= Math.ceil(vmax / cell) + 1; j++) {
      for (let i = Math.floor(umin / cell) - 1; i <= Math.ceil(umax / cell) + 1; i++) {
        const u = i * cell, v = j * cell;
        const x = u * c - v * s, y = u * s + v * c;
        if (x < x0 || x > x1 || y < y0 || y > y1) continue;
        let t = tone(x, y);
        if (!(t > 0.012)) continue;
        t = Math.min(1, t * gain);
        let r = cell * Math.sqrt(t / Math.PI);
        if (t > 0.78) r *= 1 + (t - 0.78) * 1.25;
        if (r < 0.62) continue;
        d += circ(x, y, r);
      }
    }
    return d;
  }

  // Variable-width line screen (engraving-like), vector polygons.
  function lineScreen({ box = [0, 0, W, H], pitch = 8, angle = 0, tone, step = 3, max = 0.96 }) {
    const [x0, y0, x1, y1] = box;
    const a = angle * Math.PI / 180, c = Math.cos(a), s = Math.sin(a);
    const nx = -s, ny = c;
    let umin = 1e9, umax = -1e9, vmin = 1e9, vmax = -1e9;
    for (const [x, y] of [[x0, y0], [x1, y0], [x0, y1], [x1, y1]]) {
      const u = x * c + y * s, v = -x * s + y * c;
      umin = Math.min(umin, u); umax = Math.max(umax, u); vmin = Math.min(vmin, v); vmax = Math.max(vmax, v);
    }
    let d = '';
    for (let j = Math.floor(vmin / pitch); j <= Math.ceil(vmax / pitch); j++) {
      const v = j * pitch;
      let top = [], bot = [];
      const flush = () => { if (top.length > 1) d += polyD(top.concat(bot.reverse())); top = []; bot = []; };
      for (let u = umin; u <= umax + step; u += step) {
        const x = u * c - v * s, y = u * s + v * c;
        if (x < x0 - step || x > x1 + step || y < y0 - step || y > y1 + step) { flush(); continue; }
        const t = Math.min(max, tone(x, y));
        const w = pitch * t;
        if (!(w > 0.55)) { flush(); continue; }
        top.push([x - nx * w / 2, y - ny * w / 2]); bot.push([x + nx * w / 2, y + ny * w / 2]);
      }
      flush();
    }
    return d;
  }

  function specks(R, n, rmin, rmax, box = [0, 0, W, H], round = false) {
    let d = '';
    for (let i = 0; i < n; i++) {
      const x = box[0] + R() * (box[2] - box[0]), y = box[1] + R() * (box[3] - box[1]);
      const r = rmin + (rmax - rmin) * Math.pow(R(), 2.2);
      if (round) d += circ(x, y, r);
      else { const s = f(r * 1.7); d += `M${f(x)} ${f(y)}h${s}v${s}h-${s}Z`; }
    }
    return d;
  }

  // ---------- text ----------
  const FONTS = {
    display: "'Bricolage Grotesque', sans-serif",
    serif: "'Instrument Serif', serif",
    mono: "'DM Mono', monospace",
  };
  let measurer = null;
  function measure(str, st) {
    if (!measurer) {
      const ns = 'http://www.w3.org/2000/svg';
      const svg = document.createElementNS(ns, 'svg');
      svg.setAttribute('width', '10'); svg.setAttribute('height', '10');
      svg.style.cssText = 'position:absolute;left:-9999px;top:0;visibility:hidden';
      measurer = document.createElementNS(ns, 'text');
      svg.appendChild(measurer); document.body.appendChild(svg);
    }
    measurer.setAttribute('style', textStyle(st));
    measurer.textContent = str;
    return measurer.getComputedTextLength();
  }
  function textStyle(st) {
    const fam = FONTS[st.font || 'display'];
    let s = `font-family:${fam};font-size:${st.size}px;font-weight:${st.weight || 400};`;
    if (st.italic) s += 'font-style:italic;';
    if (st.ls != null) s += `letter-spacing:${st.ls}em;`;
    if (st.font === 'display' || !st.font) s += `font-variation-settings:'opsz' ${st.opsz || 96}, 'wdth' ${st.wdth || 100};`;
    if (st.feat) s += `font-feature-settings:${st.feat};`;
    return s;
  }
  function T(x, y, str, st) {
    const anchor = st.anchor ? ` text-anchor="${st.anchor}"` : '';
    const fill = st.fill ? ` fill="${st.fill}"` : '';
    return `<text x="${f(x)}" y="${f(y)}"${anchor}${fill} style="${textStyle(st)}">${esc(str)}</text>`;
  }

  // ---------- title block ----------
  // book.title: array of lines (big display). book.tail: optional lines in serif italic.
  // book.kicker: optional small line above title.
  function layoutTitle(book, K) {
    const maxW = W - 2 * M - (book.titleInset || 0);
    const wdth = book.wdth || 88;
    const base = { font: 'display', weight: 800, opsz: 96, wdth, ls: book.ls != null ? book.ls : -0.018 };
    let widest = 0;
    for (const line of book.title) widest = Math.max(widest, measure(line, { ...base, size: 100 }));
    let size = Math.min(book.titleMax || 104, Math.floor(100 * maxW / widest));
    const lead = book.lead || 0.9;
    let y = book.titleTop || 88;
    let svg = '';
    if (book.kicker) {
      svg += T(M, y + 20, book.kicker, { font: 'serif', italic: true, size: 30, fill: K });
      y += 44;
    }
    const cap = size * 0.7;
    y += cap;
    const lines = [];
    book.title.forEach((line, i) => {
      if (i) y += size * lead;
      svg += T(M - size * 0.035, y, line, { ...base, size, fill: K });
      lines.push({ y, w: measure(line, { ...base, size }) });
    });
    let bottom = y + size * 0.12;
    if (book.tail) {
      const ts = book.tailSize || Math.round(Math.max(34, Math.min(52, size * 0.52)));
      y += size * 0.2;
      book.tail.forEach((line) => {
        y += ts * 0.98;
        svg += T(M, y, line, { font: 'serif', italic: true, size: ts, fill: K });
      });
      bottom = y + ts * 0.25;
    }
    return { svg, bottom, size, lines };
  }

  // ---------- chrome: level, stats, imprint, colophon ----------
  function levelMark(x, y, kind, s = 13) {
    if (kind === 'circle') return `<path d="${circ(x + s / 2, y - s / 2, s / 2 + 0.6)}"/>`;
    if (kind === 'square') return `<path d="${rectD(x, y - s, s, s)}"/>`;
    const r = s * 0.72, cx = x + s / 2, cy = y - s / 2;
    return `<path d="${polyD([[cx, cy - r], [cx + r, cy], [cx, cy + r], [cx - r, cy]])}"/>`;
  }
  // The Vizuara press mark: a V pulled from two drums. Left arm = first flash ink, right arm = key ink.
  function vMark(x, y, h) {
    const w = h * 1.16, t = h * 0.36;
    const left = [[x, y - h], [x + t, y - h], [x + w / 2 + t * 0.5, y], [x + w / 2 - t * 0.5, y]];
    const right = [[x + w, y - h], [x + w - t, y - h], [x + w / 2 - t * 0.5, y], [x + w / 2 + t * 0.5, y]];
    return { left: `<path d="${polyD(left)}"/>`, right: `<path d="${polyD(right)}"/>`, w };
  }

  function chrome(book, K, flashes) {
    const lv = LEVELS[book.level];
    const mono = { font: 'mono', size: 12.5, weight: 500, ls: 0.14 };
    let key = '', flash0 = '';
    // top row
    const ty = 56;
    key += levelMark(M, ty, lv.mark, 13);
    key += T(M + 22, ty, lv.label.toUpperCase(), mono);
    let right = book.coming ? 'FORTHCOMING' : `${book.capsules} CAPSULES · ${book.hours} HRS`;
    key += T(W - M, ty, right, { ...mono, anchor: 'end' });
    // footer: imprint
    const fy = H - M + 2;
    const v = vMark(M, fy, 22);
    flash0 += v.left; key += v.right;
    const wm = { font: 'display', weight: 800, size: 19, wdth: 100, opsz: 24, ls: 0.06 };
    key += T(M + v.w + 10, fy - 2, 'VIZUARA', wm);
    key += T(M + v.w + 10 + measure('VIZUARA', wm) + 8, fy - 2, 'BOOKS', { font: 'mono', weight: 400, size: 12.5, ls: 0.18 });
    // colophon: the inks this cover is printed in, each swatch printed in its own drum
    const names = [...flashes.map((k) => INK[k].name), INK[lv.ink].name];
    const label = names.join(' + ').toUpperCase();
    const monoS = { font: 'mono', size: 10.5, weight: 400, ls: 0.1 };
    const lw = measure(label, monoS);
    const sx = W - M - lw - 12 - names.length * 12;
    const swatches = [];
    names.forEach((n, i) => swatches.push({ x: sx + i * 12 + 5, y: fy - 6.5, drum: i < flashes.length ? i : 'key' }));
    key += T(W - M, fy - 2, label, { ...monoS, anchor: 'end' });
    // forthcoming titles are shown as press proofs: corner marks + registration targets in every drum
    let proof = '';
    if (book.coming) {
      const tgt = (x, y) => `<path d="${circ(x, y, 7.5)}${circ(x, y, 5.9)}" fill-rule="evenodd"/><path d="${rectD(x - 13, y - 0.8, 26, 1.6)}${rectD(x - 0.8, y - 13, 1.6, 26)}"/>`;
      proof = tgt(17, H / 2) + tgt(W - 17, H / 2) + tgt(W / 2, 14);
      let cm = '';
      [[0, 0, 1, 1], [W, 0, -1, 1], [0, H, 1, -1], [W, H, -1, -1]].forEach(([x, y, sx, sy]) => {
        cm += rectD(Math.min(x, x + sx * 16), y + sy * 12 - 0.8, 16, 1.6) + rectD(x + sx * 12 - 0.8, Math.min(y, y + sy * 16), 1.6, 16);
      });
      key += `<path d="${cm}"/>`;
    }
    key += proof;
    return { key, flash0, swatches, proof };
  }

  // ---------- assemble ----------
  const EMBLEMS = {};

  // Print a sheet: paper, flash drums (each slightly misregistered), key drum, then paper tooth + ink voids.
  function sheet({ w = W, h = H, id, FX, K, flash = [], key = '', defs = '', top = '', label = '' }) {
    const MR = rng(id + ':reg');
    const regs = FX.map(() => {
      const ang = MR() * Math.PI * 2, dist = 1.6 + MR() * 1.9;
      return { dx: f(Math.cos(ang) * dist), dy: f(Math.sin(ang) * dist), rot: f((MR() - 0.5) * 0.3 * 100) / 100 };
    });
    const drums = FX.map((hex, i) => {
      const r = regs[i];
      return `<g class="drum" style="mix-blend-mode:multiply" fill="${hex}" transform="translate(${r.dx} ${r.dy}) rotate(${r.rot} ${w / 2} ${h / 2})">${flash[i] || ''}</g>`;
    }).join('');
    const area = (w * h) / (W * H);
    const PR = rng(id + ':paper');
    const box = [0, 0, w, h];
    const tooth = specks(PR, Math.round(9000 * area), 0.22, 0.7, box);
    const tooth2 = specks(PR, Math.round(1400 * area), 0.35, 1.1, box, true);
    const voids = specks(PR, Math.round(11000 * area), 0.2, 0.62, box);
    const voids2 = specks(PR, Math.round(380 * area), 0.45, 1.05, box, true);
    let mottle = '', mdefs = '';
    for (let i = 0; i < Math.max(1, Math.round(5 * area)); i++) {
      const gid = `mt-${id}-${i}`;
      mdefs += `<radialGradient id="${gid}"><stop offset="0" stop-color="${PAPER}" stop-opacity="${f(0.1 + PR() * 0.1)}"/><stop offset="1" stop-color="${PAPER}" stop-opacity="0"/></radialGradient>`;
      mottle += `<ellipse cx="${f(PR() * w)}" cy="${f(PR() * h)}" rx="${f(120 + PR() * 220)}" ry="${f(90 + PR() * 160)}" fill="url(#${gid})"/>`;
    }
    const stray = specks(PR, Math.round(26 * area), 0.5, 1.5, [0, 120, w, h - 60]);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img"${label ? ` aria-label="${esc(label)}"` : ''}>
<defs>${mdefs}${defs}</defs>
<g style="isolation:isolate">
<rect width="${w}" height="${h}" fill="${PAPER}"/>
<g style="mix-blend-mode:multiply"><path d="${tooth}" fill="#6b5e45" fill-opacity="0.13"/><path d="${tooth2}" fill="#8a7b5c" fill-opacity="0.08"/></g>
${drums}
<g>${mottle}</g>
<g class="drum key" style="mix-blend-mode:multiply" fill="${K}">${key}<path d="${stray}" fill-opacity="0.55"/></g>
${top}
<path d="${voids}" fill="${PAPER}" fill-opacity="0.55"/><path d="${voids2}" fill="${PAPER}" fill-opacity="0.5"/>
</g></svg>`;
  }

  function coverParts(book) {
    const lv = LEVELS[book.level];
    const K = INK[lv.ink].hex;
    const R = rng(book.slug);
    const FX = book.flash.map((k) => INK[k].hex);
    const title = layoutTitle(book, K);
    const ctx = { W, H, M, R, K, FX, title, book, halftone, lineScreen, circ, rectD, polyD, T, measure, rng, f, PAPER, INK };
    const E = EMBLEMS[book.slug](ctx);
    const ch = chrome(book, K, book.flash);
    const flash = FX.map((_, i) => {
      let body = (E.flash && E.flash[i]) || '';
      if (i === 0) body += ch.flash0;
      body += ch.proof || '';
      ch.swatches.filter((s) => s.drum === i).forEach((s) => { body += `<path d="${circ(s.x, s.y, 4.6)}"/>`; });
      return body;
    });
    let keySw = '';
    ch.swatches.filter((s) => s.drum === 'key').forEach((s) => { keySw += `<path d="${circ(s.x, s.y, 4.6)}"/>`; });
    return { K, FX, flash, key: (E.key || '') + title.svg + ch.key + keySw, defs: E.defs || '', top: E.top || '', title };
  }

  function coverSVG(book) {
    const P = coverParts(book);
    return sheet({ id: book.slug, FX: P.FX, K: P.K, flash: P.flash, key: P.key, defs: P.defs, top: P.top, label: `${book.fullTitle} — cover` });
  }

  function buildCover(book) {
    const el = document.createElement('div');
    el.className = 'cover';
    el.dataset.slug = book.slug;
    el.innerHTML = coverSVG(book);
    return el;
  }

  window.RISO = { W, H, M, PAPER, INK, LEVELS, EMBLEMS, buildCover, coverSVG, coverParts, sheet, layoutTitle, chrome, halftone, lineScreen, circ, rectD, polyD, T, rng, f, measure, specks, vMark, levelMark, esc, textStyle };
})();
