import { test, expect } from '@playwright/test'

test.describe('StaffDetailPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/staff/456')
    
    // Check that the page has loaded
    await expect(page.getByTestId('staff-detail-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/staff-detail_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 