import { test, expect } from '@playwright/test';
import type { Recipe, RecipeIngredientLink, Ingredient } from '@repo/api-client';
 * 1. Test the page loads correctly at the specified URL
 * 2. Test all elements are visible and properly rendered
 * 3. Test any user interactions (clicks, form submissions, etc.)
 * 4. Take screenshots for visual regression testing
 * 5. Test responsive behavior if needed
 * 6. Test any loading states (less critical for E2E if MSW provides instant data, but good for initial load)
 * 7. Test any error states (by mocking API errors)
 *
 * Note: Use the URL path provided in the generator
 * and ensure all testIds match the page component.
 */

// Preserving the original comment block as requested.

test.describe('RecipeDetailPage', () => {
  const recipeId = 'e2e-recipe-123'; // Use a distinct ID for E2E
  const baseUrl = `/recipes/${recipeId}`;

  // Mock Data
  const mockRecipeData: Recipe = {
    id: recipeId,
    name: 'E2E Test Recipe',
    description: 'A delicious recipe for E2E testing.',
    // Add other required fields if any, otherwise undefined is fine for non-used fields
  };

  const mockIngredientsData: Record<string, Ingredient> = {
    ingA: { id: 'ingA', name: 'Ingredient A', cost: 2.50, unit: 'kg', currentStock: 0 },
    ingB: { id: 'ingB', name: 'Ingredient B', cost: 1.00, unit: 'pcs', currentStock: 0 },
    ingC_no_cost: { id: 'ingC_no_cost', name: 'Ingredient C (No Cost)', cost: null, unit: 'ml', currentStock: 0 },
  };

  const mockRecipeIngredientLinksData: RecipeIngredientLink[] = [
    { id: 'link1', recipeId, ingredientId: 'ingA', quantity: 2 }, // 2 * 2.50 = 5.00
    { id: 'link2', recipeId, ingredientId: 'ingB', quantity: 3 }, // 3 * 1.00 = 3.00
    { id: 'link3', recipeId, ingredientId: 'ingC_no_cost', quantity: 100 }, // N/A
  ];
  // Expected Total Recipe Cost = 5.00 + 3.00 = 8.00

  test.beforeEach(async ({ page }) => {
    // --- Mock API responses ---
    // Mock GetRecipeById
    await page.route(`**/api/recipes/${recipeId}`, async route => {
      await route.fulfill({ json: { data: mockRecipeData } });
    });

    // Mock ListRecipeIngredientLinks
    await page.route(`**/api/recipes/${recipeId}/ingredient-links`, async route => {
      await route.fulfill({ json: { data: mockRecipeIngredientLinksData } });
    });

    // Mock GetIngredientById for each ingredient
    for (const ingId in mockIngredientsData) {
      await page.route(`**/api/ingredients/${ingId}`, async route => {
        if (mockIngredientsData[ingId]) {
          await route.fulfill({ json: mockIngredientsData[ingId] });
        } else {
          await route.fulfill({ status: 404, json: { message: 'Ingredient not found' } });
        }
      });
    }
    // --- End Mock API responses ---

    await page.goto(baseUrl);
    // Wait for the main recipe title to be visible, indicating initial recipe data load
    await expect(page.getByTestId('recipe-detail-title')).toBeVisible();
  });

  test('renders recipe title and basic info', async ({ page }) => {
    await expect(page.getByTestId('recipe-detail-page')).toBeVisible();
    await expect(page.getByTestId('recipe-detail-title')).toHaveText(mockRecipeData.name);
    await expect(page.getByTestId('recipe-detail-description')).toHaveText(mockRecipeData.description!);
    await expect(page.getByTestId('recipe-detail-id')).toContainText(recipeId);
    await expect(page.getByTestId('recipe-detail-back-button')).toBeVisible();
  });
  
  test('renders ingredient costs and total recipe cost', async ({ page }) => {
    // Wait for the ingredients table to be populated
    await expect(page.getByTestId('recipe-detail-ingredients-table-container')).toBeVisible();

    // Check table headers
    await expect(page.getByRole('columnheader', { name: 'Ingredient Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Cost per Unit' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Quantity' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Total Ingredient Cost' })).toBeVisible();

    // Verify ingredient rows
    // Row 1: Ingredient A
    const row1 = page.getByTestId('recipe-ingredient-row-link1');
    await expect(row1.getByTestId('recipe-ingredient-name-ingA')).toHaveText('Ingredient A');
    await expect(row1.getByTestId('recipe-ingredient-cost-per-unit-ingA')).toHaveText('2.50');
    await expect(row1.locator('td').nth(2)).toHaveText('2'); // Quantity
    await expect(row1.getByTestId('recipe-ingredient-total-cost-ingA')).toHaveText('5.00');

    // Row 2: Ingredient B
    const row2 = page.getByTestId('recipe-ingredient-row-link2');
    await expect(row2.getByTestId('recipe-ingredient-name-ingB')).toHaveText('Ingredient B');
    await expect(row2.getByTestId('recipe-ingredient-cost-per-unit-ingB')).toHaveText('1.00');
    await expect(row2.locator('td').nth(2)).toHaveText('3'); // Quantity
    await expect(row2.getByTestId('recipe-ingredient-total-cost-ingB')).toHaveText('3.00');

    // Row 3: Ingredient C (No Cost)
    const row3 = page.getByTestId('recipe-ingredient-row-link3');
    await expect(row3.getByTestId('recipe-ingredient-name-ingC_no_cost')).toHaveText('Ingredient C (No Cost)');
    await expect(row3.getByTestId('recipe-ingredient-cost-per-unit-ingC_no_cost')).toHaveText('N/A');
    await expect(row3.locator('td').nth(2)).toHaveText('100'); // Quantity
    await expect(row3.getByTestId('recipe-ingredient-total-cost-ingC_no_cost')).toHaveText('N/A');
    
    // Verify Total Recipe Cost
    await expect(page.getByTestId('recipe-total-cost')).toHaveText('8.00');
  });

  test('shows loading state for ingredients if API is slow (illustrative - needs handler delay)', async ({ page }) => {
    // This test is more illustrative as precise loading state timing is hard in E2E without explicit delays in handlers.
    // For a real test of this, you'd add a delay to the ingredient handlers.
    await page.route(`**/api/ingredients/ingA`, async route => {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Add delay
      await route.fulfill({ json: mockIngredientsData.ingA });
    });
    
    await page.reload(); // Reload to apply the new handler with delay

    // Check for total cost loading state
    await expect(page.getByTestId('recipe-total-cost')).toHaveText('Calculating...');
    await expect(page.getByTestId('recipe-total-cost-loading')).toBeVisible();

    // Wait for ingA to load and total cost to update
    await expect(page.getByTestId('recipe-total-cost')).toHaveText('8.00', { timeout: 2000 }); // Increased timeout
  });


  test('takes a screenshot of the page with cost details', async ({ page, browserName }) => {
    // Wait for all content, especially async loaded costs, to be stable
    await expect(page.getByTestId('recipe-total-cost')).toHaveText('8.00'); // Ensure calculations are done
    await page.waitForLoadState('networkidle'); // Wait for network to be idle

    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `./screenshots/recipe-detail-costs_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
