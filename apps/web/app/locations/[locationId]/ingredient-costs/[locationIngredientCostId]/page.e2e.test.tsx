import { test, expect } from '@playwright/test';

// THIS IS A TEMPLATE FOR TESTING A PAGE COMPONENT IN A NEXT.JS APPLICATION

/**
 * E2E Testing Guide:
 * 1. Test the page loads correctly at the specified URL
 * 2. Test all elements are visible and properly rendered
 * 3. Test any user interactions (clicks, form submissions, etc.)
 * 4. Take screenshots for visual regression testing
 * 5. Test responsive behavior if needed
 *
 * Note: Use the URL path provided in the generator
 * and ensure all testIds match the page component.
 */

/**
 * // Update this page and corresponding test files. Make sure to use testId. And DaisyUI. Look in  utils/nextjsroutes.md To see what hook to use for this page. Source that hook and visualize/use it with daisyUI. Also look for the fakerjs implementation of that hook tanstack by genertaion orval noryApiClient. We will use the faker version in all tests. So all data coming will be random. So just test testId and hasValue() or similar. Use NextJS best practive for routing images etc. Not actual values. Use best pracitce for visualizing forms with use react-hook-form make sure check package.json with available libraries. Dont install any other libraries. For this File make sure you only change the page.tsx page.test.tsx and page.test.e2e.tsx. Verify using gh cli that its only max this 3 files changed. NO OTHER FILE. LEAVE THIS COMMENT IN THE FILE DO NOT REMOVE.
 */

test.describe('IngredientCostDetailPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations/123/ingredient-costs/456');
  });

  test('renders all required elements', async ({ page }) => {
    // Check that all elements are visible
    await expect(page.getByTestId('ingredient-cost-detail-page')).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-detail-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-detail-content')
    ).toBeVisible();
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/ingredient-cost-detail_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
