const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  await page.goto('http://localhost:8902', { waitUntil: 'networkidle' });
  await page.waitForTimeout(800); // 애니메이션 대기

  const categories = [
    'problem-solving',
    'market',
    'marketing',
    'business-model',
    'organization',
    'process',
  ];

  const outDir = path.join(__dirname, '../assets/screenshots');

  for (const cat of categories) {
    const section = page.locator(`#cat-${cat}`);
    await section.waitFor({ state: 'visible' });
    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await section.screenshot({
      path: path.join(outDir, `${cat}.png`),
      animations: 'disabled',
    });
    console.log(`captured: ${cat}`);
  }

  await browser.close();
})();
