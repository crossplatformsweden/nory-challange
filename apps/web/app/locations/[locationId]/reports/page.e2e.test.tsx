import { test, expect } from '@playwright/test'

test.describe('ReportsOverviewPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/reports')
    
    // Check that the page has loaded
    await expect(page.getByTestId('reports-overview-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/reports-overview_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 