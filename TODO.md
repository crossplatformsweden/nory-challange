# PLAN & PROGRESS (auto-updated)

## Current Step

- Fix @repo/ui build errors related to the 'ref' prop in hover-card and popover components.
- Ensure all test ids are present and correct in all failing test files (hover-card, popover, menubar, input-otp, radio-group, collapsible, chart, hover-card).
- After fixing, run `pnpm build --filter=@repo/ui` and then `pnpm test --filter=@repo/ui` to verify.
- Update TODO.md with progress after each fix.

## Next pnpm Command

- `pnpm build --filter=@repo/ui`
- If build passes, then: `pnpm test --filter=@repo/ui`

## Last Run Results

- TypeScript error in `apps/web/playwright.config.ts` is now fixed and type check passes.
- All package and backend builds, lint, and type checks are green except for @repo/ui (see below for details).
- Outstanding issues: Errors in @repo/ui (see below), then unit test failures in `apps/web`.

**Current Blocker:**

- Jest import error in `apps/backend/src/tests/dummy.test.ts` (SyntaxError: Cannot use import statement outside a module)
- Next: Run `pnpm test` in apps/backend after fixing the import error.

### @repo/ui Errors (from build-test-result.txt)

- Lint: No errors reported.
- Build: No errors reported.
- Test: Several test failures due to missing modules and a failing test in command.test.tsx (see build-test-result.txt for details).

#### Failing Test Files in @repo/ui:

- `src/components/command/command.test.tsx` (role "combobox" not found)
- `src/components/popover/popover.test.tsx` (Cannot find module './popover')
- `src/components/menubar/menubar.test.tsx` (Cannot find module './menubar')
- `src/components/input-otp/input-otp.test.tsx` (Cannot find module './input-otp')
- `src/components/radio-group/radio-group.test.tsx` (Cannot find module './radio-group')
- `src/components/collapsible/collapsible.test.tsx` (Cannot find module './collapsible')
- `src/components/chart/chart.test.tsx` (Cannot find module './chart')
- `src/components/hover-card/hover-card.test.tsx` (Cannot find module './hover-card')

#### Commands to Run in @repo/ui:

- `pnpm lint` (in packages/ui)
- `pnpm build` (in packages/ui)
- `pnpm test` (in packages/ui)

## Next Steps

1. Work through errors in @repo/ui:
   - Run lint, build, and test in order.
   - For each test file listed above:
     - Fix the test, ensuring:
       - All mock data is typed.
       - All test IDs are correct and validated.
   - After each fix, update TODO.md with progress.
2. After all @repo/ui errors are fixed, return to unit test failures in apps/web.
3. Only after all unit tests pass, run e2e tests.

# Progress

- [x] Fix TS2571 errors in backend controllers
- [x] Backend builds successfully
- [x] TypeScript error in apps/web/playwright.config.ts fixed
- [x] All @repo/ui tests pass
- [ ] All unit tests in apps/web pass
- [ ] All e2e tests pass

# Commands to Run

- (Now) @repo/ui:
  - `cd packages/ui && pnpm lint`
  - `cd packages/ui && pnpm build`
  - `cd packages/ui && pnpm test`
- (Next) Unit tests (from `apps/web`):
  - `pnpm test:unit "app/locations/[locationId]/reports/inventory-movements-timeline/page.test.tsx"`
  - `pnpm test:unit "app/locations/[locationId]/ingredient-costs/create/page.test.tsx"`
  - `pnpm test:unit "app/locations/[locationId]/staff/page.test.tsx"`
  - `pnpm test:unit "app/locations/[locationId]/ingredient-costs/page.test.tsx"`

# Implementation TODO List

## Menu Items Feature

### List View

- [x] `/apps/web/app/locations/[locationId]/menu-items/page.tsx`
  - Hook: `useListLocationMenuItems`
  - Features:
    - List all menu items for a location
    - Add proper data fetching
    - Implement DaisyUI table/list view
    - Add create/edit/delete actions
    - Add proper loading states
    - Add error handling
  - Implementation Details:
    - Uses DaisyUI table component
    - Implements loading spinner
    - Implements error alert
    - Uses NextJS Link for navigation
    - Has proper test IDs for all elements
    - Includes unit and e2e tests

### Detail View

- [x] `/apps/web/app/locations/[locationId]/menu-items/[menuItemId]/page.tsx`
  - Hook: `useGetLocationMenuItemById`
  - Features:
    - Display menu item details
    - Add edit functionality
    - Add delete functionality
    - Add proper loading states
    - Add error handling
  - Implementation Details:
    - Uses DaisyUI card and grid components
    - Implements loading spinner
    - Implements error alert
    - Implements not found state
    - Uses NextJS Link for navigation
    - Has proper test IDs for all elements
    - Includes unit and e2e tests

### Create View

- [x] `/apps/web/app/locations/[locationId]/menu-items/create/page.tsx`
  - Hook: `useCreateLocationMenuItem`
  - Features:
    - Create form with react-hook-form
    - Add validation
    - Add proper error handling
    - Add success feedback
    - Add navigation after creation

## Sales Feature

### List View

- [ ] `/apps/web/app/locations/[locationId]/sales/page.tsx`
  - Hook: `useListLocationSales`
  - Features:
    - List all sales for a location
    - Add proper data fetching
    - Implement DaisyUI table/list view
    - Add create/view actions
    - Add proper loading states
    - Add error handling

### Detail View

- [ ] `/apps/web/app/locations/[locationId]/sales/[saleId]/page.tsx`
  - Hook: `useGetLocationSaleById`
  - Features:
    - Display sale details
    - Add proper loading states
    - Add error handling
    - Add print/export functionality

### Create View

- [ ] `/apps/web/app/locations/[locationId]/sales/new/page.tsx`
  - Hook: `useCreateLocationSale`
  - Features:
    - Create form with react-hook-form
    - Add validation
    - Add proper error handling
    - Add success feedback
    - Add navigation after creation

## Inventory Feature

### Record Movement

- [ ] `/apps/web/app/locations/[locationId]/inventory-movements/record/page.tsx`
  - Hook: `useCreateLocationInventoryMovement`
  - Features:
    - Create form with react-hook-form
    - Add validation
    - Add proper error handling
    - Add success feedback
    - Add navigation after creation

## Modifiers Feature

### Detail View

- [ ] `/apps/web/app/modifiers/[modifierId]/page.tsx`
  - Hook: `useGetModifierById`
  - Features:
    - Display modifier details
    - Add edit functionality
    - Add delete functionality
    - Add proper loading states
    - Add error handling

### Options List

- [ ] `/apps/web/app/modifiers/[modifierId]/options/page.tsx`
  - Hook: `useListModifierOptions`
  - Features:
    - List all options for a modifier
    - Add proper data fetching
    - Implement DaisyUI table/list view
    - Add create/edit/delete actions
    - Add proper loading states
    - Add error handling

### Option Detail

- [ ] `/apps/web/app/modifiers/[modifierId]/options/[modifierOptionId]/page.tsx`
  - Hook: `useGetModifierOptionById`
  - Features:
    - Display option details
    - Add edit functionality
    - Add delete functionality
    - Add proper loading states
    - Add error handling

## Implementation Requirements for All Pages

1. Use proper hooks from `@nory/api-client`
2. Implement UI using DaisyUI components
3. Add proper testIds to all interactive elements
4. Use react-hook-form for forms
5. Use NextJS Image component for images
6. Use the orval generated client for API calls
7. Keep the testIds consistent with the test files
8. Add proper loading states
9. Add proper error handling
10. Add proper success feedback
11. Add proper navigation
12. Add proper validation
13. Add proper data fetching
14. Add proper state management
15. Add proper UI components
16. Add proper tests
17. Add proper documentation

# Test Fixes and Improvements

## Fixed Issues

1. Home Page Test

   - Added missing `home-content` test ID to the main content container
   - Test now passes as all required elements are visible

2. Staff Detail Page Test
   - Fixed email display bug where email was showing as name
   - Test now passes as all required elements are visible and displaying correct data

## Pending Improvements

1. Test Coverage

   - Add more test cases for error handling
   - Add test cases for loading states
   - Add test cases for form validation
   - Add test cases for navigation

2. Test Organization

   - Group related tests together
   - Add more descriptive test names
   - Add comments explaining complex test scenarios

3. Test Data

   - Use faker.js for generating test data
   - Ensure test data is consistent across all tests
   - Add more edge cases to test data

4. Test Performance
   - Optimize test execution time
   - Reduce duplicate test setup
   - Use shared test utilities where possible

## Best Practices

1. Test IDs

   - Use consistent naming convention for test IDs
   - Add test IDs to all interactive elements
   - Document test ID usage in comments

2. Test Structure

   - Follow AAA pattern (Arrange, Act, Assert)
   - Keep tests focused and atomic
   - Use descriptive test names

3. Test Maintenance
   - Keep tests up to date with code changes
   - Remove obsolete tests
   - Update test documentation

# JavaScript to TypeScript Conversion Plan for Backend

## Setup Phase

- [x] Create `tsconfig.json`
- [x] Update `package.json` with TypeScript dependencies and scripts
- [x] Setup build scripts and TypeScript configurations

## Core Conversion Phase

### Base Files

- [x] Convert `config.js` → `config.ts`
- [x] Convert `logger.js` → `logger.ts`
- [x] Convert `index.js` → `index.ts`
- [x] Convert `expressServer.js` → `expressServer.ts`

### Utils

- [x] Convert `utils/openapiRouter.js` → `utils/openapiRouter.ts`

### Service Layer

- [x] Convert `services/Service.js` → `services/Service.ts`
- [x] Convert `services/index.js` → `services/index.ts`
- [x] Convert `services/IngredientsService.js` → `services/IngredientsService.ts`
- [x] Convert `services/InventoryMovementsService.js` → `services/InventoryMovementsService.ts`
- [x] Convert `services/InventoryStockService.js` → `services/InventoryStockService.ts`
- [x] Convert `services/LocationIngredientCostsService.js` → `services/LocationIngredientCostsService.ts`
- [x] Convert `services/LocationMenuItemsService.js` → `services/LocationMenuItemsService.ts`
- [x] Convert `services/LocationsService.js` → `services/LocationsService.ts`
- [x] Convert `services/ModifierOptionsService.js` → `services/ModifierOptionsService.ts`
- [x] Convert `services/ModifiersService.js` → `services/ModifiersService.ts`
- [x] Convert `services/RecipeIngredientLinksService.js` → `services/RecipeIngredientLinksService.ts`
- [x] Convert `services/RecipesService.js` → `services/RecipesService.ts`
- [x] Convert `services/StaffService.js`
