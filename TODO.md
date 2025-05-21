apps/web test: 1) [chromium] › app/locations/[locationId]/ingredient-costs/create/page.e2e.test.tsx:92:3 › CreateIngredientCostPage › submits form and navigates on success
apps/web test: Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)
apps/web test: Locator: locator(':root')
apps/web test: Expected pattern: /\/locations\/[^/]+\/ingredient-costs$/
apps/web test:     Received string:  "http://localhost:3001/locations/123/ingredient-costs/create"
apps/web test:     Call log:
apps/web test:       - expect.toHaveURL with timeout 5000ms
apps/web test:       - waiting for locator(':root')
apps/web test:         9 × locator resolved to <html lang="en" data-theme="light">…</html>
apps/web test:           - unexpected value "http://localhost:3001/locations/123/ingredient-costs/create"
apps/web test:       104 |
apps/web test:       105 |     // Verify navigation to ingredient costs list page - only check the path pattern
apps/web test:     > 106 |     await expect(page).toHaveURL(/\/locations\/[^/]+\/ingredient-costs$/);
apps/web test: | ^
apps/web test: 107 | });
apps/web test: 108 |
apps/web test: 109 | test('takes a screenshot of the page', async ({ page }) => {
apps/web test: at /app/apps/web/app/locations/[locationId]/ingredient-costs/create/page.e2e.test.tsx:106:24
apps/web test: attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
apps/web test: test-results/locations-[locationId]-ing-23a6a-rm-and-navigates-on-success-chromium/test-failed-1.png
apps/web test: ────────────────────────────────────────────────────────────────────────────────────────────────

apps/web test: Error Context: test-results/locations-[locationId]-ing-23a6a-rm-and-navigates-on-success-chromium/error-context.md

apps/web test: 2) [chromium] › app/locations/[locationId]/menu-items/create/page.e2e.test.tsx:85:3 › Create Menu Item Page › should create a menu item successfully

apps/web test: Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

apps/web test: Locator: locator(':root')
apps/web test: Expected string: "http://localhost:3001/locations/location1/menu-items"

apps/web test: Received string: "http://localhost:3001/locations/location1/menu-items/create"

apps/web test: Call log:

apps/web test: - expect.toHaveURL with timeout 5000ms

apps/web test: - waiting for locator(':root')

apps/web test: 9 × locator resolved to <html lang="en" data-theme="light">…</html>

apps/web test: - unexpected value "http://localhost:3001/locations/location1/menu-items/create"
apps/web test: 98 |
apps/web test: 99 | // Check if we are redirected to the menu items list page

apps/web test: > 100 | await expect(page).toHaveURL('/locations/location1/menu-items');

apps/web test: | ^

apps/web test: 101 | });

apps/web test: 102 |
apps/web test: 103 | test('should navigate back to list page', async ({ page }) => {

apps/web test: at /app/apps/web/app/locations/[locationId]/menu-items/create/page.e2e.test.tsx:100:24
apps/web test: attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────

apps/web test: test-results/locations-[locationId]-men-5a7f4-te-a-menu-item-successfully-chromium/test-failed-1.png

apps/web test: ────────────────────────────────────────────────────────────────────────────────────────────────

apps/web test: Error Context: test-results/locations-[locationId]-men-5a7f4-te-a-menu-item-successfully-chromium/error-context.md

apps/web test: 3) [chromium] › app/locations/[locationId]/menu-items/create/page.e2e.test.tsx:103:3 › Create Menu Item Page › should navigate back to list page

apps/web test: Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

apps/web test: Locator: locator(':root')

apps/web test: Expected string: "http://localhost:3001/locations/location1/menu-items"

apps/web test: Received string: "http://localhost:3001/locations/location1/menu-items/create"

apps/web test: Call log:

apps/web test: - expect.toHaveURL with timeout 5000ms

apps/web test: - waiting for locator(':root')

apps/web test: 9 × locator resolved to <html lang="en" data-theme="light">…</html>

apps/web test: - unexpected value "http://localhost:3001/locations/location1/menu-items/create"

apps/web test: 106 |
apps/web test: 107 | // Check if we are redirected to the menu items list page

apps/web test: > 108 | await expect(page).toHaveURL('/locations/location1/menu-items');

apps/web test: | ^
apps/web test: 109 | });

apps/web test: 110 |

apps/web test: 111 | test('should show loading state when submitting', async ({ page }) => {

apps/web test: at /app/apps/web/app/locations/[locationId]/menu-items/create/page.e2e.test.tsx:108:24

apps/web test: attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────

apps/web test: test-results/locations-[locationId]-men-dd6db--navigate-back-to-list-page-chromium/test-failed-1.png

apps/web test: ────────────────────────────────────────────────────────────────────────────────────────────────

apps/web test: Error Context: test-results/locations-[locationId]-men-dd6db--navigate-back-to-list-page-chromium/error-context.md
apps/web test: 4) [chromium] › app/locations/[locationId]/staff/create/page.e2e.test.tsx:38:3 › CreateStaffPage › submits form with valid data

apps/web test: Error: Timed out 5000ms waiting for expect(locator).toHaveURL(expected)

apps/web test: Locator: locator(':root')

apps/web test: Expected pattern: /\/locations\/[^/]+\/staff$/

apps/web test: Received string: "http://localhost:3001/locations/123/staff/create"

apps/web test: Call log:

apps/web test: - expect.toHaveURL with timeout 5000ms
apps/web test: - waiting for locator(':root')
apps/web test: 6 × locator resolved to <html lang="en" data-theme="light">…</html>
apps/web test: - unexpected value "http://localhost:3001/locations/123/staff/create"
apps/web test: - waiting for" http://localhost:3001/locations/123/staff" navigation to finish...
apps/web test: 49 |
apps/web test: 50 | // Verify navigation to staff list page - only check the path pattern
apps/web test: > 51 | await expect(page).toHaveURL(/\/locations\/[^/]+\/staff$/);
apps/web test: | ^
apps/web test: 52 | });
apps/web test: 53 |
apps/web test: 54 | test('shows error state when API fails', async () => {

apps/web test: at /app/apps/web/app/locations/[locationId]/staff/create/page.e2e.test.tsx:51:24

apps/web test: attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────

apps/web test: test-results/locations-[locationId]-sta-ccd15-ubmits-form-with-valid-data-chromium/test-failed-1.png

apps/web test: ────────────────────────────────────────────────────────────────────────────────────────────────

apps/web test: Error Context: test-results/locations-[locationId]-sta-ccd15-ubmits-form-with-valid-data-chromium/error-context.md

apps/web test: 4 flaky

Fix and improve 4 flakey test. Commit and push.

See build result.

build-test-result.txt

pnpm all
