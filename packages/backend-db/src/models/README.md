# Database Models

This directory contains all the database models for interacting with the Supabase PostgreSQL database. Each model extends the `BaseModel` class and provides type-safe methods for common database operations.

## Base Model

The `BaseModel` class provides the following common operations for all models:

- `findById(id: string)`: Find a record by its ID
- `findAll()`: Get all records
- `create(record: Insert)`: Create a new record
- `update(id: string, record: Update)`: Update an existing record
- `delete(id: string)`: Delete a record

## Available Models

### Location

- `findByName(name: string)`: Find a location by name
- `findWithStaff(id: string)`: Get location with associated staff
- `findWithMenuItems(id: string)`: Get location with menu items and recipes
- `findWithInventory(id: string)`: Get location with inventory stock and ingredients

### Ingredient

- `findByName(name: string)`: Find an ingredient by name
- `findWithRecipes(id: string)`: Get ingredient with associated recipes
- `findWithLocations(id: string)`: Get ingredient with location costs and stock
- `findWithMovements(id: string)`: Get ingredient with inventory movements

### Staff

- `findByLocation(locationId: string)`: Find staff members by location
- `findWithLocation(id: string)`: Get staff member with location details
- `findWithMovements(id: string)`: Get staff member with recorded inventory movements

### Recipe

- `findByName(name: string)`: Find a recipe by name
- `findWithIngredients(id: string)`: Get recipe with ingredient details
- `findWithLocations(id: string)`: Get recipe with location menu items

### Modifier

- `findByName(name: string)`: Find a modifier by name
- `findWithOptions(id: string)`: Get modifier with its options
- `findWithMenuItems(id: string)`: Get modifier with associated menu items

### ModifierOption

- `findByModifier(modifierId: string)`: Find options by modifier
- `findWithModifier(id: string)`: Get option with modifier details

### LocationMenuItem

- `findByLocation(locationId: string)`: Find menu items by location
- `findByRecipe(recipeId: string)`: Find menu items by recipe
- `findWithDetails(id: string)`: Get menu item with full details

### LocationIngredientCost

- `findByLocation(locationId: string)`: Find costs by location
- `findByIngredient(ingredientId: string)`: Find costs by ingredient
- `findWithDetails(id: string)`: Get cost with location and ingredient details

### InventoryStock

- `findByLocation(locationId: string)`: Find stock by location
- `findByIngredient(ingredientId: string)`: Find stock by ingredient
- `findWithDetails(id: string)`: Get stock with location and ingredient details
- `updateStock(id: string, quantityChange: number)`: Update stock quantity

### InventoryMovement

- `findByLocation(locationId: string)`: Find movements by location
- `findByIngredient(ingredientId: string)`: Find movements by ingredient
- `findByStaff(staffId: string)`: Find movements by staff member
- `findWithDetails(id: string)`: Get movement with full details
- `findByType(type: InventoryMovementType)`: Find movements by type

## Usage Example

```typescript
import { createClient } from '@supabase/supabase-js';
import { Location, Ingredient } from './models';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!
);

// Create model instances
const locationModel = new Location(supabase);
const ingredientModel = new Ingredient(supabase);

// Use the models
async function example() {
  // Find a location
  const location = await locationModel.findByName('Main Restaurant');

  // Get location's inventory
  const inventory = await locationModel.findWithInventory(location.id);

  // Find an ingredient
  const ingredient = await ingredientModel.findByName('Salt');

  // Get ingredient's stock across locations
  const stock = await ingredientModel.findWithLocations(ingredient.id);
}
```

## Type Safety

All models are fully type-safe using Supabase's generated types. The types ensure:

- Correct table names and column names
- Proper data types for all fields
- Type-safe relationships between tables
- Proper handling of nullable fields
- Type-safe enum values for special fields

## Error Handling

All model methods throw errors when database operations fail. It's recommended to use try-catch blocks when calling these methods:

```typescript
try {
  const location = await locationModel.findByName('Main Restaurant');
} catch (error) {
  console.error('Failed to find location:', error);
}
```
