#!/usr/bin/env node
// Render a full print cover (back + spine + front, with bleed or hardcover wrap) to a vector
// RGB PDF at exact physical size, plus a PNG preview. tools/to_cmyk.py turns the PDF into the
// flattened CMYK file the printer wants.
//
//   node tools/print_cover.js <file.html> --out <dir>/<name> [--query "binding=soft&pages=400"] [--sel .printwrap]
//
// The element is sized in CSS inches (96 px = 1 in). Its measured size is checked against
// Pothi's formula for the binding and page count in --query (trim 7.5 x 9.25 in):
//   soft: bleed 0.2 in all round, spine = 0.001968 in x pages
//   hard: wrap 0.787 in all round, boards = trim + (extw, exth), spine = 0.157 + 0.001968 x pages
// Writes <name>-rgb.pdf, <name>-preview.png (2x) and <name>.json (size, spine, binding).
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
if (!args[0] || !opt('--out')) { console.error('usage: node tools/print_cover.js <file.html> --out <dir>/<name> [--query q] [--sel .printwrap]'); process.exit(1); }
const file = path.resolve(args[0]);
const out = path.resolve(opt('--out'));
const query = opt('--query', '');
const sel = opt('--sel', '.printwrap');
fs.mkdirSync(path.dirname(out), { recursive: true });

const q = new URLSearchParams(query);
const binding = q.get('binding') || 'soft';
const pages = +(q.get('pages') || 400);
const TRIM_W = 7.5, TRIM_H = 9.25;
function expected() {
  if (binding === 'hard') {
    const extw = +(q.get('extw') || 0.276), exth = +(q.get('exth') || 0.394), wrap = 0.787;
    const spine = 0.157 + 0.001968 * pages;
    return { spine, w: 2 * wrap + 2 * (TRIM_W + extw) + spine, h: 2 * wrap + TRIM_H + exth };
  }
  const spine = 0.001968 * pages, bleed = 0.2;
  return { spine, w: 2 * bleed + 2 * TRIM_W + spine, h: 2 * bleed + TRIM_H };
}

// Same egress workaround as tools/render.js: the browser can't verify the proxy's TLS
// certificate, so page requests are fetched with curl (which trusts the proxy CA) and cached.
const CACHE = path.join(__dirname, '.netcache');
fs.mkdirSync(CACHE, { recursive: true });
function curlFetch(url, ua) {
  const key = crypto.createHash('sha1').update(url + '|' + ua).digest('hex');
  const body = path.join(CACHE, key + '.body'), hdr = path.join(CACHE, key + '.hdr');
  if (!fs.existsSync(body)) {
    const tmp = `${body}.${process.pid}.${Date.now()}`;
    execFileSync('curl', ['-sS', '-L', '--max-time', '60', '-A', ua, '-D', tmp + '.hdr', '-o', tmp, url]);
    fs.renameSync(tmp + '.hdr', hdr);
    fs.renameSync(tmp, body);
  }
  const blocks = fs.readFileSync(hdr, 'utf8').trim().split(/\r?\n\r?\n/);
  const last = blocks[blocks.length - 1];
  const status = parseInt((last.match(/^HTTP\/[\d.]+ (\d+)/) || [0, 200])[1], 10);
  const ct = (last.match(/^content-type:\s*(.+)$/im) || [0, 'application/octet-stream'])[1].trim();
  return { status, contentType: ct, body: fs.readFileSync(body) };
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await browser.newContext({ viewport: { width: 2400, height: 1400 }, deviceScaleFactor: 2 });
  await ctx.route(/^https?:\/\//, async (route) => {
    const req = route.request();
    try {
      const r = curlFetch(req.url(), req.headers()['user-agent'] || 'Mozilla/5.0 Chrome/140');
      await route.fulfill({ status: r.status, contentType: r.contentType, body: r.body, headers: { 'access-control-allow-origin': '*' } });
    } catch (e) { console.warn('fetch failed:', req.url(), e.message); await route.abort(); }
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => console.warn('[page exception]', e.message));
  await page.goto('file://' + file + (query ? '?' + query : ''), { waitUntil: 'networkidle', timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);

  // Isolate the wrap at the page origin (siblings hidden, ancestors collapsed), so the screenshot
  // starts on a whole pixel and the PDF is exactly one page of the wrap's size.
  const box = await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const w = el.getBoundingClientRect().width;
    const set = (n, props) => { for (const [k, v] of Object.entries(props)) n.style.setProperty(k, v, 'important'); };
    for (let node = el; node.parentElement; node = node.parentElement) {
      const parent = node.parentElement;
      for (const sib of parent.children) if (sib !== node && sib.tagName !== 'SCRIPT' && sib.tagName !== 'STYLE') set(sib, { display: 'none' });
      set(parent, { display: 'block', position: 'static', width: w + 'px', 'min-width': '0', 'max-width': 'none',
        height: 'auto', 'min-height': '0', margin: '0', padding: '0', border: '0', transform: 'none',
        float: 'none', overflow: 'visible', 'box-shadow': 'none', background: 'none' });
    }
    set(el, { margin: '0', transform: 'none', float: 'none' });
    window.scrollTo(0, 0);
    const r = el.getBoundingClientRect();
    return { x: r.x, y: r.y, w: r.width, h: r.height };
  }, sel);
  if (!box) { console.error(`No ${sel} element found.`); process.exit(2); }

  const win = box.w / 96, hin = box.h / 96, exp = expected();
  const off = Math.max(Math.abs(win - exp.w), Math.abs(hin - exp.h));
  console.log(`${binding} ${pages}pp: element ${win.toFixed(3)} x ${hin.toFixed(3)} in, Pothi formula ${exp.w.toFixed(3)} x ${exp.h.toFixed(3)} in, spine ${exp.spine.toFixed(3)} in`);
  if (off > 0.011) { console.error(`! size is off by ${off.toFixed(3)} in`); process.exitCode = 3; }
  if (Math.abs(box.x) > 0.01 || Math.abs(box.y) > 0.01) console.warn(`! layout: wrap sits at ${box.x},${box.y}, not the page origin`);

  await page.waitForTimeout(150);
  await page.screenshot({ path: out + '-preview.png', clip: { x: 0, y: 0, width: Math.round(box.w), height: Math.round(box.h) } });

  await page.emulateMedia({ media: 'print' });
  await page.addStyleTag({ content: `@page { size: ${win}in ${hin}in; margin: 0; }` });
  await page.waitForTimeout(300);
  await page.pdf({ path: out + '-rgb.pdf', width: `${win}in`, height: `${hin}in`, printBackground: true, pageRanges: '1',
    margin: { top: 0, right: 0, bottom: 0, left: 0 } });
  fs.writeFileSync(out + '.json', JSON.stringify({ source: path.relative(process.cwd(), file), query, binding, pages,
    width_in: +win.toFixed(4), height_in: +hin.toFixed(4), spine_in: +exp.spine.toFixed(4) }, null, 2) + '\n');
  console.log(`wrote ${path.relative(process.cwd(), out)}-rgb.pdf, -preview.png, .json`);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
