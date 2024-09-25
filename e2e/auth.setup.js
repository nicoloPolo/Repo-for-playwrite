import { test as setup, expect } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("https://guest:welcome2qauto@qauto.forstudy.space/");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByLabel("Email").fill("Nicolo1@mail.com");
  await page.getByLabel("Password").fill("Pass123!");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");

  await page.context().storageState({ path: authFile });
});
