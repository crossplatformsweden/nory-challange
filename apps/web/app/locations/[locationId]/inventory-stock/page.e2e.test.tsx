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

test.describe('InventoryStockPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations/123/inventory-stock');
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load (either content, loading state, or error)
    await Promise.race([
      page
        .waitForSelector('[data-testid="inventory-stock-content"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="inventory-stock-loading"]', {
          timeout: 5000,
        })
        .catch(() => {}),
      page
        .waitForSelector('[data-testid="inventory-stock-error"]', {
          timeout: 5000,
        })
        .catch(() => {}),
    ]);

    // Check main page elements
    await expect(page.getByTestId('inventory-stock-page')).toBeVisible();
    await expect(page.getByTestId('inventory-stock-title')).toBeVisible();
    await expect(page.getByTestId('inventory-stock-back-button')).toBeVisible();
    await expect(
      page.getByTestId('inventory-stock-record-movement-button')
    ).toBeVisible();
    await expect(
      page.getByTestId('inventory-stock-ingredient-filter')
    ).toBeVisible();

    // Check for either content, loading state, or error
    const hasContent =
      (await page.getByTestId('inventory-stock-content').count()) > 0;
    const isLoading =
      (await page.getByTestId('inventory-stock-loading').count()) > 0;
    const hasError =
      (await page.getByTestId('inventory-stock-error').count()) > 0;

    // At least one of these states should be visible
    expect(hasContent || isLoading || hasError).toBeTruthy();

    // If content is loaded, check for table elements
    if (hasContent) {
      await expect(
        page.getByTestId('inventory-stock-table-header-ingredient')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-stock-table-header-quantity')
      ).toBeVisible();

      // Check for either stock items or empty state
      const hasEmptyState =
        (await page.getByTestId('inventory-stock-empty').count()) > 0;
      const hasStockRows =
        (await page.locator('[data-testid^="inventory-stock-row-"]').count()) >
        0;

      expect(hasEmptyState || hasStockRows).toBeTruthy();

      // If stock items exist, check row details
      if (hasStockRows) {
        await expect(
          page.locator('[data-testid^="inventory-stock-row-"]').first()
        ).toBeVisible();
        await expect(
          page.locator('[data-testid^="inventory-stock-ingredient-"]').first()
        ).toBeVisible();
        await expect(
          page.locator('[data-testid^="inventory-stock-quantity-"]').first()
        ).toBeVisible();
        await expect(
          page.getByTestId('inventory-stock-total-value')
        ).toBeVisible();
      }
    }
  });

  test('filter changes update the display', async ({ page }) => {
    // Wait for content to load
    await page
      .waitForSelector('[data-testid="inventory-stock-content"]', {
        timeout: 5000,
      })
      .catch(() => {});

    // Test only if content is available and has stock items
    const hasStockRows =
      (await page.locator('[data-testid^="inventory-stock-row-"]').count()) > 0;

    if (hasStockRows) {
      // Count initial number of rows
      const initialRowCount = await page
        .locator('[data-testid^="inventory-stock-row-"]')
        .count();

      // Get the first ingredient value from dropdown
      const filter = page.getByTestId('inventory-stock-ingredient-filter');
      await filter.click();

      // Select the first option (other than 'All Ingredients')
      const secondOption = page.locator('option:not([value=""])').first();
      if ((await secondOption.count()) > 0) {
        await secondOption.click();

        // Allow time for the filter to apply
        await page.waitForTimeout(500);

        // Check that filtering either reduced rows or shows the same (if only one ingredient exists)
        const filteredRowCount = await page
          .locator('[data-testid^="inventory-stock-row-"]')
          .count();
        expect(filteredRowCount).toBeLessThanOrEqual(initialRowCount);
      }
    }
  });

  test('record movement button navigates to correct page', async ({ page }) => {
    // Wait for page to load
    await page.waitForSelector(
      '[data-testid="inventory-stock-record-movement-button"]'
    );

    // Click the record movement button
    await page.getByTestId('inventory-stock-record-movement-button').click();

    // Verify navigation to record movement page
    await expect(page).toHaveURL(
      /\/locations\/123\/inventory-movements\/record/
    );
  });

  test('back button navigates to previous page', async ({ page }) => {
    // First go to the location detail page
    await page.goto('/locations/123');

    // Store the URL to verify we return here later
    const originalUrl = page.url();

    // Navigate to inventory stock page
    await page.goto('/locations/123/inventory-stock');
    await page.waitForSelector('[data-testid="inventory-stock-page"]');

    // Click the back button
    await page.getByTestId('inventory-stock-back-button').click();

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
      path: `./screenshots/inventory-stock_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
