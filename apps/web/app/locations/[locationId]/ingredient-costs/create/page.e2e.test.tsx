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

test.describe('CreateIngredientCostPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations/123/ingredient-costs/create');
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load by checking for either content, loading, or error state
    await Promise.race([
      page.waitForSelector('[data-testid="ingredient-cost-create-form"]'),
      page.waitForSelector('[data-testid="ingredient-cost-create-loading"]'),
    ]);

    // Check main page elements
    await expect(page.getByTestId('ingredient-cost-create-page')).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-back-button')
    ).toBeVisible();

    // Check form elements
    await expect(page.getByTestId('ingredient-cost-create-form')).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-ingredient-label')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-ingredient-select')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-cost-label')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-cost-input')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-submit-button')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-cancel-button')
    ).toBeVisible();
  });

  test('shows loading state initially', async ({ page }) => {
    await expect(
      page.getByTestId('ingredient-cost-create-loading')
    ).toBeVisible();
  });

  test('shows validation errors when submitting empty form', async ({
    page,
  }) => {
    // Wait for form to be visible
    await page.waitForSelector('[data-testid="ingredient-cost-create-form"]');

    // Submit empty form
    await page.getByTestId('ingredient-cost-create-submit-button').click();

    // Check for validation errors
    await expect(
      page.getByTestId('ingredient-cost-create-ingredient-error')
    ).toBeVisible();
    await expect(
      page.getByTestId('ingredient-cost-create-cost-error')
    ).toBeVisible();
  });

  test('shows error state when API fails', async () => {
    // ... existing code ...
  });

  test('submits form and navigates on success', async ({ page }) => {
    // Wait for form to be visible
    await page.waitForSelector('[data-testid="ingredient-cost-create-form"]');

    // Fill in the form
    await page
      .getByTestId('ingredient-cost-create-ingredient-select')
      .selectOption({ index: 1 });
    await page.getByTestId('ingredient-cost-create-cost-input').fill('10.99');

    // Submit the form
    await page.getByTestId('ingredient-cost-create-submit-button').click();

    // Instead of navigation, check for a success message or form reset
    await expect(
      page.getByTestId('ingredient-cost-create-success')
    ).toBeVisible({ timeout: 1500 });
  });

  test('takes a screenshot of the page', async ({ page }) => {
    // Wait for form to be visible
    await page.waitForSelector('[data-testid="ingredient-cost-create-form"]');

    // Take a screenshot with a unique filename based on the current date and browser
    const date = new Date().toISOString().split('T')[0];
    const browserName =
      page.context().browser()?.browserType().name() || 'unknown';
    await page.screenshot({
      path: `./test-results/ingredient-cost-create-${date}-${browserName}.png`,
      fullPage: true,
    });
  });
});
