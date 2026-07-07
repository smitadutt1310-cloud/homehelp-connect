import { test, expect } from '@playwright/test';

test('HomeHelp Connect landing page loads', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Verify application title
  await expect(page.getByText('HomeHelp Connect')).toBeVisible();

  // Verify landing page buttons
  await expect(
    page.getByRole('button', { name: /Continue as Resident/i })
  ).toBeVisible();

  await expect(
    page.getByRole('button', { name: /Register as House Help/i })
  ).toBeVisible();
});

test('Navigate to House Help Registration', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await page.getByRole('button', {
    name: /Register as House Help/i,
  }).click();

  await expect(
    page.getByText('Personal Information')
  ).toBeVisible();

  await expect(
    page.getByLabel(/Full Name/i)
  ).toBeVisible();
});