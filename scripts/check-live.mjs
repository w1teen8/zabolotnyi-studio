import { chromium } from 'playwright';

const url = process.argv[2];
const shotDir = 'C:/Users/Daniil/AppData/Local/Temp/claude/c--Users-Daniil-Desktop-Zabolotnyi-Studio/2742a478-f899-4004-8151-e54bdcf5a2c6/scratchpad';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

const badResponses = [];
page.on('response', (res) => {
  if (res.status() >= 400) badResponses.push(`${res.status()} ${res.url()}`);
});

await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
await page.waitForTimeout(1500);

await page.evaluate(async () => {
  const step = 600;
  const total = document.body.scrollHeight;
  for (let y = 0; y < total; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 150));
  }
});
await page.waitForTimeout(2000);
await page.screenshot({ path: `${shotDir}/live-check.png`, fullPage: true });

console.log('TITLE:', await page.title());
console.log('BAD RESPONSES:', badResponses.length);
for (const e of badResponses) console.log(e);

await browser.close();
