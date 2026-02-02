import { test, expect } from '@playwright/test';

test('Uporabnik se lahko prijavi', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');

  // Preveri, da se gumb za login prikaže (Clerk form rendera)
  await expect(page.locator('text=Sign in')).toBeVisible();

  // Lahko simuliraš vnos emaila in gesla, če imaš testni Clerk account
  // await page.fill('input[name="email"]', 'test@example.com');
  // await page.fill('input[name="password"]', '123456');
  // await page.click('button:text("Sign in")');
});

test('Uporabnik se lahko registrira', async ({ page }) => {
  await page.goto('http://localhost:3000/signup');

  await expect(page.locator('text=Sign up')).toBeVisible();
});
