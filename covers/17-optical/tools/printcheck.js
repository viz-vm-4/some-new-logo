#!/usr/bin/env node
// Print check for 17-optical: renders every cover at 5x with the type hidden (only the drawn
// vector art remains), then printcheck.py looks for ink strokes or paper gaps under 1 CSS px.
//   node covers/17-optical/tools/printcheck.js [--only a,b]   (writes to /tmp/17-optical-check/)
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const { execFileSync } = require('child_process');
const fs = require('fs'), path = require('path');
const args = process.argv.slice(2);
const only = args.includes('--only') ? args[args.indexOf('--only') + 1].split(',') : null;
const OUT = '/tmp/17-optical-check';
fs.mkdirSync(OUT, { recursive: true });
const file = path.resolve(__dirname, '..', 'index.html');
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await b.newContext({ viewport: { width: 1600, height: 1200 }, deviceScaleFactor: 5 });
  await ctx.route(/^https?:\/\//, async (route) => {
    try {
      const u = route.request().url();
      const body = execFileSync('curl', ['-sS', '-L', '-A', 'Mozilla/5.0 Chrome/140', u]);
      await route.fulfill({ status: 200, contentType: u.includes('css2') ? 'text/css' : 'font/woff2', body, headers: { 'access-control-allow-origin': '*' } });
    } catch (e) { await route.abort(); }
  });
  const p = await ctx.newPage();
  await p.goto('file://' + file, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: '.cover, .cover * { color: transparent !important; }' });
  await p.waitForTimeout(400);
  const slugs = await p.$$eval('.cover[data-slug]', (els) => els.map((e) => e.dataset.slug));
  for (const s of slugs) {
    if (only && !only.includes(s)) continue;
    const el = await p.$(`.cover[data-slug="${s}"]`);
    await el.scrollIntoViewIfNeeded();
    await el.screenshot({ path: path.join(OUT, s + '.png') });
  }
  await b.close();
  console.log('rendered', slugs.length, 'covers at 5x ->', OUT);
})();
