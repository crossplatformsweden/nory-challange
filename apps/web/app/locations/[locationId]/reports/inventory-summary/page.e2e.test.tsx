import { test, expect } from '@playwright/test'

test.describe('InventorySummaryReportPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/reports/inventory-summary')
    
    // Check that the page has loaded
    await expect(page.getByTestId('inventory-summary-report-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/inventory-summary-report_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 