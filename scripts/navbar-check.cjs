/* eslint-disable @typescript-eslint/no-require-imports -- Browser tools are installed outside the app. */
const assert = require("node:assert/strict");
const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome",
    args: ["--no-sandbox"],
  });
  try {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    await page.goto(process.env.PORTFOLIO_URL || "http://127.0.0.1:3000", {
      waitUntil: "networkidle",
    });
    const hero = page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "Hero", exact: true });
    assert.equal(await hero.getAttribute("href"), "#top");
    await page.waitForFunction(
      () =>
        document
          .querySelector('header a[href="#top"]')
          ?.getAttribute("aria-current") === "true",
    );
    await page
      .getByRole("navigation", { name: "Primary" })
      .getByRole("link", { name: "About", exact: true })
      .click();
    await page.waitForFunction(
      () =>
        document
          .querySelector('header a[href="#about"]')
          ?.getAttribute("aria-current") === "true",
    );
    await hero.click();
    await page.waitForFunction(
      () =>
        document
          .querySelector('header a[href="#top"]')
          ?.getAttribute("aria-current") === "true",
    );
    console.log(
      "PASS Hero is active on load and after navigating back from About",
    );
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
