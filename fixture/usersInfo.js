import { test } from "@playwright/test";

export const userInfoTest = test.extend({
  userInfo: async ({ page }, use) => {
    const userInfo = {
      email: "Nicolo1@mail.com",
      pass: "Pass123!",
    };
    console.log("Fixtures");
    await use(userInfo);
    console.log("Fixtures after all");
  },
});
