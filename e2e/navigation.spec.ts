import { expect, test } from '@playwright/test';

test('user navigates from landing to exercises and back', async ({ page }) => {
  await page.goto('/');

  await page.getByRole('button', { name: 'Mates' }).click();
  await expect(page.getByText('Matemáticas')).toBeVisible();

  await page.getByRole('button', { name: /Tema 7/i }).click();
  await expect(page.getByRole('button', { name: /Comprobar/i })).toBeVisible();
  await expect(page.getByText('Gráficos')).toBeVisible();

  await page.getByRole('button', { name: /Volver a Temas/i }).click();
  await expect(page.getByText('Matemáticas')).toBeVisible();
});
