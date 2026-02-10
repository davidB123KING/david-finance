import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test("ce ni prijavljen, pokaze sporocilo", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page.locator("text=Nisi prijavljen")).toBeVisible();
  });
});
