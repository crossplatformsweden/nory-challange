import { test, expect } from '@playwright/test'

test.describe('CreateMenuItemPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/menu-items/create')
    
    // Check that the page has loaded
    await expect(page.getByTestId('create-menu-item-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/create-menu-item_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 