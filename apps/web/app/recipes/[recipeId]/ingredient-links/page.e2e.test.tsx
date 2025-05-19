import { test, expect } from '@playwright/test';

/**
 * E2E Testing Guide:
 * 1. Test the page loads correctly at the specified URL
 * 2. Test all elements are visible and properly rendered
 * 3. Test any user interactions (clicks, form submissions, etc.)
 * 4. Take screenshots for visual regression testing
 * 5. Test responsive behavior if needed
 * 6. Test any loading states
 */

test.describe('RecipeIngredientLinksPage', () => {
  const recipeId = '123';
  const baseUrl = `/recipes/${recipeId}/ingredient-links`;

  test.beforeEach(async ({ page }) => {
    await page.goto(baseUrl);
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load (either content or loading state)
    await Promise.race([
      page
        .waitForSelector('[data-testid="recipe-ingredient-links-content"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="recipe-ingredient-links-loading"]', {
          timeout: 5000,
        })
        .catch(() => {}),
    ]);

    // Check main page elements
    await expect(
      page.getByTestId('recipe-ingredient-links-page')
    ).toBeVisible();
    await expect(
      page.getByTestId('recipe-ingredient-links-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('recipe-ingredient-links-back-button')
    ).toBeVisible();
    await expect(
      page.getByTestId('recipe-ingredient-links-add-button')
    ).toBeVisible();

    // Check for either content or loading state
    const hasContent =
      (await page.getByTestId('recipe-ingredient-links-content').count()) > 0;
    const isLoading =
      (await page.getByTestId('recipe-ingredient-links-loading').count()) > 0;

    // At least one of these states should be visible
    expect(hasContent || isLoading).toBeTruthy();

    // If content is loaded, check for table elements
    if (hasContent) {
      await expect(
        page.getByTestId('recipe-ingredient-links-table')
      ).toBeVisible();
      await expect(
        page.getByTestId('recipe-ingredient-links-table-header-ingredient')
      ).toBeVisible();
      await expect(
        page.getByTestId('recipe-ingredient-links-table-header-amount')
      ).toBeVisible();
    }
  });

  test('shows loading state initially', async ({ page }) => {
    await page.goto(baseUrl);
    await expect(
      page.getByTestId('recipe-ingredient-links-loading')
    ).toBeVisible();
  });

  test('navigates to create page when clicking add button', async ({
    page,
  }) => {
    // Wait for the page to load
    await page.waitForSelector('[data-testid="recipe-ingredient-links-page"]');

    // Click the add button and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.getByTestId('recipe-ingredient-links-add-button').click(),
    ]);

    // Verify we navigated to the create page
    await expect(page).toHaveURL(
      `/recipes/${recipeId}/ingredient-links/create`
    );
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Wait for content to be loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/recipe-ingredient-links_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
