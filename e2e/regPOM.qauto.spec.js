import { test, expect } from "@playwright/test";
import SignUpForm from "../src/components/RegistrationFormPage";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Sign up" }).click();
});

test("test about successful registration", async ({ page }) => {
  const signUpForm = new SignUpForm(page);

  await signUpForm.fillinRegistrationForm(
    "Mirro",
    "Mirro",
    "mirro1@mail.com",
    "Pass12345",
    "Pass12345"
  );

  await page.waitForURL("https://qauto.forstudy.space/panel/garage");
  await expect(page).toHaveURL("https://qauto.forstudy.space/panel/garage");
});
