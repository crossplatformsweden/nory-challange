import { test, expect } from '@playwright/test'

test.describe('CreateLocationPage', () => {
  test('renders the page and takes screenshot', async ({ page }) => {
    await page.goto('/locations/create')
    
    // Check that the page has loaded
    await expect(page.getByTestId('create-location-page')).toBeVisible()
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp
    await page.screenshot({ 
      path: `./screenshots/create-location_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 