import { test, expect } from '@playwright/test';

test.describe('GraphsPage', () => {
  const baseURL = 'http://localhost:3000';

  test('če ni prijavljen, se preusmeri na signin', async ({ page }) => {
    await page.goto(`${baseURL}/graphs`);

    // Preverimo, da se prikazuje Clerk login forma
    await expect(page.locator('text=Sign in')).toBeVisible();
  });

  test('prikaže grafične komponente, ko je uporabnik prijavljen', async ({ page }) => {
    // 1️⃣ Tu moraš uporabiti testni uporabniški account v Clerk
    // ali mock auth za testno okolje

    // Za poenostavitev: simuliramo login preko URL query / testni session
    await page.goto(`${baseURL}/graphs?__mock_user=user_123`);

    // Preverimo, da se rendera GraphsClient
    await expect(page.locator('[data-testid="graphs-client"]')).toBeVisible();

    // Lahko preverimo nekaj vsebine (ime kategorije ali vrednost)
    await expect(page.locator('text=Hrana')).toBeVisible();
    await expect(page.locator('text=Transport')).toBeVisible();
  });
});
