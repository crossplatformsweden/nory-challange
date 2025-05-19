import { test, expect } from '@playwright/test'

test.describe('RecipeIngredientLinksPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/recipes/123/ingredient-links')
    
    // Check that the page has loaded
    await expect(page.getByTestId('recipe-ingredient-links-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/recipe-ingredient-links_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 