// Builds Darrell-Burch-Resume.pdf from resume.html and og-card.png from og-card.html.
// Uses the Playwright install in ../playwright-framework:
//   node build-resume.js
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require(path.join(__dirname, '..', 'playwright-framework', 'node_modules', '@playwright', 'test'));

const fileUrl = (name) => pathToFileURL(path.join(__dirname, name)).href;

(async () => {
  const browser = await chromium.launch();

  const resume = await browser.newPage();
  await resume.goto(fileUrl('resume.html'));
  await resume.pdf({
    path: path.join(__dirname, 'Darrell-Burch-Resume.pdf'),
    format: 'Letter',
    preferCSSPageSize: true,
    printBackground: true,
  });

  const card = await browser.newPage({ viewport: { width: 1200, height: 630 } });
  await card.goto(fileUrl('og-card.html'));
  await card.screenshot({ path: path.join(__dirname, 'og-card.png') });

  await browser.close();
})();
