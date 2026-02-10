import { test, expect } from "@playwright/test";

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

test.describe("Auth", () => {
  test("Uporabnik lahko odpre prijavo", async ({ page }) => {
    await page.goto("/sign-in");
    if (!hasClerk) {
      await expect(page.locator("text=Clerk ni nastavljen")).toBeVisible();
      return;
    }
    await expect(page.getByRole("heading", { name: /sign in/i })).toBeVisible();
  });

  test("Uporabnik lahko odpre registracijo", async ({ page }) => {
    await page.goto("/sign-up");
    if (!hasClerk) {
      await expect(page.locator("text=Clerk ni nastavljen")).toBeVisible();
      return;
    }
    await expect(page.getByRole("heading", { name: /sign up/i })).toBeVisible();
  });
});
