import { expect, test } from '@playwright/test';

test('lengua unit renders all three exercise sections', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Lengua' }).click();
  await page.getByRole('button', { name: /Tema 8/i }).click();

  await expect(page.getByText('Cada palabra en su lugar')).toBeVisible();
  await expect(page.getByRole('button', { name: /Comprobar/i })).toBeVisible();

  await page.getByRole('button', { name: /^Corrige error$/i }).click();
  await expect(page.getByText('Corrige el error')).toBeVisible();
  await expect(page.getByPlaceholder('el / la / los / las').first()).toBeVisible();

  await page.getByRole('button', { name: /^Cambia género$/i }).click();
  await expect(page.getByText('Cambia el género')).toBeVisible();
  await expect(page.getByPlaceholder('Escribe aquí la frase cambiada.')).toBeVisible();
});
