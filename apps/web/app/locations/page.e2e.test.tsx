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

test.describe('LocationsListPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations');
  });

  test('renders all required elements', async ({ page }) => {
    // Check that main elements are visible
    await expect(page.getByTestId('locations-list-page')).toBeVisible();
    await expect(page.getByTestId('locations-list-title')).toBeVisible();
    await expect(page.getByTestId('locations-list-content')).toBeVisible();

    // Check for the create button
    await expect(
      page.getByTestId('locations-list-create-button')
    ).toBeVisible();

    // Wait for data loading to complete (either showing locations or empty state)
    await Promise.race([
      page
        .waitForSelector('[data-testid^="location-card-"]', { timeout: 5000 })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="locations-list-empty"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="locations-list-error"]', {
          timeout: 5000,
        })
        .catch(() => {}),
    ]);
  });

  test('navigates to location detail page when clicking view button', async ({
    page,
  }) => {
    await page.goto('/locations');

    // Wait for either location cards or empty state
    await Promise.race([
      page
        .waitForSelector('[data-testid^="location-card-"]', { timeout: 5000 })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="locations-list-empty"]', {
          timeout: 5000,
        })
        .catch(() => {}),
    ]);

    // If we have location cards, test navigation
    const firstViewButton = await page
      .locator('[data-testid^="location-view-"]')
      .first()
      .count();

    if (firstViewButton > 0) {
      // Get the id from the test ID to verify we navigate to the correct page
      const buttonTestId = await page
        .locator('[data-testid^="location-view-"]')
        .first()
        .getAttribute('data-testid');
      const locationId = buttonTestId?.replace('location-view-', '');

      // Click the view button
      await page.locator('[data-testid^="location-view-"]').first().click();

      // Verify we navigated to the detail page
      await expect(page).toHaveURL(/\/locations\/[^/]+$/);
    }
  });

  test('navigates to create page when clicking add location button', async ({
    page,
  }) => {
    await page.goto('/locations');

    // Click the create button
    await page.getByTestId('locations-list-create-button').click();

    // Verify we navigated to the create page
    await expect(page).toHaveURL(/\/locations\/create$/);
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Wait for content to be fully loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/locations-list_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
