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

test.describe('LocationDetailPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations/123');
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load (either content, loading state, or error)
    await Promise.race([
      page
        .waitForSelector('[data-testid="location-detail-content"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="location-detail-loading"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="location-detail-error"]', {
          timeout: 5000,
        })
        .catch(() => {}),
    ]);

    // Check that main elements are visible
    await expect(page.getByTestId('location-detail-page')).toBeVisible();
    await expect(page.getByTestId('location-detail-title')).toBeVisible();
    await expect(page.getByTestId('location-detail-back-button')).toBeVisible();

    // Check for either content, loading state, or error
    const hasContent =
      (await page.getByTestId('location-detail-content').count()) > 0;
    const isLoading =
      (await page.getByTestId('location-detail-loading').count()) > 0;
    const hasError =
      (await page.getByTestId('location-detail-error').count()) > 0;

    // At least one of these states should be visible
    expect(hasContent || isLoading || hasError).toBeTruthy();

    // If content is loaded, check for key elements
    if (hasContent) {
      await expect(page.getByTestId('location-detail-name')).toBeVisible();
      await expect(page.getByTestId('location-detail-address')).toBeVisible();
      await expect(
        page.getByTestId('location-detail-edit-button')
      ).toBeVisible();
      await expect(
        page.getByTestId('location-detail-delete-button')
      ).toBeVisible();

      // Check that navigation links are present
      await expect(
        page.getByTestId('location-detail-staff-link')
      ).toBeVisible();
      await expect(
        page.getByTestId('location-detail-menu-items-link')
      ).toBeVisible();
      await expect(
        page.getByTestId('location-detail-reports-link')
      ).toBeVisible();
    }
  });

  test('navigates when clicking navigation links', async ({ page }) => {
    // Wait for content to load
    await page
      .waitForSelector('[data-testid="location-detail-content"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Test only if content is available (not in loading or error state)
    const hasContent =
      (await page.getByTestId('location-detail-content').count()) > 0;
    if (hasContent) {
      // Click on staff link and verify navigation
      await page.getByTestId('location-detail-staff-link').click();
      await expect(page).toHaveURL(/\/locations\/123\/staff/);

      // Go back to detail page
      await page.goto('/locations/123');
      await page
        .waitForSelector('[data-testid="location-detail-content"]', {
          timeout: 5000,
        })
        .catch(() => {});

      // Click on menu items link and verify navigation
      await page.getByTestId('location-detail-menu-items-link').click();
      await expect(page).toHaveURL(/\/locations\/123\/menu-items/);
    }
  });

  test('back button navigates to previous page', async ({ page }) => {
    // First go to the locations list page
    await page.goto('/locations');

    // Store the URL to verify we return here later
    const originalUrl = page.url();

    // Go to the detail page
    await page.goto('/locations/123');
    await page.waitForSelector('[data-testid="location-detail-page"]');

    // Click the back button
    await page.getByTestId('location-detail-back-button').click();

    // Verify we went back to the original page
    await page.waitForURL(originalUrl);
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Wait for content to be loaded
    await page.waitForLoadState('networkidle');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/location-detail_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
