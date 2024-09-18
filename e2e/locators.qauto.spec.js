import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  const heroPanel = page.locator(".hero-descriptor");
  const signUp = heroPanel.getByRole("button", { name: "Sign up" });

  await expect(signUp).toBeVisible();
});
