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

test.describe('IngredientCostsListPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations/123/ingredient-costs');
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load by checking for either content, loading, or error state
    await Promise.race([
      page.waitForSelector('[data-testid="ingredient-costs-list-content"]'),
      page.waitForSelector('[data-testid="ingredient-costs-list-loading"]'),
      page.waitForSelector('[data-testid="ingredient-costs-list-error"]'),
    ]);

    // Check main page elements
    await expect(page.getByTestId('ingredient-costs-list-page')).toBeVisible();
    await expect(page.getByTestId('ingredient-costs-list-title')).toBeVisible();
    await expect(
      page.getByTestId('ingredient-costs-list-back-button')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-costs-list-create-button')
    ).toBeVisible();

    // Check if content is loaded
    const content = page.getByTestId('ingredient-costs-list-content');
    if (await content.isVisible()) {
      // Check table headers
      await expect(
        page.getByTestId('ingredient-costs-list-table-header-ingredient')
      ).toBeVisible();
      await expect(
        page.getByTestId('ingredient-costs-list-table-header-cost')
      ).toBeVisible();
      await expect(
        page.getByTestId('ingredient-costs-list-table-header-unit')
      ).toBeVisible();
      await expect(
        page.getByTestId('ingredient-costs-list-table-header-actions')
      ).toBeVisible();

      // Check if either items or empty state is shown
      const hasItems = await page
        .getByTestId('ingredient-costs-list-item-1')
        .isVisible()
        .catch(() => false);
      if (!hasItems) {
        await expect(
          page.getByTestId('ingredient-costs-list-empty')
        ).toBeVisible();
      }
    }
  });

  test('shows loading state initially', async ({ page }) => {
    await expect(
      page.getByTestId('ingredient-costs-list-loading')
    ).toBeVisible();
  });

  test('navigates back when back button is clicked', async ({ page }) => {
    await page.getByTestId('ingredient-costs-list-back-button').click();
    await expect(page).toHaveURL(/\/locations\/123$/);
  });

  test('navigates to create page when create button is clicked', async ({
    page,
  }) => {
    await page.getByTestId('ingredient-costs-list-create-button').click();
    await expect(page).toHaveURL('/locations/123/ingredient-costs/create');
  });

  test('navigates to detail page when view button is clicked', async ({
    page,
  }) => {
    // Wait for content to load
    await page.waitForSelector('[data-testid="ingredient-costs-list-content"]');

    // Click the first view button
    await page.getByTestId('ingredient-costs-list-view-button-1').click();
    await expect(page).toHaveURL('/locations/123/ingredient-costs/1');
  });

  test('takes a screenshot of the page', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector('[data-testid="ingredient-costs-list-content"]');

    // Take a screenshot with a unique filename based on the current date and browser
    const timestamp = new Date().toISOString().split('T')[0];
    const browserName =
      page.context().browser()?.browserType().name() || 'unknown';
    await page.screenshot({
      path: `./test-results/ingredient-costs-list-${timestamp}-${browserName}.png`,
      fullPage: true,
    });
  });
});
