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

test.describe('InventorySummaryReportPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(
      '/locations/123/reports/inventory-summary?startTime=2024-01-01T00:00:00Z&endTime=2024-12-31T23:59:59Z'
    );
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load (either content, loading state, or error)
    await Promise.race([
      page
        .waitForSelector('[data-testid="inventory-summary-report-content"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="inventory-summary-report-loading"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="inventory-summary-report-error"]', {
          timeout: 5000,
        })
        .catch(() => {}),
    ]);

    // Check main page elements
    await expect(
      page.getByTestId('inventory-summary-report-page')
    ).toBeVisible();
    await expect(
      page.getByTestId('inventory-summary-report-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('inventory-summary-report-back-button')
    ).toBeVisible();

    // Check for either content, loading state, or error
    const hasContent =
      (await page.getByTestId('inventory-summary-report-content').count()) > 0;
    const isLoading =
      (await page.getByTestId('inventory-summary-report-loading').count()) > 0;
    const hasError =
      (await page.getByTestId('inventory-summary-report-error').count()) > 0;

    // At least one of these states should be visible
    expect(hasContent || isLoading || hasError).toBeTruthy();

    // If content is loaded, check for summary cards and table
    if (hasContent) {
      // Check summary cards
      await expect(
        page.getByTestId('inventory-summary-report-total-value-title')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-total-value')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-total-items-title')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-total-items')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-low-stock-title')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-low-stock')
      ).toBeVisible();

      // Check table headers
      await expect(
        page.getByTestId('inventory-summary-report-table-header-ingredient')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-table-header-quantity')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-table-header-value')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-summary-report-table-header-status')
      ).toBeVisible();

      // Check for either items or empty state
      const hasEmptyState =
        (await page.getByTestId('inventory-summary-report-empty').count()) > 0;
      const hasItems =
        (await page
          .locator('[data-testid^="inventory-summary-report-item-"]')
          .count()) > 0;

      expect(hasEmptyState || hasItems).toBeTruthy();

      // If items exist, check row details
      if (hasItems) {
        await expect(
          page
            .locator('[data-testid^="inventory-summary-report-item-"]')
            .first()
        ).toBeVisible();
        await expect(
          page
            .locator('[data-testid^="inventory-summary-report-ingredient-"]')
            .first()
        ).toBeVisible();
        await expect(
          page
            .locator('[data-testid^="inventory-summary-report-quantity-"]')
            .first()
        ).toBeVisible();
        await expect(
          page
            .locator('[data-testid^="inventory-summary-report-value-"]')
            .first()
        ).toBeVisible();
        await expect(
          page
            .locator('[data-testid^="inventory-summary-report-status-"]')
            .first()
        ).toBeVisible();
      }
    }
  });

  test('shows loading state initially', async ({ page }) => {
    await page.goto(
      '/locations/123/reports/inventory-summary?startTime=2024-01-01T00:00:00Z&endTime=2024-12-31T23:59:59Z'
    );
    await expect(
      page.getByTestId('inventory-summary-report-loading')
    ).toBeVisible();
  });

  test('navigates back when back button is clicked', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector(
      '[data-testid="inventory-summary-report-back-button"]'
    );

    // Click the back button
    await page.getByTestId('inventory-summary-report-back-button').click();

    // Verify navigation back
    await expect(page).toHaveURL(/\/locations\/\d+\/reports$/);
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Wait for content to load
    await page
      .waitForSelector('[data-testid="inventory-summary-report-content"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/inventory-summary-report_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
