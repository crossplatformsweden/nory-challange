# Test info

- Name: InventorySummaryReportPage >> renders the page and takes screenshot
- Location: /Users/xemil/Source/nory-challange/apps/web/app/locations/[locationId]/reports/inventory-summary/page.e2e.test.tsx:4:3

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "http://localhost:3001/locations/123/reports/inventory-summary", waiting until "load"

    at /Users/xemil/Source/nory-challange/apps/web/app/locations/[locationId]/reports/inventory-summary/page.e2e.test.tsx:5:16
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test'
   2 |
   3 | test.describe('InventorySummaryReportPage', () => {
   4 |   test('renders the page and takes screenshot', async ({ page }) => {
>  5 |     await page.goto('/locations/123/reports/inventory-summary')
     |                ^ Error: page.goto: Target page, context or browser has been closed
   6 |
   7 |     // Check that the page has loaded
   8 |     await expect(page.getByTestId('inventory-summary-report-page')).toBeVisible()
   9 |
  10 |     // Get current date/time for unique screenshot name
  11 |     const now = new Date()
  12 |     const timestamp = now.toISOString().replace(/[:.]/g, '-')
  13 |
  14 |     // Take screenshot with timestamp
  15 |     await page.screenshot({
  16 |       path: `./screenshots/inventory-summary-report_${timestamp}.png`,
  17 |       fullPage: true
  18 |     })
  19 |   })
  20 | })
```
