import { test, expect } from '@playwright/test'

test.describe('CreateIngredientCostPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/123/ingredient-costs/create')
    
    // Check that the page has loaded
    await expect(page.getByTestId('create-ingredient-cost-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/create-ingredient-cost_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 