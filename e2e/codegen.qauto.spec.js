import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.google.com/");
  await page.getByLabel("Search", { exact: true }).fill("dou.ua");
  await page
    .getByRole("link", {
      name: "DOU: Спільнота програмістів Спільнота програмістів https://dou.ua",
    })
    .click();
});
