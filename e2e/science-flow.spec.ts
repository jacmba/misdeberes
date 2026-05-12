import { expect, test } from '@playwright/test';

test('science unit 8 renders all four exercise sections', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Science' }).click();
  await page.getByRole('button', { name: /Unit 8/i }).click();

  await expect(page.getByRole('heading', { name: 'Collective or individual?' })).toBeVisible();
  await expect(page.getByRole('button', { name: /Comprobar/i })).toBeVisible();

  await page.getByRole('button', { name: /^How we travel$/i }).click();
  await expect(page.getByText('How do we travel?')).toBeVisible();

  await page.getByRole('button', { name: /^Where$/i }).click();
  await expect(page.getByText('Where do we take transport?')).toBeVisible();

  await page.getByRole('button', { name: /^Features$/i }).click();
  await expect(page.getByText('Transport features')).toBeVisible();
});
