import { test, expect } from '@playwright/test'

test.describe('NewSalePage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/sales/new')
    
    // Check that the page has loaded
    await expect(page.getByTestId('new-sale-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/new-sale_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 