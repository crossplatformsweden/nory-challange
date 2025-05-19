import { test, expect } from '@playwright/test'

test.describe('ModifierDetailPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/modifiers/123')
    
    // Check that the page has loaded
    await expect(page.getByTestId('modifier-detail-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/modifier-detail_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 