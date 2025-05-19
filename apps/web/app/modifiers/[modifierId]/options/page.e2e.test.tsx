import { test, expect } from '@playwright/test'

test.describe('ModifierOptionsListPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/modifiers/123/options')
    
    // Check that the page has loaded
    await expect(page.getByTestId('modifier-options-list-page')).toBeVisible()
    
    // Take screenshot - Playwright will automatically save it in the test-results directory
    await page.screenshot({ 
      fullPage: true 
    })
  })
}) 