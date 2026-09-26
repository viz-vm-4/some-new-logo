/* Page builder: covers, the Ordinary, tinctures, cadency, hatching, and the full wrap. */

const LEVEL = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
const pad2 = (k) => String(k).padStart(2, '0');

function shieldSVG(inner, id, { rim = null, cls = 'arms', w = 400, outline = S, sw = 6 } = {}) {
  const h = w * 1.2;
  const rimPath = rim ? `<path d="${SHIELD}" fill="none" stroke="${rim}" stroke-width="12"/>` : '';
  return `<svg class="${cls}" viewBox="0 0 400 480" width="${w}" height="${n(h)}" overflow="visible" aria-hidden="true">${rimPath}` +
    `<clipPath id="${id}"><path d="${SHIELD}"/></clipPath><g clip-path="url(#${id})">${inner}</g>` +
    `<path d="${SHIELD_IN}" fill="none" stroke="${outline}" stroke-width="${sw}"/></svg>`;
}

function armsFor(b, suffix = '', w = 400, cls = 'arms') {
  if (b.soon) return trickSVG(b, suffix, w, cls);
  const id = 'c-' + b.slug + suffix;
  return shieldSVG(ARMS[b.slug](b.slug + suffix), id, { rim: b.level === 'advanced' ? T.or : null, w, cls });
}

// Coming soon: the arms "in trick" — drafted in outline with the tinctures written in
function trickSVG(b, suffix = '', w = 400, cls = 'arms') {
  const ink = b.level === 'advanced' ? T.argent : T.sable;
  const id = 'c-' + b.slug + suffix;
  const lab = (x, y, t) => `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" fill="${ink}">${t}</text>`;
  const inner = `<g style="color:${ink}">${ARMS[b.slug]()}</g>` +
    lab(40, 40, 'sa') + lab(360, 120, 'sa') + lab(120, 360, 'sa') + lab(200, 440, 'sa') +
    lab(120, 200, 'or') + lab(360, 200, 'or') + lab(280, 40, 'or') + lab(280, 360, 'or') + lab(280, 200, 'gu');
  return `<svg class="${cls} trick" viewBox="0 0 400 480" width="${w}" height="${n(w * 1.2)}" overflow="visible" aria-hidden="true">` +
    `<clipPath id="${id}"><path d="${SHIELD}"/></clipPath><g clip-path="url(#${id})">${inner}</g>` +
    `<path d="${SHIELD_IN}" fill="none" stroke="${ink}" stroke-width="6"/></svg>`;
}

function titleHTML(b) {
  return b.title.split('|').map((l) => `<span>${l.replace(/&(?!amp;)/g, '&amp;')}</span>`).join('');
}

function coverInner(b, suffix = '') {
  const adv = b.level === 'advanced';
  const fg = adv ? T.argent : T.sable, bg = adv ? T.sable : (b.level === 'intermediate' ? T.or : GROUND.beginner);
  const lines = b.title.split('|').length;
  const size = (b.subtitle || b.series) && lines <= 2 ? 76 : { 1: 86, 2: 86, 3: 70, 4: 58 }[lines];
  const ext = b.soon ? 'Coming soon' : `${b.capsules} capsules · ${b.hours} hours`;
  return `
    <div class="imprint">${imprintMark(fg, bg)}<span>Vizuara Books</span></div>
    <div class="roll">Nº ${pad2(b.no)}</div>
    <div class="head">
      ${b.series ? `<div class="series">${b.series} · Book ${b.book}</div>` : ''}
      <h2 class="title" style="font-size:${size}px" data-max="${size}">${titleHTML(b)}</h2>
      ${b.subtitle ? `<p class="sub">${b.subtitle}</p>` : ''}
    </div>
    ${armsFor(b, suffix)}
    <div class="register">
      <div class="lab">${b.soon ? 'Blazon, in trick' : 'Blazon'}</div>
      <p class="blazon">${b.blazon}</p>
      <div class="lab">Symbolism</div>
      <p class="symb">${b.symbolism}</p>
      <div class="meta"><div class="lvl">${LEVEL[b.level]}</div><div class="ext">${ext}</div></div>
    </div>`;
}

function buildShelf() {
  const shelf = document.getElementById('shelf');
  shelf.innerHTML = ROLL.map((b) => `
    <figure>
      <div class="cover ${b.level}" data-slug="${b.slug}">${coverInner(b)}</div>
      <figcaption><b>${b.slug}</b><span>${LEVEL[b.level]} · field ${b.field}</span></figcaption>
    </figure>`).join('');
}

// Fit every title line inside the 632px measure without ever growing past its step size
function fitTitles(root = document) {
  root.querySelectorAll('.cover .title').forEach((h) => {
    const max = +h.dataset.max;
    h.style.fontSize = max + 'px';
    const widest = Math.max(...[...h.children].map((s) => s.getBoundingClientRect().width));
    const room = h.parentElement.getBoundingClientRect().width;
    if (widest > room) h.style.fontSize = Math.floor(max * room / widest * 10) / 10 + 'px';
  });
}

/* ---------- presentation extras ---------- */
function buildTinctures() {
  const rows = [
    ['Argent', 'argent', 'The metal white. Beginner ground (as paper), and silver on shields.', '#F8F5EE · paper #ECE6D9'],
    ['Or', 'or', 'The metal gold. Intermediate ground; the metal of most charges.', '#D4A236'],
    ['Gules', 'gules', 'Language: LLMs, transformers, prompting, finetuning.', '#B3261E'],
    ['Azure', 'azure', 'Foundations: mathematics, classical ML, code and data.', '#213F93'],
    ['Vert', 'vert', 'Vision and embodiment: CNNs, ViTs, VLMs, robots.', '#1D6946'],
    ['Purpure', 'purpure', 'Agents, context and memory; reinforcement learning.', '#5E2B5F'],
    ['Sable', 'sable', 'Compute and systems: parallelism, kernels, serving. Advanced ground.', '#161517'],
  ];
  document.getElementById('tinctures').innerHTML = rows.map(([name, k, role, hex]) => `
    <div class="tinc"><div class="sw" style="background:${T[k]}"><svg viewBox="0 0 40 40" preserveAspectRatio="none"><rect width="40" height="40" fill="url(#h-${k})"/></svg></div>
    <b>${name}</b><span>${role}</span><code>${hex}</code></div>`).join('');
}

function miniShield(inner, id, w = 150) { return shieldSVG(inner, id, { w, cls: 'mini' }); }
const fieldRect = (c) => `<rect width="400" height="480" fill="${c}"/>`;

function buildOrdinary() {
  const items = [
    ['Roundel', 'a token; a data point', fieldRect(T.argent) + roundel(200, 200, 90, T.gules)],
    ['Annulet', 'the token still to come; a neighbourhood', fieldRect(T.azure) + annulet(200, 200, 100, 34, T.or)],
    ['Billet', 'a document; a prompt', fieldRect(T.purpure) + billet(200, 210, 130, 200, T.argent)],
    ['Mullet', 'a query, the question', fieldRect(T.argent) + mullet(200, 210, 120, T.azure)],
    ['Estoile', 'a reward', fieldRect(T.purpure) + estoile(200, 210, 120, T.or)],
    ['Lozenge', 'another class of data', fieldRect(T.or) + lozenge(200, 210, 150, 240, T.vert)],
    ['Bend', 'a boundary drawn by a line', fieldRect(T.argent) + poly([[-60, -20], [40, -80], [480, 360], [380, 420]], T.azure)],
    ['Grady', 'causality: one step at a time', ARMS['build-llms-from-scratch']()],
    ['Fess', 'the context window', fieldRect(T.purpure) + poly([[-10, 170], [410, 170], [410, 300], [-10, 300]], T.or)],
    ['Pall', 'a branch', fieldRect(T.azure) + poly([[-40, -40], [39, -40], [200, 159], [361, -40], [440, -40], [440, 30], [244, 232], [244, 520], [156, 520], [156, 232], [-40, 30]], T.or)],
    ['Chequy', 'a matrix; an image of pixels', (() => { let d = ''; for (let r = 0; r < 6; r++) for (let c = 0; c < 5; c++) if ((r + c) % 2) d += `M${c * 80} ${r * 80}h80v80h-80Z`; return fieldRect(T.argent) + `<path d="${d}" fill="${T.vert}" stroke="${S}" stroke-width="3"/>`; })()],
    ['Canton', 'a kernel; a local window', fieldRect(T.vert) + poly([[-10, -10], [170, -10], [170, 180], [-10, 180]], T.or)],
    ['Barry', 'the turns of a conversation', (() => { let o = ''; for (let i = 0; i < 8; i++) o += poly([[-10, i * 60], [410, i * 60], [410, i * 60 + 60], [-10, i * 60 + 60]], i % 2 ? T.purpure : T.or); return o; })()],
    ['Plain', 'a summary: what is kept, without the detail', fieldRect(T.argent) + poly([[-10, 300], [410, 300], [410, 500], [-10, 500]], T.purpure)],
    ['Escutcheon', 'a whole system; borne in pretence, a teacher', fieldRect(T.vert) + escutcheon(200, 230, 200, fieldRect(T.or), 'ord-esc')],
    ['Quartering', 'work shared out: parallelism', fieldRect(T.or) + poly([[200, -10], [410, -10], [410, 240], [200, 240]], T.sable) + poly([[-10, 240], [200, 240], [200, 500], [-10, 500]], T.sable)],
    ['Impalement', 'a join', fieldRect(T.azure) + poly([[200, -10], [410, -10], [410, 500], [200, 500]], T.argent)],
    ['Pallets couped', 'a waveform; a voice', fieldRect(T.azure) + [70, 150, 230, 150, 90].map((h, i) => `<rect x="${86 + i * 50}" y="${220 - h / 2}" width="30" height="${h}" rx="15" fill="${T.argent}" stroke="${S}" stroke-width="3"/>`).join('')],
    ['Chief sawtoothed', 'the Intelligence Factory (its north-light roof)', fieldRect(T.purpure) + factoryChief(T.or)],
    ['Chevron reversed', 'Vizuara: the builder’s rafters, turned into a V', fieldRect(T.sable) + '<path d="M40 -10H150L200 190L250 -10H360L230 330H170Z" fill="' + T.or + '" stroke="' + S + '" stroke-width="3"/>'],
    ['Dancetty, embattled, wavy…', 'lines of partition: one kind of cut each', (() => { const d = [below(160, 'embattled', { p: 80, a: 30, origin: 0 }), below(320, 'wavy', { p: 100, a: 36, origin: 0 })].map(pathOf).join(''); return fieldRect(T.or) + `<path d="${d}" fill="${T.sable}" fill-rule="evenodd" stroke="${S}" stroke-width="3"/>`; })()],
  ];
  document.getElementById('ordinary').innerHTML = items.map(([name, m, inner], i) =>
    `<figure>${miniShield(inner, 'ord' + i, 150)}<figcaption><b>${name}</b>${m}</figcaption></figure>`).join('');
}

function buildCadency() {
  const marks = [['Label', 'first son · Book I', label(200, 220, 260, T.gules)], ['Crescent', 'second son · Book II', crescent(200, 230, 110, T.vert)],
    ['Mullet', 'third son · Book III', mullet(200, 225, 120, T.azure)], ['Martlet', 'fourth son · Book IV', martlet(200, 230, 300, T.purpure)]];
  document.getElementById('cadency').innerHTML = marks.map(([nm, m, inner], i) =>
    `<figure>${miniShield(fieldRect(T.or) + inner, 'cad' + i, 110)}<figcaption><i>${nm}</i><br>${m}</figcaption></figure>`).join('') +
    ROLL.filter((b) => b.series).map((b) => `<figure style="width:170px">${armsFor(b, '-cad', 150, 'mini')}<figcaption>${b.title.replace('|', ' ')}</figcaption></figure>`).join('');
}

function buildHatching() {
  const keep = { ...T };
  const pick = ['neural-networks-from-scratch', 'build-llms-from-scratch', 'decision-trees-from-scratch', 'charlie-reasoning-room', 'rag-in-production'];
  for (const k of Object.keys(T)) T[k] = `url(#h-${k})`;
  const html = pick.map((s) => `<figure>${shieldSVG(ARMS[s](s + '-h'), 'h-' + s, { w: 200, cls: 'mini' })}<figcaption>${ROLL.find((b) => b.slug === s).title.replace(/\|/g, ' ')}</figcaption></figure>`).join('');
  Object.assign(T, keep);
  document.getElementById('hatch').innerHTML = html;
}

function hatchDefs() {
  const s = 14, sw = 2.2;
  const pat = (id, body) => `<pattern id="h-${id}" patternUnits="userSpaceOnUse" width="${s}" height="${s}"><rect width="${s}" height="${s}" fill="#fff"/>${body}</pattern>`;
  return `<svg width="0" height="0" style="position:absolute"><defs>
    ${pat('argent', '')}
    ${pat('or', `<circle cx="${s / 2}" cy="${s / 2}" r="2.1" fill="${S}"/>`)}
    ${pat('gules', `<path d="M${s / 2} 0V${s}" stroke="${S}" stroke-width="${sw}"/>`)}
    ${pat('azure', `<path d="M0 ${s / 2}H${s}" stroke="${S}" stroke-width="${sw}"/>`)}
    ${pat('vert', `<path d="M-2 -2L${s + 2} ${s + 2}M${-s / 2 - 2} ${s / 2 - 2}L${s / 2 + 2} ${s * 1.5 + 2}M${s / 2 - 2} ${-s / 2 - 2}L${s * 1.5 + 2} ${s / 2 + 2}" stroke="${S}" stroke-width="${sw}"/>`)}
    ${pat('purpure', `<path d="M${s + 2} -2L-2 ${s + 2}M${s * 1.5 + 2} ${s / 2 - 2}L${s / 2 - 2} ${s * 1.5 + 2}M${s / 2 + 2} ${-s / 2 - 2}L${-s / 2 - 2} ${s / 2 + 2}" stroke="${S}" stroke-width="${sw}"/>`)}
    ${pat('sable', `<path d="M${s / 2} 0V${s}M0 ${s / 2}H${s}" stroke="${S}" stroke-width="${sw}"/>`)}
  </defs></svg>`;
}

function buildWrap() {
  const b = ROLL.find((x) => x.slug === 'build-llms-from-scratch');
  const spineW = 48;
  const others = ROLL.filter((x) => !x.series && !x.soon && x.slug !== b.slug).slice(0, 10);
  const back = `
    <div class="back cover ${b.level}" style="width:720px">
      <div class="imprint">${imprintMark(T.sable, T.or)}<span>Vizuara Books</span></div>
      <div class="roll">Nº ${pad2(b.no)}</div>
      <div class="bk">
        <p class="bk-lab">The arms of this book</p>
        <p class="bk-blazon">${b.blazon}</p>
        <p class="bk-sym">${b.symbolism}</p>
        <p class="bk-lab" style="margin-top:34px">The book</p>
        <p class="bk-body">Build a GPT-style LLM from an empty file. From tokenizer to trained transformer — attention, GPT blocks, pretraining and fine-tuning — built by hand and illustrated.</p>
        <p class="bk-facts">20 capsules · 115 figures · about 6 hours · Intermediate</p>
      </div>
      <div class="bk-roll">
        <p class="bk-lab">Also in the Roll</p>
        <div class="bk-shields">${others.map((o) => `<div>${armsFor({ ...o, level: 'beginner' }, '-bk', 52, 'mini')}</div>`).join('')}</div>
      </div>
      <div class="bk-foot"><span>books.vizuara.ai</span><span>A library for building things</span></div>
    </div>`;
  const spine = `
    <div class="spine" style="width:${spineW}px;background:${T.or}">
      <div class="sp-arms">${armsFor(b, '-sp', 32, 'mini')}</div>
      <div class="sp-title">Build Large Language Models (LLMs) from Scratch</div>
      <div class="sp-mark">${imprintMark(T.sable, T.or, 26)}</div>
    </div>`;
  const front = `<div class="front cover ${b.level}">${coverInner(b, '-wrap')}</div>`;
  document.getElementById('wrap').innerHTML = back + spine + front;
}

document.body.insertAdjacentHTML('afterbegin', hatchDefs());
buildShelf();
buildTinctures();
buildOrdinary();
buildCadency();
buildHatching();
buildWrap();
fitTitles();
document.fonts.ready.then(() => fitTitles());
