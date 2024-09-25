import { test as baseTest } from "@playwright/test";

const test = baseTest.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: "playwright/.auth/user.json",
    });

    const page = await context.newPage();
    await page.goto("https://qauto.forstudy.space/panel/garage");

    await use(page);

    await context.close();
  },
});

export default test;
