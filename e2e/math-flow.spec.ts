import { expect, test } from '@playwright/test';

test('math exercise sections switch correctly', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Mates' }).click();
  await page.getByRole('button', { name: /Tema 7/i }).click();

  await page.getByRole('button', { name: /^Operaciones$/i }).click();
  await expect(page.getByText('Operación')).toBeVisible();
  await expect(page.getByRole('button', { name: /Comprobar/i })).toBeVisible();

  await page.getByRole('button', { name: /^Relojes$/i }).click();
  await expect(page.getByText('¿Qué hora es?')).toBeVisible();
});
