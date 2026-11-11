import { expect, test } from '@playwright/test';

test('2º primaria: recursos de science con vídeos embebidos y enlaces externos', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /2º Primaria/ }).click();
  await expect(page.getByRole('heading', { name: /2º de Primaria/ })).toBeVisible();

  await page.getByRole('button', { name: 'Science' }).click();
  await expect(page.getByRole('heading', { name: 'The human body' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Animals' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Plants' })).toBeVisible();

  const video = page.locator('iframe[title="Human body (video 1)"]');
  await expect(video).toHaveAttribute('src', 'https://www.youtube-nocookie.com/embed/mOKmjYwfDGU');

  const link = page.getByRole('link', { name: /Parts of a plant/ });
  await expect(link).toHaveAttribute('href', 'https://wordwall.net/es-es/community/parts-of-plant');
  await expect(link).toHaveAttribute('target', '_blank');

  await page.getByRole('button', { name: /Asignaturas/ }).click();
  await page.getByRole('button', { name: /Cursos/ }).click();
  await expect(page.getByRole('button', { name: /1º Primaria/ })).toBeVisible();
});

test('2º primaria: cada asignatura muestra sus bloques', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /2º Primaria/ }).click();

  await page.getByRole('button', { name: 'Mates' }).click();
  await expect(page.getByRole('heading', { name: 'Números hasta el 200' })).toBeVisible();
  await page.getByRole('button', { name: /Asignaturas/ }).click();

  await page.getByRole('button', { name: 'Lengua' }).click();
  await expect(page.getByRole('heading', { name: 'La g suave y la diéresis' })).toBeVisible();
  await page.getByRole('button', { name: /Asignaturas/ }).click();

  await page.getByRole('button', { name: 'English' }).click();
  await expect(page.getByRole('heading', { name: /I've got/ })).toBeVisible();
});
