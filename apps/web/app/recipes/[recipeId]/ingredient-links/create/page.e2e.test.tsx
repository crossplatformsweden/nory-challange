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
 */

test.describe('CreateRecipeIngredientLinkPage', () => {
  const recipeId = '123';
  const baseUrl = `/recipes/${recipeId}/ingredient-links/create`;

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load (either content, loading state, or error)
    await Promise.race([
      page
        .waitForSelector(
          '[data-testid="create-recipe-ingredient-link-content"]',
          {
            timeout: 5000,
          }
        )
        .catch(() => {}),
      page
        .waitForSelector(
          '[data-testid="create-recipe-ingredient-link-loading"]',
          {
            timeout: 5000,
          }
        )
        .catch(() => {}),
    ]);

    // Check main page elements
    await expect(
      page.getByTestId('create-recipe-ingredient-link-page')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-back-button')
    ).toBeVisible();

    // Check form elements
    await expect(
      page.getByTestId('create-recipe-ingredient-link-form-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-ingredient-select')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-amount-input')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-submit-button')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-cancel-button')
    ).toBeVisible();

    // Check recipe details
    await expect(
      page.getByTestId('create-recipe-ingredient-link-recipe-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-recipe-id')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-recipe-ingredient-link-recipe-name')
    ).toBeVisible();
  });

  test('shows loading state initially', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(
      page.getByTestId('create-recipe-ingredient-link-loading')
    ).toBeVisible();
  });

  test('back button navigates to previous page', async ({ page }) => {
    // First go to the recipe detail page
    await page.goto(`/recipes/${recipeId}`);

    // Store the URL to verify we return here later
    const originalUrl = page.url();

    // Navigate to create ingredient link page
    await page.goto(baseUrl);
    await page.waitForSelector(
      '[data-testid="create-recipe-ingredient-link-page"]'
    );

    // Click the back button
    await page.getByTestId('create-recipe-ingredient-link-back-button').click();

    // Verify we went back to the original page
    await page.waitForURL(originalUrl);
  });

  test('shows validation errors for empty form submission', async ({
    page,
  }) => {
    await page.goto(baseUrl);
    await page.waitForSelector(
      '[data-testid="create-recipe-ingredient-link-page"]'
    );

    // Try to submit without filling required fields
    await page
      .getByTestId('create-recipe-ingredient-link-submit-button')
      .click();

    // Check for validation error messages
    await expect(
      page.getByTestId('create-recipe-ingredient-link-ingredient-error')
    ).toBeVisible();
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Wait for content to be loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/create-recipe-ingredient-link_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
