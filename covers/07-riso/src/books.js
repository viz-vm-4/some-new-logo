/* Book specs + one emblem per book. Each emblem returns ink artwork per drum:
   { flash: [svg for drum 1, svg for drum 2], key: svg for the key (level) drum, defs } */
(function () {
  'use strict';
  const { EMBLEMS, halftone, lineScreen, circ, rectD, polyD, T, f, textStyle, esc, W, H, M } = window.RISO;
  const p = (d, extra = '') => d ? `<path d="${d}"${extra}/>` : '';
  const bar = (a, b, w) => { // thick straight stroke as a polygon
    const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1;
    const nx = -dy / L * w / 2, ny = dx / L * w / 2;
    return polyD([[a[0] + nx, a[1] + ny], [b[0] + nx, b[1] + ny], [b[0] - nx, b[1] - ny], [a[0] - nx, a[1] - ny]]);
  };
  const ring = (x, y, r, w) => circ(x, y, r + w / 2) + circ(x, y, r - w / 2);
  const pe = (d) => d ? `<path d="${d}" fill-rule="evenodd"/>` : '';
  const serifSub = (x, y, base, sub, size, anchor) => `<text x="${f(x)}" y="${f(y)}"${anchor ? ` text-anchor="${anchor}"` : ''} style="${textStyle({ font: 'serif', italic: true, size })}">${esc(base)}<tspan dy="${f(size * 0.2)}" style="font-size:${f(size * 0.62)}px">${esc(sub)}</tspan></text>`;
  const mono = (sz = 13, w = 500, ls = 0.06) => ({ font: 'mono', size: sz, weight: w, ls });

  const BOOKS = [
    { slug: 'ai-context-engineering', fullTitle: 'AI Context Engineering', title: ['AI Context', 'Engineering'],
      level: 'intermediate', capsules: 43, hours: 10, flash: ['sunflower'], wdth: 90, titleMax: 112,
      note: 'The context window as a solid block of ink. Every source — system prompt, tools, memory, retrieved docs, history, query — is a strip of tokens; inside the window they overprint solid, outside they survive only as a 30% screen. A token-budget ruler runs down the edge.' },
    { slug: 'mathematical-foundations-for-ml', fullTitle: 'Mathematical Foundations for Machine Learning',
      title: ['Mathematical', 'Foundations for', 'Machine Learning'], level: 'beginner', capsules: 43, hours: 10,
      flash: ['yellow'], wdth: 84, titleMax: 96,
      note: 'A normal density printed as a solid of Yellow; the 68–95–99.7 rule overprinted as three Hunter Green halftone steps that fade in beneath the title.' },
    { slug: 'neural-networks-from-scratch', fullTitle: 'Neural Networks from Scratch', title: ['Neural Networks', 'from Scratch'],
      level: 'beginner', capsules: 33, hours: 7, flash: ['fpink'], wdth: 86, titleMax: 104,
      note: 'A 3-5-5-2 multilayer perceptron. Positive weights print in green, negative in pink, stroke width = |w|; hidden units carry their activation as a halftone.' },
    { slug: 'build-llms-from-scratch', fullTitle: 'Build Large Language Models (LLMs) from Scratch',
      title: ['Build Large', 'Language Models', '(LLMs) from Scratch'], level: 'intermediate', capsules: 20, hours: 6,
      flash: ['orange'], wdth: 84, titleMax: 90,
      note: 'The causal attention mask of a decoder-only LLM. Dot size = attention weight; the staircase reads “Every token attends to itself and those before it” — which is exactly what the matrix shows.' },
    { slug: '5d-parallelism', fullTitle: '5D Parallelism for Large Model Training', title: ['5D Parallelism'],
      tail: ['for Large Model Training'], level: 'advanced', capsules: 40, hours: 9, flash: ['aqua', 'fpink'], wdth: 86, titleMax: 112,
      note: 'A 2×2×2×2×2 device mesh drawn as a projected 5-cube: 32 GPUs, 80 links, each link direction one axis of parallelism (data, tensor, pipeline, context, expert), each printed in its own ink combination.' },
    { slug: 'pi-vs-hermes-vs-codex', fullTitle: 'Pi vs Hermes vs Codex: Context Compaction and Memory',
      title: ['Pi vs Hermes', 'vs Codex'], tail: ['Context Compaction', 'and Memory'], level: 'advanced', capsules: 9, hours: 1,
      flash: ['yellow', 'fpink'], wdth: 88, titleMax: 108, tailSize: 44,
      note: 'Three agent harnesses as three columns of conversation. Lines of context crowd together until they fuse into a solid block of memory — compaction as a line screen closing up. The third column is printed in both drums.' },

    { slug: 'charlie-language-room', fullTitle: 'Charlie and the Language Room', series: 'I', kicker: 'Charlie and the',
      title: ['Language Room'], tail: ['Inference Engineering'], level: 'advanced', capsules: 22, hours: 5,
      flash: ['sunflower', 'fpink'], wdth: 88, titleMax: 104, tailSize: 38, room: 'language',
      note: 'Series I. Behind the factory door: a paragraph being decoded token by token, the next token still an outline.' },
    { slug: 'charlie-vision-room', fullTitle: 'Charlie and the Vision Room', series: 'II', kicker: 'Charlie and the',
      title: ['Vision Room'], tail: ['Vision Transformers'], level: 'intermediate', capsules: 20, hours: 6,
      flash: ['sunflower', 'aqua'], wdth: 88, titleMax: 104, tailSize: 38, room: 'vision',
      note: 'Series II. An eye cut into 16×16-style patches, each patch one flat halftone value — how a Vision Transformer sees.' },
    { slug: 'charlie-sound-room', fullTitle: 'Charlie and the Sound Room', series: 'III', kicker: 'Charlie and the',
      title: ['Sound Room'], tail: ['Voice Agents'], level: 'intermediate', capsules: 20, hours: 6,
      flash: ['sunflower', 'forange'], wdth: 88, titleMax: 104, tailSize: 38, room: 'sound',
      note: 'Series III. A voice-agent conversation as a waveform: the user’s turns in orange, the agent’s replies in blue.' },
    { slug: 'charlie-reasoning-room', fullTitle: 'Charlie and the Reasoning Room', series: 'IV', kicker: 'Charlie and the',
      title: ['Reasoning Room'], tail: ['From bandits to reasoning models'], level: 'advanced', capsules: 21, hours: 6,
      flash: ['sunflower', 'green'], wdth: 86, titleMax: 104, tailSize: 36, room: 'reasoning',
      note: 'Series IV. A search tree grown from a root of bandit arms; leaf rewards as halftones, one chain of reasoning printed solid.' },

    { slug: 'kernel-engineering', fullTitle: 'Kernel Engineering', title: ['Kernel', 'Engineering'], coming: true,
      tail: ['From silicon to speculative decoding —', 'GPU kernels for modern LLMs.'], tailSize: 29,
      level: 'advanced', flash: ['yellow', 'fpink'], wdth: 90, titleMax: 118,
      note: 'A tiled matrix multiply. A row-panel of A (yellow) and a column-panel of B (pink) cross; where the inks overprint, tile C[i,j] is computed. Forthcoming titles are printed as press proofs, with crop marks and registration targets.' },
    { slug: 'deit-from-scratch', fullTitle: 'Build a Data-Efficient Image Transformer (DeiT) from Scratch',
      title: ['Build a Data-Efficient', 'Image Transformer', '(DeiT) from Scratch'], level: 'advanced', capsules: 42, hours: 10,
      flash: ['aqua', 'forange'], wdth: 82, titleMax: 84,
      note: 'DeiT’s one new idea: a distillation token. An image split into patches, a class token, and a distillation token wired to a convolutional teacher.' },
    { slug: 'machine-learning-fundamentals', fullTitle: 'Machine Learning Fundamentals', title: ['Machine Learning', 'Fundamentals'],
      level: 'beginner', capsules: 37, hours: 9, flash: ['bubblegum', 'cornflower'], wdth: 86, titleMax: 104,
      note: 'A linear classifier. Its confidence for each class is a halftone screen in that class’s ink, set at opposing angles; the decision boundary is where the two screens cross at 50% and the inks mix.' },
    { slug: 'reinforcement-learning', fullTitle: 'Reinforcement Learning', title: ['Reinforcement', 'Learning'],
      level: 'intermediate', capsules: 38, hours: 8, flash: ['yellow'], wdth: 88, titleMax: 112,
      note: 'A gridworld after value iteration. Each cell’s value V(s) is its dot size, arrows show the greedy policy, and the agent’s path runs from start to the goal.' },
    { slug: 'sql-masterclass', fullTitle: 'SQL Masterclass', title: ['SQL', 'Masterclass'], level: 'beginner', capsules: 36, hours: 8,
      flash: ['aqua', 'yellow'], wdth: 92, titleMax: 124,
      note: 'Two tables as two stacks of rows. Printed in two inks, their overlap is literally the INNER JOIN — the medium does the query.' },
  ];

  // ================================================================ AI Context Engineering
  // The context window is a solid block of Sunflower. Sources of tokens run across the whole page as strips;
  // inside the window they print solid Federal Blue (overprinting to a deep olive), outside only as a screen.
  EMBLEMS['ai-context-engineering'] = ({ R, K, title }) => {
    const top = title.bottom + 26, bot = 780;
    const win = { x0: 150, x1: 566, y0: title.bottom - 44, y1: 806 };
    const pitch = 28, bh = 17, lab = 108;
    const rows = [];
    for (let y = top; y + bh <= bot; y += pitch) rows.push(y);
    const segs = [];
    rows.forEach((y) => {
      let x = -60 + R() * 140;
      while (x < 780) { const len = 34 + Math.pow(R(), 1.25) * 210; segs.push({ x0: x, x1: x + len, y }); x += len + 9 + R() * 14; }
    });
    const inside = [], outside = [];
    for (const s of segs) {
      const a = Math.max(s.x0, win.x0 + lab), b = Math.min(s.x1, win.x1 - 16);
      if (b > a + 6) inside.push({ ...s, x0: a, x1: b });
      if (s.x0 < win.x0 - 14) outside.push({ ...s, x1: Math.min(s.x1, win.x0 - 14) });
    }
    let strips = '';
    for (const s of inside) strips += rectD(s.x0, s.y, s.x1 - s.x0, bh);
    const hit = (x, y) => outside.some((s) => x >= s.x0 && x <= s.x1 && y >= s.y && y <= s.y + bh);
    const dots = halftone({ box: [-10, top - 4, 730, bot + 4], cell: 6.5, angle: 45, tone: (x, y) => hit(x, y) ? 0.3 : 0 });
    const block = rectD(win.x0, win.y0, win.x1 - win.x0, win.y1 - win.y0);
    let key = p(strips);
    const plan = [['system', 1], ['tools', 2], ['memory', 2], ['retrieved', 4], ['history', 5], ['query', 1]];
    let ri = 0;
    for (const [name, n] of plan) {
      if (ri >= rows.length) break;
      key += T(win.x0 + 14, rows[ri] + 13, name, mono(13, 500, 0.02));
      if (ri > 0) key += p(rectD(win.x0, rows[ri] - 6, 94, 2));
      ri += n;
    }
    // token budget ruler down the right edge of the window
    const ry0 = top, ry1 = win.y1 - 16;
    for (let i = 0; i <= 24; i++) { const y = ry0 + (ry1 - ry0) * i / 24; key += p(rectD(win.x1 + 6, y - 1, i % 6 === 0 ? 18 : 9, 2)); }
    key += T(win.x1 + 8, ry0 - 14, '128K', mono(12.5));
    key += T(win.x1 + 32, ry1 + 4.5, '0', mono(12.5));
    return { flash: [p(block) + p(dots)], key };
  };

  // ================================================================ Mathematical Foundations
  EMBLEMS['mathematical-foundations-for-ml'] = ({ R, K, title }) => {
    const base = 752, mu = 410, sig = 112;
    const peakY = title.bottom - 46;            // the bell rises behind the last line: green overprints yellow
    const peak = base - peakY;
    const g = (x) => Math.exp(-((x - mu) ** 2) / (2 * sig * sig));
    const yAt = (x) => base - peak * g(x);
    const pts = [[-20, base]];
    for (let x = -20; x <= 740; x += 3) pts.push([x, yAt(x)]);
    pts.push([740, base]);
    const bell = polyD(pts);
    // the 68–95–99.7 rule as three halftone steps, fading in below the title
    const clearY = title.bottom + 14;
    const tone = (x, y) => {
      if (y < yAt(x) + 6 || y > base - 4) return 0;
      const z = Math.abs(x - mu) / sig;
      const band = z < 1 ? 0.62 : z < 2 ? 0.34 : z < 3 ? 0.14 : 0;
      const fade = Math.max(0, Math.min(1, (y - clearY) / 150));
      return band * fade;
    };
    let key = p(halftone({ box: [0, clearY, W, base], cell: 7.2, angle: 45, tone }));
    // sigma dividers
    [-2, -1, 1, 2].forEach((k) => { const x = mu + k * sig; key += p(rectD(x - 1.75, Math.max(yAt(x), clearY + 30), 3.5, base - Math.max(yAt(x), clearY + 30))); });
    // the density curve + axis
    const lw = 5.5, top = [], bot = [];
    for (let x = -20; x <= 740; x += 3) { top.push([x, yAt(x) - lw / 2]); bot.push([x, yAt(x) + lw / 2]); }
    key += p(polyD(top.concat(bot.reverse())));
    key += p(rectD(-10, base, 740, 5));
    // ticks and labels
    const lab = { font: 'serif', italic: true, size: 31 };
    [[-2, 'μ−2σ'], [-1, 'μ−σ'], [0, 'μ'], [1, 'μ+σ'], [2, 'μ+2σ']].forEach(([k, s]) => {
      const x = mu + k * sig;
      key += p(rectD(x - 2.5, base, 5, 16));
      key += T(x, base + 46, s, { ...lab, anchor: 'middle' });
    });
    return { flash: [p(bell)], key };
  };

  // ================================================================ Neural Networks from Scratch
  EMBLEMS['neural-networks-from-scratch'] = ({ R, K, title, book }) => {
    const layers = [3, 5, 5, 2];
    const xs = [132, 300, 468, 612];
    const top = title.bottom + 62, bot = 770, sp = (bot - top) / 4, rN = 31;
    const nodes = layers.map((n, li) => Array.from({ length: n }, (_, i) => ({ x: xs[li], y: (top + bot) / 2 + (i - (n - 1) / 2) * sp, a: R() })));
    let pos = '', neg = '', maskHoles = '';
    for (let li = 0; li < layers.length - 1; li++) {
      for (const a of nodes[li]) for (const b of nodes[li + 1]) {
        const w = R() * 2 - 1;
        const d = bar([a.x, a.y], [b.x, b.y], 1.8 + 7.5 * Math.pow(Math.abs(w), 1.5));
        if (w >= 0) pos += d; else neg += d;
      }
    }
    let disks = '', rings = '', act = '';
    nodes.flat().forEach((n) => { disks += circ(n.x, n.y, rN); rings += ring(n.x, n.y, rN, 5); maskHoles += circ(n.x, n.y, rN + 1); });
    // hidden activations as key-ink halftone inside the units (overprint)
    nodes.slice(1, 3).flat().forEach((n) => {
      act += halftone({ box: [n.x - rN, n.y - rN, n.x + rN, n.y + rN], cell: 7, angle: 15, tone: (x, y) => Math.hypot(x - n.x, y - n.y) < rN - 5 ? 0.12 + n.a * 0.6 : 0 });
    });
    const mid = `nn-mask-${book.slug}`;
    const defs = `<mask id="${mid}" maskUnits="userSpaceOnUse" x="0" y="0" width="${W}" height="${H}"><rect width="${W}" height="${H}" fill="#fff"/><path d="${maskHoles}" fill="#000"/></mask>`;
    let key = `<g mask="url(#${mid})">${p(pos)}</g>` + pe(rings) + p(act);
    nodes[0].forEach((n, i) => { key += serifSub(n.x - rN - 16, n.y + 10, 'x', String(i + 1), 36, 'end'); });
    nodes[3].forEach((n, i) => { key += serifSub(n.x + rN + 14, n.y + 10, 'ŷ', String(i + 1), 36); });
    return { flash: [p(neg) + p(disks)], key, defs };
  };

  // ================================================================ Build LLMs from Scratch
  EMBLEMS['build-llms-from-scratch'] = ({ R, K, title }) => {
    const words = ['Every', 'token', 'attends', 'to', 'itself', 'and', 'those', 'before', 'it'];
    const N = words.length, y1 = 800, pch = Math.min(56, Math.floor((y1 - title.bottom - 26) / N)), gap = 6, x0 = M, y0 = y1 - N * pch;
    let fl = '', key = '';
    for (let i = 0; i < N; i++) {
      const sc = [];
      for (let j = 0; j <= i; j++) sc.push(-0.55 * (i - j) + (j === 0 ? 1.1 : 0) + (j === i ? 0.6 : 0) + (R() - 0.5) * 1.6);
      const mx = Math.max(...sc);
      const w = sc.map((s) => Math.exp(s - mx));
      for (let j = 0; j <= i; j++) {
        const t = Math.min(1, 0.07 + w[j] * 0.93);
        const cx = x0 + j * pch, cy = y0 + i * pch;
        if (t > 0.9) fl += rectD(cx, cy, pch - gap, pch - gap);
        else fl += halftone({ box: [cx + 2, cy + 2, cx + pch - gap - 2, cy + pch - gap - 2], cell: 7.5, angle: 45, tone: () => t });
      }
    }
    // causal boundary: the staircase
    let st = [[x0 - gap / 2, y0 - gap / 2]];
    for (let i = 0; i < N; i++) { st.push([x0 + (i + 1) * pch - gap / 2, y0 + i * pch - gap / 2]); st.push([x0 + (i + 1) * pch - gap / 2, y0 + (i + 1) * pch - gap / 2]); }
    for (let k = 0; k < st.length - 1; k++) key += p(bar(st[k], st[k + 1], 5)) + p(rectD(st[k + 1][0] - 2.5, st[k + 1][1] - 2.5, 5, 5));
    words.forEach((wd, i) => { key += T(x0 + (i + 1) * pch + 12, y0 + i * pch + pch / 2 + 3, wd, { font: 'mono', size: 19, weight: 500, ls: -0.01 }); });
    return { flash: [p(fl)], key };
  };

  // ================================================================ 5D Parallelism
  EMBLEMS['5d-parallelism'] = ({ R, K, title }) => {
    const ang = [8, 43, 81, 116, 154].map((a) => a * Math.PI / 180);
    const len = [150, 132, 160, 128, 146];
    const V = ang.map((a, i) => [Math.cos(a) * len[i], Math.sin(a) * len[i]]);
    const verts = [];
    for (let m = 0; m < 32; m++) { let x = 0, y = 0; for (let k = 0; k < 5; k++) if (m >> k & 1) { x += V[k][0]; y += V[k][1]; } verts.push([x, y]); }
    const xsV = verts.map((v) => v[0]), ysV = verts.map((v) => v[1]);
    const bw = Math.max(...xsV) - Math.min(...xsV), bh = Math.max(...ysV) - Math.min(...ysV);
    const top = title.bottom + 26, bot = 770;
    const sc = Math.min((bot - top) / bh, 560 / bw);
    const ox = W / 2 + 12 - (Math.min(...xsV) + bw / 2) * sc, oy = (top + bot) / 2 - (Math.min(...ysV) + bh / 2) * sc;
    const P = verts.map((v) => [ox + v[0] * sc, oy + v[1] * sc]);
    const cx = ox + (Math.min(...xsV) + bw / 2) * sc, cy = (top + bot) / 2;
    // glow behind the mesh: aqua halftone
    let aq = p(halftone({ box: [0, top - 60, W, bot + 40], cell: 8, angle: 15, tone: (x, y) => 0.62 * Math.exp(-(((x - cx) / 250) ** 2 + ((y - cy) / 230) ** 2)) }));
    let pk = '', key = '';
    const styles = ['black', 'aqua', 'pink', 'both', 'dash'];
    let blk = '', dsh = '';
    for (let m = 0; m < 32; m++) for (let k = 0; k < 5; k++) {
      if (m >> k & 1) continue;
      const a = P[m], b = P[m | (1 << k)];
      const s = styles[k];
      if (s === 'black') blk += bar(a, b, 3.8);
      else if (s === 'aqua') aq += p(bar(a, b, 7));
      else if (s === 'pink') pk += p(bar(a, b, 7));
      else if (s === 'both') { aq += p(bar(a, b, 7)); pk += p(bar(a, b, 7)); }
      else { const L = Math.hypot(b[0] - a[0], b[1] - a[1]), n = Math.floor(L / 11); for (let q = 0; q < n; q++) { const t0 = q / n, t1 = (q + 0.55) / n; dsh += bar([a[0] + (b[0] - a[0]) * t0, a[1] + (b[1] - a[1]) * t0], [a[0] + (b[0] - a[0]) * t1, a[1] + (b[1] - a[1]) * t1], 3.8); } }
    }
    key += p(blk) + p(dsh);
    // GPUs: square chips, knocked-out centre
    let chips = '';
    P.forEach(([x, y]) => { chips += rectD(x - 10, y - 10, 20, 20) + rectD(x - 4, y - 4, 8, 8); });
    key += `<path d="${chips}" fill-rule="evenodd"/>`;
    // legend
    const ly = 812, items = [['DATA', 'black'], ['TENSOR', 'aqua'], ['PIPELINE', 'pink'], ['CONTEXT', 'both'], ['EXPERT', 'dash']];
    let lx = M;
    const ms = mono(11.5, 500, 0.1);
    items.forEach(([name, s]) => {
      const a = [lx, ly - 4], b = [lx + 26, ly - 4];
      if (s === 'black') key += p(bar(a, b, 3.2));
      if (s === 'aqua' || s === 'both') aq += p(bar(a, b, 5.5));
      if (s === 'pink' || s === 'both') pk += p(bar(a, b, 5.5));
      if (s === 'dash') key += p(bar(a, [lx + 7, ly - 4], 3.2) + bar([lx + 11, ly - 4], [lx + 18, ly - 4], 3.2) + bar([lx + 22, ly - 4], b, 3.2));
      key += T(lx + 34, ly, name, ms);
      lx += 34 + window.RISO.measure(name, ms) + 26;
    });
    return { flash: [aq, pk], key };
  };

  // ================================================================ Pi vs Hermes vs Codex
  // Three harnesses, three columns of conversation. Turns (black speaker marks) crowd together as the
  // context fills, until the line screen closes up into a solid block of memory, knocked out of the ink.
  EMBLEMS['pi-vs-hermes-vs-codex'] = ({ R, K, title, book }) => {
    const top = title.bottom + 64, bot = 800, cw = 190, gapc = 25;
    const cols = [{ x: M, name: 'PI', c0: 0.2, e: 1.5 }, { x: M + cw + gapc, name: 'HERMES', c0: 0.36, e: 1.0 }, { x: M + 2 * (cw + gapc), name: 'CODEX', c0: 0.5, e: 0.7 }];
    const outs = ['', ''];
    let key = '', knock = '';
    cols.forEach((c, ci) => {
      let d = '';
      let y = top, n = 0;
      const hL = 6;
      while (y < bot) {
        const t = (y - top) / (bot - top);
        const k = Math.max(0, (t - c.c0) / (1 - c.c0));
        const pitch = 25 - (25 - hL) * Math.pow(Math.min(1, k * 1.3), c.e);
        if (pitch <= hL + 0.35) { d += rectD(c.x, y, cw, bot - y); break; }
        const x0 = k > 0 ? c.x : c.x + 16;
        const len = (cw - (x0 - c.x)) * (k > 0 ? (0.55 + 0.45 * R()) * (1 - k) + k : 0.3 + 0.7 * R());
        d += rectD(x0, y, len, hL);
        if (k === 0) key += (n % 2 ? p(circ(c.x + 4.5, y + hL / 2, 4.5)) : p(rectD(c.x, y - 1.5, 9, 9)));
        y += pitch; n++;
      }
      if (ci === 0) outs[0] += p(d); else if (ci === 1) outs[1] += p(d); else { outs[0] += p(d); outs[1] += p(d); }
      knock += T(c.x + 10, bot - 12, 'MEMORY', mono(12, 500, 0.16));
      key += T(c.x, top - 20, c.name, mono(13, 500, 0.16));
    });
    const id = `pm-${book.slug}`;
    const defs = `<mask id="${id}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${W + 40}" height="${H + 40}"><rect x="-20" y="-20" width="${W + 40}" height="${H + 40}" fill="#fff"/><g fill="#000">${knock}</g></mask>`;
    return { flash: outs.map((o) => `<g mask="url(#${id})">${o}</g>`), key, defs };
  };

  // ================================================================ Charlie and the Intelligence Factory (sub-series)
  // One shared building for the four books: a saw-tooth factory printed in Sunflower, the series ink.
  // Each book opens a different door; the room behind it is printed in that room's own ink.
  function factory(ctx, drawRoom) {
    const { R, K, title, book } = ctx;
    const roofBase = 432, tooth = 180, th = 70, ground = 800;
    const pts = [[-10, ground], [-10, roofBase]];
    for (let x = -10; x < W + 10; x += tooth) { pts.push([x, roofBase - th]); pts.push([x + tooth, roofBase]); }
    pts.push([W + 10, ground]);
    const door = { cx: W / 2 + 40, w: 330, top: 500 };
    const r = door.w / 2;
    const doorD = `M${door.cx - r} ${ground}V${door.top + r}A${r} ${r} 0 0 1 ${door.cx + r} ${door.top + r}V${ground}Z`;
    const id = book.slug;
    const chim = { x: 600, w: 40, top: 300 };
    const defs = `<mask id="door-${id}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${W + 40}" height="${H + 40}"><rect x="-20" y="-20" width="${W + 40}" height="${H + 40}" fill="#fff"/><path d="${doorD}" fill="#000"/></mask>
      <clipPath id="doorclip-${id}"><path d="${doorD}"/></clipPath>
      <mask id="sign-${id}" maskUnits="userSpaceOnUse" x="-20" y="-20" width="${W + 40}" height="${H + 40}"><rect x="-20" y="-20" width="${W + 40}" height="${H + 40}" fill="#fff"/>
        <g fill="#000">${T(M, roofBase + 29, 'CHARLIE AND THE INTELLIGENCE FACTORY', mono(13, 500, 0.2))}${T(W - M, roofBase + 29, 'ROOM ' + book.series, { ...mono(13, 500, 0.2), anchor: 'end' })}</g></mask>`;
    // facade + chimney in the series ink, door knocked out
    let sun = `<g mask="url(#door-${id})"><path d="${polyD(pts)}"/><path d="${rectD(chim.x, chim.top, chim.w, roofBase - chim.top)}"/></g>`;
    // smoke: halftone puffs drifting off the page
    const puffs = [[chim.x + 22, chim.top - 34, 26], [chim.x + 58, chim.top - 92, 36], [chim.x + 110, chim.top - 160, 46]];
    sun += p(halftone({ box: [chim.x - 40, 60, W + 10, chim.top - 4], cell: 7, angle: 45, tone: (x, y) => {
      let t = 0; puffs.forEach(([px, py, pr], i) => { const d = Math.hypot(x - px, y - py) / pr; if (d < 1) t = Math.max(t, (0.75 - i * 0.16) * (1 - d * d * 0.55)); }); return t; } }));
    let key = '';
    key += `<g mask="url(#sign-${id})"><path d="${rectD(-10, roofBase + 8, W + 20, 30)}"/></g>`;
    for (let x = -10; x < W + 10; x += tooth) key += p(rectD(x - 3, roofBase - th, 6, th + 8));
    key += p(rectD(chim.x - 5, chim.top - 8, chim.w + 10, 10));
    key += p(rectD(-10, ground, W + 20, 6));
    const fw = 9;
    key += `<path d="M${door.cx - r - fw} ${ground}V${door.top + r}A${r + fw} ${r + fw} 0 0 1 ${door.cx + r + fw} ${door.top + r}V${ground}H${door.cx + r}V${door.top + r}A${r} ${r} 0 0 0 ${door.cx - r} ${door.top + r}V${ground}Z"/>`;
    key += T(M - 4, 640, book.series, { font: 'serif', size: 124 });
    const room = drawRoom({ ...ctx, door, r, ground });
    return {
      flash: [sun + (room.f0 || ''), `<g clip-path="url(#doorclip-${id})">${room.f1 || ''}</g>`],
      key: key + `<g clip-path="url(#doorclip-${id})">${room.key || ''}</g>`,
      defs: defs + (room.defs || ''),
    };
  }

  EMBLEMS['charlie-language-room'] = (ctx) => factory(ctx, ({ R, K, door, r, ground }) => {
    let f1 = '', key = '';
    const x0 = door.cx - r + 26, x1 = door.cx + r - 24, th = 20, lh = 31;
    let y = door.top + 62, last = null, line = 0;
    const lines = Math.floor((ground - 40 - y) / lh);
    for (; line < lines; line++, y += lh) {
      const inset = Math.max(0, r - Math.sqrt(Math.max(0, r * r - Math.max(0, door.top + r - y) ** 2)));
      let x = x0 + inset;
      const limit = line === lines - 1 ? x0 + 150 : x1 - inset;
      while (x < limit) {
        const w = 20 + Math.pow(R(), 1.7) * 86;
        if (x + w > limit) break;
        f1 += `<rect x="${f(x)}" y="${f(y)}" width="${f(w)}" height="${th}" rx="${th / 2}"/>`;
        last = [x + w, y];
        x += w + 7;
      }
    }
    const nx = last[0] + 7, ny = last[1];
    key += `<rect x="${f(nx + 2)}" y="${f(ny + 2)}" width="72" height="${th - 4}" rx="${(th - 4) / 2}" fill="none" stroke="${K}" stroke-width="4" stroke-dasharray="8 5"/>`;
    key += p(rectD(nx + 86, ny - 5, 5, th + 10));
    return { f1, key };
  });

  EMBLEMS['charlie-vision-room'] = (ctx) => factory(ctx, ({ R, K, door, r, ground }) => {
    let f1 = '', key = '';
    const s = 33, g = 4, cols = 10, rows = 9, gx = door.cx - (cols * s) / 2 + g / 2, gy = ground - 12 - rows * s;
    const ex = door.cx, ey = gy + (rows * s) / 2 + 6;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const x = gx + i * s, y = gy + j * s;
      const px = x + (s - g) / 2 - ex, py = y + (s - g) / 2 - ey;
      const almond = Math.abs(py) < 96 * Math.max(0, 1 - (px / 172) ** 2);
      const d = Math.hypot(px, py);
      let t = 0.5;
      if (almond) t = 0;
      if (d < 64) t = 0.9;
      if (d < 26) { key += p(rectD(x, y, s - g, s - g)); t = 0.9; }
      if (t > 0.04) f1 += halftone({ box: [x + 1, y + 1, x + s - g - 1, y + s - g - 1], cell: 5.6, angle: 45, tone: () => t });
    }
    return { f1: p(f1), key };
  });

  EMBLEMS['charlie-sound-room'] = (ctx) => factory(ctx, ({ R, K, door, r, ground }) => {
    let f1 = '', key = '';
    const x0 = door.cx - r + 26, x1 = door.cx + r - 26, cy = 660, bw = 7, gp = 4.4;
    const turns = [[0, 0.22, 'u'], [0.26, 0.58, 'a'], [0.62, 0.76, 'u'], [0.8, 1, 'a']];
    let i = 0;
    for (let x = x0; x < x1; x += bw + gp, i++) {
      const t = (x - x0) / (x1 - x0);
      const tr = turns.find((q) => t >= q[0] && t <= q[1]);
      if (!tr) { f1 += `<rect x="${f(x)}" y="${cy - 3}" width="${bw}" height="6" rx="3"/>`; continue; }
      const lt = (t - tr[0]) / (tr[1] - tr[0]);
      const env = Math.pow(Math.sin(Math.PI * lt), 0.55);
      const h = Math.min(92, 6 + env * (34 + 62 * Math.abs(Math.sin(i * 0.9) * Math.cos(i * 0.37)) + 22 * R()));
      const d = `<rect x="${f(x)}" y="${f(cy - h)}" width="${bw}" height="${f(2 * h)}" rx="${bw / 2}"/>`;
      if (tr[2] === 'u') f1 += d; else key += d;
    }
    const lab = mono(13, 500, 0.12);
    key += T(x0, ground - 22, 'you', lab) + T(x0 + (x1 - x0) * 0.26, ground - 22, 'agent', lab);
    key += T(x0 + (x1 - x0) * 0.62, ground - 22, 'you', lab) + T(x0 + (x1 - x0) * 0.8, ground - 22, 'agent', lab);
    return { f1, key };
  });

  EMBLEMS['charlie-reasoning-room'] = (ctx) => factory(ctx, ({ R, K, door, r, ground }) => {
    let f1 = '', key = '';
    const root = [door.cx, ground - 40];
    const spec = [[[-84, 0, 84], 72], [[-30, 30], 62], [[-14.5, 14.5], 58]]; // child offsets, rise
    let frontier = [{ x: root[0], y: root[1], best: true }];
    let thin = '', halo = '';
    spec.forEach(([offs, rise], L) => {
      const next = [];
      frontier.forEach((n) => {
        const bk = L === 0 ? 2 : (R() < 0.5 ? 0 : 1);
        for (let k = 0; k < offs.length; k++) {
          const x = n.x + offs[k], y = n.y - rise;
          const best = n.best && k === bk;
          thin += bar([n.x, n.y], [x, y], 3.5);
          if (best) halo += bar([n.x, n.y], [x, y], 15);
          next.push({ x, y, best });
        }
      });
      frontier = next;
    });
    key += p(thin);
    f1 += p(halo);
    frontier.forEach((n) => {
      const t = n.best ? 1 : 0.14 + R() * 0.62;
      if (n.best) { f1 += p(circ(n.x, n.y - 14, 11)); key += pe(ring(n.x, n.y - 14, 11, 3.5)); }
      else f1 += p(halftone({ box: [n.x - 11, n.y - 25, n.x + 11, n.y - 3], cell: 4.6, angle: 45, tone: (x, y) => Math.hypot(x - n.x, y - n.y + 14) < 10.5 ? t : 0 }));
      key += p(rectD(n.x - 1.75, n.y - 4, 3.5, 4));
    });
    key += p(circ(root[0], root[1], 11));
    f1 += p(circ(root[0], root[1], 22));
    key += T(root[0] + 30, root[1] + 5, 'bandit', mono(12.5, 500, 0.1));
    return { f1, key };
  });

  // ================================================================ Kernel Engineering (forthcoming → press proof)
  EMBLEMS['kernel-engineering'] = ({ R, K, title }) => {
    const cols = 6, rows = 5, cx0 = 244, cx1 = 684, cy0 = 452, cy1 = 802;
    const tw = (cx1 - cx0) / cols, thh = (cy1 - cy0) / rows;
    const ti = 2, tj = 3;
    const bandY0 = cy0 + ti * thh, bandX0 = cx0 + tj * tw;
    // A row-panel (yellow) from the left edge through C; B column-panel (pink) from the top edge through C
    let yel = '', pink = '', key = '';
    const kx = 7; // k-chunks of the panels
    for (let q = 0; q < 4; q++) {
      const x = -10 + q * 64;
      yel += rectD(x, bandY0 + 3, 58, thh - 6);
    }
    yel += rectD(cx0 + 3, bandY0 + 3, cx1 - cx0 - 6, thh - 6);
    for (let q = 0; q < 7; q++) {
      const y = -10 + q * 66;
      if (y > cy0 - 8) break;
      pink += rectD(bandX0 + 3, y, tw - 6, Math.min(60, cy0 - 3 - y));
    }
    pink += rectD(bandX0 + 3, cy0 + 3, tw - 6, cy1 - cy0 - 6);
    // the rest of C: light screen = tiles still to compute
    const inC = (x, y) => x > cx0 + 4 && x < cx1 - 4 && y > cy0 + 4 && y < cy1 - 4;
    const light = halftone({ box: [cx0, cy0, cx1, cy1], cell: 7, angle: 45, tone: (x, y) => {
      if (!inC(x, y)) return 0;
      const i = Math.floor((y - cy0) / thh), j = Math.floor((x - cx0) / tw);
      if (i === ti || j === tj) return 0;
      const lx = (x - cx0) % tw, ly = (y - cy0) % thh;
      if (lx < 4 || lx > tw - 4 || ly < 4 || ly > thh - 4) return 0;
      return (i < ti || (i === ti && j < tj)) ? 0.34 : 0.1;
    } });
    // die grid: registration crosses at tile corners
    for (let i = 0; i <= rows; i++) for (let j = 0; j <= cols; j++) {
      const x = cx0 + j * tw, y = cy0 + i * thh;
      key += p(rectD(x - 8, y - 1.5, 16, 3) + rectD(x - 1.5, y - 8, 3, 16));
    }
    key += p(rectD(bandX0 - 2, bandY0 - 2, tw + 4, 5) + rectD(bandX0 - 2, bandY0 + thh - 3, tw + 4, 5) + rectD(bandX0 - 2, bandY0 - 2, 5, thh + 4) + rectD(bandX0 + tw - 3, bandY0 - 2, 5, thh + 4));
    key += T(M, bandY0 + thh + 34, 'C[i,j] +=', mono(15, 500, 0)) + T(M, bandY0 + thh + 56, 'A[i,k]·B[k,j]', mono(15, 500, 0));
    key += T(M, bandY0 - 18, 'A', { font: 'serif', italic: true, size: 34 }) + T(bandX0 + tw + 12, 330, 'B', { font: 'serif', italic: true, size: 34 }) + T(cx0 + 4, cy0 - 18, 'C', { font: 'serif', italic: true, size: 34 });
    return { flash: [p(yel) + p(light), p(pink)], key };
  };

  // ================================================================ DeiT from Scratch
  EMBLEMS['deit-from-scratch'] = ({ R, K, title }) => {
    const n = 8, s = 50, g = 5, gx = W - M - n * s + g, gy = Math.max(title.bottom + 60, 360);
    let aq = '', or = '', key = '';
    // the image: a low sun over two ridges, sampled once per 16×16 patch
    const ridge = (u) => Math.min(0.5 + Math.abs(u - 0.3) * 1.25, 0.6 + Math.abs(u - 0.78) * 1.1);
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const x = gx + i * s, y = gy + j * s, u = (i + 0.5) / n, v = (j + 0.5) / n;
      let t = 0.06 + v * 0.16;
      if (v > ridge(u)) t = 0.58;
      if (v > 0.86) t = 0.76;
      const sd = Math.hypot(u - 0.6875, v - 0.3125);
      if (sd < 0.19) t = 0.84;
      if (sd < 0.13) t = 1;
      if (t >= 1) aq += rectD(x, y, s - g, s - g);
      else aq += halftone({ box: [x + 1, y + 1, x + s - g - 1, y + s - g - 1], cell: 6.2, angle: 15, tone: () => t });
    }
    // class + distillation tokens, prepended to the patch sequence
    const ts = s - g, tx = gx - s - 16;
    const cls = [tx, gy], dist = [tx, gy + s];
    or += rectD(cls[0], cls[1], ts, ts) + rectD(dist[0], dist[1], ts, ts);
    key += pe(rectD(dist[0], dist[1], ts, ts) + rectD(dist[0] + 5, dist[1] + 5, ts - 10, ts - 10));
    key += T(cls[0] - 12, cls[1] + 26, 'cls', { ...mono(15, 500, 0.02), anchor: 'end' });
    key += T(dist[0] - 12, dist[1] + 26, 'dist', { ...mono(15, 500, 0.02), anchor: 'end' });
    // convolutional teacher: feature maps in perspective, shrinking
    const bx = M + 4, by = gy + n * s - 206;
    const slabs = [[0, 150, 20], [40, 114, 26], [78, 80, 32], [114, 48, 40]]; // x offset, height, depth
    slabs.forEach(([ox, hgt, dep], k) => {
      const x = bx + ox, y = by + (150 - hgt) / 2 + 10;
      const face = [[x, y + dep * 0.5], [x + dep, y], [x + dep, y + hgt], [x, y + hgt + dep * 0.5]];
      or += halftone({ box: [x, y, x + dep, y + hgt + dep * 0.5], cell: 5.5, angle: 45, tone: (px, py) => {
        const t = (px - x) / dep; const top = y + dep * 0.5 * (1 - t), bot = y + hgt + dep * 0.5 * (1 - t);
        return py > top + 2 && py < bot - 2 && t > 0.08 && t < 0.92 ? 0.3 + k * 0.17 : 0; } });
      key += pe(polyD(face) + polyD([[x + 3.5, y + dep * 0.5 + 2.5], [x + dep - 3.5, y + 5.5], [x + dep - 3.5, y + hgt - 2.5], [x + 3.5, y + hgt + dep * 0.5 - 5.5]].reverse()));
    });
    // teacher -> distillation token
    const last = slabs[3], lx = bx + last[0] + last[2] + 10, ly = by + 85;
    const dx = dist[0] + ts / 2;
    key += p(bar([lx, ly], [dx + 2, ly], 4) + bar([dx, ly + 2], [dx, dist[1] + ts + 16], 4));
    key += p(polyD([[dx - 9, dist[1] + ts + 17], [dx + 9, dist[1] + ts + 17], [dx, dist[1] + ts + 4]]));
    key += T(bx, by + 214, 'CNN teacher', mono(13, 500, 0.08));
    key += T(gx, gy + n * s + 22, '8 × 8 patches', mono(13, 500, 0.08));
    return { flash: [p(aq), p(or)], key };
  };


  // ================================================================ Machine Learning Fundamentals
  EMBLEMS['machine-learning-fundamentals'] = ({ R, K, title }) => {
    const y0 = title.bottom + 10, y1 = 804, cx = 372, cy = (y0 + y1) / 2 + 10;
    const th = -32 * Math.PI / 180, nx = -Math.sin(th), ny = Math.cos(th); // unit normal of the boundary
    const sd = (x, y) => (x - cx) * nx + (y - cy) * ny;                    // signed distance
    const pA = (x, y) => 1 / (1 + Math.exp(sd(x, y) / 52));
    const fade = (y) => Math.max(0, Math.min(1, (y - y0) / 70)) * Math.max(0, Math.min(1, (y1 - y) / 30));
    let a = p(halftone({ box: [0, y0, W, y1], cell: 9, angle: 15, tone: (x, y) => 0.62 * pA(x, y) * fade(y) }));
    let b = p(halftone({ box: [0, y0, W, y1], cell: 9, angle: 75, tone: (x, y) => 0.62 * (1 - pA(x, y)) * fade(y) }));
    // samples of each class
    const gauss = () => { let u = 0; for (let i = 0; i < 6; i++) u += R(); return u - 3; };
    let key = '';
    const pts = (mx, my, n, which) => {
      for (let i = 0; i < n; i++) {
        const x = mx + gauss() * 78, y = my + gauss() * 62;
        if (y < y0 + 40 || y > y1 - 24 || x < 40 || x > W - 40) continue;
        const d = circ(x, y, 8.5);
        if (which === 'a') a += p(d); else b += p(d);
        key += `<path d="${circ(x, y, 8.5)}${circ(x, y, 5.6)}" fill-rule="evenodd"/>`;
      }
    };
    pts(cx - 150 * nx - 20, cy - 150 * ny, 26, 'a');
    pts(cx + 150 * nx + 20, cy + 150 * ny, 26, 'b');
    // boundary w·x + b = 0 and its margins
    const tx = Math.cos(th), ty = Math.sin(th), L = 520;
    const seg = (off, w, dash) => {
      const ox = cx + nx * off, oy = cy + ny * off;
      if (!dash) return p(bar([ox - tx * L, oy - ty * L], [ox + tx * L, oy + ty * L], w));
      let d = ''; for (let t = -L; t < L; t += 22) d += bar([ox + tx * t, oy + ty * t], [ox + tx * (t + 11), oy + ty * (t + 11)], w);
      return p(d);
    };
    const clipId = 'mlf-clip';
    key += `<g clip-path="url(#${clipId})">${seg(0, 5.5)}${seg(-52, 3, true)}${seg(52, 3, true)}</g>`;
    const lx = cx + tx * 150 - nx * 14, ly = cy + ty * 150 - ny * 14;
    key += `<text transform="rotate(${-32} ${f(lx)} ${f(ly)})" x="${f(lx)}" y="${f(ly - 10)}" style="${textStyle({ font: 'mono', size: 13, weight: 500, ls: 0.06 })}">p = 0.5</text>`;
    const defs = `<clipPath id="${clipId}"><rect x="0" y="${f(y0 + 30)}" width="${W}" height="${f(y1 - y0 - 30)}"/></clipPath>`;
    return { flash: [a, b], key, defs };
  };

  // ================================================================ Reinforcement Learning
  EMBLEMS['reinforcement-learning'] = ({ R, K, title }) => {
    const cols = 8, rows = 6, cs = 76, gx = (W - cols * cs) / 2, gy = Math.max(title.bottom + 44, 800 - rows * cs);
    const walls = new Set(['2,1', '2,2', '2,3', '5,2', '5,3', '5,4', '5,5', '3,5', '6,0']);
    const goal = [7, 1], start = [0, 5];
    // BFS distance to goal -> V(s) = gamma^d
    const dist = {}; const q = [goal]; dist[goal.join(',')] = 0;
    while (q.length) {
      const [i, j] = q.shift();
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const ni = i + di, nj = j + dj, k = ni + ',' + nj;
        if (ni < 0 || nj < 0 || ni >= cols || nj >= rows || walls.has(k) || k in dist) continue;
        dist[k] = dist[i + ',' + j] + 1; q.push([ni, nj]);
      }
    }
    let fl = '', key = '';
    const cx = (i) => gx + i * cs + cs / 2, cy = (j) => gy + j * cs + cs / 2;
    for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) {
      const k = i + ',' + j, x = gx + i * cs, y = gy + j * cs;
      if (walls.has(k)) { key += p(rectD(x + 3, y + 3, cs - 6, cs - 6)); continue; }
      if (i === goal[0] && j === goal[1]) { fl += p(rectD(x + 3, y + 3, cs - 6, cs - 6)); continue; }
      const v = Math.pow(0.84, dist[k]);
      fl += p(halftone({ box: [x + 5, y + 5, x + cs - 5, y + cs - 5], cell: 8, angle: 45, tone: () => v * 0.95 }));
      // greedy policy arrow: toward the neighbour with the smallest distance
      let best = null;
      for (const [di, dj] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const nk = (i + di) + ',' + (j + dj); if (nk in dist && (best === null || dist[nk] < best[2])) best = [di, dj, dist[nk]]; }
      if (best && !(i === start[0] && j === start[1])) {
        const ax = cx(i), ay = cy(j), s = 9;
        const [di, dj] = best;
        key += p(polyD([[ax + di * s * 1.3, ay + dj * s * 1.3], [ax - di * s * 0.7 - dj * s, ay - dj * s * 0.7 + di * s], [ax - di * s * 0.7 + dj * s, ay - dj * s * 0.7 - di * s]]));
      }
    }
    // grid ticks
    for (let i = 0; i <= cols; i++) for (let j = 0; j <= rows; j++) key += p(rectD(gx + i * cs - 1, gy + j * cs - 5, 2, 10) + rectD(gx + i * cs - 5, gy + j * cs - 1, 10, 2));
    // the agent's path, start -> goal
    let cur = start.slice(); const path = [cur.slice()];
    while (dist[cur.join(',')] > 0) {
      let nxt = null;
      for (const [di, dj] of [[0, -1], [1, 0], [-1, 0], [0, 1]]) { const nk = (cur[0] + di) + ',' + (cur[1] + dj); if (nk in dist && dist[nk] === dist[cur.join(',')] - 1) { nxt = [cur[0] + di, cur[1] + dj]; break; } }
      cur = nxt; path.push(cur.slice());
    }
    for (let k = 0; k < path.length - 1; k++) {
      const a = [cx(path[k][0]), cy(path[k][1])], b = [cx(path[k + 1][0]), cy(path[k + 1][1])];
      const last = k === path.length - 2;
      const e = last ? [a[0] + (b[0] - a[0]) * 0.42, a[1] + (b[1] - a[1]) * 0.42] : b;
      key += p(bar(a, e, 6)) + p(circ(a[0], a[1], 3));
    }
    key += `<path d="${circ(cx(start[0]), cy(start[1]), 16)}${circ(cx(start[0]), cy(start[1]), 11)}" fill-rule="evenodd"/>`;
    key += T(cx(goal[0]), cy(goal[1]) + 12, '+1', { font: 'serif', italic: true, size: 36, anchor: 'middle' });
    return { flash: [fl], key };
  };

  // ================================================================ SQL Masterclass
  EMBLEMS['sql-masterclass'] = ({ R, K, title }) => {
    const cy = 566, rr = 198, c1 = W / 2 - 100, c2 = W / 2 + 100, pitch = 22, bh = 14.5;
    let a = '', b = '', key = '';
    for (let y = cy - rr + 6; y < cy + rr; y += pitch) {
      const yc = y + bh / 2;
      const hw = Math.sqrt(Math.max(0, rr * rr - (yc - cy) ** 2));
      if (hw < 12) continue;
      a += rectD(c1 - hw, y, 2 * hw, bh);
      b += rectD(c2 - hw, y, 2 * hw, bh);
    }
    const ms = mono(14, 500, 0.12);
    key += T(c1 - rr + 10, cy - rr - 18, 'CUSTOMERS', ms);
    key += T(c2 + rr - 10, cy - rr - 18, 'ORDERS', { ...ms, anchor: 'end' });
    key += T(W / 2, cy + rr + 34, 'INNER JOIN … ON id', { ...ms, anchor: 'middle' });
    // join key: a column of keys down the overlap
    return { flash: [p(a), p(b)], key };
  };

  window.BOOKS = BOOKS;
})();
