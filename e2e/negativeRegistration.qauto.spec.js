import { test, expect } from "@playwright/test";

test.describe("Registration form negative tests", () => {
  test("registration fails with empty name", async ({ page }) => {
    await page.goto("/");

    const signUp = page
      .locator(".hero-descriptor")
      .getByRole("button", { name: "Sign up" });
    await signUp.click();

    const modal = page.locator(".modal-content");
    await expect(modal).toBeVisible();

    await page.fill("#signupLastName", "Doe");
    const email = `test1${Date.now()}@example.com`;
    await page.fill("#signupEmail", email);
    await page.fill("#signupPassword", "Password123!");
    await page.fill("#signupRepeatPassword", "Password123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });

  test("registration fails with empty last name", async ({ page }) => {
    await page.goto("/");

    const signUp = page
      .locator(".hero-descriptor")
      .getByRole("button", { name: "Sign up" });
    await signUp.click();

    const modal = page.locator(".modal-content");
    await expect(modal).toBeVisible();

    await page.fill("#signupName", "John");
    const email = `test1${Date.now()}@example.com`;
    await page.fill("#signupEmail", email);
    await page.fill("#signupPassword", "Password123!");
    await page.fill("#signupRepeatPassword", "Password123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });

  test("registration fails with invalid email", async ({ page }) => {
    await page.goto("/");

    const signUp = page
      .locator(".hero-descriptor")
      .getByRole("button", { name: "Sign up" });
    await signUp.click();

    const modal = page.locator(".modal-content");
    await expect(modal).toBeVisible();

    await page.fill("#signupName", "John");
    await page.fill("#signupLastName", "Doe");
    await page.fill("#signupEmail", "invalidemail");
    await page.fill("#signupPassword", "Password123!");
    await page.fill("#signupRepeatPassword", "Password123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });

  test("registration fails when passwords do not match", async ({ page }) => {
    await page.goto("/");

    const signUp = page
      .locator(".hero-descriptor")
      .getByRole("button", { name: "Sign up" });
    await signUp.click();

    const modal = page.locator(".modal-content");
    await expect(modal).toBeVisible();

    await page.fill("#signupName", "John");
    await page.fill("#signupLastName", "Doe");
    const email = `test1${Date.now()}@example.com`;
    await page.fill("#signupEmail", email);
    await page.fill("#signupPassword", "Password123!");
    await page.fill("#signupRepeatPassword", "DifferentPassword123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });

  test("registration fails with short password", async ({ page }) => {
    await page.goto("/");

    const signUp = page
      .locator(".hero-descriptor")
      .getByRole("button", { name: "Sign up" });
    await signUp.click();

    const modal = page.locator(".modal-content");
    await expect(modal).toBeVisible();

    await page.fill("#signupName", "John");
    await page.fill("#signupLastName", "Doe");
    const email = `test1${Date.now()}@example.com`;
    await page.fill("#signupEmail", email);
    await page.fill("#signupPassword", "123");
    await page.fill("#signupRepeatPassword", "123");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();

    const passwordError = page.locator("#signupPassword ~ .invalid-feedback p");
    await expect(passwordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });
});
