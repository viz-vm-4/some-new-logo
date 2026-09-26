/* ==========================================================================
   BOARD BLOCK — a skeleton display alphabet for painted signboard lettering.
   Every letter is a set of centre-lines (the painter's "skeleton"). Weight,
   outline, inline and block shadow are all strokes of that same skeleton,
   so the layered sign-painter treatment is exact vector at any size, and the
   letter WIDTH can stretch or condense to fill a board, as painters do.
   ========================================================================== */
(function (root) {
  const f = (n) => Math.round(n * 100) / 100;

  // Polyline with per-vertex fillet radius -> SVG path data.
  function poly(pts, closed) {
    const P = pts.map((p) => ({ x: p[0], y: p[1], r: p[2] || 0 }));
    const n = P.length;
    let d = '';
    const corner = (prev, c, next) => {
      if (!c.r) return `L${f(c.x)} ${f(c.y)}`;
      let ax = c.x - prev.x, ay = c.y - prev.y, bx = next.x - c.x, by = next.y - c.y;
      const la = Math.hypot(ax, ay), lb = Math.hypot(bx, by);
      ax /= la; ay /= la; bx /= lb; by /= lb;
      const cos = Math.max(-1, Math.min(1, ax * bx + ay * by));
      const D = Math.acos(cos);
      if (D < 1e-3) return `L${f(c.x)} ${f(c.y)}`;
      const t = Math.min(c.r * Math.tan(D / 2), la * 0.999, lb * 0.999);
      const rr = t / Math.tan(D / 2);
      const s = ax * by - ay * bx > 0 ? 1 : 0;
      return `L${f(c.x - ax * t)} ${f(c.y - ay * t)}A${f(rr)} ${f(rr)} 0 0 ${s} ${f(c.x + bx * t)} ${f(c.y + by * t)}`;
    };
    if (!closed) {
      d = `M${f(P[0].x)} ${f(P[0].y)}`;
      for (let i = 1; i < n - 1; i++) d += corner(P[i - 1], P[i], P[i + 1]);
      d += `L${f(P[n - 1].x)} ${f(P[n - 1].y)}`;
    } else {
      const a = P[n - 1], b = P[0];
      const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      d = `M${f(m.x)} ${f(m.y)}`;
      for (let i = 0; i < n; i++) d += corner(P[(i - 1 + n) % n], P[i], P[(i + 1) % n]);
      d += `L${f(m.x)} ${f(m.y)}Z`;
    }
    return d;
  }
  // shorten free ends (for the inline, which must stop short of terminals)
  function trim(pts, fs, fe, k) {
    const P = pts.map((p) => p.slice());
    const cut = (a, b) => {
      const dx = b[0] - a[0], dy = b[1] - a[1], l = Math.hypot(dx, dy);
      const kk = Math.min(k, l * 0.45);
      a[0] += (dx / l) * kk; a[1] += (dy / l) * kk;
    };
    if (fs) cut(P[0], P[1]);
    if (fe) cut(P[P.length - 1], P[P.length - 2]);
    return P;
  }

  // relative widths (x base letter width u)
  const W = {
    A: 1.04, B: 1, C: 0.96, D: 1, E: 0.84, F: 0.82, G: 1, H: 1, I: 0, J: 0.9, K: 1.02, L: 0.82,
    M: 1.36, N: 1.04, O: 1, P: 0.98, Q: 1, R: 1.0, S: 0.96, T: 0.92, U: 1, V: 1.04, W: 1.42,
    X: 1.02, Y: 1.02, Z: 0.9, '0': 1, '1': 0.8, '2': 0.96, '3': 0.94, '4': 1.04, '5': 0.96,
    '6': 0.98, '7': 0.9, '8': 1, '9': 0.98, '-': 0.62, '.': 0, ':': 0, "'": 0, '/': 0.8,
  };

  // Build one glyph. Returns {w, subs:[{pts,closed,fs,fe}]}
  function glyph(ch, u, H, S) {
    let w = W[ch] === 0 ? S : (W[ch] || 1) * u;
    const L = S / 2, T = S / 2, B = H - S / 2;
    let R = w - S / 2, C = w / 2;
    const r = Math.max(0, Math.min(0.9 * S, (R - L) / 2 - 0.5));
    const hwOf = (run) => (S / 2) * Math.hypot(run, H) / H;
    const ext = S * 2;
    const dg = (xt, xb) => { // diagonal from (xt,0) to (xb,H), extended past the band
      const k = (xb - xt) / H;
      return [[xt - k * ext, -ext], [xb + k * ext, H + ext]];
    };
    const subs = [];
    const o = (pts, fs = true, fe = true) => subs.push({ pts, fs, fe });
    const z = (pts) => subs.push({ pts, closed: true });
    const ys = Math.max(T + r + S * 0.25, H * 0.3); // spur end for C, G, S, J, 2
    switch (ch) {
      case 'A': {
        const d = u * 0.13; // half-width of the flat top
        let hw = hwOf(C - d);
        for (let i = 0; i < 3; i++) hw = hwOf(C - d - hw);
        o(dg(C - d, hw)); o(dg(C + d, w - hw));
        const yc = H * 0.66;
        const xl = hw + (C - d - hw) * (1 - yc / H);
        o([[xl, yc], [w - xl, yc]], false, false);
        break;
      }
      case 'B': {
        const Mb = H * 0.47, Rt = R - w * 0.07;
        const r1 = Math.min(r, (Mb - T) / 2), r2 = Math.min(r, (B - Mb) / 2);
        o([[L, Mb], [Rt, Mb, r1], [Rt, T, r1], [L, T], [L, B], [R, B, r2], [R, Mb, r2], [L, Mb]], false, false);
        break;
      }
      case 'C':
        o([[R, ys], [R, T, r], [L, T, r], [L, B, r], [R, B, r], [R, H - ys]]);
        break;
      case 'D':
        z([[L, T], [R, T, r * 1.25], [R, B, r * 1.25], [L, B]]);
        break;
      case 'E':
        o([[w, T], [L, T], [L, B], [w, B]]);
        o([[L, H * 0.5], [w - u * 0.08, H * 0.5]], false, true);
        break;
      case 'F':
        o([[w, T], [L, T], [L, H]]);
        o([[L, H * 0.52], [w - u * 0.1, H * 0.52]], false, true);
        break;
      case 'G': {
        const Mg = H * 0.54;
        o([[R, ys], [R, T, r], [L, T, r], [L, B, r], [R, B, r], [R, Mg], [C - u * 0.02, Mg]]);
        break;
      }
      case 'H':
        o([[L, 0], [L, H]]); o([[R, 0], [R, H]]); o([[L, H * 0.5], [R, H * 0.5]], false, false);
        break;
      case 'I':
        o([[C, 0], [C, H]]);
        break;
      case 'J':
        o([[R, 0], [R, B, r], [L, B, r], [L, H - ys]]);
        break;
      case 'K': {
        const ya = H * 0.64;
        let hw = hwOf((w - L) * H / ya);
        const xa = w - hw, ka = (xa - L) / ya;       // arm: stem (L,ya) -> top-right
        o([[L, ya], [xa + ka * ext, -ext]], false, true);
        const p = 0.42, xs = L + (xa - L) * p, yst = ya * (1 - p);
        let hl = hwOf((w - xs) * H / (H - yst));
        const kl = (w - hl - xs) / (H - yst);
        o([[xs, yst], [w - hl + kl * ext, H + ext]], false, true);
        o([[L, 0], [L, H]]);
        break;
      }
      case 'L':
        o([[L, 0], [L, B], [w, B]]);
        break;
      case 'M': {
        const Vm = H * 0.5;
        o([[L, H], [L, 0]]); o([[R, H], [R, 0]]);
        const k = (C - L) / Vm;
        o([[L - k * ext, -ext], [C, Vm], [R + k * ext, -ext]]);
        break;
      }
      case 'N': {
        let hw = hwOf(w - S);
        for (let i = 0; i < 3; i++) hw = hwOf(w - 2 * hw);
        o([[L, H], [L, 0]]); o([[R, 0], [R, H]]); o(dg(hw, w - hw));
        break;
      }
      case 'O': case '0':
        z([[L, T, r * 1.25], [R, T, r * 1.25], [R, B, r * 1.25], [L, B, r * 1.25]]);
        break;
      case 'P': {
        const Mp = H * 0.56;
        o([[L, H], [L, T], [R, T, r], [R, Mp, r], [L, Mp]], true, false);
        break;
      }
      case 'Q':
        z([[L, T, r * 1.25], [R, T, r * 1.25], [R, B, r * 1.25], [L, B, r * 1.25]]);
        o([[C + u * 0.04, H * 0.66], [w + u * 0.02 + ext * 0.45, H + ext]], false, true);
        break;
      case 'R': {
        const Mp = H * 0.54;
        o([[L, H], [L, T], [R, T, r], [R, Mp, r], [L, Mp]], true, false);
        let hw = hwOf(w - C);
        o([[C - u * 0.06, Mp], [w - hw + ((w - hw - C) / (H - Mp)) * ext, H + ext]], false, true);
        break;
      }
      case 'S': {
        const Ms = H * 0.5;
        const rs = Math.min(r, (Ms - T) / 2);
        o([[R, ys], [R, T, rs], [L, T, rs], [L, Ms, rs], [R, Ms, rs], [R, B, rs], [L, B, rs], [L, H - ys]]);
        break;
      }
      case 'T':
        o([[0, T], [w, T]]); o([[C, T], [C, H]], false, true);
        break;
      case 'U':
        o([[L, 0], [L, B, r], [R, B, r], [R, 0]]);
        break;
      case 'V': {
        let hw = hwOf(C);
        for (let i = 0; i < 3; i++) hw = hwOf(C - hw);
        o(dg(hw, C)); o(dg(w - hw, C));
        break;
      }
      case 'W': {
        const Vm = H * 0.5;
        o([[L, 0], [L, H]]); o([[R, 0], [R, H]]);
        const k = (C - L) / Vm;
        o([[L - k * ext, H + ext], [C, H - Vm], [R + k * ext, H + ext]]);
        break;
      }
      case 'X': {
        let hw = hwOf(w - S);
        for (let i = 0; i < 3; i++) hw = hwOf(w - 2 * hw);
        o(dg(hw, w - hw)); o(dg(w - hw, hw));
        break;
      }
      case 'Y': {
        const Ym = H * 0.52;
        let hw = hwOf(C);
        const k = (C - hw) / Ym;
        o([[hw - k * ext, -ext], [C, Ym], [w - hw + k * ext, -ext]]);
        o([[C, Ym], [C, H]], false, true);
        break;
      }
      case 'Z': {
        let hw = hwOf(w - S);
        for (let i = 0; i < 3; i++) hw = hwOf(w - 2 * hw);
        o([[0, T], [w, T]]); o([[0, B], [w, B]]); o(dg(w - hw, hw));
        break;
      }
      case '1': {
        const x1 = C + S * 0.15;
        o([[x1 - u * 0.36, T + S * 0.15], [x1, T + S * 0.15], [x1, B]], true, false);
        o([[C - u * 0.34, B], [C + u * 0.34, B]]);
        break;
      }
      case '2': {
        const M2 = H * 0.52, r2 = Math.min(r, (M2 - T) / 2);
        o([[L, ys], [L, T, r2], [R, T, r2], [R, M2, r2], [L, M2, r2], [L, B], [w, B]]);
        break;
      }
      case '3': {
        const M3 = H * 0.47, Rt = R - w * 0.08;
        const r1 = Math.min(r, (M3 - T) / 2), r2 = Math.min(r, (B - M3) / 2);
        o([[0, T], [Rt, T, r1], [Rt, M3, r1], [C - u * 0.1, M3]]);
        o([[C - u * 0.1, M3], [R, M3, r2], [R, B, r2], [0, B]]);
        break;
      }
      case '4': {
        const Y4 = H * 0.64, R4 = R - u * 0.1;
        o([[L, 0], [L, Y4], [w, Y4]]);
        o([[R4, H * 0.3], [R4, H]]);
        break;
      }
      case '5': {
        const M5 = H * 0.46, r5 = Math.min(r, (B - M5) / 2);
        o([[w, T], [L, T], [L, M5], [R, M5, r5], [R, B, r5], [0, B]]);
        break;
      }
      case '6': {
        const M6 = H * 0.47, r6 = Math.min(r, (B - M6) / 2);
        o([[w, T], [L, T, r], [L, B, r6], [R, B, r6], [R, M6, r6], [L, M6]], true, false);
        break;
      }
      case '7': {
        let hw = hwOf(w * 0.5);
        o([[0, T], [w, T]]);
        o(dg(w - hw, C - u * 0.06));
        break;
      }
      case '8': {
        const M8 = H * 0.47, d = u * 0.06;
        const r1 = Math.min(r, (M8 - T) / 2), r2 = Math.min(r, (B - M8) / 2);
        z([[L + d, T, r1], [R - d, T, r1], [R - d, M8, r1], [L + d, M8, r1]]);
        z([[L, M8, r2], [R, M8, r2], [R, B, r2], [L, B, r2]]);
        break;
      }
      case '9': {
        const M9 = H * 0.53, r9 = Math.min(r, (M9 - T) / 2);
        o([[0, B], [R, B, r], [R, T, r9], [L, T, r9], [L, M9, r9], [R, M9]], true, false);
        break;
      }
      case '-':
        o([[0, H * 0.56], [w, H * 0.56]]);
        break;
      case '.':
        o([[C, H - S * 1.05], [C, H]]);
        break;
      case ':':
        o([[C, H * 0.3], [C, H * 0.3 + S * 1.05]]); o([[C, H - S * 1.05], [C, H]]);
        break;
      case "'":
        o([[C, 0], [C, S * 1.4]]);
        break;
      case '/': {
        let hw = hwOf(w - S);
        o(dg(w - hw, hw));
        break;
      }
      default:
        break;
    }
    return { w, subs };
  }

  // weight rule: heavy, but condensed letters get lighter so counters stay open
  const weight = (u, H) => Math.min(0.2 * H, 0.33 * u);

  // optical spacing: air each glyph leaves on its right / left side, in three bands
  // (top, middle, bottom) x u. A pair is kerned by half the narrowest combined band.
  const OPEN_R = { T: [0, 0.4, 0.4], L: [0.55, 0.55, 0], F: [0, 0.1, 0.55], P: [0, 0, 0.45], Y: [0, 0.3, 0.4],
    V: [0, 0.15, 0.35], '7': [0, 0.2, 0.35], A: [0.3, 0.12, 0], K: [0, 0.3, 0], E: [0, 0.08, 0], '1': [0.2, 0.2, 0] };
  const OPEN_L = { T: [0, 0.4, 0.4], A: [0.3, 0.12, 0], J: [0.55, 0.55, 0], V: [0, 0.15, 0.35], Y: [0, 0.3, 0.4], X: [0, 0.2, 0] };
  const kern = (a, b) => {
    const r = OPEN_R[a], l = OPEN_L[b];
    if (!r && !l) return 0;
    const R = r || [0, 0, 0], Lf = l || [0, 0, 0];
    return Math.min(0.25, 0.5 * Math.min(R[0] + Lf[0], R[1] + Lf[1], R[2] + Lf[2]));
  };
  function layout(text, u, H, opt) {
    const S = weight(u, H);
    const gap = (opt.track != null ? opt.track : 0.5) * S + 0.012 * H;
    let x = 0, prev = null;
    const pos = [];
    for (const ch of text) {
      if (ch === ' ') { x += u * (opt.space || 0.5); prev = null; continue; }
      if (prev) x += gap - kern(prev, ch) * u;
      pos.push([ch, x]);
      x += W[ch] === 0 ? S : (W[ch] || 1) * u;
      prev = ch;
    }
    return { pos, w: x, S };
  }
  function lineWidth(text, u, H, opt) { return layout(text, u, H, opt).w; }
  // Solve base width u so the line fills `measure`, within [rmin,rmax]*H.
  function fit(text, H, measure, opt = {}) {
    const rmin = opt.rmin || 0.36, rmax = opt.rmax || 0.72;
    let lo = rmin * H, hi = rmax * H;
    if (lineWidth(text, hi, H, opt) <= measure) return { u: hi, H };
    if (lineWidth(text, lo, H, opt) > measure) {
      // too long even condensed: drop the cap height
      let h1 = H;
      while (h1 > 8 && lineWidth(text, rmin * h1, h1, opt) > measure) h1 *= 0.97;
      return { u: rmin * h1, H: h1 };
    }
    for (let i = 0; i < 40; i++) {
      const mid = (lo + hi) / 2;
      if (lineWidth(text, mid, H, opt) > measure) hi = mid; else lo = mid;
    }
    return { u: lo, H };
  }

  let UID = 0;
  /* Paint a line of Board Block lettering. Returns {svg, w, h}. Origin = top-left of cap box.
     st: {fillTop, fillBot, split, outline, o, shadow, depth, inline, halo, h}  (colours + sizes) */
  function paint(text, u, H, st, opt = {}) {
    const id = 'bb' + (UID++);
    const L0 = layout(text, u, H, opt), S = L0.S;
    let geo = '', inl = '';
    const ins = S * 0.55;
    for (const [ch, x] of L0.pos) {
      const g = glyph(ch, u, H, S);
      let d = '', di = '';
      for (const s of g.subs) {
        d += poly(s.pts, s.closed);
        di += s.closed ? poly(s.pts, true) : poly(trim(s.pts, s.fs, s.fe, ins), false);
      }
      geo += `<path transform="translate(${f(x)} 0)" d="${d}"/>`;
      inl += `<path transform="translate(${f(x)} 0)" d="${di}"/>`;
    }
    const w = L0.w;
    const o = st.o != null ? st.o : Math.max(1.6, S * 0.13);
    const depth = st.depth != null ? st.depth : S * 0.55;
    const halo = st.halo ? (st.h != null ? st.h : Math.max(1.4, S * 0.1)) : 0;
    const t = st.t != null ? st.t : Math.max(1.1, S * 0.1);
    const dirx = st.dx != null ? st.dx : 1, diry = st.dy != null ? st.dy : 1;
    const big = 99999;
    const band = (a, b) => `<rect x="${-big}" y="${f(a)}" width="${2 * big}" height="${f(b - a)}"/>`;
    let s = `<defs>`;
    s += `<g id="${id}g">${geo}</g><g id="${id}i">${inl}</g>`;
    s += `<clipPath id="${id}cf" clipPathUnits="userSpaceOnUse">${band(0, H)}</clipPath>`;
    s += `<clipPath id="${id}co" clipPathUnits="userSpaceOnUse">${band(-o, H + o)}</clipPath>`;
    s += `<clipPath id="${id}ch" clipPathUnits="userSpaceOnUse">${band(-o - halo, H + o + halo)}</clipPath>`;
    s += `<clipPath id="${id}ci" clipPathUnits="userSpaceOnUse">${band(S / 2 - t, H - S / 2 + t)}</clipPath>`;
    const split = st.split != null ? st.split : 0.5;
    s += `<linearGradient id="${id}sp" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${f(H)}">` +
      `<stop offset="${split}" stop-color="${st.fillTop}"/><stop offset="${split}" stop-color="${st.fillBot || st.fillTop}"/></linearGradient>`;
    s += `</defs>`;
    const U = (ref, stroke, sw, clip, tx = 0, ty = 0) =>
      `<use href="#${ref}" ${tx || ty ? `transform="translate(${f(tx)} ${f(ty)})"` : ''} stroke="${stroke}" stroke-width="${f(sw)}" clip-path="url(#${clip})"/>`;
    s += `<g fill="none" stroke-linejoin="miter" stroke-miterlimit="12" stroke-linecap="butt">`;
    const step = Math.max(0.5, depth / Math.ceil(depth / 0.9));
    // halo around letter + shadow
    if (halo) {
      for (let k = 0; k <= depth + 0.01; k += step) s += U(id + 'g', st.halo, S + 2 * o + 2 * halo, id + 'ch', k * dirx, k * diry);
    }
    if (depth > 0) {
      // shadow keyline then shadow body
      for (let k = step; k <= depth + 0.01; k += step) s += U(id + 'g', st.outline, S + 2 * o, id + 'co', k * dirx, k * diry);
      if (st.shadow && st.shadow !== st.outline) {
        for (let k = step; k <= depth - o * 0.7 + 0.01; k += step) s += U(id + 'g', st.shadow, S, id + 'cf', k * dirx, k * diry);
      }
    }
    s += U(id + 'g', st.outline, S + 2 * o, id + 'co');
    s += U(id + 'g', `url(#${id}sp)`, S, id + 'cf');
    if (st.inline) s += U(id + 'i', st.inline, t, id + 'ci');
    s += `</g>`;
    return { svg: s, w, h: H, S, o, depth, halo };
  }

  root.Board = { glyph, poly, fit, paint, lineWidth, weight, W };
})(typeof window !== 'undefined' ? window : globalThis);
