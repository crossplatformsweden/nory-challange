import { test, expect } from '@playwright/test';

test.describe('Menu Item Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the menu item detail page
    await page.goto('/locations/123/menu-items/456');
  });

  test('displays the page title and action buttons', async ({ page }) => {
    await expect(page.getByTestId('menu-item-detail-title')).toBeVisible();
    await expect(page.getByTestId('menu-item-edit-button')).toBeVisible();
    await expect(page.getByTestId('menu-item-back-button')).toBeVisible();
  });

  test('displays menu item details', async ({ page }) => {
    // Wait for the content to be visible
    await expect(page.getByTestId('menu-item-detail-content')).toBeVisible();

    // Check that all detail sections are present
    await expect(page.getByTestId('menu-item-name')).toBeVisible();
    await expect(page.getByTestId('menu-item-price')).toBeVisible();
    await expect(page.getByTestId('menu-item-category')).toBeVisible();
    await expect(page.getByTestId('menu-item-description')).toBeVisible();
    await expect(page.getByTestId('menu-item-status')).toBeVisible();
    await expect(page.getByTestId('menu-item-created-at')).toBeVisible();
    await expect(page.getByTestId('menu-item-updated-at')).toBeVisible();
  });

  test('navigates to edit page', async ({ page }) => {
    await page.getByTestId('menu-item-edit-button').click();
    await expect(page).toHaveURL('/locations/123/menu-items/456/edit');
  });

  test('navigates back to list page', async ({ page }) => {
    await page.getByTestId('menu-item-back-button').click();
    await expect(page).toHaveURL('/locations/123/menu-items');
  });
});
