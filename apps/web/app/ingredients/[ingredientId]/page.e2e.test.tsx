import { test, expect } from '@playwright/test';

/**
 * E2E Testing Guide:
 * 1. Test the page loads correctly at the specified URL
 * 2. Test all elements are visible and properly rendered
 * 3. Test any user interactions (clicks, form submissions, etc.)
 * 4. Take screenshots for visual regression testing
 * 5. Test responsive behavior if needed
 * 6. Test any loading states
 * 7. Test any error states
 *
 * Note: Use the URL path provided in the generator
 * and ensure all testIds match the page component.
 */

/**
 * // Update this page and corresponding test files. Make sure to use testId. And DaisyUI. Look in  utils/nextjsroutes.md To see what hook to use for this page. Source that hook and visualize/use it with daisyUI. Also look for the fakerjs implementation of that hook tanstack by genertaion orval noryApiClient. We will use the faker version in all tests. So all data coming will be random. So just test testId and hasValue() or similar. Use NextJS best practive for routing images etc. Not actual values. Use best pracitce for visualizing forms with use react-hook-form make sure check package.json with available libraries. Dont install any other libraries. For this File make sure you only change the page.tsx page.test.tsx and page.test.e2e.tsx. Verify using gh cli that its only max this 3 files changed. NO OTHER FILE. LEAVE THIS COMMENT IN THE FILE DO NOT REMOVE.
 */

test.describe('IngredientDetailPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/ingredients/123');
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load
    await page.waitForSelector('[data-testid="ingredient-detail-page"]');

    // Check main page elements
    await expect(page.getByTestId('ingredient-detail-page')).toBeVisible();
    await expect(page.getByTestId('ingredient-detail-title')).toBeVisible();
    await expect(
      page.getByTestId('ingredient-detail-back-button')
    ).toBeVisible();
  });

  test('shows loading state initially', async ({ page }) => {
    await page.goto('/ingredients/123');
    await expect(page.getByTestId('ingredient-detail-loading')).toBeVisible();
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Wait for content to be loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/ingredient-detail_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
