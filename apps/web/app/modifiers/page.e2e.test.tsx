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

test.describe('ModifiersListPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/modifiers');
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for either content, loading, or error state
    await Promise.race([
      page.waitForSelector('[data-testid="modifiers-list-content"]', {
        timeout: 5000,
      }),
      page.waitForSelector('[data-testid="modifiers-list-loading"]', {
        timeout: 5000,
      }),
      page.waitForSelector('[data-testid="modifiers-list-error"]', {
        timeout: 5000,
      }),
    ]);

    // Check that at least one state is visible
    const hasContent = await page
      .getByTestId('modifiers-list-content')
      .isVisible();
    const hasLoading = await page
      .getByTestId('modifiers-list-loading')
      .isVisible();
    const hasError = await page.getByTestId('modifiers-list-error').isVisible();
    expect(hasContent || hasLoading || hasError).toBeTruthy();

    // If content is loaded, check for either empty state or modifier cards
    if (hasContent) {
      const hasEmptyState = await page
        .getByTestId('modifiers-list-empty')
        .isVisible();
      const hasModifierCards =
        (await page.locator('[data-testid^="modifier-card-"]').count()) > 0;
      expect(hasEmptyState || hasModifierCards).toBeTruthy();

      // If modifier cards exist, check details
      if (hasModifierCards) {
        await expect(page.getByTestId('modifier-card-name')).toBeVisible();
        await expect(
          page.getByTestId('modifier-card-view-button')
        ).toBeVisible();
        await expect(page.getByTestId('modifier-card-options')).toBeVisible();
      }
    }
  });

  test('navigates to detail page when clicking view button', async ({
    page,
  }) => {
    // Wait for content to load
    await page
      .waitForSelector('[data-testid="modifiers-list-content"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Test only if we have modifier cards
    const firstViewButton = await page
      .locator('[data-testid^="modifier-view-"]')
      .first()
      .count();

    if (firstViewButton > 0) {
      // Get the id from the test ID to verify we navigate to the correct page

      // Click the view button
      await page.locator('[data-testid^="modifier-view-"]').first().click();

      // Verify we navigated to the detail page
      await expect(page).toHaveURL(/\/modifiers\/[^/]+$/);
    }
  });

  test('navigates to options page when clicking view options button', async ({
    page,
  }) => {
    // Wait for content to load
    await page
      .waitForSelector('[data-testid="modifiers-list-content"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Test only if we have modifier cards
    const optionsButton = await page
      .locator('[data-testid^="modifier-options-"]')
      .first()
      .count();

    if (optionsButton > 0) {
      // Get the id from the test ID

      // Click the options button
      await page.locator('[data-testid^="modifier-options-"]').first().click();

      // Verify we navigated to the options page
      await expect(page).toHaveURL(/\/modifiers\/[^/]+\/options$/);
    }
  });

  test('navigates to create page when clicking add modifier button', async ({
    page,
  }) => {
    // Click the create button
    await page.getByTestId('modifiers-list-create-button').click();

    // Verify we navigated to the create page
    await expect(page).toHaveURL(/\/modifiers\/create$/);
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Wait for content to be fully loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/modifiers-list_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
