// One-off re-capture for a single project id/url with a friendlier wait
// strategy (waitUntil: 'load' instead of 'networkidle'), for SPAs that
// keep background connections open and never reach networkidle.
// Usage: node scripts/recapture-one.mjs <id> <url>
import { chromium } from 'playwright';
import fs from 'node:fs';

const [id, url] = process.argv.slice(2);
if (!id || !url) {
  console.error('Usage: node scripts/recapture-one.mjs <id> <url>');
  process.exit(1);
}

const outDir = 'src/assets/projects';
const MAX_HEIGHT = 9000;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(url, { waitUntil: 'load', timeout: 45000 });
await page.waitForTimeout(2000);

await page.evaluate((max) => {
  const h = document.body.scrollHeight;
  if (h > max) {
    document.documentElement.style.height = max + 'px';
    document.body.style.height = max + 'px';
    document.body.style.overflow = 'hidden';
  }
}, MAX_HEIGHT);

await page.evaluate(async () => {
  const step = 500;
  const total = document.body.scrollHeight;
  for (let y = 0; y < total; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 180));
  }
  window.scrollTo(0, total);
  await new Promise((r) => setTimeout(r, 400));
});

await page.waitForTimeout(600);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(500);

fs.mkdirSync(outDir, { recursive: true });
await page.screenshot({
  path: `${outDir}/${id}.jpg`,
  type: 'jpeg',
  quality: 62,
  fullPage: true,
});
console.log('OK', id);

await browser.close();
