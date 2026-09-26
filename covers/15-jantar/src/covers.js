/* Jantar covers: palettes, scenes, assembly */
(function () {
  const { Scene, oblique, render, nrm, mix, D } = J;
  const W = 720, H = 888, PL = 748; // plinth (section) line

  // ---------- the three hours ----------
  const STONE = { hi: '#F7CDB0', lo: '#E08865', sh: '#8C3325', shUp: '#9B3E2E', g: 0.85 };
  const HOURS = {
    beginner: {
      label: 'Beginner', hour: 'Morning', n: 1,
      L: nrm([-0.62, -0.55, 0.56]),
      sky: '#EFE6D7', ink: '#26140E', sub: '#7A3A28',
      stone: STONE,
      ground: { flat: '#EFE6D7', sh: '#C4A38D', shUp: '#C4A38D' },
      marble: { hi: '#FFFAF2', lo: '#F4ECE1', sh: '#C49C8C', shUp: '#CCA697' },
      cut: { flat: '#5B1D18' },
    },
    intermediate: {
      label: 'Intermediate', hour: 'Noon', n: 2,
      L: nrm([0.45, -0.3, 0.84]),
      sky: '#D9A546', ink: '#26140E', sub: '#5B2616',
      stone: STONE,
      ground: { flat: '#D9A546', sh: '#A9732B', shUp: '#A9732B' },
      marble: { hi: '#FFFBF5', lo: '#F2E8DB', sh: '#BF9A86', shUp: '#C8A492' },
      cut: { flat: '#5B1D18' },
    },
    advanced: {
      label: 'Advanced', hour: 'Evening', n: 3,
      L: nrm([0.76, 0.5, 0.29]),
      sky: '#23264F', ink: '#F6EDE0', sub: '#E3A57E',
      stone: { hi: '#FBBD86', lo: '#E07B4C', sh: '#5A2731', shUp: '#65303A', g: 0.8 },
      ground: { flat: '#23264F', sh: '#0F1026', shUp: '#0F1026' },
      marble: { hi: '#FFE4CC', lo: '#F4C5A3', sh: '#7B4A55', shUp: '#86525C' },
      cut: { flat: '#5B1D18' },
    },
  };

  // ---------- helpers ----------
  const CAM = (s = 1, ox = 360, mirror = false) => oblique(0.5, mirror ? 140 : 40, s, ox, PL);
  function ground(S, hr, yB = 3000) {
    S.box(-4000, 0, -1200, 4000, yB, 0, { mat: (n) => (n[1] < -0.5 ? hr.cut : n[2] > 0.5 ? hr.ground : null), cast: false, noTrim: true });
  }
  const tanD = (a) => Math.tan(a * D);

  // ---------- scenes ----------
  const SCENES = {};

  // Samrat Yantra — the right triangle as instrument. Triangle faces the viewer; quadrant in front.
  SCENES.samrat = (hr) => {
    const S = new Scene(); ground(S, hr);
    const phi = 27, tp = tanD(phi), cp = Math.cos(phi * D), sp = Math.sin(phi * D);
    const x0 = -560, x1 = 330, Hg = (x1 - x0) * tp, yg0 = 250, w = 60, par = 10;
    const tri = (y) => [[x0, y, 0], [x1, y, 0], [x1, y, Hg]];
    S.extrude(tri(yg0), [0, par, 0], { mat: hr.stone });
    S.extrude(tri(yg0 + w - par), [0, par, 0], { mat: hr.stone });
    const run = 15;
    for (let x = x0; x < x1 - 0.1; x += run) {
      const xe = Math.min(x1, x + run); const z = Math.max(3, (xe - x0) * tp - 8);
      S.box(x, yg0 + par, 0, xe, yg0 + w - par, z, { mat: hr.stone });
    }
    // north end: a plain block under the top
    // quadrants about the gnomon edge; axis a along the hypotenuse, arcs sweep toward/away from viewer
    const R = 220, a = [cp, 0, sp], d = [sp, 0, -cp];
    const zc = R * cp + 16, xc = x0 + zc / tp, bw = 96, N = 40;
    for (const sg of [-1, 1]) {
      const yf = sg < 0 ? yg0 : yg0 + w;
      const P = (t, s) => [xc + R * Math.sin(t) * d[0] + s * a[0], yf + sg * R * Math.cos(t), zc + R * Math.sin(t) * d[2] + s * a[2]];
      const Nn = (t) => nrm([-Math.sin(t) * d[0], -sg * Math.cos(t), -Math.sin(t) * d[2]]);
      for (let i = 0; i < N; i++) {
        const t0 = (i / N) * Math.PI / 2, t1 = ((i + 1) / N) * Math.PI / 2;
        S.slab([P(t0, -bw / 2), P(t1, -bw / 2), P(t1, bw / 2), P(t0, bw / 2)], 0, { mat: hr.stone });
        const nn = Nn((t0 + t1) / 2);
        S.decal([P(t0, bw / 2 - 15), P(t1, bw / 2 - 15), P(t1, bw / 2 - 4), P(t0, bw / 2 - 4)], nn, hr.marble);
        S.decal([P(t0, -bw / 2 + 4), P(t1, -bw / 2 + 4), P(t1, -bw / 2 + 15), P(t0, -bw / 2 + 15)], nn, hr.marble);
      }
      for (let h = 1; h < 24; h++) {
        const t = (h / 24) * Math.PI / 2, ww = h % 4 === 0 ? 0.007 : 0.0035, ln = h % 4 === 0 ? 15 : 32;
        S.decal([P(t - ww, -bw / 2 + ln), P(t + ww, -bw / 2 + ln), P(t + ww, bw / 2 - ln), P(t - ww, bw / 2 - ln)], Nn(t), hr.marble, 0.5);
      }
    }
    return { S, cam: CAM(0.78, 470) };
  };

  // A wall with one window — the context window
  SCENES.aperture = (hr) => {
    const S = new Scene(); ground(S, hr);
    const xw = 40, t = 56, Hh = 360, Y0 = 60, Y1 = 700, wy0 = 300, wy1 = 440, wz0 = 120, wz1 = 260;
    S.box(xw, Y0, 0, xw + t, wy0, Hh, { mat: hr.stone });
    S.box(xw, wy1, 0, xw + t, Y1, Hh, { mat: hr.stone });
    S.box(xw, wy0, 0, xw + t, wy1, wz0, { mat: hr.stone });
    S.box(xw, wy0, wz1, xw + t, wy1, Hh, { mat: hr.stone });
    for (let i = 0; i < 17; i++) { const y = 30 + i * 44; S.box(-160, y, 0, -128, y + 32, 32, { mat: hr.marble }); }
    return { S, cam: CAM(0.9, 470, true), L: nrm([0.62, -0.08, 0.78]) };
  };

  // Field of gnomons — identical instruments in parallel
  SCENES.field = (hr) => {
    const S = new Scene(); ground(S, hr);
    for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) {
      const x = -330 + c * 150, y = 120 + r * 170;
      S.extrude([[x, y, 0], [x + 96, y, 0], [x, y, 96 * 0.9]], [0, 30, 0], { mat: hr.stone });
    }
    return { S, cam: CAM(1, 330) };
  };

  // Stair to the sky — autoregression
  SCENES.stair = (hr) => {
    const S = new Scene(); ground(S, hr);
    const n = 15, run = 38, rise = 32, y0 = 120, y1 = 250;
    for (let i = 0; i < n; i++) S.box(-300 + i * run, y0, 0, -300 + (i + 1) * run, y1, (i + 1) * rise, { mat: hr.stone });
    return { S, cam: CAM(1, 360) };
  };

  // ---------- books ----------
  const BOOKS = [
    { slug: 'mathematical-foundations-for-ml', title: ['Mathematical', 'Foundations for', 'Machine Learning'], level: 'beginner', capsules: 43, hours: 10, scene: 'samrat', fig: 'After the Samrat Yantra, Jaipur, 1734' },
    { slug: 'ai-context-engineering', title: ['AI Context', 'Engineering'], level: 'intermediate', capsules: 43, hours: 10, scene: 'aperture', fig: 'A roof with one opening' },
    { slug: 'build-llms-from-scratch', title: ['Build Large Language', 'Models (LLMs)', 'from Scratch'], level: 'intermediate', capsules: 20, hours: 6, scene: 'stair', fig: 'A stair built one step at a time' },
    { slug: '5d-parallelism', title: ['5D Parallelism', 'for Large Model', 'Training'], level: 'advanced', capsules: 40, hours: 9, scene: 'field', fig: 'A field of identical gnomons' },
  ];

  // ---------- marks ----------
  function mark(col) { // Vizuara stepwell mark: an inverted stepped V
    const r = [[0, 26], [4, 18], [8, 10], [12, 2]]; // [y, width]
    return `<svg class="mk" width="26" height="18" viewBox="0 0 26 18"><path fill="${col}" d="${r.map(([y, w]) => `M${(26 - w) / 2} ${y}h${w}v4.2h-${w}z`).join('')}"/></svg>`;
  }
  function levelGlyph(n, col) {
    let s = ''; for (let i = 0; i < 3; i++) { const h = 5 + i * 4.5, x = i * 9; s += i < n ? `<rect x="${x}" y="1" width="7.5" height="${h}" fill="${col}"/>` : `<rect x="${x + 0.6}" y="1.6" width="6.3" height="${h - 1.2}" fill="none" stroke="${col}" stroke-width="1.2"/>`; }
    return `<svg class="lv" width="26" height="16" viewBox="0 0 26 16">${s}</svg>`;
  }

  function build(b) {
    const hr = HOURS[b.level];
    const sc = SCENES[b.scene](hr);
    const art = render(sc.S, sc.cam, sc.L || hr.L);
    const el = document.createElement('div');
    el.className = 'cover lv-' + b.level; el.dataset.slug = b.slug;
    el.style.setProperty('--sky', hr.sky); el.style.setProperty('--ink', hr.ink); el.style.setProperty('--sub', hr.sub);
    el.innerHTML = `<svg class="art" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><rect width="${W}" height="${H}" fill="${hr.sky}"/>${art}</svg>
      <h2 class="title">${b.title.join('<br>')}</h2>
      <div class="band">
        <div class="row r1"><span class="imp">${mark('#F4EADC')}<b>Vizuara</b> Books</span><span class="lvl">${levelGlyph(hr.n, '#F4EADC')}${hr.label}</span></div>
        <div class="row r2"><span>${b.capsules} capsules · ${b.hours} hours</span><span class="fig">${b.fig}</span></div>
      </div>`;
    return el;
  }

  window.JANTAR = { BOOKS, build, HOURS };
})();
