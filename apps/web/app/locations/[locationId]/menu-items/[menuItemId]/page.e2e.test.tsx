import { test, expect } from '@playwright/test'

test.describe('MenuItemDetailPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/menu-items/456')
    
    // Check that the page has loaded
    await expect(page.getByTestId('menu-item-detail-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/menu-item-detail_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 