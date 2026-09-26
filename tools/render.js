#!/usr/bin/env node
// Render every `.cover[data-slug]` element in an HTML file to PNG (2x), JPG (1x) and,
// optionally, a vector PDF at exact trim size (7.5in x 9.25in = 720 x 888 CSS px).
//
//   node tools/render.js <file.html> [--out <dir>] [--pdf] [--only slug1,slug2] [--sheet]
//
// The sandbox browser can't verify the egress proxy's TLS certificate, so every
// http(s) request the page makes (Google Fonts, jsDelivr, cdnjs) is fetched with curl
// (which trusts the proxy CA) and handed back to the browser. Responses are cached.
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const args = process.argv.slice(2);
if (!args[0]) { console.error('usage: node tools/render.js <file.html> [--out dir] [--pdf] [--only a,b] [--sheet]'); process.exit(1); }
const file = path.resolve(args[0]);
const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
const outDir = path.resolve(opt('--out') || path.join(path.dirname(file), 'renders'));
const wantPdf = args.includes('--pdf');
const wantSheet = args.includes('--sheet');
const only = opt('--only') ? opt('--only').split(',') : null;
const CACHE = path.join(__dirname, '.netcache');
fs.mkdirSync(CACHE, { recursive: true });
fs.mkdirSync(outDir, { recursive: true });

function curlFetch(url, ua) {
  const key = crypto.createHash('sha1').update(url + '|' + ua).digest('hex');
  const body = path.join(CACHE, key + '.body'), hdr = path.join(CACHE, key + '.hdr');
  if (!fs.existsSync(body)) {
    // several renders may run at once: download to temp names, then rename into place
    const tmp = `${body}.${process.pid}.${Date.now()}`;
    execFileSync('curl', ['-sS', '-L', '--max-time', '60', '-A', ua, '-D', tmp + '.hdr', '-o', tmp, url]);
    fs.renameSync(tmp + '.hdr', hdr);
    fs.renameSync(tmp, body);
  }
  const headers = fs.readFileSync(hdr, 'utf8');
  const blocks = headers.trim().split(/\r?\n\r?\n/);
  const last = blocks[blocks.length - 1];
  const status = parseInt((last.match(/^HTTP\/[\d.]+ (\d+)/) || [0, 200])[1], 10);
  const ct = (last.match(/^content-type:\s*(.+)$/im) || [0, 'application/octet-stream'])[1].trim();
  return { status, contentType: ct, body: fs.readFileSync(body) };
}

(async () => {
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 2 });
  await ctx.route(/^https?:\/\//, async (route) => {
    const req = route.request();
    try {
      const r = curlFetch(req.url(), req.headers()['user-agent'] || 'Mozilla/5.0 Chrome/140');
      await route.fulfill({ status: r.status, contentType: r.contentType, body: r.body,
        headers: { 'access-control-allow-origin': '*' } });
    } catch (e) { console.warn('fetch failed:', req.url(), e.message); await route.abort(); }
  });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') console.warn('[page error]', m.text()); });
  page.on('pageerror', (e) => console.warn('[page exception]', e.message));
  await page.goto('file://' + file, { waitUntil: 'networkidle', timeout: 120000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(800);

  const slugs = await page.$$eval('.cover[data-slug]', (els) => els.map((e) => e.dataset.slug));
  if (!slugs.length) { console.error('No .cover[data-slug] elements found.'); process.exit(2); }
  const done = [];
  for (const slug of slugs) {
    if (only && !only.includes(slug)) continue;
    const el = await page.$(`.cover[data-slug="${slug}"]`);
    const box = await el.boundingBox();
    if (Math.round(box.width) !== 720 || Math.round(box.height) !== 888)
      console.warn(`! ${slug}: cover box is ${box.width}x${box.height}, expected 720x888`);
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: path.join(outDir, `${slug}.png`) });
    done.push(slug);
  }
  // 1x JPGs for the gallery
  const ctx1 = await browser.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 1 });
  await ctx1.route(/^https?:\/\//, async (route) => {
    const req = route.request();
    try { const r = curlFetch(req.url(), req.headers()['user-agent'] || 'Mozilla/5.0 Chrome/140');
      await route.fulfill({ status: r.status, contentType: r.contentType, body: r.body, headers: { 'access-control-allow-origin': '*' } });
    } catch (e) { await route.abort(); }
  });
  const p1 = await ctx1.newPage();
  await p1.goto('file://' + file, { waitUntil: 'networkidle', timeout: 120000 });
  await p1.evaluate(() => document.fonts.ready); await p1.waitForTimeout(800);
  for (const slug of done) {
    const el = await p1.$(`.cover[data-slug="${slug}"]`);
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: path.join(outDir, `${slug}.jpg`), type: 'jpeg', quality: 90 });
  }
  if (wantSheet) await page.screenshot({ path: path.join(outDir, `_sheet.png`), fullPage: true });
  if (wantPdf) {
    fs.mkdirSync(path.join(outDir, 'pdf'), { recursive: true });
    for (const slug of done) {
      const pp = await ctx1.newPage();
      await pp.goto('file://' + file, { waitUntil: 'networkidle', timeout: 120000 });
      await pp.evaluate(() => document.fonts.ready);
      await pp.addStyleTag({ content: `
        html, body { margin:0 !important; padding:0 !important; background:transparent !important; }
        * { visibility:hidden !important; }
        .cover[data-slug="${slug}"], .cover[data-slug="${slug}"] * { visibility:visible !important; }
        .cover[data-slug="${slug}"] { position:fixed !important; left:0 !important; top:0 !important; margin:0 !important; transform:none !important; z-index:2147483647 !important; }
        @page { size: 7.5in 9.25in; margin:0; }` });
      await pp.waitForTimeout(300);
      await pp.pdf({ path: path.join(outDir, 'pdf', `${slug}.pdf`), width: '7.5in', height: '9.25in', printBackground: true, pageRanges: '1', margin: { top: 0, right: 0, bottom: 0, left: 0 } });
      await pp.close();
    }
  }
  console.log(`Rendered ${done.length} cover(s) -> ${outDir}\n  ` + done.join('\n  '));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
