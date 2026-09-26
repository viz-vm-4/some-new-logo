/* Blazon — the Vizuara Roll of Arms.
   A small heraldic drawing engine: tinctures, lines of partition, ordinaries and charges,
   all drawn as flat SVG in a 400 x 480 shield space. Every book's arms are built from these. */

const T = {
  argent: '#F8F5EE',
  or: '#D4A236',
  gules: '#B3261E',
  azure: '#213F93',
  vert: '#1D6946',
  purpure: '#5E2B5F',
  sable: '#161517',
};
const GROUND = { beginner: '#ECE6D9', intermediate: T.or, advanced: T.sable };
const S = T.sable;
const W = 400, H = 480;
const SHIELD = 'M0 0H400V250C400 360 320 440 200 480C80 440 0 360 0 250Z';
const SHIELD_IN = 'M3 3H397V250C397 358 318 437 200 477C82 437 3 358 3 250Z';
const LW = 3.5;   // line of partition
const CW = 3;     // charge outline

const n = (v) => +v.toFixed(2);
const pathOf = (pts) => 'M' + pts.map((p) => n(p[0]) + ' ' + n(p[1])).join('L') + 'Z';
const openPath = (pts) => 'M' + pts.map((p) => n(p[0]) + ' ' + n(p[1])).join('L');
const poly = (pts, fill, sw = LW) =>
  `<path d="${pathOf(pts)}" fill="${fill}" stroke="${S}" stroke-width="${sw}" stroke-linejoin="miter" stroke-miterlimit="8"/>`;

/* ---------- lines of partition ----------
   pattern(type, L) -> [[u, v]] along a line of length L; v is the offset to one side. */
function pattern(type, L, o = {}) {
  const p = o.p || 40, a = o.a || 12, ph = o.phase || 0;
  const pts = [];
  if (type === 'plain') return [[0, 0], [L, 0]];
  // a period starts at u0 (default: the middle of the line); begin two periods before 0
  const u0 = (o.u0 ?? L / 2) + ph;
  const start = (((u0 % p) + p) % p) - p * 2;
  if (type === 'indented') {
    for (let u = start, k = 0; u <= L + p; u += p / 2, k++) pts.push([u, k % 2 ? a / 2 : -a / 2]);
  } else if (type === 'embattled') {
    for (let u = start; u <= L + p; u += p) {
      pts.push([u, -a / 2], [u + p / 2, -a / 2], [u + p / 2, a / 2], [u + p, a / 2]);
    }
  } else if (type === 'wavy') {
    for (let u = start; u <= L + p; u += 2) pts.push([u, (a / 2) * Math.sin((2 * Math.PI * (u - start)) / p)]);
  } else if (type === 'dovetailed') {
    for (let u = start; u <= L + p; u += p) {
      pts.push([u, -a / 2], [u + 0.36 * p, -a / 2], [u + 0.26 * p, a / 2], [u + 0.74 * p, a / 2], [u + 0.64 * p, -a / 2]);
    }
    pts.push([L + 2 * p, -a / 2]);
  }
  return pts;
}
// map pattern from A to B
function along(type, A, B, o) {
  const dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy);
  const ux = dx / L, uy = dy / L, px = -uy, py = ux;
  return pattern(type, L, o).map(([u, v]) => [A[0] + ux * u + px * v, A[1] + uy * u + py * v]);
}
// half-planes (drawn big, the shield clip trims them)
// o.origin: absolute x (or y) at which a period of the pattern begins
const below = (y, type = 'plain', o = {}) => [...along(type, [-60, y], [460, y], { ...o, u0: (o.origin ?? 200) + 60 }), [460, 560], [-60, 560]];
function rightOfPts(x, type = 'plain', o = {}) {
  const line = along(type, [x, -60], [x, 560], { ...o, u0: (o.origin ?? 240) + 60 });
  return [...line, [520, 560], [520, -60]];
}

/* ---------- charges ---------- */
const roundel = (x, y, r, fill) => `<circle cx="${n(x)}" cy="${n(y)}" r="${r}" fill="${fill}" stroke="${S}" stroke-width="${CW}"/>`;
const circ = (x, y, r) => `M${n(x - r)} ${n(y)}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0Z`;
const annulet = (x, y, r, t, fill) =>
  `<path d="${circ(x, y, r)}${circ(x, y, r - t)}" fill="${fill}" fill-rule="evenodd" stroke="${S}" stroke-width="${CW}"/>`;
const billet = (x, y, w, h, fill) =>
  `<rect x="${n(x - w / 2)}" y="${n(y - h / 2)}" width="${w}" height="${h}" fill="${fill}" stroke="${S}" stroke-width="${CW}"/>`;
const lozenge = (x, y, w, h, fill) => poly([[x, y - h / 2], [x + w / 2, y], [x, y + h / 2], [x - w / 2, y]], fill, CW);
function mullet(x, y, r, fill, sw = CW) {
  const pts = [];
  for (let i = 0; i < 10; i++) {
    const ang = (-90 + i * 36) * Math.PI / 180, rr = i % 2 ? r * 0.40 : r;
    pts.push([x + rr * Math.cos(ang), y + rr * Math.sin(ang)]);
  }
  return poly(pts, fill, sw);
}
function estoile(x, y, r, fill) {
  // six wavy rays
  let d = '';
  const ri = r * 0.30;
  for (let i = 0; i < 6; i++) {
    const a = (-90 + i * 60) * Math.PI / 180, h = 0.36;
    const P = (rad, ang) => [x + rad * Math.cos(ang), y + rad * Math.sin(ang)];
    const b1 = P(ri, a - h), b2 = P(ri, a + h), tip = P(r, a);
    // each flank of the ray is an S-curve
    const c1 = P(r * 0.52, a - 0.22), c2 = P(r * 0.70, a + 0.10);
    const c3 = P(r * 0.70, a + 0.22), c4 = P(r * 0.52, a + 0.30);
    d += (i === 0 ? `M${n(b1[0])} ${n(b1[1])}` : `L${n(b1[0])} ${n(b1[1])}`);
    d += `C${n(c1[0])} ${n(c1[1])} ${n(c2[0])} ${n(c2[1])} ${n(tip[0])} ${n(tip[1])}`;
    d += `C${n(c3[0])} ${n(c3[1])} ${n(c4[0])} ${n(c4[1])} ${n(b2[0])} ${n(b2[1])}`;
  }
  return `<path d="${d}Z" fill="${fill}" stroke="${S}" stroke-width="${CW}" stroke-linejoin="round"/>`;
}
function crescent(x, y, R, fill) {
  const r2 = 0.8 * R, d = 0.34 * R;
  const yy = (r2 * r2 - R * R - d * d) / (2 * d), xx = Math.sqrt(R * R - yy * yy);
  const L = [x - xx, y + yy], Rr = [x + xx, y + yy];
  return `<path d="M${n(L[0])} ${n(L[1])}A${R} ${R} 0 1 0 ${n(Rr[0])} ${n(Rr[1])}A${r2} ${r2} 0 1 1 ${n(L[0])} ${n(L[1])}Z" fill="${fill}" stroke="${S}" stroke-width="${CW}"/>`;
}
function label(x, y, w, fill) {
  // a label of three points: a fillet with three flared pendants
  const h = w * 0.15, ph = w * 0.30, top = y - (h + ph) / 2;
  const pt = w * 0.13, pb = w * 0.19, cs = [x + w * 0.31, x, x - w * 0.31];
  let d = `M${n(x - w / 2)} ${n(top)}H${n(x + w / 2)}V${n(top + h)}`;
  for (const c of cs) d += `H${n(c + pt / 2)}L${n(c + pb / 2)} ${n(top + h + ph)}H${n(c - pb / 2)}L${n(c - pt / 2)} ${n(top + h)}`;
  d += `H${n(x - w / 2)}Z`;
  return `<path d="${d}" fill="${fill}" stroke="${S}" stroke-width="${CW}" stroke-linejoin="miter"/>`;
}
function martlet(x, y, w, fill) {
  // a heraldic martlet facing dexter: beak, round head, folded pointed wing, forked tail, tufts for legs
  const s = w / 100;
  const body = 'M8 27L17 23C19 16 26 13 33 14C42 16 52 21 66 23L95 13L83 29L96 44L64 36C55 42 42 46 31 43C23 41 18 35 17 31Z';
  const wing = 'M30 27C44 19 66 18 90 25C72 31 50 34 33 33Z';
  const tuft = 'M33 42L29 53L37 46L39 56L45 45L47 55L51 43Z';
  const tf = `translate(${n(x - 52 * s)} ${n(y - 32 * s)}) scale(${n(s)})`;
  const sw = n(CW / s);
  return `<g transform="${tf}"><path d="${tuft}" fill="${fill}" stroke="${S}" stroke-width="${sw}" stroke-linejoin="round"/>` +
    `<path d="${body}" fill="${fill}" stroke="${S}" stroke-width="${sw}" stroke-linejoin="round"/>` +
    `<path d="${wing}" fill="${fill}" stroke="${S}" stroke-width="${sw}" stroke-linejoin="round"/><circle cx="25" cy="21" r="2.3" fill="${S}"/></g>`;
}
function escutcheon(x, y, w, inner, id) {
  // a small shield (same outline as the main one) with arbitrary contents drawn in 400x480 space
  const s = w / 400;
  return `<g transform="translate(${n(x - w / 2)} ${n(y - (480 * s) / 2)}) scale(${n(s)})"><clipPath id="${id}"><path d="${SHIELD}"/></clipPath><g clip-path="url(#${id})">${inner}</g><path d="${SHIELD_IN}" fill="none" stroke="${S}" stroke-width="${n(5 / s)}"/></g>`;
}

/* Sawtoothed chief — the Intelligence Factory's north-light roof */
function factoryChief(fill, eaves = 132, ridge = 84, bays = 5) {
  const bw = W / bays, pts = [[-20, -20], [420, -20], [420, eaves]];
  for (let k = bays - 1; k >= 0; k--) {
    const x0 = k * bw;
    pts.push([x0 + bw, eaves], [x0 + bw, eaves]); // eaves at right of bay
    pts.push([x0, ridge]);                       // slope up to the left ridge
    pts.push([x0, eaves]);                        // vertical glazed face
  }
  pts.push([-20, eaves]);
  return poly(pts, fill);
}

/* ---------- the arms of each book ---------- */
const ARMS = {};

// Neural Networks from Scratch — XOR solved by a hidden layer: the class between two lines is the bend
ARMS['neural-networks-from-scratch'] = () => {
  const c = [200, 214], hw = 62;           // centre of the bend, half width
  const d = [Math.SQRT1_2, Math.SQRT1_2], p = [-Math.SQRT1_2, Math.SQRT1_2];
  const e = (s, t) => [c[0] + d[0] * s + p[0] * t, c[1] + d[1] * s + p[1] * t];
  const bend = [e(-500, -hw), e(500, -hw), e(500, hw), e(-500, hw)];
  const on1 = e(-118, 0), on2 = e(118, 0);
  return `<rect width="400" height="480" fill="${T.azure}"/>` + poly(bend, T.or) +
    roundel(on1[0], on1[1], 40, T.gules) + roundel(on2[0], on2[1], 40, T.gules) +
    roundel(318, 104, 40, T.argent) + roundel(94, 322, 40, T.argent);
};

// Mathematical Foundations — a convex loss and gradient descent walking down it
ARMS['mathematical-foundations-for-ml'] = () => {
  const vx = 200, vy = 352, k = 292 / (200 * 200); // vertex; the curve leaves the shield at the chief corners
  const f = (x) => vy - k * (x - vx) * (x - vx);
  const pts = [];
  for (let x = -20; x <= 420; x += 4) pts.push([x, f(x)]);
  const curve = openPath(pts);
  // gradient descent with a fixed learning rate on a parabola: each step halves the distance to the minimum
  const us = [-148, -74, -37];
  const rs = [27, 22, 18];
  let out = `<rect width="400" height="480" fill="${T.azure}"/>`;
  out += `<path d="${curve}" fill="none" stroke="${S}" stroke-width="60"/><path d="${curve}" fill="none" stroke="${T.or}" stroke-width="53"/>`;
  us.forEach((u, i) => { out += roundel(vx + u, f(vx + u), rs[i], T.argent); });
  out += roundel(vx, vy, 15, T.gules);
  return out;
};

// Decision trees — Fisher's iris, split at petal length 2.45 cm, then petal width 1.75 cm
ARMS['decision-trees-from-scratch'] = () => {
  // petal length axis 0.6..7.0 cm across; petal width axis 0..2.6 cm up
  const X = (cm) => ((cm - 0.6) / 6.4) * 400, Y = (cm) => 480 - (cm / 2.6) * 480;
  const x0 = X(2.45), y0 = Y(1.75);
  let out = `<rect width="400" height="480" fill="${T.azure}"/>`;
  out += poly([[-10, -10], [x0, -10], [x0, 500], [-10, 500]], T.or);
  out += poly([[x0, -10], [410, -10], [410, y0], [x0, y0]], T.argent);
  // setosa: three hurts in pale
  [96, 196, 296].forEach((y) => { out += roundel(x0 / 2 + 2, y, 26, T.azure); });
  // virginica: two mullets in fess
  const cx = (x0 + 400) / 2;
  out += mullet(cx - 68, y0 / 2 + 4, 40, T.azure) + mullet(cx + 68, y0 / 2 + 4, 40, T.azure);
  // versicolor: three lozenges two and one
  out += lozenge(cx - 66, y0 + 88, 52, 76, T.argent) + lozenge(cx + 66, y0 + 88, 52, 76, T.argent) + lozenge(cx, y0 + 196, 52, 76, T.argent);
  return out;
};

// Build LLMs from Scratch — the causal mask: per bend grady of eight
ARMS['build-llms-from-scratch'] = () => {
  const n8 = 8, cw = 400 / n8, rh = 480 / n8;
  const pts = [[420, -20]];
  for (let i = 0; i < n8; i++) pts.push([(i + 1) * cw, i * rh], [(i + 1) * cw, (i + 1) * rh]);
  pts.push([420, 500]);
  pts.splice(1, 0, [cw, -20]);
  return `<rect width="400" height="480" fill="${T.gules}"/>` + poly(pts, T.argent);
};

// AI Context Engineering — the fess is the context window: scattered outside, engineered within
ARMS['ai-context-engineering'] = () => {
  let out = `<rect width="400" height="480" fill="${T.purpure}"/>`;
  const y0 = 188, y1 = 292;
  // a seeded scatter of plates: everything the model could be shown
  let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const pts = [];
  for (let tries = 0; tries < 4000 && pts.length < 64; tries++) {
    const x = 10 + rnd() * 380, y = 12 + rnd() * 460;
    if (y > y0 - 22 && y < y1 + 22) continue;
    if (pts.some(([px, py]) => Math.hypot(px - x, py - y) < 40)) continue;
    pts.push([x, y]);
  }
  pts.forEach(([x, y]) => { out += roundel(x, y, 8.5, T.argent); });
  out += poly([[-10, y0], [410, y0], [410, y1], [-10, y1]], T.or);
  // on it, in order: instructions, tools, retrieved knowledge, memory
  [[74, T.sable], [158, T.gules], [242, T.azure], [326, T.argent]].forEach(([x, f]) => { out += roundel(x, (y0 + y1) / 2, 30, f); });
  return out;
};

// Pi vs Hermes vs Codex — three harnesses, three shapes of compaction (turns are bars, a summary is plain)
ARMS['pi-vs-hermes-vs-codex'] = (slug) => {
  const barry = (y0, y1, k) => { let o = ''; const h = (y1 - y0) / k; for (let i = 0; i < k; i++) o += poly([[-10, y0 + i * h], [410, y0 + i * h], [410, y0 + (i + 1) * h], [-10, y0 + (i + 1) * h]], i % 2 ? T.purpure : T.or, 7); return o; };
  const plain = (y0, y1) => poly([[-10, y0], [410, y0], [410, y1], [-10, y1]], T.argent, 7);
  const pi = barry(150, 500, 6) + plain(-10, 150) + `<path d="M200 -10V150" stroke="${S}" stroke-width="7"/>`;
  const hermes = barry(-10, 150, 3) + plain(150, 300) + barry(300, 500, 4);
  const codex = plain(-10, 318) + barry(318, 500, 3);
  return `<rect width="400" height="480" fill="${T.purpure}"/>` +
    escutcheon(106, 132, 156, pi, slug + '-e1') + escutcheon(294, 132, 156, hermes, slug + '-e2') + escutcheon(200, 328, 156, codex, slug + '-e3');
};

// 5D Parallelism — chequy of 32; each axis of the mesh is its own line of partition
ARMS['5d-parallelism'] = () => {
  const subs = [];
  subs.push(rightOfPts(200, 'plain'));                                                    // data
  for (const x of [100, 300]) subs.push(rightOfPts(x, 'indented', { p: 30, a: 12, origin: 0 })); // tensor
  subs.push(below(240, 'embattled', { p: 50, a: 12, origin: -12.5 }));                   // pipeline
  for (const y of [120, 360]) subs.push(below(y, 'wavy', { p: 50, a: 12, origin: -12.5 })); // context
  for (const y of [60, 180, 300, 420]) subs.push(below(y, 'dovetailed', { p: 50, a: 11, origin: 0 })); // expert
  const d = subs.map(pathOf).join('');
  return `<rect width="400" height="480" fill="${T.or}"/><path d="${d}" fill="${T.sable}" fill-rule="evenodd"/>` +
    `<path d="${d}" fill="none" stroke="${S}" stroke-width="3"/>`;
};

// Git & GitHub — a pall: one trunk of commits parting into two branches
ARMS['git-github-masterclass'] = () => {
  const w = 88, c = [200, 214];
  // pall: arms to the chief corners, tail to the base
  const pall = [
    [-40, -40 + 0], [0 - 40 + w * 0.9, -40], [c[0], c[1] - w * 0.62], [440 - w * 0.9, -40], [440, -40], [440, 30],
    [c[0] + w / 2, c[1] + w * 0.2], [c[0] + w / 2, 520], [c[0] - w / 2, 520], [c[0] - w / 2, c[1] + w * 0.2], [-40, 30],
  ];
  let out = `<rect width="400" height="480" fill="${T.azure}"/>` + poly(pall, T.or);
  const r = 22;
  [[200, 420], [200, 338], [200, 256]].forEach(([x, y]) => { out += roundel(x, y, r, T.azure); });
  [[126, 150], [62, 86], [274, 150], [338, 86]].forEach(([x, y]) => { out += roundel(x, y, r, T.azure); });
  return out;
};

// SQL Masterclass — a join is an impalement
ARMS['sql-masterclass'] = () => {
  let out = `<rect width="400" height="480" fill="${T.azure}"/>`;
  out += poly([[200, -10], [410, -10], [410, 500], [200, 500]], T.argent);
  const bh = 48;
  for (let i = 1; i < 10; i += 2) {
    out += poly([[-10, i * bh], [200, i * bh], [200, (i + 1) * bh], [-10, (i + 1) * bh]], T.argent);
    out += poly([[200, i * bh], [410, i * bh], [410, (i + 1) * bh], [200, (i + 1) * bh]], T.azure);
  }
  out += poly([[184, -10], [216, -10], [216, 500], [184, 500]], T.gules);
  return out;
};

// CNN Fundamentals — the image is chequy; the canton is the kernel in its first position
ARMS['cnn-fundamentals'] = () => {
  const cols = 8, rows = 10, cw = 400 / cols, rh = 480 / rows;
  let out = `<rect width="400" height="480" fill="${T.argent}"/>`;
  let d = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) if ((r + c) % 2) d += `M${c * cw} ${r * rh}h${cw}v${rh}h${-cw}Z`;
  out += `<path d="${d}" fill="${T.vert}"/>`;
  let g = '';
  for (let c = 1; c < cols; c++) g += `M${c * cw} 0V480`;
  for (let r = 1; r < rows; r++) g += `M0 ${r * rh}H400`;
  out += `<path d="${g}" stroke="${S}" stroke-width="2"/>`;
  out += poly([[-10, -10], [3 * cw, -10], [3 * cw, 3 * rh], [-10, 3 * rh]], T.or, 5);
  out += `<path d="M${cw} 0V${3 * rh}M${2 * cw} 0V${3 * rh}M0 ${rh}H${3 * cw}M0 ${2 * rh}H${3 * cw}" stroke="${S}" stroke-width="2.5"/>`;
  return out;
};

// RAG in Production — documents strewn; the query's neighbourhood holds the three nearest
ARMS['rag-in-production'] = () => {
  let out = `<rect width="400" height="480" fill="${T.purpure}"/>`;
  const c = [200, 222], R = 118;
  const inside = [];
  for (let r = 0; r < 9; r++) for (let k = 0; k < 7; k++) {
    const x = 28 + k * 58 + (r % 2 ? 29 : 0), y = 26 + r * 56;
    const dd = Math.hypot(x - c[0], y - c[1]);
    if (dd < R - 30) inside.push([x, y]);
    else if (dd > R + 30) out += billet(x, y, 20, 32, T.argent);
  }
  out += annulet(c[0], c[1], R, 26, T.or);
  inside.forEach(([x, y]) => { out += billet(x, y, 20, 32, T.or); });
  out += mullet(c[0], c[1] + 2, 26, T.or);
  return out;
};

// DeiT — patch tokens with class and distillation tokens; the CNN teacher borne in pretence
ARMS['deit-from-scratch'] = (slug) => {
  let out = `<rect width="400" height="480" fill="${T.vert}"/>`;
  const h = 76, n8 = 8, cw = 400 / n8;
  for (let i = 0; i < n8; i++) out += poly([[i * cw, -10], [(i + 1) * cw, -10], [(i + 1) * cw, h], [i * cw, h]], i % 2 ? T.or : T.argent);
  out += roundel(cw / 2 + 5, h / 2 + 3, 17, T.gules) + roundel(400 - cw / 2 - 5, h / 2 + 3, 17, T.sable);
  out += escutcheon(200, 272, 212, ARMS['cnn-fundamentals'](), slug + '-pretence');
  return out;
};

// Kernel Engineering (coming soon) — a tiled matrix multiply; drawn in trick
ARMS['kernel-engineering'] = () => {
  const cw = 80;
  let g = '';
  for (let c = 1; c < 5; c++) g += `M${c * cw} 0V480`;
  for (let r = 1; r < 6; r++) g += `M0 ${r * cw}H400`;
  return `<path d="${g}" stroke="currentColor" stroke-width="2" fill="none"/>` +
    `<path d="M-10 160H410V240H-10ZM240 -10V490H320V-10Z" stroke="currentColor" stroke-width="5" fill="none"/>` +
    `<rect x="240" y="160" width="80" height="80" fill="none" stroke="currentColor" stroke-width="5"/>`;
};

/* The Intelligence Factory — four rooms, four sons differenced by cadency */
ARMS['charlie-language-room'] = () => {
  // prefill (the prompt, read in one pass) then decode, one token at a time
  let out = `<rect width="400" height="480" fill="${T.gules}"/>` + factoryChief(T.or) + label(200, 48, 150, T.gules);
  const y = 268;
  out += billet(96, y, 132, 58, T.argent);
  [206, 268].forEach((x) => { out += roundel(x, y, 26, T.argent); });
  out += annulet(334, y, 28, 10, T.argent);
  return out;
};

ARMS['charlie-vision-room'] = () => {
  let out = `<rect width="400" height="480" fill="${T.vert}"/>` + factoryChief(T.or) + crescent(200, 50, 28, T.vert);
  const s = 74, x0 = 200 - s, y0 = 168, cols = [T.or, T.argent, T.argent, T.or];
  const sq = (x, y, w, h, c) => poly([[x, y], [x + w, y], [x + w, y + h], [x, y + h]], c);
  // the image, quarterly
  out += sq(x0, y0, s, s, cols[0]) + sq(x0 + s, y0, s, s, cols[1]) + sq(x0, y0 + s, s, s, cols[2]) + sq(x0 + s, y0 + s, s, s, cols[3]);
  // the same patches as a row of tokens
  const bw = 60, bx = 200 - 2 * bw, by = 358;
  cols.forEach((c, i) => { out += sq(bx + i * bw, by, bw, bw, c); });
  return out;
};

ARMS['charlie-sound-room'] = () => {
  let out = `<rect width="400" height="480" fill="${T.azure}"/>` + factoryChief(T.or) + mullet(200, 50, 32, T.azure);
  // a voice as pallets couped of diverse lengths: the caller (Argent), then the agent (Or)
  const hs = [46, 104, 168, 120, 70, 30, 84, 150, 196, 132, 60];
  const pw = 22, gap = 11.5, x0 = 200 - (hs.length * (pw + gap) - gap) / 2, cy = 282;
  hs.forEach((h, i) => {
    const x = x0 + i * (pw + gap);
    out += `<rect x="${n(x)}" y="${n(cy - h / 2)}" width="${pw}" height="${h}" rx="${pw / 2}" fill="${i < 5 ? T.argent : T.or}" stroke="${S}" stroke-width="${CW}"/>`;
  });
  return out;
};

ARMS['charlie-reasoning-room'] = () => {
  let out = `<rect width="400" height="480" fill="${T.purpure}"/>` + factoryChief(T.or) + martlet(200, 52, 104, T.purpure);
  // four steps climbed without ever being shown the answer; the reward only at the top
  const pts = [[-20, 500], [-20, 440], [100, 440], [100, 380], [200, 380], [200, 320], [300, 320], [300, 260], [420, 260], [420, 500]];
  out += poly(pts, T.or);
  out += estoile(350, 200, 48, T.argent);
  return out;
};

/* The publisher's own arms: Sable, a chevron reversed Or (a V; the chevron is heraldry's builder's charge) */
function imprintMark(fg, bg, h = 26) {
  const w = h * 400 / 480;
  return `<svg class="mark" viewBox="0 0 400 480" width="${n(w)}" height="${h}" aria-hidden="true"><path d="${SHIELD}" fill="${fg}"/>` +
    `<path d="M40 0H150L200 190L250 0H360L230 330H170Z" fill="${bg}"/></svg>`;
}
