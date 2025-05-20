Implement tests for all Controllers and services

---

# Backend Test Coverage & Progress

## Controllers (all have tests)

- [x] StaffController
- [x] RecipesController
- [x] RecipeIngredientLinksController
- [x] ModifiersController
- [x] MenuItemsController
- [x] LocationsController
- [x] LocationMenuItemsController
- [x] LocationIngredientCostsController
- [x] InventoryStockController
- [x] InventoryMovementsController
- [x] ModifierOptionsController
- [x] IngredientsController

## Services (all have tests)

- [x] StaffService
- [x] ModifierOptionsService
- [x] ModifiersService
- [x] RecipeIngredientLinksService
- [x] RecipesService
- [x] InventoryStockService
- [x] LocationIngredientCostsService
- [x] LocationMenuItemsService
- [x] LocationsService
- [x] IngredientsService
- [x] InventoryMovementsService

## Test Status

- All unit tests for controllers and services are present and passing.
- No missing test files for any controller or service.
- No lint or build errors in backend.

## Test ID Validation

- All e2e and unit tests in the backend do not use data-testid (as expected, since backend is API-only).
- All frontend e2e tests validate test ids as required (see frontend for details).

## Next Steps

- [x] Validate all backend tests (done)
- [x] Validate all backend lint/build (done)
- [x] Validate all backend test coverage (done)
- [ ] Commit and push if everything is working

## Commands Used

- pnpm --filter=./apps/backend lint
- pnpm --filter=./apps/backend build
- pnpm --filter=./apps/backend test:unit

## Next Command

- Commit and push changes if all checks are green.
