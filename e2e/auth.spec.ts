import { test, expect } from "@playwright/test";
import { clerk } from "@clerk/testing/playwright";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await clerk.signOut({ page });
});

test("authenticated user can access /dashboard", async ({ page }) => {
  // wait 20 seconds
  await page.waitForTimeout(20000);


  await clerk.signIn({
    page,
    signInParams: {
      strategy: "password",
      identifier: "e2e-testing-free@test.com",
      password: "e2e-testing-free@test.com",
    },
  });

  await page.goto("/dashboard", {timeout: 30000});

  await expect(page.locator("h1")).toContainText("Welcome to Dashboard", {timeout: 30000});
});
