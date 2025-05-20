import { test, expect } from '@playwright/test';

test.describe('Menu Items List Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the menu items list page
    await page.goto('/locations/123/menu-items');
  });

  test('displays the page title and create button', async ({ page }) => {
    await expect(page.getByTestId('menu-items-list-title')).toBeVisible();
    await expect(page.getByTestId('menu-items-create-button')).toBeVisible();
  });

  test('displays the menu items table', async ({ page }) => {
    // Wait for the table to be visible
    await expect(page.getByTestId('menu-items-list-content')).toBeVisible();

    // Check table headers
    await expect(page.getByText('Name')).toBeVisible();
    await expect(page.getByText('Price')).toBeVisible();
    await expect(page.getByText('Category')).toBeVisible();
    await expect(page.getByText('Actions')).toBeVisible();
  });

  test('navigates to create menu item page', async ({ page }) => {
    await page.getByTestId('menu-items-create-button').click();
    await expect(page).toHaveURL('/locations/123/menu-items/create');
  });

  test('navigates to menu item detail page', async ({ page }) => {
    // Wait for the first menu item to be visible
    await expect(page.getByTestId('menu-item-view-1')).toBeVisible();

    // Click the view button
    await page.getByTestId('menu-item-view-1').click();

    // Check if we're on the detail page
    await expect(page).toHaveURL('/locations/123/menu-items/1');
  });

  test('navigates to menu item edit page', async ({ page }) => {
    // Wait for the first menu item to be visible
    await expect(page.getByTestId('menu-item-edit-1')).toBeVisible();

    // Click the edit button
    await page.getByTestId('menu-item-edit-1').click();

    // Check if we're on the edit page
    await expect(page).toHaveURL('/locations/123/menu-items/1/edit');
  });
});
