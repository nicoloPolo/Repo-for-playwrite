import { test, expect } from "@playwright/test";

test("Search for Google and open DOU", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.fill('textarea[name="q"]', "DOU.UA");
  await page.keyboard.press("Enter");
  await page.waitForSelector("#search");
  const result = await page.locator("#search .g a").first();
  await page.waitForLoadState("networkidle");
});
