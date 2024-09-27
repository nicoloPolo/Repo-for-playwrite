import { test, expect } from "@playwright/test";

test("test about successful registration", async ({ page }) => {
  await page.goto("/");

  const heroPanel = page.locator(".hero-descriptor");
  const signUp = heroPanel.getByRole("button", { name: "Sign up" });
  await expect(signUp).toBeVisible();

  await signUp.click();

  const modal = page.locator(".modal-content");
  await expect(modal).toBeVisible();

  await page.fill("#signupName", "John");
  await page.fill("#signupLastName", "Doe");

  const email = `test1${Date.now()}@example.com`;
  await page.fill("#signupEmail", email);

  await page.fill("#signupPassword", "Password123!");
  await page.fill("#signupRepeatPassword", "Password123!");

  const registerButton = page.locator('button:has-text("Register")');
  await expect(registerButton).not.toBeDisabled();

  await registerButton.click();

  await page.waitForURL("**/panel/garage");
});
