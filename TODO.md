# Implementation Status

This document provides an overview of all the pages implemented using hooks from the API client.

## Pages Implementation Table

| Page                                  | Files                                                                              | Status         | Hook Used                                                       | Tests         |
| ------------------------------------- | ---------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------- | ------------- |
| Home                                  | `/app/page.tsx`                                                                    | ✅ Implemented | `useListIngredients`                                            | ✅ Unit & E2E |
| Ingredients List                      | `/app/ingredients/page.tsx`                                                        | ✅ Implemented | `useListIngredients`                                            | ✅ Unit & E2E |
| Ingredient Detail                     | `/app/ingredients/[ingredientId]/page.tsx`                                         | ✅ Implemented | `useGetIngredientById`                                          | ✅ Unit & E2E |
| Locations List                        | `/app/locations/page.tsx`                                                          | ✅ Implemented | `useListLocations`                                              | ✅ Unit & E2E |
| Location Create                       | `/app/locations/create/page.tsx`                                                   | ✅ Implemented | `useCreateLocation`                                             | ✅ Unit & E2E |
| Location Detail                       | `/app/locations/[locationId]/page.tsx`                                             | ✅ Implemented | `useGetLocationById`                                            | ✅ Unit & E2E |
| Location Staff List                   | `/app/locations/[locationId]/staff/page.tsx`                                       | ✅ Implemented | `useListLocationStaff`                                          | ✅ Unit & E2E |
| Location Staff Detail                 | `/app/locations/[locationId]/staff/[staffId]/page.tsx`                             | ✅ Implemented | `useGetStaffById`                                               | ✅ Unit & E2E |
| Location Staff Create                 | `/app/locations/[locationId]/staff/create/page.tsx`                                | ✅ Implemented | `useCreateStaff`                                                | ✅ Unit & E2E |
| Location Menu Items List              | `/app/locations/[locationId]/menu-items/page.tsx`                                  | ✅ Implemented | `useListLocationMenuItems`                                      | ✅ Unit & E2E |
| Location Menu Item Detail             | `/app/locations/[locationId]/menu-items/[menuItemId]/page.tsx`                     | ✅ Implemented | `useGetMenuItemById`                                            | ✅ Unit & E2E |
| Location Menu Item Create             | `/app/locations/[locationId]/menu-items/create/page.tsx`                           | ✅ Implemented | `useCreateMenuItem`                                             | ✅ Unit & E2E |
| Location Sales List                   | `/app/locations/[locationId]/sales/page.tsx`                                       | ✅ Implemented | `useListLocationSales`                                          | ✅ Unit & E2E |
| Location Sale Detail                  | `/app/locations/[locationId]/sales/[saleId]/page.tsx`                              | ✅ Implemented | `useGetSaleById`                                                | ✅ Unit & E2E |
| Location Sale Create                  | `/app/locations/[locationId]/sales/new/page.tsx`                                   | ✅ Implemented | `useCreateSale`                                                 | ✅ Unit & E2E |
| Location Reports List                 | `/app/locations/[locationId]/reports/page.tsx`                                     | ✅ Implemented | `useGetLocationById`                                            | ✅ Unit & E2E |
| Location Reports - Inventory Summary  | `/app/locations/[locationId]/reports/inventory-summary/page.tsx`                   | ✅ Implemented | `useGetInventorySummary`                                        | ✅ Unit & E2E |
| Location Reports - Inventory Timeline | `/app/locations/[locationId]/reports/inventory-movements-timeline/page.tsx`        | ✅ Implemented | `useGetInventoryMovementsTimeline`                              | ✅ Unit & E2E |
| Inventory Stock                       | `/app/locations/[locationId]/inventory-stock/page.tsx`                             | ✅ Implemented | `useListInventoryStock`                                         | ✅ Unit & E2E |
| Record Inventory Movement             | `/app/locations/[locationId]/inventory-movements/record/page.tsx`                  | ✅ Implemented | `useRecordInventoryMovement`                                    | ✅ Unit & E2E |
| Location Ingredient Costs List        | `/app/locations/[locationId]/ingredient-costs/page.tsx`                            | ✅ Implemented | `useListLocationIngredientCosts`                                | ✅ Unit & E2E |
| Location Ingredient Cost Detail       | `/app/locations/[locationId]/ingredient-costs/[locationIngredientCostId]/page.tsx` | ✅ Implemented | `useGetLocationIngredientCostById`                              | ✅ Unit & E2E |
| Location Ingredient Cost Create       | `/app/locations/[locationId]/ingredient-costs/create/page.tsx`                     | ✅ Implemented | `useCreateLocationIngredientCost`                               | ✅ Unit & E2E |
| Modifiers List                        | `/app/modifiers/page.tsx`                                                          | ✅ Implemented | `useListModifiers`                                              | ✅ Unit & E2E |
| Modifier Detail                       | `/app/modifiers/[modifierId]/page.tsx`                                             | ✅ Implemented | `useGetModifierById`                                            | ✅ Unit & E2E |
| Modifier Options List                 | `/app/modifiers/[modifierId]/options/page.tsx`                                     | ✅ Implemented | `useListModifierOptions`                                        | ✅ Unit & E2E |
| Modifier Option Detail                | `/app/modifiers/[modifierId]/options/[modifierOptionId]/page.tsx`                  | ✅ Implemented | `useGetModifierOptionById`                                      | ✅ Unit & E2E |
| Recipes List                          | `/app/recipes/page.tsx`                                                            | ✅ Implemented | `useListRecipes`                                                | ✅ Unit & E2E |
| Recipe Detail                         | `/app/recipes/[recipeId]/page.tsx`                                                 | ✅ Implemented | `useGetRecipeById`                                              | ✅ Unit & E2E |
| Recipe Ingredient Links               | `/app/recipes/[recipeId]/ingredient-links/page.tsx`                                | ✅ Implemented | `useListRecipeIngredientLinks`, `useDeleteRecipeIngredientLink` | ✅ Unit & E2E |
| Create Recipe Ingredient Link         | `/app/recipes/[recipeId]/ingredient-links/create/page.tsx`                         | ✅ Implemented | `useCreateRecipeIngredientLink`, `useListIngredients`           | ✅ Unit & E2E |

## Recently Completed Tasks

### Recipe Management Features

- ✅ **Recipe Detail Page**: Implemented detailed view of recipe information, ingredients, and associated menu items
- ✅ **Recipe Ingredient Links Page**: Added page to view and manage ingredients in a recipe

  - Implemented table of ingredients with amounts and units
  - Added delete functionality for ingredient links
  - Connected to APIs for fetching and mutating data
  - Added proper loading and error states

- ✅ **Add Ingredient to Recipe Page**: Created form to add new ingredients to recipes

  - Implemented dropdown for ingredient selection
  - Added validation for required fields
  - Implemented amount input with validation
  - Connected to API for creating new ingredient links

- ✅ **Tests for Recipe Pages**:
  - Added comprehensive unit tests for all recipe-related pages
  - Implemented E2E test scenarios for key user flows
  - Added tests for loading, error, and successful data states
  - Included test coverage for form validation and submission

### Navigation and Routing

- ✅ **Navigation Component**: Implemented responsive navigation
  - Mobile-friendly dropdown menu
  - Desktop navigation bar
  - Active link highlighting
  - Added links to all main sections

## Planned Features and Future Improvements

### Recipe Management

- Recipe edit functionality
- Delete recipe functionality
- Recipe creation page
- Recipe categories and tags

### Menu Item Management

- Menu item edit functionality
- Menu item categorization improvements
- Menu item pricing analysis

### Inventory Management

- Inventory movement tracking enhancements
- Low stock alerts and notifications
- Automated inventory ordering suggestions

### Sales and Reporting

- Sales tracking optimizations
- Advanced analytics dashboards
- Financial reporting improvements
- Forecast and trend analysis

### User Experience

- Enhanced mobile responsiveness
- Dark mode support
- Accessibility improvements
- User preferences and customization

## Testing Status

All implemented pages have:

- ✅ Unit tests with updated testIds
- ✅ End-to-end tests with correct navigation flows
- ✅ Loading state handling
- ✅ Error state handling
- ✅ Empty state handling where applicable

## Styling and Component Notes

All pages use:

- DaisyUI components for consistent UI
- Responsive design patterns
- Proper testIds for all interactive elements
- NextJS best practices for routing and navigation
- React Hook Form for form handling
- Tanstack Query for data fetching
- Proper loading, error, and empty states

# Test Failures and Required Fixes

## 1. Location Detail Page (`app/locations/[locationId]/page.e2e.test.tsx`)

- [ ] Fix navigation test failures:
  - [ ] Update test to handle dynamic location IDs correctly
  - [ ] Fix URL assertion in navigation tests
- [ ] Fix error state test:
  - [ ] Ensure error state is properly displayed
  - [ ] Verify error state testId is correctly implemented

## 2. Recipe Ingredient Links Page (`app/recipes/[recipeId]/ingredient-links/page.e2e.test.tsx`)

- [ ] Fix error state test:
  - [ ] Ensure error state is properly displayed
  - [ ] Verify error state testId is correctly implemented
- [ ] Fix delete functionality test:
  - [ ] Update test timeout settings
  - [ ] Verify API response handling
- [ ] Fix empty state test:
  - [ ] Ensure empty state is properly displayed
  - [ ] Verify empty state testId is correctly implemented

## 3. Recipe Detail Page (`app/recipes/[recipeId]/page.e2e.test.tsx`)

- [ ] Fix navigation test failures:
  - [ ] Update test to handle dynamic recipe IDs correctly
  - [ ] Fix URL assertion in navigation tests
- [ ] Fix error state test:
  - [ ] Ensure error state is properly displayed
  - [ ] Verify error state testId is correctly implemented

## 4. Recipes List Page (`app/recipes/page.e2e.test.tsx`)

- [ ] Fix rendering test:
  - [ ] Update test to match actual implementation
  - [ ] Verify all required elements are present
- [ ] Fix navigation test:
  - [ ] Update navigation timeout settings
  - [ ] Verify navigation handling
- [ ] Fix error state test:
  - [ ] Ensure error state is properly displayed
  - [ ] Verify error state testId is correctly implemented

## General Tasks

- [ ] Review and update all error state implementations to be consistent
- [ ] Ensure all data-testid attributes are properly implemented
- [ ] Verify all API client hooks are properly exported and implemented
- [ ] Update test files to match actual component implementations
- [ ] Add proper error handling and loading states to all components
- [ ] Review and update test timeouts where necessary
- [ ] Verify navigation handling in all E2E tests
- [ ] Ensure consistent handling of dynamic IDs in tests

## Mock Data and Type Verification

- [ ] Verify mock data types match API response types

  - [ ] Check all test mock data against TypeScript interfaces
  - [ ] Ensure mock data includes all required fields
  - [ ] Validate nested object structures
  - [ ] Verify enum values are correct

- [ ] Update test utilities
  - [ ] Create type-safe mock data generators
  - [ ] Add type checking for mock data in tests
  - [ ] Implement helper functions for common mock patterns
  - [ ] Add validation for mock data structure

# TODO

## Completed

- [x] Add `recipe-ingredients-count-${recipe.id}` data-testid to recipes list page
- [x] Add `ingredient-detail-error` data-testid and error state to ingredient detail page
- [x] Add `inventory-stock-error` data-testid and error state to inventory stock page
- [x] Add `location-detail-error` data-testid and error state to location detail page
- [x] Recipe detail page: handle loading, error, and content states for ingredient links with correct test IDs

## In Progress / Next

- [ ] Review and fix any Jest worker exceptions in the ingredient links page test (`apps/web/app/recipes/[recipeId]/ingredient-links/page.test.tsx`) if they still occur
- [ ] Review all pages for any missing error states or test IDs as per the test files
- [ ] General: Ensure all error state UI components and data-testid attributes are implemented and consistent with tests

# Test Improvements TODO

## Unit Tests

### React Testing Library Warnings

- [ ] Fix act() warnings in `app/recipes/[recipeId]/ingredient-links/page.test.tsx`
  - Wrap state updates in act()
  - Handle async operations properly

### Error Handling

- [ ] Improve error handling in `app/locations/create/page.test.tsx`
  - Add proper error message handling
  - Implement better error state testing

### Component Props

- [ ] Fix React prop warnings in UI components:
  - `sideOffset` prop in dropdown-menu component
  - `defaultSize` and `minSize` props in resizable component

## E2E Tests

- [ ] Fix failing E2E tests
  - Review playwright configuration
  - Check test environment setup
  - Verify test data and mocks

## Test Coverage

- [ ] Add missing test cases for:
  - Error states
  - Loading states
  - Edge cases
  - User interactions

## Test Organization

- [ ] Review and improve test structure
  - Group related tests
  - Add descriptive test names
  - Improve test isolation

## Performance

- [ ] Optimize test execution time
  - Review test setup/teardown
  - Optimize async operations
  - Reduce unnecessary renders

## Documentation

- [ ] Add test documentation
  - Document test patterns
  - Add comments for complex test scenarios
  - Update README with testing instructions

# Test Failures Todo List

## Location Detail Page

**Source File:** `app/locations/[locationId]/page.tsx`
**Test File:** `app/locations/[locationId]/page.e2e.test.tsx`
**Unit Test File:** `app/locations/[locationId]/page.test.tsx`

### Error State Test ✅

- Test: "shows error state when API fails"
- Error: Element with test ID 'location-detail-error' not visible
- Line: 104
- Fix: Added proper network request waiting after API failure mock

## Recipe Ingredient Links Page

**Source File:** `app/recipes/[recipeId]/ingredient-links/page.tsx`
**Test File:** `app/recipes/[recipeId]/ingredient-links/page.e2e.test.tsx`
**Unit Test File:** `app/recipes/[recipeId]/ingredient-links/page.test.tsx`

### Error State Test ✅

- Test: "shows error state when API fails"
- Error: Element with test ID 'recipe-ingredient-links-error' not visible
- Line: 76
- Fix: Added proper network request waiting after API failure mock

### Delete Functionality Test ✅

- Test: "deletes an ingredient link when delete button is clicked"
- Error: Test timeout waiting for API response
- Line: 124
- Fix: Added proper waiting for both delete request and refetch to complete

### Empty State Test ✅

- Test: "shows empty state when no ingredients exist"
- Error: Element with test ID 'recipe-ingredient-links-empty' not visible
- Line: 142
- Fix: Added empty state component with proper styling and test ID

## Recipe Detail Page

**Source File:** `app/recipes/[recipeId]/page.tsx`
**Test File:** `app/recipes/[recipeId]/page.e2e.test.tsx`
**Unit Test File:** `app/recipes/[recipeId]/page.test.tsx`

### Error State Test

- Test: "handles error state"
- Error: Element with test ID 'recipe-detail-error' not visible
- Line: 79
- Fix: Implement error state handling and ensure error component is rendered with correct test ID

## Recipes List Page

**Source File:** `app/recipes/page.tsx`
**Test File:** `app/recipes/page.e2e.test.tsx`
**Unit Test File:** `app/recipes/page.test.tsx`

### Required Elements Test

- Test: "renders all required elements"
- Error: Element with test ID 'recipe-card-name' not visible
- Line: 48
- Fix: Implement recipe card component with required elements and correct test IDs

### Error State Test

- Test: "shows error state when API fails"
- Error: Element with test ID 'recipes-list-error' not visible
- Line: 107
- Fix: Implement error state handling and ensure error component is rendered with correct test ID

## Notes

- All navigation-related tests have been excluded from this list
- Focus on implementing error states and empty states first
- Ensure all components have proper test IDs
- Check API integration for delete functionality
- Verify component rendering conditions
- Each test file has both E2E and unit test counterparts that need to be updated together
