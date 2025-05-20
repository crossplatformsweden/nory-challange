Here is a summary of the failing tests and their file paths: DONT STOP UNTIL ALL TESTA ARE GREEN

**Failing Test Files: UPDATE THIS WHEN A TEST COMPLETES**

1.  `app/locations/[locationId]/reports/inventory-movements-timeline/page.test.tsx`
2.  `app/locations/[locationId]/ingredient-costs/create/page.test.tsx`
3.  `app/locations/[locationId]/staff/page.test.tsx`
4.  `app/locations/[locationId]/ingredient-costs/page.test.tsx`

**Summary of Failures:**

- `app/locations/[locationId]/reports/inventory-movements-timeline/page.test.tsx`:

  - **Reason:** Primarily `TypeError: Cannot destructure property 'locationId' of '(0 , _navigation.useParams)(...)' as it is undefined.` indicating an issue with mocking or providing the `locationId` param from the route in the test environment.
  - **Consequence:** Multiple tests fail with `TypeError: data?.data?.map is not a function`, likely because data fetching hooks are not receiving the necessary `locationId` or the mocked data structure is incorrect.

- `app/locations/[locationId]/ingredient-costs/create/page.test.tsx`:

  - **Reason:** `expect(mockMutate).toHaveBeenCalledWith(...)` failed because the mock mutation function (`mockMutate`) was never called. This happens in the test `submits form and navigates on success`.
  - **Details:** The test submits the form but the mocked API call (mutation) does not seem to be triggered.

- `app/locations/[locationId]/staff/page.test.tsx`:

  - **Reason:** `TestingLibraryElementError: Unable to find an element by: [data-testid="staff-email-1"]`. This occurs in the test `renders staff cards when data is available`.
  - **Details:** The test expects an element with `data-testid="staff-email-1"` to be present after rendering the staff list, but the rendered output (shown in the error) does not contain this element for the staff cards. It seems the email field might not be rendered or is using a different test ID.

- `app/locations/[locationId]/ingredient-costs/page.test.tsx`:

  - **Reason:** Multiple tests fail with `TypeError: data?.data?.map is not a function`.
  - **Details:** Similar to the inventory movements timeline page, the component tries to call `.map()` on `data?.data`, but `data` or `data.data` is not an array or is undefined/null in the test environment. This suggests an issue with mocking the data fetching hook for the ingredient costs list.

  Okay, here are the `pnpm test:unit` commands for each of the failing test files, assuming you run them from the project root directory (where `apps/web` is located):

```bash
# Change to the web application directory
cd apps/web

# Run tests for Inventory Movements Timeline page
pnpm test:unit "app/locations/\[locationId\]/reports/inventory-movements-timeline/page.test.tsx"

# Run tests for Create Ingredient Cost page
pnpm test:unit "app/locations/\[locationId\]/ingredient-costs/create/page.test.tsx"

# Run tests for Staff List page
pnpm test:unit "app/locations/\[locationId\]/staff/page.test.tsx"

# Run tests for Ingredient Costs List page
pnpm test:unit "app/locations/\[locationId\]/ingredient-costs/page.test.tsx"
```

Make 1 test at a time work. Make sure all test mockData is typed

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
