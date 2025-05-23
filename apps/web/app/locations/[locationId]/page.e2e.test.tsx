import { test, expect } from '@playwright/test';
import type { Location, Staff, LocationMenuItem, Recipe, LocationIngredientCost, Ingredient, InventoryStock, InventoryMovement } from '@repo/api-client'; 
import { format } from 'date-fns'; 

// Comment from original file is preserved.

test.describe('LocationDetailPage E2E Tests', () => {
  const locationId = 'e2e-loc-123'; 
  const baseUrl = `/locations/${locationId}`;

  // --- Mock Data ---
  const mockLocation: Location = {
    id: locationId,
    name: 'E2E Test Location',
    address: '123 E2E Street, Testville',
    companyId: 'comp-e2e',
    conceptId: 'concept-e2e',
    currency: 'USD',
    settings: {}, 
  };

  const mockStaffList: Staff[] = [
    { id: 'staff-001', name: 'Alice Wonderland', role: 'Manager', locationId, email: 'alice@example.com', phone: '111'},
    { id: 'staff-002', name: 'Bob The Builder', role: 'Chef', locationId, email: 'bob@example.com', phone: '222' },
  ];

  const mockRecipes: Record<string, Recipe> = {
    'recipe-pizza-01': { id: 'recipe-pizza-01', name: 'Pepperoni Pizza', description: 'Classic pepperoni pizza' },
    'recipe-pasta-02': { id: 'recipe-pasta-02', name: 'Spaghetti Carbonara', description: 'Creamy carbonara' },
  };

  const mockLocationMenuItems: LocationMenuItem[] = [
    { id: 'lmi-001', locationId, recipeId: 'recipe-pizza-01', price: 12.99 },
    { id: 'lmi-002', locationId, recipeId: 'recipe-pasta-02', price: 15.50 },
    { id: 'lmi-003', locationId, recipeId: 'recipe-unknown', price: 9.00 }, 
  ];

  const mockIngredients: Record<string, Ingredient> = {
    'ing-flour-01': { id: 'ing-flour-01', name: 'Flour', unit: 'kg', cost: 1.20, currentStock: 100 },
    'ing-sugar-02': { id: 'ing-sugar-02', name: 'Sugar', unit: 'kg', cost: 2.00, currentStock: 50 },
    'ing-salt-03': { id: 'ing-salt-03', name: 'Salt', unit: 'g', cost: 0.50, currentStock: 1000 },
    'ing-unknown-03': { id: 'ing-unknown-03', name: 'Unknown Spice', unit: 'g', cost: 0, currentStock: 0 }, 
  };

  const mockLocationIngredientCosts: LocationIngredientCost[] = [
    { id: 'lic-001', locationId, ingredientId: 'ing-flour-01', cost: 1.50 },
    { id: 'lic-002', locationId, ingredientId: 'ing-sugar-02', cost: 2.25 },
    { id: 'lic-003', locationId, ingredientId: 'ing-error-fetch', cost: 3.00 }, 
  ];
  
  const mockInventoryStockLevels: InventoryStock[] = [
    { id: 'is-001', locationId, ingredientId: 'ing-flour-01', quantity: 75 },
    { id: 'is-002', locationId, ingredientId: 'ing-sugar-02', quantity: 30 },
    { id: 'is-003', locationId, ingredientId: 'ing-error-fetch', quantity: 10 }, 
  ];

  const mockInventoryMovements: InventoryMovement[] = [
    { id: 'im-001', locationId, ingredientId: 'ing-flour-01', quantityChange: -10, type: 'SALE', createdAt: '2023-01-15T14:30:00.000Z', currentStock: 90, unitCost:1.20, value: -12.00 },
    { id: 'im-002', locationId, ingredientId: 'ing-sugar-02', quantityChange: 20, type: 'RECEIVED', createdAt: '2023-01-16T09:00:00.000Z', currentStock: 70, unitCost:2.00, value: 40.00 },
    { id: 'im-003', locationId, ingredientId: 'ing-error-fetch', quantityChange: -1, type: 'WASTE', createdAt: '2023-01-17T12:00:00.000Z', currentStock: 0, unitCost:0, value:0 }, // For testing ingredient fetch error
  ];
  // --- End Mock Data ---

  test.beforeEach(async ({ page }) => {
    await page.route(`**/api/locations/${locationId}`, route => route.fulfill({ json: { data: mockLocation } }));
    await page.route(`**/api/staff?locationId=${locationId}`, route => route.fulfill({ json: mockStaffList }));
    await page.route(`**/api/location-menu-items?locationId=${locationId}`, route => route.fulfill({ json: mockLocationMenuItems }));

    for (const recipeId in mockRecipes) {
      await page.route(`**/api/recipes/${recipeId}`, route => {
        if (mockRecipes[recipeId]) route.fulfill({ json: mockRecipes[recipeId] });
        else route.fulfill({ status: 404, json: { message: 'Recipe not found' } });
      });
    }
    await page.route(`**/api/recipes/recipe-unknown`, route => route.fulfill({ status: 404, json: { message: 'Recipe recipe-unknown not found' } }));
    
    await page.route(`**/api/location-ingredient-costs?locationId=${locationId}`, route => route.fulfill({ json: mockLocationIngredientCosts }));
    await page.route(`**/api/inventory-stock?locationId=${locationId}`, route => route.fulfill({ json: mockInventoryStockLevels }));
    
    // Mock for InventoryMovementsList
    await page.route(`**/api/inventory-movements?locationId=${locationId}`, route => route.fulfill({ json: mockInventoryMovements }));

    // Common ingredient mocks for all lists
    for (const ingredientId in mockIngredients) {
        await page.route(`**/api/ingredients/${ingredientId}`, route => {
            if (mockIngredients[ingredientId]) route.fulfill({ json: mockIngredients[ingredientId] });
            else route.fulfill({ status: 404, json: { message: `Ingredient ${ingredientId} not found` } });
        });
    }
    // Specific mock for an ingredient that should fail to load in various rows
    await page.route(`**/api/ingredients/ing-error-fetch`, route => {
        route.fulfill({ status: 500, json: { message: 'Server error fetching ingredient ing-error-fetch' } });
    });

    await page.goto(baseUrl);
    await expect(page.getByTestId('location-detail-name')).toHaveText(mockLocation.name); 
  });

  test('renders location details and default Staff tab content', async ({ page }) => {
    await expect(page.getByTestId('location-detail-page')).toBeVisible();
    await expect(page.getByTestId('location-detail-title')).toHaveText('Location Details');
    await expect(page.getByTestId('location-detail-name')).toHaveText(mockLocation.name);
    await expect(page.getByTestId('location-detail-address')).toHaveText(mockLocation.address);

    const staffTab = page.getByTestId('tab-staff');
    await expect(staffTab).toHaveClass(/tab-active/);
    await expect(page.getByTestId('content-staff')).toBeVisible();
    await expect(page.getByTestId('staff-list-title')).toHaveText('Staff Members');
    for (const staff of mockStaffList) {
      await expect(page.getByTestId(`staff-name-${staff.id}`)).toHaveText(staff.name!);
      await expect(page.getByTestId(`staff-role-${staff.id}`)).toHaveText(staff.role!);
    }
  });

  test('switches to Menu Items tab and displays menu items correctly', async ({ page }) => {
    const menuItemsTab = page.getByTestId('tab-menu-items');
    await menuItemsTab.click();

    await expect(menuItemsTab).toHaveClass(/tab-active/);
    await expect(page.getByTestId('content-menu-items')).toBeVisible();
    await expect(page.getByTestId('menu-items-list-title')).toHaveText('Menu Items');
    await expect(page.getByRole('columnheader', { name: 'Recipe Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Price' })).toBeVisible();

    const row1 = page.getByTestId('menu-item-row-lmi-001');
    await expect(row1.getByTestId('menu-item-name-recipe-pizza-01').locator('a')).toHaveText(mockRecipes['recipe-pizza-01'].name);
    await expect(row1.getByTestId('menu-item-name-recipe-pizza-01').locator('a')).toHaveAttribute('href', `/recipes/recipe-pizza-01`);
    await expect(row1.getByTestId('menu-item-price-recipe-pizza-01')).toHaveText('12.99');
    
    const row3 = page.getByTestId('menu-item-row-lmi-003');
    await expect(row3.getByTestId('menu-item-name-recipe-unknown')).toHaveText('Error loading name');
    await expect(row3.getByTestId('menu-item-price-recipe-unknown')).toHaveText('9.00');
    await expect(page.getByTestId('content-staff')).not.toBeVisible();
  });
  
  test('switches to Ingredient Costs tab and displays ingredient costs correctly', async ({ page }) => {
    const ingredientCostsTab = page.getByTestId('tab-ingredient-costs');
    await ingredientCostsTab.click();

    await expect(ingredientCostsTab).toHaveClass(/tab-active/);
    await expect(page.getByTestId('content-ingredient-costs')).toBeVisible();
    await expect(page.getByTestId('loc-ingredient-costs-list-title')).toHaveText('Location-Specific Ingredient Costs');
    await expect(page.getByRole('columnheader', { name: 'Ingredient Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Cost Per Unit' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Unit' })).toBeVisible();

    const row1_ic = page.getByTestId('loc-ingredient-cost-row-lic-001');
    await expect(row1_ic.getByTestId('loc-ingredient-name-ing-flour-01')).toHaveText(mockIngredients['ing-flour-01'].name);
    await expect(row1_ic.getByTestId('loc-ingredient-cost-ing-flour-01')).toHaveText('1.50');
    await expect(row1_ic.getByTestId('loc-ingredient-unit-ing-flour-01')).toHaveText(mockIngredients['ing-flour-01'].unit);
    
    const row3_ic = page.getByTestId('loc-ingredient-cost-row-lic-003');
    await expect(row3_ic.getByTestId('loc-ingredient-name-ing-error-fetch')).toHaveText('Error loading name');
    await expect(row3_ic.getByTestId('loc-ingredient-cost-ing-error-fetch')).toHaveText('3.00');
    await expect(row3_ic.getByTestId('loc-ingredient-unit-ing-error-fetch')).toHaveText('N/A');
    await expect(page.getByTestId('content-menu-items')).not.toBeVisible();
  });

  test('switches to Inventory Stock tab and displays stock levels correctly', async ({ page }) => {
    const inventoryStockTab = page.getByTestId('tab-inventory-stock');
    await inventoryStockTab.click();

    await expect(inventoryStockTab).toHaveClass(/tab-active/);
    await expect(page.getByTestId('content-inventory-stock')).toBeVisible();
    await expect(page.getByTestId('loc-inventory-stock-list-title')).toHaveText('Inventory Stock Levels');
    await expect(page.getByRole('columnheader', { name: 'Ingredient Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Current Quantity' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Unit' })).toBeVisible();

    const row1_is = page.getByTestId('loc-inventory-stock-row-is-001');
    await expect(row1_is.getByTestId('loc-inventory-ingredient-name-ing-flour-01')).toHaveText(mockIngredients['ing-flour-01'].name);
    await expect(row1_is.getByTestId('loc-inventory-quantity-ing-flour-01')).toHaveText('75');
    await expect(row1_is.getByTestId('loc-inventory-unit-ing-flour-01')).toHaveText(mockIngredients['ing-flour-01'].unit);

    const row3_is = page.getByTestId('loc-inventory-stock-row-is-003');
    await expect(row3_is.getByTestId('loc-inventory-ingredient-name-ing-error-fetch')).toHaveText('Error loading name');
    await expect(row3_is.getByTestId('loc-inventory-quantity-ing-error-fetch')).toHaveText('10');
    await expect(row3_is.getByTestId('loc-inventory-unit-ing-error-fetch')).toHaveText('N/A');

    await expect(page.getByTestId('content-ingredient-costs')).not.toBeVisible();
  });
  
  test('switches to Inventory Movements tab and displays movements correctly', async ({ page }) => {
    const inventoryMovementsTab = page.getByTestId('tab-inventory-movements');
    await inventoryMovementsTab.click();

    await expect(inventoryMovementsTab).toHaveClass(/tab-active/);
    await expect(page.getByTestId('content-inventory-movements')).toBeVisible();
    await expect(page.getByTestId('loc-inventory-movements-list-title')).toHaveText('Inventory Movements');

    // Verify headers
    await expect(page.getByRole('columnheader', { name: 'Date' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Ingredient Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Type' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Quantity Change' })).toBeVisible();
    
    // Verify data for each movement
    const movement1 = mockInventoryMovements[0];
    const row1_im = page.getByTestId(`loc-inventory-movement-row-${movement1.id}`);
    await expect(row1_im.getByTestId(`loc-movement-date-${movement1.id}`)).toHaveText(format(new Date(movement1.createdAt!), 'PPpp'));
    await expect(row1_im.getByTestId(`loc-movement-ingredient-name-${movement1.ingredientId}`)).toHaveText(mockIngredients[movement1.ingredientId!].name);
    await expect(row1_im.getByTestId(`loc-movement-type-${movement1.id}`)).toHaveText(movement1.type!);
    await expect(row1_im.getByTestId(`loc-movement-quantity-${movement1.id}`)).toHaveText(movement1.quantityChange!.toString());

    const movement3 = mockInventoryMovements[2]; // Ingredient fetch error case
    const row3_im = page.getByTestId(`loc-inventory-movement-row-${movement3.id}`);
    await expect(row3_im.getByTestId(`loc-movement-ingredient-name-${movement3.ingredientId}`)).toHaveText('Error loading name');
    await expect(row3_im.getByTestId(`loc-movement-type-${movement3.id}`)).toHaveText(movement3.type!);

    await expect(page.getByTestId('content-inventory-stock')).not.toBeVisible();
  });

  test('shows loading state for main location details (illustrative)', async ({ page }) => {
    // Override route for this test only to simulate delay
    await page.route(`**/api/locations/${locationId}`, async (route) => {
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay
      await route.fulfill({ json: { data: mockLocation } });
    });
    
    await page.goto(baseUrl, { waitUntil: 'domcontentloaded' }); 
    await expect(page.getByTestId('location-detail-loading')).toBeVisible({ timeout: 300 }); 
    await expect(page.getByTestId('location-detail-name')).toHaveText(mockLocation.name); 
  });

  test('takes a screenshot of the page with Inventory Movements tab active', async ({ page, browserName }) => {
    const inventoryMovementsTab = page.getByTestId('tab-inventory-movements');
    await inventoryMovementsTab.click();
    await expect(page.getByTestId('loc-inventory-movements-list-title')).toBeVisible();
    // Wait for at least one row to be rendered from mock data
    await expect(page.getByTestId(`loc-inventory-movement-row-${mockInventoryMovements[0].id}`)).toBeVisible();

    await page.waitForLoadState('networkidle');

    const now = new Date();
    const timestamp = now.toISOString().replace(/[:.]/g, '-');
    await page.screenshot({
      path: `./screenshots/location-detail-inventory-movements-tab_${browserName}_${timestamp}.png`,
      fullPage: true,
    });
  });
});
