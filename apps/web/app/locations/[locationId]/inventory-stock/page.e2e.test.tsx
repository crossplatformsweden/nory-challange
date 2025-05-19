import { test, expect } from '@playwright/test'

test.describe('InventoryStockPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/inventory-stock')
    
    // Check that the page has loaded
    await expect(page.getByTestId('inventory-stock-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/inventory-stock_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 