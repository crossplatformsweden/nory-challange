import { test, expect } from '@playwright/test'

/**
 * E2E Testing Guide:
 * 1. Test the page loads correctly at the specified URL
 * 2. Test all elements are visible and properly rendered
 * 3. Test any user interactions (clicks, form submissions, etc.)
 * 4. Take screenshots for visual regression testing
 * 5. Test responsive behavior if needed
 * 6. Test any loading states
 * 7. Test any error states
 * 
 * Note: Use the URL path provided in the generator
 * and ensure all testIds match the page component.
 */

/**
 * // Update this page and corresponding test files. Make sure to use testId. And DaisyUI. Look in  utils/nextjsroutes.md To see what hook to use for this page. Source that hook and visualize/use it with daisyUI. Also look for the fakerjs implementation of that hook tanstack by genertaion orval noryApiClient. We will use the faker version in all tests. So all data coming will be random. So just test testId and hasValue() or similar. Use NextJS best practive for routing images etc. Not actual values. Use best pracitce for visualizing forms with use react-hook-form make sure check package.json with available libraries. Dont install any other libraries. For this File make sure you only change the page.tsx page.test.tsx and page.test.e2e.tsx. Verify using gh cli that its only max this 3 files changed. NO OTHER FILE. LEAVE THIS COMMENT IN THE FILE DO NOT REMOVE.
 */

test.describe('RecipesListPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/recipes')
  })

  test('shows loading state initially', async ({ page }) => {
    // Check loading spinner is visible
    await expect(page.getByRole('status')).toBeVisible()
  })

  test('renders all required elements after loading', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForSelector('[data-testid="recipes-list-title"]')
    
    // Check main elements are visible
    await expect(page.getByTestId('recipes-list-page')).toBeVisible()
    await expect(page.getByTestId('recipes-list-title')).toBeVisible()
    await expect(page.getByTestId('recipes-list-content')).toBeVisible()

    // Check that recipe cards are rendered
    const recipeCards = await page.$$('[data-testid^="recipe-title-"]')
    expect(recipeCards.length).toBeGreaterThan(0)

    // Check that each recipe card has all required elements
    for (const card of recipeCards) {
      const recipeId = await card.getAttribute('data-testid')?.replace('recipe-title-', '')
      if (recipeId) {
        await expect(page.getByTestId(`recipe-title-${recipeId}`)).toBeVisible()
        await expect(page.getByTestId(`recipe-description-${recipeId}`)).toBeVisible()
        await expect(page.getByTestId(`recipe-link-${recipeId}`)).toBeVisible()
      }
    }
  })

  test('recipe links navigate to detail pages', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForSelector('[data-testid^="recipe-link-"]')
    
    // Get the first recipe link
    const firstRecipeLink = page.getByTestId(/^recipe-link-/).first()
    const href = await firstRecipeLink.getAttribute('href')
    
    // Click the link
    await firstRecipeLink.click()
    
    // Verify navigation
    await expect(page).toHaveURL(href || '')
  })

  test('handles error state', async ({ page }) => {
    // Mock API error by navigating to a non-existent endpoint
    await page.route('**/recipes', route => route.fulfill({ status: 500 }))
    await page.reload()
    
    // Check error message is displayed
    await expect(page.getByText(/Error loading recipes/)).toBeVisible()
  })

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Wait for loading to complete
    await page.waitForSelector('[data-testid="recipes-list-title"]')
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp and browser name
    await page.screenshot({ 
      path: `./screenshots/recipes-list_${browserName}_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 