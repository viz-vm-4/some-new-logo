/* Full print wrap (back + spine + front) for one book, printed with the same drums as its cover. */
(function () {
  'use strict';
  const { sheet, coverSVG, halftone, circ, rectD, polyD, T, f, INK, LEVELS, vMark, levelMark, measure, rng, W, H, M } = window.RISO;
  const p = (d) => d ? `<path d="${d}"/>` : '';
  const mono = (sz = 13, w = 500, ls = 0.06) => ({ font: 'mono', size: sz, weight: w, ls });

  window.buildWrap = function (book, spineW = 48) {
    const lv = LEVELS[book.level];
    const K = INK[lv.ink].hex;
    const FX = book.flash.map((k) => INK[k].hex);
    const R = rng(book.slug + ':back');

    // ---------------- back cover
    let fl = '', key = '';
    key += levelMark(M, 56, lv.mark, 13) + T(M + 22, 56, lv.label.toUpperCase(), mono(12.5, 500, 0.14));
    key += T(W - M, 56, 'FREE TO READ AT BOOKS.VIZUARA.AI', { ...mono(12.5, 500, 0.14), anchor: 'end' });
    const blurb = ['Twenty short capsules.', 'One large language model,', 'built from scratch, one', 'mechanism at a time.'];
    blurb.forEach((l, i) => { key += T(M, 150 + i * 50, l, { font: 'serif', size: 48 }); });
    // the last row of the front cover's mask, read across: “it” attends to every token before it
    const words = ['Every', 'token', 'attends', 'to', 'itself', 'and', 'those', 'before', 'it'];
    const cw = (W - 2 * M) / words.length, y0 = 430, ch = cw - 6;
    const sc = words.map((_, j) => -0.55 * (8 - j) + (j === 0 ? 1.1 : 0) + (j === 8 ? 0.6 : 0) + (R() - 0.5) * 1.4);
    const mx = Math.max(...sc);
    words.forEach((wd, j) => {
      const t = Math.min(1, 0.07 + Math.exp(sc[j] - mx) * 0.93);
      const x = M + j * cw;
      if (t > 0.9) fl += p(rectD(x, y0, ch, ch));
      else fl += p(halftone({ box: [x + 2, y0 + 2, x + ch - 2, y0 + ch - 2], cell: 7.5, angle: 45, tone: () => t }));
      key += T(x + ch / 2, y0 + ch + 26, wd, { ...mono(13, 500, 0), anchor: 'middle' });
    });
    key += p(rectD(M - 3, y0 - 10, W - 2 * M + 6 - 6 + 3, 4));
    key += T(M, y0 - 24, 'ATTENTION FROM THE LAST TOKEN', mono(11.5, 500, 0.16));
    // stats
    const facts = [['CAPSULES', String(book.capsules)], ['HOURS OF READING', `~${book.hours}`], ['TO READ ONLINE', 'Free']];
    facts.forEach(([k, v], i) => {
      const x = M + i * 200;
      key += T(x, 610, v, { font: 'display', weight: 800, size: 54, wdth: 88, opsz: 72, ls: -0.01 });
      key += T(x, 640, k, mono(12, 500, 0.16));
    });
    // colophon
    const col = ['Printed in two drums — Orange and Federal Blue — on natural', 'uncoated stock. Titles in Bricolage Grotesque; text in', 'Instrument Serif and DM Mono. Cover system: Overprint.'];
    col.forEach((l, i) => { key += T(M, 752 + i * 18, l, mono(11.5, 400, 0.02)); });
    const v = vMark(W - M - 150, H - M + 2, 30);
    fl += v.left; key += v.right;
    key += T(W - M - 150 + v.w + 12, H - M - 1, 'VIZUARA', { font: 'display', weight: 800, size: 24, wdth: 100, opsz: 24, ls: 0.06 });
    const back = sheet({ id: book.slug + '-back', FX, K, flash: [fl], key, label: `${book.fullTitle} — back cover` });

    // ---------------- spine
    const sw = spineW;
    let sfl = p(rectD(-10, -10, sw + 20, 118));
    let skey = '';
    const lm = levelMark(sw / 2 - 7, 62, lv.mark, 14);
    skey += lm;
    skey += `<text transform="rotate(90 ${sw / 2 - 8} 146)" x="${sw / 2 - 8}" y="146" style="font-family:'Bricolage Grotesque';font-weight:800;font-size:21px;letter-spacing:-0.005em;font-variation-settings:'opsz' 24,'wdth' 88">${book.fullTitle.replace(/&/g, '&amp;')}</text>`;
    skey += `<text transform="rotate(90 ${sw / 2 - 5} 700)" x="${sw / 2 - 5}" y="700" style="font-family:'Bricolage Grotesque';font-weight:800;font-size:15px;letter-spacing:0.08em;font-variation-settings:'opsz' 24,'wdth' 100">VIZUARA</text>`;
    const sv = vMark(sw / 2 - 13, H - 30, 22);
    sfl += sv.left; skey += sv.right;
    const spine = sheet({ w: sw, h: H, id: book.slug + '-spine', FX, K, flash: [sfl], key: skey, label: `${book.fullTitle} — spine` });

    const el = document.createElement('div');
    el.className = 'wrap';
    el.dataset.slug = book.slug;
    el.innerHTML = `<div class="wrap-back">${back}</div><div class="wrap-spine">${spine}</div><div class="wrap-front">${coverSVG(book)}</div>`;
    return el;
  };
})();
