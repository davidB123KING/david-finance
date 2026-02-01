import { test, expect } from "@playwright/test";

/**
 * Test 1: Login page renders correctly
 */
test("login page renders correctly", async ({ page }) => {
  await page.goto("/login");

  // Heading smo odstranili, ker ga zdaj ni direktno na page
  await expect(
    page.getByPlaceholder("Vnesi E-Mail")
  ).toBeVisible();

  await expect(
    page.getByPlaceholder("Vnesi geslo")
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Prijava" })
  ).toBeVisible();
});

/**
 * Test 2: Validation for empty form
 */
test("shows error when submitting empty form", async ({ page }) => {
  await page.goto("/login");

  await page.getByRole("button", { name: "Prijava" }).click();

  await expect(
    page.getByText("Izpolni vsa polja!")
  ).toBeVisible();
});

/**
 * Test 3: Successful login (mocked)
 */
test("successful login redirects user", async ({ page }) => {
  await page.route("**/auth/v1/token*", (route) => {
    route.fulfill({
      status: 200,
      body: JSON.stringify({
        access_token: "fake-token",
        token_type: "bearer",
        expires_in: 3600,
        refresh_token: "fake-refresh",
        user: { id: "123" },
      }),
    });
  });

  await page.goto("/login");

  await page.getByPlaceholder("Vnesi E-Mail").fill("test@test.com");
  await page.getByPlaceholder("Vnesi geslo").fill("password123");

  await page.getByRole("button", { name: "Prijava" }).click();

  await expect(page).toHaveURL("/");
});