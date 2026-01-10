import { describe, test, expect } from '@playwright/test';

describe('Health check', () => {
  test('home screen should load and display health API data', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /bookmark library/i })).toBeVisible();
    await expect(page.getByText(/API status/i)).toBeVisible();
    await expect(page.getByText(/timestamp/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /refetch health/i })).toBeVisible();
  });
});
