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
