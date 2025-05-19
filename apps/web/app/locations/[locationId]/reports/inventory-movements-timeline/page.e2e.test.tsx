import { test, expect } from '@playwright/test'

test.describe('InventoryMovementsTimelinePage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/reports/inventory-movements-timeline')
    
    // Check that the page has loaded
    await expect(page.getByTestId('inventory-movements-timeline-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/inventory-movements-timeline_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 