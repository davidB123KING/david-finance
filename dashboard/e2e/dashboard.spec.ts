import { test, expect } from '@playwright/test';

test.describe('DashboardPage', () => {
  const baseURL = 'http://localhost:3000';

  test('če ni prijavljen, prikaže Nisi prijavljen', async ({ page }) => {
    await page.goto(`${baseURL}/dashboard`);

    // Pri preizkusnem okolju brez login-a, se mora pokazati sporočilo
    await expect(page.locator('text=Nisi prijavljen')).toBeVisible();
  });

  test('prikaže dashboard elemente, če je prijavljen', async ({ page }) => {
    // Za test: simuliramo testnega uporabnika
    await page.goto(`${baseURL}/dashboard?__mock_user=user_123`);

    // Preveri, da se rendera naslov in statse
    await expect(page.locator('text=Dashboard')).toBeVisible();
    await expect(page.locator('text=Skupaj')).toBeVisible();
    await expect(page.locator('text=Prihodki')).toBeVisible();
    await expect(page.locator('text=Stroški')).toBeVisible();
    await expect(page.locator('text=Transakcije')).toBeVisible();

    // Preveri, da se pojavijo forme za income in expense
    await expect(page.locator('text=Dodaj prihodek')).toBeVisible();
    await expect(page.locator('text=Dodaj strošek')).toBeVisible();

    // Preveri, da je vsaj ena transakcija prikazana (če mockamo)
    await expect(page.locator('li')).toHaveCountGreaterThan(0);
  });
});
