import { expect, test } from '@playwright/test';

test('english numbers and listen flows render expected UI', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'English' }).click();
  await page.getByRole('button', { name: /Unit 8/i }).click();

  await page.getByRole('button', { name: /^Numbers$/i }).click();
  await expect(page.getByText('Read the number and choose the correct word!')).toBeVisible();
  await expect(page.getByRole('button', { name: /Comprobar/i })).toBeVisible();

  await page.getByRole('button', { name: /^Listen$/i }).click();
  await expect(page.getByText('Click to listen and repeat out loud!')).toBeVisible();
  await expect(page.getByRole('button', { name: /Siguiente palabra/i })).toBeVisible();
});
