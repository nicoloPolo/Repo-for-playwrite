import { test, expect } from "@playwright/test";
import SignUpForm from "../src/components/RegistrationFormPage";

test.describe("Registration form negative tests", () => {
  let signUpForm;

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Sign up" }).click();
    signUpForm = new SignUpForm(page);
  });

  test("Registration fails with empty name", async ({ page }) => {
    await signUpForm.enterLastName("Something");
    await signUpForm.enterEmail(`test1${Date.now()}@example.com`);
    await signUpForm.enterPassword("Pass123!");
    await signUpForm.enterRePassword("Pass123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeDisabled();
  });

  test("Registration fails with empty last name", async ({ page }) => {
    await signUpForm.enterName("Something");
    await signUpForm.enterEmail(`test1${Date.now()}@example.com`);
    await signUpForm.enterPassword("Pass123!");
    await signUpForm.enterRePassword("Pass123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeDisabled();
  });

  test("Registration fails with invalid email", async ({ page }) => {
    await signUpForm.enterName("Jack");
    await signUpForm.enterLastName("Marston");
    await signUpForm.enterEmail("invalidemail");
    await signUpForm.enterPassword("Pass123!");
    await signUpForm.enterRePassword("Pass123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeDisabled();
  });

  test("Registration fails when passwords don't match", async ({ page }) => {
    await signUpForm.enterName("Jack");
    await signUpForm.enterLastName("Marston");
    await signUpForm.enterEmail(`test1${Date.now()}@example.com`);
    await signUpForm.enterPassword("Pass123!");
    await signUpForm.enterRePassword("AnotherPass123!");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeDisabled();
  });

  test("Registration fails when passwords are too short", async ({ page }) => {
    await signUpForm.enterName("Jack");
    await signUpForm.enterLastName("Marston");
    await signUpForm.enterEmail(`test1${Date.now()}@example.com`);
    await signUpForm.enterPassword("Pa");
    await signUpForm.enterRePassword("Pa");

    const registerButton = page.locator('button:has-text("Register")');
    await expect(registerButton).toBeVisible();
    await expect(registerButton).toBeDisabled();

    const passwordError = page.locator("#signupPassword ~ .invalid-feedback p");
    await expect(passwordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );
  });
});
