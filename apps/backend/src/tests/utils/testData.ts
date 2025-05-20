import { z } from 'zod';
// Import Zod schemas from your generated client package
import {
  // Ingredients
  createIngredientBody,
  listIngredientsResponseItem,
  updateIngredientBody,
  // Locations
  createLocationBody,
  listLocationsResponseItem,
  updateLocationBody,
  // Staff
  createStaffAtLocationBody,
  listStaffByLocationResponseItem,
  // Add other schemas as needed
  createInventoryMovementBody,
  listInventoryMovementsResponseItem,
  createInventoryStockBody,
  listInventoryStockResponseItem,
  updateInventoryStockBody,
  createLocationIngredientCostBody,
  listLocationIngredientCostsResponseItem,
  updateLocationIngredientCostBody,
  createLocationMenuItemBody,
  updateLocationMenuItemBody,
} from '@repo/zod-clients';

/** Generates valid test data for IngredientCreate body. */
export const generateValidIngredientCreate = (
  overrides: Partial<z.infer<typeof createIngredientBody>> = {}
): z.infer<typeof createIngredientBody> => ({
  name: 'Test Ingredient',
  unit: 'pcs',
  cost: 1.99,
  ...overrides,
});

/** Generates valid test data for a single Ingredient response item. */
export const generateValidIngredientResponse = (
  overrides: Partial<z.infer<typeof listIngredientsResponseItem>> = {}
): z.infer<typeof listIngredientsResponseItem> => ({
  id: `ingredient-${Date.now()}`,
  name: 'Ingredient Response',
  unit: 'kg',
  cost: 5.5,
  ...overrides,
});

/** Generates valid test data for IngredientUpdate body. */
export const generateValidIngredientUpdate = (
  overrides: Partial<z.infer<typeof updateIngredientBody>> = {}
): z.infer<typeof updateIngredientBody> => ({
  name: 'Updated Ingredient',
  unit: 'grams',
  ...overrides,
});

/** Generates valid test data for LocationCreate body. */
export const generateValidLocationCreate = (
  overrides: Partial<z.infer<typeof createLocationBody>> = {}
): z.infer<typeof createLocationBody> => ({
  name: 'Test Location',
  address: '1 Test St',
  ...overrides,
});

/** Generates valid test data for a single Location response item. */
export const generateValidLocationResponse = (
  overrides: Partial<z.infer<typeof listLocationsResponseItem>> = {}
): z.infer<typeof listLocationsResponseItem> => ({
  id: `location-${Date.now()}`,
  name: 'Location Response',
  address: '10 Response Ave',
  ...overrides,
});

/** Generates valid test data for LocationUpdate body. */
export const generateValidLocationUpdate = (
  overrides: Partial<z.infer<typeof updateLocationBody>> = {}
): z.infer<typeof updateLocationBody> => ({
  name: 'Updated Location Name',
  address: 'Updated Address',
  ...overrides,
});

/** Generates valid test data for StaffCreate body. */
export const generateValidStaffCreate = (
  overrides: Partial<z.infer<typeof createStaffAtLocationBody>> = {}
): z.infer<typeof createStaffAtLocationBody> => ({
  name: 'Test Staff',
  dob: '1990-01-01',
  role: 'Barista',
  iban: 'TESTIBAN123',
  bic: 'TESTBIC',
  ...overrides,
});

/** Generates valid test data for a single Staff response item. */
export const generateValidStaffResponse = (
  locationId: string,
  overrides: Partial<z.infer<typeof listStaffByLocationResponseItem>> = {}
): z.infer<typeof listStaffByLocationResponseItem> => ({
  id: `staff-${Date.now()}`,
  locationId,
  name: 'Staff Response',
  dob: '1995-05-15',
  role: 'Server',
  iban: 'RESPBAN456',
  bic: 'RESPBIC',
  ...overrides,
});

// Inventory Movements
export const generateValidInventoryMovementCreate = (
  overrides: Partial<z.infer<typeof createInventoryMovementBody>> = {}
): z.infer<typeof createInventoryMovementBody> => ({
  locationId: 'location-1',
  ingredientId: 'ingredient-1',
  quantity: 5,
  type: 'restock',
  notes: 'Restock',
  recordedByStaffId: 'staff-1',
  ...overrides,
});

export const generateValidInventoryMovementResponse = (
  overrides: Partial<z.infer<typeof listInventoryMovementsResponseItem>> = {}
): z.infer<typeof listInventoryMovementsResponseItem> => ({
  id: `movement-${Date.now()}`,
  locationId: 'location-1',
  ingredientId: 'ingredient-1',
  quantity: 5,
  type: 'restock',
  notes: 'Restock',
  createdAt: new Date().toISOString(),
  recordedByStaffId: 'staff-1',
  ingredient: {
    id: 'ingredient-1',
    name: 'Mock Ingredient',
    unit: 'kg',
  },
  unit: 'kg',
  costPerUnit: 10.0,
  ...overrides,
});

// Inventory Stock
export const generateValidInventoryStockCreate = (
  overrides: Partial<z.infer<typeof createInventoryStockBody>> = {}
): z.infer<typeof createInventoryStockBody> => ({
  locationId: 'location-1',
  ingredientId: 'ingredient-1',
  quantity: 10,
  ...overrides,
});

export const generateValidInventoryStockResponse = (
  overrides: Partial<z.infer<typeof listInventoryStockResponseItem>> = {}
): z.infer<typeof listInventoryStockResponseItem> => ({
  id: `stock-${Date.now()}`,
  locationId: 'location-1',
  ingredientId: 'ingredient-1',
  quantity: 10,
  updatedAt: new Date().toISOString(),
  ingredient: {
    id: 'ingredient-1',
    name: 'Mock Ingredient',
    unit: 'kg',
  },
  location: {
    id: 'location-1',
    name: 'Mock Location',
  },
  ...overrides,
});

export const generateValidInventoryStockUpdate = (
  overrides: Partial<z.infer<typeof updateInventoryStockBody>> = {}
): z.infer<typeof updateInventoryStockBody> => ({
  quantity: 15,
  ...overrides,
});

// Location Ingredient Costs
export const generateValidLocationIngredientCostCreate = (
  overrides: Partial<z.infer<typeof createLocationIngredientCostBody>> = {}
): z.infer<typeof createLocationIngredientCostBody> => ({
  ingredientId: 'ingredient-1',
  costPerUnit: 12.5,
  ...overrides,
});

export const generateValidLocationIngredientCostResponse = (
  overrides: Partial<
    z.infer<typeof listLocationIngredientCostsResponseItem>
  > = {}
): z.infer<typeof listLocationIngredientCostsResponseItem> => ({
  id: `cost-${Date.now()}`,
  locationId: 'location-1',
  ingredientId: 'ingredient-1',
  costPerUnit: 12.5,
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const generateValidLocationIngredientCostUpdate = (
  overrides: Partial<z.infer<typeof updateLocationIngredientCostBody>> = {}
): z.infer<typeof updateLocationIngredientCostBody> => ({
  costPerUnit: 15.0,
  ...overrides,
});

// Location Menu Items
export const generateValidLocationMenuItemCreate = (
  overrides: Partial<z.infer<typeof createLocationMenuItemBody>> = {}
): z.infer<typeof createLocationMenuItemBody> => ({
  recipeId: 'recipe-1',
  price: 17.99,
  modifierIds: ['modifier-1'],
  ...overrides,
});

export const generateValidLocationMenuItemResponse = (
  overrides: Partial<{
    id?: string;
    locationId?: string;
    recipeId?: string;
    price?: number;
    modifierIds?: string[] | null;
  }> = {}
) => ({
  id: `menu-item-${Date.now()}`,
  locationId: 'location-1',
  recipeId: 'recipe-1',
  price: 17.99,
  modifierIds: ['modifier-1'],
  ...overrides,
});

export const generateValidLocationMenuItemUpdate = (
  overrides: Partial<z.infer<typeof updateLocationMenuItemBody>> = {}
): z.infer<typeof updateLocationMenuItemBody> => ({
  price: 19.99,
  recipeId: 'recipe-2',
  modifierIds: ['modifier-2'],
  ...overrides,
});

// Add similar generators for other schemas as needed.
