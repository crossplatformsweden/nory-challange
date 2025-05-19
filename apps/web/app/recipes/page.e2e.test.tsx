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

test.describe('RecipesListPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/recipes');
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load (either content, loading state, or error)
    await Promise.race([
      page
        .waitForSelector('[data-testid="recipes-list-content"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="recipes-list-loading"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="recipes-list-error"]', {
          timeout: 5000,
        })
        .catch(() => {}),
    ]);

    // Check main elements are visible
    await expect(page.getByTestId('recipes-list-page')).toBeVisible();
    await expect(page.getByTestId('recipes-list-title')).toBeVisible();
    await expect(page.getByTestId('recipes-list-create-button')).toBeVisible();

    // Check for either content, loading state, or error
    const hasContent =
      (await page.getByTestId('recipes-list-content').count()) > 0;
    const isLoading =
      (await page.getByTestId('recipes-list-loading').count()) > 0;
    const hasError = (await page.getByTestId('recipes-list-error').count()) > 0;

    // At least one of these states should be visible
    expect(hasContent || isLoading || hasError).toBeTruthy();

    // If content is loaded, check for either recipe cards or empty state
    if (hasContent) {
      const hasEmptyState =
        (await page.getByTestId('recipes-list-empty').count()) > 0;
      const hasRecipeCards =
        (await page.locator('[data-testid^="recipe-card-"]').count()) > 0;

      expect(hasEmptyState || hasRecipeCards).toBeTruthy();

      // If recipe cards exist, check details
      if (hasRecipeCards) {
        await expect(
          page.locator('[data-testid^="recipe-name-"]').first()
        ).toBeVisible();
        await expect(
          page.locator('[data-testid^="recipe-view-"]').first()
        ).toBeVisible();
        await expect(
          page.locator('[data-testid^="recipe-ingredients-"]').first()
        ).toBeVisible();
      }
    }
  });

  test('navigates to detail page when clicking view button', async ({
    page,
  }) => {
    // Wait for content to load
    await page.waitForTimeout(1000); // Give time for data to load
    await page
      .waitForSelector('[data-testid="recipes-list-content"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Test only if we have recipe cards
    const firstViewButton = await page
      .locator('[data-testid^="recipe-view-"]')
      .first()
      .count();

    if (firstViewButton > 0) {
      // Get the id from the test ID to verify we navigate to the correct page
      const buttonTestId = await page
        .locator('[data-testid^="recipe-view-"]')
        .first()
        .getAttribute('data-testid');
      const recipeId = buttonTestId?.replace('recipe-view-', '');

      // Click the view button
      await page.locator('[data-testid^="recipe-view-"]').first().click();

      // Verify we navigated to the detail page
      await expect(page).toHaveURL(`/recipes/${recipeId}`);
    }
  });

  test('navigates to ingredients page when clicking ingredients button', async ({
    page,
  }) => {
    // Wait for content to load
    await page.waitForTimeout(1000); // Give time for data to load
    await page
      .waitForSelector('[data-testid="recipes-list-content"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Test only if we have recipe cards
    const ingredientsButton = await page
      .locator('[data-testid^="recipe-ingredients-"]')
      .first()
      .count();

    if (ingredientsButton > 0) {
      // Get the id from the test ID
      const buttonTestId = await page
        .locator('[data-testid^="recipe-ingredients-"]')
        .first()
        .getAttribute('data-testid');
      const recipeId = buttonTestId?.replace('recipe-ingredients-', '');

      // Click the ingredients button
      await page
        .locator('[data-testid^="recipe-ingredients-"]')
        .first()
        .click();

      // Verify we navigated to the ingredients page
      await expect(page).toHaveURL(`/recipes/${recipeId}/ingredient-links`);
    }
  });

  test('navigates to create page when clicking add recipe button', async ({
    page,
  }) => {
    // Click the create button
    await page.getByTestId('recipes-list-create-button').click();

    // Verify we navigated to the create page
    await expect(page).toHaveURL('/recipes/create');
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Wait for content to be fully loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/recipes-list_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
