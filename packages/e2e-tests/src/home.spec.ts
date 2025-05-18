import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/');
    
    // Check that the page has loaded
    // await expect(page).toHaveTitle(/Web/);
    
    // Basic test to verify the page content contains expected text
    const content = await page.textContent('body');
    expect(content).toContain('Turborepo');
  });
});