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

test.describe('InventoryMovementsTimelinePage', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the page with query parameters
    await page.goto(
      '/locations/123/reports/inventory-movements-timeline?startTime=2024-01-01T00:00:00Z&endTime=2024-12-31T23:59:59Z'
    );
  });

  test('renders all required elements', async ({ page }) => {
    // Wait for the page to load by checking for either content, loading, or error state
    await Promise.race([
      page.waitForSelector(
        '[data-testid="inventory-movements-timeline-content"]'
      ),
      page.waitForSelector(
        '[data-testid="inventory-movements-timeline-loading"]'
      ),
      page.waitForSelector(
        '[data-testid="inventory-movements-timeline-error"]'
      ),
    ]);

    // Check main page elements
    await expect(
      page.getByTestId('inventory-movements-timeline-page')
    ).toBeVisible();
    await expect(
      page.getByTestId('inventory-movements-timeline-title')
    ).toBeVisible();
    await expect(
      page.getByTestId('inventory-movements-timeline-back-button')
    ).toBeVisible();

    // Check if content is loaded
    const content = page.getByTestId('inventory-movements-timeline-content');
    if (await content.isVisible()) {
      // Check filters
      await expect(
        page.getByTestId('inventory-movements-timeline-filters')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-ingredient-filter')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-movement-type-filter')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-staff-filter')
      ).toBeVisible();

      // Check table headers
      await expect(
        page.getByTestId('inventory-movements-timeline-table-header-date')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-table-header-ingredient')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-table-header-type')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-table-header-quantity')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-table-header-staff')
      ).toBeVisible();
      await expect(
        page.getByTestId('inventory-movements-timeline-table-header-notes')
      ).toBeVisible();

      // Check if either items or empty state is shown
      const hasItems = await page
        .getByTestId('inventory-movements-timeline-item-1')
        .isVisible()
        .catch(() => false);
      if (!hasItems) {
        await expect(
          page.getByTestId('inventory-movements-timeline-empty')
        ).toBeVisible();
      }
    }
  });

  test('shows loading state initially', async ({ page }) => {
    await expect(
      page.getByTestId('inventory-movements-timeline-loading')
    ).toBeVisible();
  });

  test('takes a screenshot of the page', async ({ page }) => {
    // Wait for content to load
    await page.waitForSelector(
      '[data-testid="inventory-movements-timeline-content"]'
    );

    // Take a screenshot with a unique filename based on the current date and browser
    const timestamp = new Date().toISOString().split('T')[0];
    const browserName =
      page.context().browser()?.browserType().name() || 'unknown';
    await page.screenshot({
      path: `./test-results/inventory-movements-timeline-${timestamp}-${browserName}.png`,
      fullPage: true,
    });
  });
});
