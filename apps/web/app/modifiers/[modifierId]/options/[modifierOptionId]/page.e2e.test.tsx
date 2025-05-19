import { test, expect } from '@playwright/test'

test.describe('ModifierOptionDetailPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/modifiers/123/options/456')
    
    // Check that the page has loaded
    await expect(page.getByTestId('modifier-option-detail-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/modifier-option-detail_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 