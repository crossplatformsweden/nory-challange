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

    // If content is loaded, check for table elements
    if (hasContent) {
      await expect(
        page.getByTestId('recipe-ingredient-links-table-header-ingredient')
      ).toBeVisible();
      await expect(
        page.getByTestId('recipe-ingredient-links-table-header-amount')
      ).toBeVisible();

      // Check for ingredient links
      const hasIngredientRows =
        (await page
          .locator('[data-testid^="recipe-ingredient-link-row-"]')
          .count()) > 0;

      if (hasIngredientRows) {
        await expect(
          page.locator('[data-testid^="recipe-ingredient-link-row-"]').first()
        ).toBeVisible();
        await expect(
          page.locator('[data-testid^="recipe-ingredient-link-name-"]').first()
        ).toBeVisible();
        await expect(
          page
            .locator('[data-testid^="recipe-ingredient-link-amount-"]')
            .first()
        ).toBeVisible();
      }
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

    // Wait for the add button to be visible
    await page.waitForSelector(
      '[data-testid="recipe-ingredient-links-add-button"]'
    );

    // Click the add button and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      page.getByTestId('recipe-ingredient-links-add-button').click(),
    ]);

    // Verify we navigated to the create page
    await expect(page).toHaveURL(`${baseUrl}/create`);
  });

  test('deletes an ingredient link when delete button is clicked', async ({
    page,
  }) => {
    // Wait for content to load
    await page.waitForSelector(
      '[data-testid="recipe-ingredient-links-content"]'
    );

    // Get the first delete button and verify it's visible
    const deleteButton = page
      .getByTestId(/^recipe-ingredient-link-delete-/)
      .first();
    await expect(deleteButton).toBeVisible();

    // Click delete button
    await deleteButton.click();
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
