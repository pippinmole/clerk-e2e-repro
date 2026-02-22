import { test, expect } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await clerk.signOut({ page });
});

test("authenticated user can access /dashboard", async ({ page }) => {
  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: "e2e-testing-free@test.com",
      password: "e2e-testing-free@test.com",
    },
  });

  await page.goto("/dashboard");

  await expect(page.locator("h1")).toContainText("Welcome to Dashboard");
});
