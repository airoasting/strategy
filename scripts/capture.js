const { chromium } = require('playwright');
const path = require('path');

// 카테고리별로 헤딩 + 카드 2줄(최대 6개)을 일관된 폭으로 잘라 캡처한다.
// 새 Pastel Card 디자인은 카드가 커서 섹션 전체를 찍으면 길이가 들쭉날쭉해진다.
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ deviceScaleFactor: 1.5 });
  await page.setViewportSize({ width: 1440, height: 1400 });

  await page.goto('http://localhost:8902', { waitUntil: 'networkidle' });
  await page.waitForTimeout(900); // 폰트·viz 렌더 대기

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

    // 헤딩 + 앞쪽 카드 2줄(6개) 높이만 남기고 잘라낸다.
    const cropH = await page.evaluate((id) => {
      const sec = document.getElementById('cat-' + id);
      const rectTop = sec.getBoundingClientRect().top + window.scrollY;
      const cards = sec.querySelectorAll('.card');
      const last = cards[Math.min(5, cards.length - 1)];
      const bottom = last.getBoundingClientRect().bottom + window.scrollY;
      return Math.ceil(bottom - rectTop + 24); // 아래 여백 24px
    }, cat);

    await section.evaluate((el, h) => {
      el.dataset._prevMaxH = el.style.maxHeight;
      el.dataset._prevOvf = el.style.overflow;
      el.style.maxHeight = h + 'px';
      el.style.overflow = 'hidden';
    }, cropH);

    await section.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);

    await section.screenshot({
      path: path.join(outDir, `${cat}.png`),
      animations: 'disabled',
    });

    await section.evaluate((el) => {
      el.style.maxHeight = el.dataset._prevMaxH || '';
      el.style.overflow = el.dataset._prevOvf || '';
    });

    console.log(`captured: ${cat} (h=${cropH})`);
  }

  await browser.close();
})();
