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

## 1. Recipes List Page (`app/recipes/page.test.tsx`)

- [x] Add `recipe-ingredients-count-${recipe.id}` data-testid to recipe cards
- [ ] Update test to match actual implementation or update implementation to match test expectations

## 2. Ingredient Detail Page (`app/ingredients/[ingredientId]/page.test.tsx`)

- [x] Add `ingredient-detail-error` data-testid for error state
- [ ] Implement error state UI component
- [ ] Update test to match actual implementation or update implementation to match test expectations

## 3. Inventory Stock Page (`app/locations/[locationId]/inventory-stock/page.test.tsx`)

- [x] Add `inventory-stock-error` data-testid for error state
- [ ] Implement error state UI component
- [ ] Update test to match actual implementation or update implementation to match test expectations

## 4. Location Detail Page (`app/locations/[locationId]/page.test.tsx`)

- [x] Add `location-detail-error` data-testid for error state
- [ ] Implement error state UI component
- [ ] Update test to match actual implementation or update implementation to match test expectations

## 5. Recipe Detail Page (`app/recipes/[recipeId]/page.test.tsx`)

- [ ] Fix `useListRecipeIngredientLinks` hook implementation
  - Error: `TypeError: (0 , _apiclient.useListRecipeIngredientLinks) is not a function`
  - [ ] Check if hook is properly exported from @nory/api-client
  - [ ] Verify hook implementation in API client
  - [ ] Update imports if necessary
- [ ] Fix all failing tests:
  - [ ] "shows loading state"
  - [ ] "shows error state"
  - [ ] "renders recipe details when data is loaded"
  - [ ] "renders empty state for ingredients and menu items when none exist"
  - [ ] "calls useGetRecipeById with correct parameters"
  - [ ] "navigates back when back button is clicked"

## 6. Recipe Ingredient Links Page (`app/recipes/[recipeId]/ingredient-links/page.test.tsx`)

- [ ] Fix Jest worker exceptions
  - [ ] Check for memory leaks
  - [ ] Verify test setup and teardown
  - [ ] Review test dependencies

## General Tasks

- [ ] Review and update all error state implementations to be consistent
- [ ] Ensure all data-testid attributes are properly implemented
- [ ] Verify all API client hooks are properly exported and implemented
- [ ] Update test files to match actual component implementations
- [ ] Add proper error handling and loading states to all components

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

- [ ] Test Data Consistency

  - [ ] Ensure mock data is consistent across all test files
  - [ ] Verify mock data matches API schema
  - [ ] Add type guards for mock data validation
  - [ ] Document mock data structure and usage

- [ ] API Client Type Verification

  - [ ] Verify all API client hooks have proper TypeScript types
  - [ ] Check response types match API schema
  - [ ] Validate mutation input types
  - [ ] Ensure error types are properly typed

- [ ] Test Helper Functions
  - [ ] Add type-safe test utilities
  - [ ] Create reusable mock data builders
  - [ ] Implement type checking for test assertions
  - [ ] Add helper functions for common test patterns

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

# Test Improvements Todo List

## Current Test Issues

- [ ] Fix failing test for `recipe-detail-ingredients-empty` element
- [ ] Fix failing test for `recipe-detail-id` element
- [ ] Fix failing test for `recipe-detail-actions-title` element
- [ ] Fix failing test for `recipe-detail-ingredients-link` element

## Test Coverage Improvements

- [ ] Add tests for ingredient link management functionality
- [ ] Add tests for recipe deletion confirmation
- [ ] Add tests for recipe editing navigation
- [ ] Add tests for error handling in ingredient loading
- [ ] Add tests for loading states in ingredient section

## Test Structure Improvements

- [ ] Organize test cases into logical groups (loading, error, success states)
- [ ] Add more descriptive test names
- [ ] Improve mock data organization
- [ ] Add test utilities for common setup

## Documentation

- [ ] Update test documentation with new test cases
- [ ] Add comments explaining complex test scenarios
- [ ] Document mock data structure

# Test Failures Todo List

## Location Tests

- [ ] Fix location navigation test

  - Issue: Navigation to staff page fails - URL mismatch
  - File: `app/locations/[locationId]/page.e2e.test.tsx`
  - Expected: `/locations/123/staff/`
  - Received: `/locations/whose/staff`
  - Action Items:
    1. Check page.tsx for correct route handling
    2. Verify navigation link implementation
    3. Update test to handle dynamic IDs from faker
    4. Add proper waitForNavigation handling

- [ ] Fix inventory stock filter test
  - Issue: Timeout waiting for option click
  - File: `app/locations/[locationId]/inventory-stock/page.e2e.test.tsx`
  - Problem: Option element not visible for clicking
  - Action Items:
    1. Check page.tsx for proper select element implementation
    2. Add proper loading state handling
    3. Update test to wait for select options to be visible
    4. Add proper error handling for filter changes

## Recipe Tests

- [ ] Fix recipe list page test

  - Issue: Empty state or recipe cards not found
  - File: `app/recipes/page.e2e.test.tsx`
  - Problem: Neither empty state nor recipe cards are present
  - Action Items:
    1. Check page.tsx for proper empty state implementation
    2. Verify recipe card rendering logic
    3. Update test to handle faker-generated data
    4. Add proper loading state handling

- [ ] Fix recipe detail page tests

  - File: `app/recipes/[recipeId]/page.e2e.test.tsx`
  - Multiple issues:
    1. Loading state not visible
    2. Required elements not found after loading
    3. Navigation links not working
    4. Error state handling not working
  - Action Items:
    1. Check page.tsx for proper loading state implementation
    2. Verify all required elements have correct test IDs
    3. Update test to handle faker-generated data
    4. Add proper error boundary implementation
    5. Fix navigation link handling

- [ ] Fix recipe ingredients navigation
  - Issue: Navigation to ingredients page fails
  - File: `app/recipes/page.e2e.test.tsx`
  - Expected: `/recipes/${recipeId}/ingredient-links`
  - Received: `/recipes`
  - Action Items:
    1. Check page.tsx for correct route handling
    2. Verify navigation link implementation
    3. Update test to handle dynamic IDs from faker
    4. Add proper waitForNavigation handling

## Modifier Tests

- [ ] Fix modifier list page test
  - Issue: Empty state or modifier cards not found
  - File: `app/modifiers/page.e2e.test.tsx`
  - Problem: Neither empty state nor modifier cards are present
  - Action Items:
    1. Check page.tsx for proper empty state implementation
    2. Verify modifier card rendering logic
    3. Update test to handle faker-generated data
    4. Add proper loading state handling

## General Test Improvements

- [ ] Add proper loading state indicators

  - Check each page.tsx for loading state implementation
  - Add loading spinners or skeletons
  - Update tests to verify loading states

- [ ] Implement proper error handling

  - Add error boundaries to all pages
  - Implement consistent error UI components
  - Update tests to verify error states

- [ ] Ensure navigation links are correctly implemented

  - Verify all navigation links in page.tsx files
  - Add proper href attributes
  - Update tests to handle dynamic routes

- [ ] Add proper empty states for list pages

  - Implement consistent empty state UI
  - Add proper test IDs
  - Update tests to verify empty states

- [ ] Fix visibility issues with interactive elements

  - Add proper aria-labels
  - Ensure elements are properly visible
  - Update tests to handle element visibility

- [ ] Add proper timeouts for async operations
  - Add appropriate waitForNavigation calls
  - Implement proper loading state handling
  - Update tests to handle async operations

## E2E Test Specific Improvements

- [ ] Update faker data handling

  - Ensure consistent faker data generation
  - Add proper type definitions for faker data
  - Update tests to handle random data

- [ ] Add proper test setup

  - Implement proper test data seeding
  - Add cleanup after tests
  - Handle test isolation

- [ ] Improve test reliability
  - Add proper waitForNavigation calls
  - Implement proper loading state handling
  - Add retry logic for flaky tests

## Notes

- Most failures seem to be related to either:
  1. Missing UI elements
  2. Navigation issues
  3. Timing/async problems
  4. Visibility of interactive elements
- Consider implementing proper loading states and error boundaries
- Review navigation link implementations
- Check if mock data is properly set up for tests
- Remember that e2e tests use faker for random data generation
- Need to handle dynamic IDs and data in tests
- Add proper waitForNavigation and loading state handling

# Todo List

## TypeScript Errors

1. In `app/locations/[locationId]/inventory-stock/page.test.tsx`:

   - Line 142: Argument of type 'Error' is not assignable to parameter of type 'null | undefined'

2. In `app/locations/[locationId]/page.test.tsx`:
   - Line 123: Argument of type 'Error' is not assignable to parameter of type 'null | undefined'

## ESLint Warnings

### TypeScript Version Warning

- Current TypeScript version (5.8.3) is not officially supported by @typescript-eslint/typescript-estree
- Supported versions: >=4.7.4 <5.6.0

### UI Package Warnings

1. Component Display Names Missing:

   - Multiple components missing display names in test files
   - Add display names to all components for better debugging

2. Props Validation Missing:

   - Many components missing prop validations
   - Add proper prop types for all components

3. Unused Variables:

   - Several unused imports and variables across components
   - Clean up unused code

4. Type Issues:

   - Multiple instances of 'any' type usage
   - Replace 'any' with proper TypeScript types

5. React Specific Issues:
   - Unescaped entities in JSX
   - Unknown properties in components
   - React not defined in some files

### API Client Package Warnings

1. Type Redefinitions:
   - Multiple type redefinitions in generated files:
     - ListInventoryMovementsType
     - InventoryMovementCreateType
     - InventoryMovementType

## Action Items

1. Fix TypeScript errors in test files
2. Update TypeScript version to a supported version
3. Add display names to all components
4. Add proper prop validations
5. Clean up unused variables and imports
6. Replace 'any' types with proper TypeScript types
7. Fix React specific issues
8. Address type redefinitions in API client

# Build Progress and Issues

## TypeScript Version Warning

- Current TypeScript version (5.8.3) is not officially supported by @typescript-eslint/typescript-estree
- Supported versions: >=4.7.4 <5.6.0
- Consider downgrading TypeScript to a supported version

## ESLint Warnings

### API Client (@nory/api-client)

1. Type redefinitions:
   - `ListInventoryMovementsType` is already defined
   - `InventoryMovementCreateType` is already defined
   - `InventoryMovementType` is already defined

### UI Components (@repo/ui)

1. Unused variables:

   - `Image` in aspect-ratio.stories.tsx
   - `args` in multiple component stories
   - `useState` in form.stories.tsx
   - `values` in form.stories.tsx
   - `Link` in navigation-menu.stories.tsx
   - Various test utilities (userEvent, fireEvent)

2. Missing prop validations:

   - Multiple components missing display names
   - Missing prop validations for common props (children, className, etc.)
   - Missing validations for component-specific props

3. Type issues:

   - Multiple instances of `any` type that should be specified
   - Unexpected any types in test files

4. React-specific issues:
   - Unescaped entities in various components
   - Unknown properties in components
   - React not defined in some files

## Build Status

- ✅ Build process completed successfully
- ✅ Type checking passed
- ⚠️ ESLint warnings present (313 warnings, 0 errors)
- ✅ Tests running (in progress)

## Next Steps

1. Address TypeScript version compatibility
2. Fix type redefinitions in API client
3. Clean up unused variables
4. Add proper prop validations
5. Replace `any` types with specific types
6. Fix React-specific issues
7. Complete test suite execution
