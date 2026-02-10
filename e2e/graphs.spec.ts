import { test, expect } from "@playwright/test";

test.describe("Graphs", () => {
  test("ce ni prijavljen, ne prikaze grafov", async ({ page }) => {
    await page.goto("/dashboard/graphs");
    await expect(page.locator("text=Nisi prijavljen")).toBeVisible();
  });
});
