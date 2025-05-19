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

test.describe('RecipeDetailPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/recipes/123')
  })

  test('shows loading state initially', async ({ page }) => {
    // Check loading spinner is visible
    await expect(page.getByRole('status')).toBeVisible()
  })

  test('renders all required elements after loading', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForSelector('[data-testid="recipe-detail-title"]')
    
    // Check main elements are visible
    await expect(page.getByTestId('recipe-detail-page')).toBeVisible()
    await expect(page.getByTestId('recipe-detail-title')).toBeVisible()
    await expect(page.getByTestId('recipe-detail-content')).toBeVisible()
    await expect(page.getByTestId('recipe-detail-description-title')).toBeVisible()
    await expect(page.getByTestId('recipe-detail-description')).toBeVisible()
    await expect(page.getByTestId('recipe-detail-metadata-title')).toBeVisible()
    await expect(page.getByTestId('recipe-detail-id')).toBeVisible()

    // Check navigation elements
    await expect(page.getByTestId('recipe-detail-back-link')).toBeVisible()
    await expect(page.getByTestId('recipe-detail-ingredients-link')).toBeVisible()

    // Check that elements have content
    await expect(page.getByTestId('recipe-detail-title')).not.toBeEmpty()
    await expect(page.getByTestId('recipe-detail-description')).not.toBeEmpty()
    await expect(page.getByTestId('recipe-detail-id')).not.toBeEmpty()
  })

  test('navigation links work correctly', async ({ page }) => {
    // Wait for loading to complete
    await page.waitForSelector('[data-testid="recipe-detail-title"]')

    // Test back link
    const backLink = page.getByTestId('recipe-detail-back-link')
    await expect(backLink).toHaveAttribute('href', '/recipes')
    await backLink.click()
    await expect(page).toHaveURL('/recipes')

    // Go back to recipe detail
    await page.goto('/recipes/123')
    await page.waitForSelector('[data-testid="recipe-detail-title"]')

    // Test ingredients link
    const ingredientsLink = page.getByTestId('recipe-detail-ingredients-link')
    await expect(ingredientsLink).toHaveAttribute('href', '/recipes/123/ingredient-links')
    await ingredientsLink.click()
    await expect(page).toHaveURL('/recipes/123/ingredient-links')
  })

  test('handles error state', async ({ page }) => {
    // Mock API error by navigating to a non-existent endpoint
    await page.route('**/recipes/*', route => route.fulfill({ status: 500 }))
    await page.reload()
    
    // Check error message is displayed
    await expect(page.getByText(/Error loading recipe/)).toBeVisible()
  })

  test('takes a screenshot of the page', async ({ page, browserName }) => {
    // Wait for loading to complete
    await page.waitForSelector('[data-testid="recipe-detail-title"]')
    
    // Get current date/time for unique screenshot name
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-')
    
    // Take screenshot with timestamp and browser name
    await page.screenshot({ 
      path: `./screenshots/recipe-detail_${browserName}_${timestamp}.png`,
      fullPage: true 
    })
  })
}) 