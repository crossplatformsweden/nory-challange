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

test.describe('ReportsOverviewPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/locations/123/reports');
  });

  test('renders all required elements', async ({ page }) => {
    // Check that all elements are visible
    await expect(page.getByTestId('reports-overview-page')).toBeVisible();
    await expect(page.getByTestId('reports-overview-title')).toBeVisible();
    await expect(
      page.getByTestId('reports-overview-back-button')
    ).toBeVisible();
    await expect(page.getByTestId('reports-overview-content')).toBeVisible();
    await expect(
      page.getByTestId('reports-overview-inventory-summary-link')
    ).toBeVisible();
    await expect(
      page.getByTestId('reports-overview-inventory-timeline-link')
    ).toBeVisible();
  });

  test('navigates back when back button is clicked', async ({ page }) => {
    // Click the back button
    await page.getByTestId('reports-overview-back-button').click();

    // Verify we're back at the location detail page
    await expect(page).toHaveURL('/locations/123');
  });

  test('navigates to inventory summary report', async ({ page }) => {
    // Click the inventory summary link
    await page.getByTestId('reports-overview-inventory-summary-link').click();

    // Verify we're on the inventory summary page
    await expect(page).toHaveURL('/locations/123/reports/inventory-summary');
  });

  test('navigates to inventory timeline report', async ({ page }) => {
    // Click the inventory timeline link
    await page.getByTestId('reports-overview-inventory-timeline-link').click();

    // Verify we're on the inventory timeline page
    await expect(page).toHaveURL(
      '/locations/123/reports/inventory-movements-timeline'
    );
  });

  test('shows loading state', async ({ page }) => {
    // Reload the page to trigger loading state
    await page.reload();

    // Check loading spinner is visible
    await expect(page.getByTestId('reports-overview-loading')).toBeVisible();
  });

  test('shows error state when API fails', async ({ page }) => {
    // Mock API failure
    await page.route('**/api/locations/*', (route) =>
      route.fulfill({
        status: 500,
        body: JSON.stringify({ message: 'Internal Server Error' }),
      })
    );

    // Reload the page to trigger error state
    await page.reload();

    // Check error message is visible
    await expect(page.getByTestId('reports-overview-error')).toBeVisible();
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/reports-overview_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
