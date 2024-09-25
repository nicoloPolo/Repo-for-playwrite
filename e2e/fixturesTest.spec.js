import { expect } from "@playwright/test";
import test from "../fixture/userGaragePage";

test("Check if garage page is accessible", async ({ userGaragePage }) => {
  await expect(
    userGaragePage.getByRole("button", { name: "Add car" })
  ).toBeVisible();
});
