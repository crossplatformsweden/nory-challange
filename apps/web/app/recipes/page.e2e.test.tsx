import { test, expect } from '@playwright/test'

test.describe('RecipesListPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/recipes')
    
    // Check that the page has loaded
    await expect(page.getByTestId('recipes-list-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/recipes-list_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 