import { test, expect } from '@playwright/test'

test.describe('IngredientCostDetailPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/ingredient-costs/456')
    
    // Check that the page has loaded
    await expect(page.getByTestId('ingredient-cost-detail-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/ingredient-cost-detail_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 