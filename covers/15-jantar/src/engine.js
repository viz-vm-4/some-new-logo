/* Jantar — a tiny sun-and-stone renderer.
   Convex solids -> back-face cull -> BSP painter order -> analytic hard shadows
   (every sun-facing face of every caster is projected along the sun ray onto each lit
   receiver plane and clipped to it). Output: flat-toned SVG polygons, pure vector. */
(function (G) {
  const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
  const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
  const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const len = (a) => Math.hypot(a[0], a[1], a[2]);
  const nrm = (a) => { const l = len(a) || 1; return [a[0] / l, a[1] / l, a[2] / l]; };
  const lerp3 = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
  const D = Math.PI / 180;

  function newell(P) {
    let x = 0, y = 0, z = 0;
    for (let i = 0; i < P.length; i++) {
      const a = P[i], b = P[(i + 1) % P.length];
      x += (a[1] - b[1]) * (a[2] + b[2]); y += (a[2] - b[2]) * (a[0] + b[0]); z += (a[0] - b[0]) * (a[1] + b[1]);
    }
    return nrm([x, y, z]);
  }
  function centroid(P) { let c = [0, 0, 0]; for (const p of P) c = add(c, p); return mul(c, 1 / P.length); }

  // ---------- colour ----------
  function hex(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]; }
  function mix(a, b, t) { const A = hex(a), B = hex(b); return '#' + [0, 1, 2].map(i => Math.round(A[i] + (B[i] - A[i]) * t).toString(16).padStart(2, '0')).join(''); }

  // ---------- scene ----------
  class Scene {
    constructor() { this.faces = []; this.nsolid = 0; this.overlays = []; this.E = [[1, 0, 0], [0, 1, 0], [0, 0, 1]]; }
    // local frame -> world
    W(x, y, z) { const E = this.E; return [x * E[0][0] + y * E[1][0] + z * E[2][0], x * E[0][1] + y * E[1][1] + z * E[2][1], x * E[0][2] + y * E[1][2] + z * E[2][2]]; }
    // faces: array of point arrays; normals oriented outward from the solid's centroid
    solid(faces, o = {}) {
      const id = this.nsolid++;
      const c = o.center || centroid(faces.flat());
      for (let pts of faces) {
        pts = pts.map(p => p.slice());
        let n = newell(pts);
        if (dot(n, sub(centroid(pts), c)) < 0) { pts.reverse(); n = mul(n, -1); }
        const mat = typeof o.mat === 'function' ? o.mat(n, pts) : o.mat;
        if (mat === null) continue;
        this.faces.push({ pts, n, mat, cast: o.cast !== false, recv: o.recv !== false, sid: id, hide: o.hide, noTrim: o.noTrim });
      }
      return id;
    }
    // a single face with an explicit "outward" hint direction
    face(pts, hint, o = {}) {
      pts = pts.map(p => p.slice());
      let n = newell(pts); if (dot(n, hint) < 0) { pts.reverse(); n = mul(n, -1); }
      this.faces.push({ pts, n, mat: o.mat, cast: o.cast !== false, recv: o.recv !== false, sid: this.nsolid++, decal: o.decal });
    }
    box(x0, y0, z0, x1, y1, z1, o = {}) {
      const P = (x, y, z) => this.W(x, y, z);
      const f = [
        [P(x0, y0, z0), P(x1, y0, z0), P(x1, y1, z0), P(x0, y1, z0)],
        [P(x0, y0, z1), P(x1, y0, z1), P(x1, y1, z1), P(x0, y1, z1)],
        [P(x0, y0, z0), P(x1, y0, z0), P(x1, y0, z1), P(x0, y0, z1)],
        [P(x0, y1, z0), P(x1, y1, z0), P(x1, y1, z1), P(x0, y1, z1)],
        [P(x0, y0, z0), P(x0, y1, z0), P(x0, y1, z1), P(x0, y0, z1)],
        [P(x1, y0, z0), P(x1, y1, z0), P(x1, y1, z1), P(x1, y0, z1)],
      ];
      return this.solid(f, o);
    }
    // extrude planar convex polygon `base` (3D points) by vector `dir`
    extrude(base, dir, o = {}) {
      const top = base.map(p => add(p, dir));
      const f = [base, top];
      for (let i = 0; i < base.length; i++) { const j = (i + 1) % base.length; f.push([base[i], base[j], top[j], top[i]]); }
      return this.solid(f, o);
    }
    // planar convex top polygon, walls dropped vertically to z = z0
    slab(top, z0, o = {}) {
      const bot = top.map(p => [p[0], p[1], z0]);
      const f = [top, bot.slice().reverse()];
      for (let i = 0; i < top.length; i++) { const j = (i + 1) % top.length; f.push([top[i], top[j], bot[j], bot[i]]); }
      return this.solid(f, o);
    }
    // thin decal lying on a surface (quad pts), pushed off along normal n
    decal(pts, n, mat, off = 0.35) {
      this.face(pts.map(p => add(p, mul(n, off))), n, { mat, cast: false, decal: true });
    }
  }

  // remove coincident internal areas between touching axis-aligned rectangular faces
  function trimInternal(faces, E) {
    const info = new Map(); const groups = new Map();
    faces.forEach((f, idx) => {
      if (f.noTrim || f.decal || f.pts.length !== 4) return;
      const k = [0, 1, 2].find(a => Math.abs(Math.abs(dot(f.n, E[a])) - 1) < 1e-7); if (k == null) return;
      const [i, j] = [0, 1, 2].filter(a => a !== k);
      const us = f.pts.map(p => dot(p, E[i])), vs = f.pts.map(p => dot(p, E[j]));
      const r = [Math.min(...us), Math.min(...vs), Math.max(...us), Math.max(...vs)];
      const c = Math.round(dot(f.pts[0], E[k]) * 1000) / 1000;
      info.set(idx, { k, i, j, c, r, sub: [] });
      const key = k + ':' + c; if (!groups.has(key)) groups.set(key, []); groups.get(key).push(idx);
    });
    for (const g of groups.values()) {
      for (let a = 0; a < g.length; a++) for (let b = a + 1; b < g.length; b++) {
        const A = faces[g[a]], B = faces[g[b]]; if (dot(A.n, B.n) > -0.5) continue;
        const ra = info.get(g[a]).r, rb = info.get(g[b]).r;
        const x0 = Math.max(ra[0], rb[0]), y0 = Math.max(ra[1], rb[1]), x1 = Math.min(ra[2], rb[2]), y1 = Math.min(ra[3], rb[3]);
        if (x1 - x0 > 1e-6 && y1 - y0 > 1e-6) { info.get(g[a]).sub.push([x0, y0, x1, y1]); info.get(g[b]).sub.push([x0, y0, x1, y1]); }
      }
    }
    const out = [];
    faces.forEach((f, idx) => {
      const I = info.get(idx); if (!I || !I.sub.length) { out.push(f); return; }
      let rects = [I.r];
      for (const s of I.sub) {
        const nx = [];
        for (const r of rects) {
          if (s[0] >= r[2] || s[2] <= r[0] || s[1] >= r[3] || s[3] <= r[1]) { nx.push(r); continue; }
          if (s[1] > r[1]) nx.push([r[0], r[1], r[2], s[1]]);
          if (s[3] < r[3]) nx.push([r[0], s[3], r[2], r[3]]);
          const yy0 = Math.max(r[1], s[1]), yy1 = Math.min(r[3], s[3]);
          if (s[0] > r[0]) nx.push([r[0], yy0, s[0], yy1]);
          if (s[2] < r[2]) nx.push([s[2], yy0, r[2], yy1]);
        }
        rects = nx.filter(r => r[2] - r[0] > 1e-6 && r[3] - r[1] > 1e-6);
      }
      for (const r of rects) {
        const mk = (u, v) => add(add(mul(E[I.k], I.c), mul(E[I.i], u)), mul(E[I.j], v));
        let pts = [mk(r[0], r[1]), mk(r[2], r[1]), mk(r[2], r[3]), mk(r[0], r[3])];
        if (dot(newell(pts), f.n) < 0) pts.reverse();
        out.push(Object.assign({}, f, { pts }));
      }
    });
    return out;
  }

  // ---------- clipping ----------
  function clipPlane(P, n, d, eps = 0) { // keep dot(n,p) - d >= eps
    const out = []; const m = P.length; if (!m) return out;
    for (let i = 0; i < m; i++) {
      const a = P[i], b = P[(i + 1) % m];
      const da = dot(n, a) - d - eps, db = dot(n, b) - d - eps;
      if (da >= 0) out.push(a);
      if ((da >= 0) !== (db >= 0)) { const t = da / (da - db); out.push(lerp3(a, b, t)); }
    }
    return out;
  }
  function area2(P) { let s = 0; for (let i = 0; i < P.length; i++) { const a = P[i], b = P[(i + 1) % P.length]; s += a[0] * b[1] - b[0] * a[1]; } return s / 2; }
  function clip2(subj, clip) { // convex clip polygon
    let out = subj; const ccw = area2(clip) > 0 ? 1 : -1;
    for (let i = 0; i < clip.length && out.length; i++) {
      const a = clip[i], b = clip[(i + 1) % clip.length]; const inp = out; out = [];
      const side = (p) => ccw * ((b[0] - a[0]) * (p[1] - a[1]) - (b[1] - a[1]) * (p[0] - a[0]));
      for (let k = 0; k < inp.length; k++) {
        const p = inp[k], q = inp[(k + 1) % inp.length];
        const sp = side(p), sq = side(q);
        if (sp >= 0) out.push(p);
        if ((sp >= 0) !== (sq >= 0)) { const t = sp / (sp - sq); out.push([p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t]); }
      }
    }
    return out;
  }

  // ---------- BSP ----------
  const EPS = 1e-3;
  function split(poly, n, d, on, front, back) {
    let type = 0; const ts = [];
    for (const p of poly.pts) { const t = dot(n, p) - d; const k = t < -EPS ? 2 : t > EPS ? 1 : 0; type |= k; ts.push(k); }
    if (type === 0) on.push(poly);
    else if (type === 1) front.push(poly);
    else if (type === 2) back.push(poly);
    else {
      const f = [], b = []; const P = poly.pts;
      for (let i = 0; i < P.length; i++) {
        const j = (i + 1) % P.length; const ti = ts[i], tj = ts[j]; const vi = P[i], vj = P[j];
        if (ti !== 2) f.push(vi); if (ti !== 1) b.push(ti !== 2 ? vi.slice() : vi);
        if ((ti | tj) === 3) { const t = (d - dot(n, vi)) / dot(n, sub(vj, vi)); const v = lerp3(vi, vj, t); f.push(v); b.push(v.slice()); }
      }
      if (f.length >= 3) front.push(Object.assign({}, poly, { pts: f }));
      if (b.length >= 3) back.push(Object.assign({}, poly, { pts: b }));
    }
  }
  function bsp(polys) {
    // iterative build
    const root = { polys }; const stack = [root];
    while (stack.length) {
      const node = stack.pop(); const ps = node.polys; delete node.polys;
      if (!ps.length) { node.empty = true; continue; }
      // choose splitter: largest decal-free polygon among a few candidates
      let bi = 0, ba = -1;
      for (let i = 0; i < ps.length && i < 24; i++) { if (ps[i].decal) continue; const a = ps[i].area || 0; if (a > ba) { ba = a; bi = i; } }
      const sp = ps[bi]; node.n = sp.n; node.d = dot(sp.n, sp.pts[0]); node.on = []; const f = [], b = [];
      for (let i = 0; i < ps.length; i++) split(ps[i], node.n, node.d, node.on, f, b);
      node.on.sort((a, b) => (a.decal ? 1 : 0) - (b.decal ? 1 : 0));
      node.front = { polys: f }; node.back = { polys: b }; stack.push(node.front, node.back);
    }
    return root;
  }
  function traverse(node, v, out) {
    // explicit stack traversal back-to-front
    const st = [[node, 0]];
    while (st.length) {
      const [nd, phase] = st.pop();
      if (!nd || nd.empty) continue;
      const camFront = dot(nd.n, v) < 0; // camera in front half-space
      const far = camFront ? nd.back : nd.front, near = camFront ? nd.front : nd.back;
      if (phase === 0) { st.push([nd, 1]); st.push([far, 0]); }
      else { for (const p of nd.on) out.push(p); st.push([near, 0]); }
    }
    return out;
  }

  // ---------- camera / sun ----------
  function camera(az, el, s, ox, oy) {
    const c = [Math.sin(az * D) * Math.cos(el * D), -Math.cos(az * D) * Math.cos(el * D), Math.sin(el * D)];
    const v = mul(c, -1);
    const r = nrm(cross(v, [0, 0, 1])); const u = cross(r, v);
    return { v, r, u, s, ox, oy, P: (p) => [ox + s * dot(p, r), oy - s * dot(p, u)] };
  }
  // elevation-oblique: front (x,z) plane true shape, depth y recedes at angle alpha, factor k
  function oblique(k, alpha, s, ox, oy) {
    const ca = Math.cos(alpha * D), sa = Math.sin(alpha * D);
    const v = nrm([-k * ca, 1, -k * sa]);
    return { v, s, ox, oy, k, alpha, P: (p) => [ox + s * (p[0] + k * ca * p[1]), oy - s * (p[2] + k * sa * p[1])] };
  }
  function sunDir(azCompass, alt) { return [Math.sin(azCompass * D) * Math.cos(alt * D), Math.cos(azCompass * D) * Math.cos(alt * D), Math.sin(alt * D)]; }

  // material tone for a face normal
  function tone(m, n, L, lit) {
    const k = dot(n, L);
    if (m.flat && ((lit && k > 0) || !m.sh)) return m.flat;
    if (lit && k > 0) return mix(m.lo, m.hi, Math.min(1, Math.pow(k, m.g || 0.8)));
    return mix(m.sh, m.shUp || m.sh, Math.max(0, n[2]));
  }

  const f1 = (x) => (Math.round(x * 100) / 100).toString();
  function pathD(P) { return 'M' + P.map(p => f1(p[0]) + ' ' + f1(p[1])).join('L') + 'Z'; }

  function render(scene, cam, L, opts = {}) {
    const vis = [];
    const faces = trimInternal(scene.faces, scene.E);
    for (const f of faces) {
      if (f.hide) continue;
      if (dot(f.n, cam.v) < -1e-7) { const P2 = f.pts.map(cam.P); f.area = Math.abs(area2(P2)); vis.push(Object.assign({}, f)); }
    }
    vis.sort((a, b) => b.area - a.area);
    const order = traverse(bsp(vis), cam.v, []);
    // casters, bucketed in sun-space
    const e1 = nrm(Math.abs(L[2]) > 0.999 ? [1, 0, 0] : cross(L, [0, 0, 1])), e2 = cross(L, e1);
    const GS = opts.grid || 30;
    const casters = faces.filter(f => f.cast && !f.decal && dot(f.n, L) > 1e-6);
    const grid = new Map();
    const sbb = (P) => { let a = 1e9, b = 1e9, c = -1e9, d = -1e9; for (const p of P) { const u = dot(p, e1), v = dot(p, e2); if (u < a) a = u; if (u > c) c = u; if (v < b) b = v; if (v > d) d = v; } return [a, b, c, d]; };
    casters.forEach((c, ci) => {
      c.ci = ci; const bb = sbb(c.pts);
      for (let i = Math.floor(bb[0] / GS); i <= Math.floor(bb[2] / GS); i++) for (let j = Math.floor(bb[1] / GS); j <= Math.floor(bb[3] / GS); j++) {
        const key = i + ',' + j; let l = grid.get(key); if (!l) grid.set(key, l = []); l.push(c);
      }
    });
    const query = (bb) => {
      const i0 = Math.floor(bb[0] / GS), i1 = Math.floor(bb[2] / GS), j0 = Math.floor(bb[1] / GS), j1 = Math.floor(bb[3] / GS);
      if ((i1 - i0 + 1) * (j1 - j0 + 1) > 4000) return casters;
      const seen = new Set(), res = [];
      for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) { const l = grid.get(i + ',' + j); if (l) for (const c of l) if (!seen.has(c.ci)) { seen.add(c.ci); res.push(c); } }
      return res;
    };
    const inShadow = (p, sid) => {
      const u = dot(p, e1), v = dot(p, e2); const l = grid.get(Math.floor(u / GS) + ',' + Math.floor(v / GS)); if (!l) return false;
      for (const c of l) {
        if (c.sid === sid) continue;
        const den = dot(c.n, L); if (den < 1e-9) continue;
        const t = (dot(c.n, c.pts[0]) - dot(c.n, p)) / den; if (t <= 0.2) continue;
        const q = add(p, mul(L, t)); let inside = true;
        for (let i = 0; i < c.pts.length; i++) { const a = c.pts[i], b = c.pts[(i + 1) % c.pts.length]; if (dot(cross(sub(b, a), sub(q, a)), c.n) < -1e-6) { inside = false; break; } }
        if (inside) return true;
      }
      return false;
    };
    const out = []; const sw = opts.seam == null ? 0.42 : opts.seam, ssw = opts.shadowSeam || 0.7;
    for (const f of order) {
      const k = dot(f.n, L);
      let lit = k > 1e-6 && !(f.mat.flat && !f.mat.sh);
      const P2 = f.pts.map(cam.P);
      const A2 = Math.abs(area2(P2)); if (A2 < 0.02) continue;
      if (lit && f.recv !== false && A2 < (opts.smallArea || 900)) {
        // small receivers entirely in shadow are painted as shadow (avoids seams between many slivers)
        const c = centroid(f.pts); const pts = f.pts.map(p => lerp3(p, c, 0.02));
        if (pts.every(p => inShadow(p, f.sid))) lit = false;
      }
      const col = tone(f.mat, f.n, L, lit);
      out.push(`<path d="${pathD(P2)}" fill="${col}" stroke="${col}" stroke-width="${sw}" stroke-linejoin="round"/>`);
      if (lit && f.recv !== false) {
      const d0 = dot(f.n, f.pts[0]); const shCol = tone(f.mat, f.n, L, false);
      const shs = [];
      for (const c of query(sbb(f.pts))) {
        if (c.sid === f.sid) continue;
        let any = false; for (const p of c.pts) if (dot(f.n, p) - d0 > 0.05) { any = true; break; }
        if (!any) continue;
        const cp = clipPlane(c.pts, f.n, d0, 0.01); if (cp.length < 3) continue;
        const pr = cp.map(p => { const t = (dot(f.n, p) - d0) / k; return cam.P(sub(p, mul(L, t))); });
        const cl = clip2(pr, P2); if (cl.length < 3 || Math.abs(area2(cl)) < 0.05) continue;
        shs.push(area2(cl) < 0 ? cl.reverse() : cl);
      }
      if (shs.length) out.push(`<path d="${shs.map(pathD).join('')}" fill="${shCol}" stroke="${shCol}" stroke-width="${ssw}" stroke-linejoin="round"/>`);
      }
      // masonry coursing on vertical faces
      const cs = f.mat.course;
      if (cs && Math.abs(f.n[2]) < 0.2 && !f.decal) {
        let z0 = 1e9, z1 = -1e9; for (const p of f.pts) { z0 = Math.min(z0, p[2]); z1 = Math.max(z1, p[2]); }
        const segs = [];
        for (let z = Math.ceil((z0 + 0.5) / cs) * cs; z < z1 - 0.5; z += cs) {
          const hit = [];
          for (let i = 0; i < f.pts.length; i++) { const a = f.pts[i], b = f.pts[(i + 1) % f.pts.length]; if ((a[2] - z) * (b[2] - z) < 0) { const t = (z - a[2]) / (b[2] - a[2]); hit.push(cam.P(lerp3(a, b, t))); } }
          if (hit.length === 2) segs.push('M' + f1(hit[0][0]) + ' ' + f1(hit[0][1]) + 'L' + f1(hit[1][0]) + ' ' + f1(hit[1][1]));
        }
        if (segs.length) out.push(`<path d="${segs.join('')}" stroke="${f.mat.courseCol || '#3a0d05'}" stroke-opacity="${f.mat.courseOp || 0.16}" stroke-width="${f.mat.courseW || 0.7}" fill="none"/>`);
      }
    }
    return out.join('');
  }

  G.J = { add, sub, mul, dot, cross, nrm, len, lerp3, D, Scene, camera, oblique, sunDir, render, mix, clip2, clipPlane, area2, pathD };
})(window);
