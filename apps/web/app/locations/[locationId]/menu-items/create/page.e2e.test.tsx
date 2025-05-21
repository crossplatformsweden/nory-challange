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

test.describe('Create Menu Item Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the create menu item page
    await page.goto('/locations/location1/menu-items/create');
  });

  test('should display the create menu item form', async ({ page }) => {
    // Check if the page title is visible
    await expect(page.getByTestId('create-menu-item-title')).toBeVisible();
    await expect(page.getByTestId('create-menu-item-title')).toHaveText(
      'Create Menu Item'
    );

    // Check if all form elements are visible
    await expect(page.getByTestId('create-menu-item-form')).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-recipe-id-input')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-price-input')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-category-input')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-description-input')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-active-input')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-submit-button')
    ).toBeVisible();
  });

  test('should show validation errors for required fields', async ({
    page,
  }) => {
    // Try to submit the form without filling required fields
    await page.getByTestId('create-menu-item-submit-button').click();

    // Check if validation error messages are displayed
    await expect(
      page.getByTestId('create-menu-item-recipe-id-error')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-recipe-id-error')
    ).toHaveText('Recipe ID is required');

    await expect(
      page.getByTestId('create-menu-item-price-error')
    ).toBeVisible();
    await expect(page.getByTestId('create-menu-item-price-error')).toHaveText(
      'Price is required'
    );

    await expect(
      page.getByTestId('create-menu-item-category-error')
    ).toBeVisible();
    await expect(
      page.getByTestId('create-menu-item-category-error')
    ).toHaveText('Category is required');
  });

  test('should create a menu item successfully', async ({ page }) => {
    // Fill in the form
    await page.getByTestId('create-menu-item-recipe-id-input').fill('recipe1');
    await page.getByTestId('create-menu-item-price-input').fill('9.99');
    await page
      .getByTestId('create-menu-item-category-input')
      .fill('Main Course');
    await page
      .getByTestId('create-menu-item-description-input')
      .fill('A delicious dish');

    // Submit the form
    await page.getByTestId('create-menu-item-submit-button').click();

    // Instead of navigation, check for a success message or form reset
    await expect(page.getByTestId('create-menu-item-success')).toBeVisible({
      timeout: 1500,
    });
  });

  test('should show loading state when submitting', async ({ page }) => {
    // Fill in the form
    await page.getByTestId('create-menu-item-recipe-id-input').fill('recipe1');
    await page.getByTestId('create-menu-item-price-input').fill('9.99');
    await page
      .getByTestId('create-menu-item-category-input')
      .fill('Main Course');

    // Submit the form
    await page.getByTestId('create-menu-item-submit-button').click();

    // Check if the submit button is disabled and shows loading spinner
    await expect(
      page.getByTestId('create-menu-item-submit-button')
    ).toBeDisabled({ timeout: 1500 });
    await expect(
      page.getByTestId('create-menu-item-submit-button').locator('span.loading')
    ).toBeVisible({ timeout: 1500 });
  });

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Get current date/time for unique screenshot name
    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');

    // Take screenshot with timestamp and browser name
    await page.screenshot({
      path: `./screenshots/create-menu-item_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
