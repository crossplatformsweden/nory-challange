# Turborepo Tailwind CSS starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest -e with-tailwind
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `web`: another [Next.js](https://nextjs.org/) app with [Tailwind CSS](https://tailwindcss.com/)
- `ui`: a stub React component library with [Tailwind CSS](https://tailwindcss.com/) shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Building packages/ui

This example is set up to produce compiled styles for `ui` components into the `dist` directory. The component `.tsx` files are consumed by the Next.js apps directly using `transpilePackages` in `next.config.ts`. This was chosen for several reasons:

- Make sharing one `tailwind.config.ts` to apps and packages as easy as possible.
- Make package compilation simple by only depending on the Next.js Compiler and `tailwindcss`.
- Ensure Tailwind classes do not overwrite each other. The `ui` package uses a `ui-` prefix for it's classes.
- Maintain clear package export boundaries.

Another option is to consume `packages/ui` directly from source without building. If using this option, you will need to update the `tailwind.config.ts` in your apps to be aware of your package locations, so it can find all usages of the `tailwindcss` class names for CSS compilation.

For example, in [tailwind.config.ts](packages/tailwind-config/tailwind.config.ts):

```js
  content: [
    // app content
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    "../../packages/ui/*.{js,ts,jsx,tsx}",
  ],
```

If you choose this strategy, you can remove the `tailwindcss` and `autoprefixer` dependencies from the `ui` package.

### Utilities

This Turborepo has some additional tools already setup for you:

- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://jestjs.io/) for unit testing
- [Testing Library](https://testing-library.com/) for React component testing

DB = VsJYsuuFJku6hjSl

\*Verification against Requirements (Backend Logic Endpoints):\*\*

1.  **Accept Deliveries:**

    - Requirement: Chef adds quantity of delivered items.
    - API: `POST /inventory_movements` (with `type: restock`).
    - Backend Logic: The backend receives the `locationId`, `ingredientId`, `quantity`, and `type: restock`. It updates the `InventoryStock` for that location/ingredient and logs the `InventoryMovement` record, including the cost per unit at the time of the restock (fetched from `LocationIngredientCost` or `Ingredient`).
    - Status: **Fulfilled.**

2.  **Sell items:**

    - Requirement: Sell menu items, remove ingredients, prevent underselling.
    - API: `POST /locations/{locationId}/sales`. Request body specifies `lineItems` (which `LocationMenuItem` and `quantity`, plus chosen `selectedModifierOptionIds`).
    - Backend Logic: The backend receives the sale data. It iterates through line items, looks up the recipe ingredients via `RecipeIngredientLink`, checks _current_ stock levels (`InventoryStock`) for all required ingredients _for the total quantity sold_, and **atomically** decrements stock. If stock is insufficient for _any_ ingredient, the entire sale transaction is rejected (e.g., 400 Bad Request with details in `ErrorResponse.errors`). If successful, the backend creates `InventoryMovement` records (`type: sale`, negative quantity, captures cost/unit at time of sale for calculation), creates the `Sale` record, calculates `totalRevenue` (summing line item `pricePerUnit * quantity`), and creates `SaleLineItem` records.
    - Status: **Fulfilled.** All complex logic (stock check, multi-step updates, atomic operation) is on the backend.

3.  **Take stock (waste):**

    - Requirement: Count inventory, compare, record waste/adjustments.
    - API: `GET /inventory_stock?locationId={locationId}` to see current levels. `POST /inventory_movements` (with `type: waste` or `type: adjustment`). `PATCH /inventory_stock/{stockId}` for direct overrides if needed.
    - Backend Logic: `GET` just retrieves data. `POST /inventory_movements` receives the movement details, updates `InventoryStock` accordingly, and logs the movement. For `type: waste`, the backend should probably validate the quantity is negative. For `type: adjustment`, it could be positive or negative. `PATCH /inventory_stock` directly sets the quantity.
    - Status: **Fulfilled.**

4.  **Pull Reports (Calculated Summaries):**

    - Requirement: Manager wants report with total delivery cost, sales revenue, inventory value, waste cost.
    - API: `GET /locations/{locationId}/reports/inventorySummary?startTime=...&endTime=...`.
    - Backend Logic: The backend receives the location and date range. It queries `InventoryMovement` records for that location within the time range, filtering by type (`restock`, `waste`). It queries `Sale` records for that location within the time range. It queries `InventoryStock` records for that location _at the end time_. It performs the necessary sums and calculations on the server-side (e.g., sum `quantity * costPerUnit` for restock movements, sum `quantity * costPerUnit` for waste movements, sum `totalRevenue` from sales, sum `quantity * costPerUnit` (using relevant cost) for current stock). It returns a single `InventorySummaryReport` object.
    - Status: **Fulfilled.** All calculation logic is explicitly an endpoint on the backend.

5.  **Location-Specific Data Restriction:**

    - Requirement: Restrict actions/data to location's recipes, ingredients, staff, etc.
    - API: Paths and schemas include `locationId`. Queries filter by `locationId`. Operations are scoped by `locationId` in the path.
    - Backend Logic: The backend must enforce that operations requested via a `locationId` path parameter or a `locationId` in the request body only affect data genuinely associated with that location, and that staff (`recordedByStaffId`) are associated with that location (requires an authentication/authorization layer beyond the spec).
    - Status: **Fulfilled** (API structure supports, backend must enforce).

6.  **Data Initialization:**

    - Requirement: App boots, sees latest data.
    - API: `GET` endpoints for all collections/nested collections (`locations`, `ingredients`, `recipes`, `modifiers`, `/locations/{locationId}/staff`, `/locations/{locationId}/menuItems`, `/locations/{locationId}/ingredientCosts`, `/inventory_stock`, `/inventory_movements`).
    - Backend Logic: Serve the data.
    - Status: **Fulfilled.**

7.  **Ease of Use / Non-Technical Staff:**
    - Requirement: Staff are busy, non-technical, need easy app.
    - API Implication: Logical endpoints, clear data structures, good error reporting. Embedded summaries simplify client-side display.
    - Backend Logic: Handle complexity behind the scenes. Sale endpoint handles all necessary stock/movement updates. Report endpoint does calculations.
    - Status: **Largely Fulfilled.** The API design moves complexity to the server. Further ease of use comes from the frontend UI built on this API and potentially batch endpoints for faster data entry (like for a large delivery).

This updated OpenAPI specification aligns well with all the specified requirements, particularly the critical point that business logic resides solely on the backend and is accessed via dedicated, well-defined API endpoints. It provides a clear contract for building the frontend application against.

With this `GET /inventory_movements` endpoint providing detailed, filterable time-series data, the following visualizations become possible (client-side aggregation):

- **Waste Timeline:** Bar or Line chart showing waste quantity/cost over time (daily, weekly, monthly). Separate series per ingredient.
- **Restock Timeline:** Bar or Line chart showing restock quantity/cost over time. Separate series per ingredient.
- **Sales Impact Timeline:** Bar or Line chart showing ingredient quantity/cost consumed by sales over time. Separate series per ingredient.
- **Net Inventory Change Timeline:** Calculate the running total of `quantity * costPerUnit` (or just `quantity`) over time to see how the inventory value/amount changes based on all movement types combined.
- **Movement Breakdown by Type:** Stacked bar chart showing the total quantity/cost impact broken down by movement type (waste, restock, sale, etc.) per time period.
- **Movement Breakdown by Staff:** Group movements by `recordedByStaffId` to see which staff members are associated with which types and quantities/costs of movements (e.g., who logged the most waste, who recorded the largest restocks).
- **Inventory Flow:** Potentially more complex Sankey-like diagrams showing ingredients flowing _into_ inventory (restock), _out_ via sales, and _out_ via waste over a period.
