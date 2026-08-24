// Regenerates portfolio project screenshots used in Portfolio/Hero.
// Usage: npm install -D playwright && npx playwright install chromium
//        node scripts/capture-screenshots.mjs
import { chromium } from 'playwright';
import fs from 'node:fs';

// keep in sync with src/data/projects.ts
const projects = [
  ['cleaning-website', 'https://w1teen8.github.io/cleaning-website/'],
  ['glow-grammar', 'https://glowgrammar.com'],
  ['upgrade-nmt', 'https://upgradenmt.com'],
  ['bonforme', 'https://w1teen8.github.io/bonforme/'],
  ['svoi-gastrocafe', 'https://w1teen8.github.io/svoi-gastrocafe/'],
  ['marafet-studio', 'https://w1teen8.github.io/marafet-studio/'],
  ['lubianskaia-irina', 'https://w1teen8.github.io/lubianskaia-irina/'],
  ['studio-alony-lukyanenko', 'https://w1teen8.github.io/studio-alony-lukyanenko/'],
  ['manik-mammy', 'https://w1teen8.github.io/manik_mammy/'],
  ['yanina', 'https://w1teen8.github.io/yanina/'],
  ['mafia-club-kyiv', 'https://w1teen8.github.io/mafia-club-kyiv/'],
  ['4sezona', 'https://w1teen8.github.io/4sezona/'],
  ['cafe-garmonia', 'https://w1teen8.github.io/cafe-garmonia/'],
  ['dim-tattoo', 'https://w1teen8.github.io/dim-tattoo/'],
];

const outDir = 'src/assets/projects';
fs.mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const MAX_HEIGHT = 9000;

for (const [id, url] of projects) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(1200);

    // clamp extremely long / infinite pages
    await page.evaluate((max) => {
      const h = document.body.scrollHeight;
      if (h > max) {
        document.documentElement.style.height = max + 'px';
        document.body.style.height = max + 'px';
        document.body.style.overflow = 'hidden';
      }
    }, MAX_HEIGHT);

    // scroll through the whole page in steps so lazy images
    // and scroll-reveal animations actually trigger
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

    // settle any reveal transitions, then back to top for a clean capture start
    await page.waitForTimeout(600);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    await page.screenshot({
      path: `${outDir}/${id}.jpg`,
      type: 'jpeg',
      quality: 62,
      fullPage: true,
    });
    console.log('OK', id);
  } catch (e) {
    console.log('FAIL', id, e.message);
  } finally {
    await page.close();
  }
}

await browser.close();
console.log('DONE');
