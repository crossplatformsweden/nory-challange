.
├── README.md
├── package.json
├── orval.config.js
├── next.config.js
├── tsconfig.json
├── .eslintrc.json
├── .gitignore
├── src/
│ ├── api/ # Generated and custom API code
│ │ └── generated/ # Orval generated code (model, msw, api files)
│ │ └── custom-instance.ts # Custom Axios instance
│ ├── components/ # Reusable UI components
│ ├── hooks/ # Custom React hooks
│ ├── utils/ # Utility functions
│ ├── mocks/ # MSW setup
│ ├── app/ # Next.js App Router root directory
│ │ ├── layout.tsx # Root layout
│ │ ├── page.tsx # Root landing page
│ │ ├── locations/ # Route segment for locations (Global List)
│ │ │ ├── page.tsx # Page to list all locations.
│ │ │ │ # Fetches using useListLocations. OpenAPI GET /locations has no query params currently.
│ │ │ │ # Possible Query Params for future pagination/filtering:
│ │ │ │ # - ?page=<number>
│ │ │ │ # - ?limit=<number>
│ │ │ │ # - ?sortBy=<field>
│ │ │ │ # - ?sortOrder=<asc|desc>
│ │ │ │ # - ?name=<string> (for searching by name)
│ │ │ ├── create/ # Route segment for creating a location
│ │ │ │ └── page.tsx # Page with form to create location. (POST /locations)
│ │ │ └── [locationId]/ # Dynamic route segment for a specific location
│ │ │ ├── layout.tsx # Layout for a specific location (Fetches location data using useGetLocationById from params.locationId)
│ │ │ ├── page.tsx # Location Overview page (No specific query params, uses path param)
│ │ │ ├── staff/ # Nested route segment for staff at this location (List)
│ │ │ │ ├── page.tsx # Page to list staff for this location.
│ │ │ │ │ # Fetches using useListStaffByLocation, uses path param locationId.
│ │ │ │ │ # OpenAPI GET /locations/{locationId}/staff has no query params currently.
│ │ │ │ │ # Possible Query Params for future pagination/filtering:
│ │ │ │ │ # - ?page=<number>
│ │ │ │ │ # - ?limit=<number>
│ │ │ │ │ # - ?role=<string> (filter by role)
│ │ │ │ │ # - ?name=<string> (search by name)
│ │ │ │ ├── create/ # Route segment to create staff for this location
│ │ │ │ │ └── page.tsx # Page with form to create staff (POST /locations/{locationId}/staff)
│ │ │ │ └── [staffId]/ # Dynamic segment for a single staff member
│ │ │ │ └── page.tsx # Page to view/edit staff member (GET /locations/{locationId}/staff/{staffId}). Uses path params locationId, staffId.
│ │ │ ├── menu-items/ # Nested route segment for menu items at this location (List)
│ │ │ │ ├── page.tsx # Page to list menu items.
│ │ │ │ │ # Fetches useListLocationMenuItems, uses path param locationId.
│ │ │ │ │ # OpenAPI GET /locations/{locationId}/menuItems has no query params currently.
│ │ │ │ │ # Possible Query Params for future pagination/filtering:
│ │ │ │ │ # - ?page=<number>
│ │ │ │ │ # - ?limit=<number>
│ │ │ │ │ # - ?recipeId=<string> (filter by base recipe)
│ │ │ │ │ # - ?hasModifierId=<string> (filter by enabled modifier group)
│ │ │ │ ├── create/ # Route segment to create a menu item
│ │ │ │ │ └── page.tsx # Page with form to create menu item (POST /locations/{locationId}/menuItems)
│ │ │ │ └── [menuItemId]/ # Dynamic segment for a single menu item
│ │ │ │ └── page.tsx # Page to view/edit menu item (GET /locations/{locationId}/menuItems/{menuItemId}). Uses path params locationId, menuItemId.
│ │ │ ├── ingredient-costs/ # Nested route segment for location-specific ingredient costs (List)
│ │ │ │ ├── page.tsx # Page to list ingredient costs.
│ │ │ │ │ # Fetches useListLocationIngredientCosts, uses path param locationId.
│ │ │ │ │ # OpenAPI GET /locations/{locationId}/ingredientCosts has no query params currently.
│ │ │ │ │ # Possible Query Params:
│ │ │ │ │ # - ?ingredientId=<string> (filter by ingredient)
│ │ │ │ ├── create/ # Route segment to create a cost record
│ │ │ │ │ └── page.tsx # Page with form to create cost record (POST /locations/{locationId}/ingredientCosts)
│ │ │ │ └── [locationIngredientCostId]/ # Dynamic segment for a single cost record
│ │ │ │ └── page.tsx # Page to view/edit cost record (GET /locations/{locationId}/ingredientCosts/{locationIngredientCostId}). Uses path params locationId, locationIngredientCostId.
│ │ │ ├── inventory-stock/ # Nested route segment for inventory stock at this location (List)
│ │ │ │ └── page.tsx # Page to view current stock levels.
│ │ │ │ # Fetches useListInventoryStock. OpenAPI GET /inventory\*stock supports:
│ │ │ │ # - ?locationId=<string> (Implicitly used from path param)
│ │ │ │ # - ?ingredientId=<string> (Filter by ingredient)
│ │ │ │ # Possible Query Params for deep linking/filtering:
│ │ │ │ # - ?ingredientId=<string> (Filter list to show only one ingredient's stock)
│ │ │ │ # - ?sortBy=<field>
│ │ │ │ # - ?sortOrder=<asc|desc>
│ │ │ ├── inventory-movements/ # Nested route segment for manual inventory movement recording
│ │ │ │ └── record/ # Route segment for the recording form
│ │ │ │ └── page.tsx # Page with form to record a movement (POST /inventory_movements). Uses path param locationId for the request body.
│ │ │ ├── sales/ # Nested route segment for sales at this location (List)
│ │ │ │ ├── page.tsx # Page to list sales.
│ │ │ │ │ # Fetches useListSalesByLocation, uses path param locationId. OpenAPI GET /locations/{locationId}/sales supports:
│ │ │ │ │ # - ?startTime=<date-time> (Filter by start time)
│ │ │ │ │ # - ?endTime=<date-time> (Filter by end time)
│ │ │ │ │ # Possible Query Params for deep linking/filtering/pagination:
│ │ │ │ │ # - ?startTime=<date-time> (To pre-filter the sales list)
│ │ │ │ │ # - ?endTime=<date-time> (To pre-filter the sales list)
│ │ │ │ │ # - ?page=<number>
│ │ │ │ │ # - ?limit=<number>
│ │ │ │ ├── new/ # Route segment to record a new sale
│ │ │ │ │ └── page.tsx # Page with form/UI to record a new sale (POST /locations/{locationId}/sales). Uses path param locationId for the request.
│ │ │ │ └── [saleId]/ # Dynamic segment for a single sale
│ │ │ │ └── page.tsx # Page to view sale details (GET /locations/{locationId}/sales/{saleId}). Uses path params locationId, saleId.
│ │ │ └── reports/ # Nested route segment for reports for this location
│ │ │ ├── layout.tsx # Layout for reports section
│ │ │ ├── page.tsx # Reports overview page for location (Links to specific reports)
│ │ │ ├── inventory-summary/ # Route segment for the inventory summary report
│ │ │ │ └── page.tsx # Page to display summary report.
│ │ │ │ # Fetches useGetInventorySummaryReport, uses path param locationId. OpenAPI GET /locations/{locationId}/reports/inventorySummary requires:
│ │ │ │ # - ?startTime=<date-time>
│ │ │ │ # - ?endTime=<date-time>
│ │ │ │ # These would likely be obtained from URL query params for deep linking or internal state.
│ │ │ │ # Query Params: ?startTime=<date-time>&endTime=<date-time>
│ │ │ └── inventory-movements-timeline/ # Route segment for the movements timeline report (Timeline Data Source)
│ │ │ └── page.tsx # Page to display movement timeline chart.
│ │ │ # Fetches useListInventoryMovements. OpenAPI GET /inventory_movements supports:
│ │ │ # - ?locationId=<string> (Implicitly used from path param)
│ │ │ # - ?ingredientId=<string> (Filter by ingredient)
│ │ │ # - ?type=<string> (Filter by movement type)
│ │ │ # - ?startTime=<date-time> (Required for report period)
│ │ │ # - ?endTime=<date-time> (Required for report period)
│ │ │ # - ?recordedByStaffId=<string> (Filter by staff)
│ │ │ # Query Params: ?startTime=<date-time>&endTime=<date-time>&ingredientId=<string>&type=<string>&recordedByStaffId=<string>&... (for filtering/deep linking)
│ ├── ingredients/ # Route segment for global ingredients (definitions) (List)
│ │ ├── page.tsx # Page to list all ingredients.
│ │ │ # Fetches useListIngredients. OpenAPI GET /ingredients has no query params currently.
│ │ │ # Possible Query Params for filtering/pagination:
│ │ │ # - ?page=<number>
│ │ │ # - ?limit=<number>
│ │ │ # - ?name=<string> (search by name)
│ │ │ # - ?unit=<string> (filter by unit)
│ │ └── [ingredientId]/ # Dynamic segment for a single ingredient
│ │ └── page.tsx # Page to view/edit ingredient (GET /ingredients/{ingredientId}). Uses path param ingredientId.
│ ├── recipes/ # Route segment for global recipes (definitions) (List)
│ │ ├── page.tsx # Page to list all recipes.
│ │ │ # Fetches useListRecipes. OpenAPI GET /recipes has no query params currently.
│ │ │ # Possible Query Params for filtering/pagination:
│ │ │ # - ?page=<number>
│ │ │ # - ?limit=<number>
│ │ │ # - ?name=<string> (search by name)
│ │ └── [recipeId]/ # Dynamic segment for a single recipe
│ │ ├── layout.tsx # Layout for a single recipe (Fetches recipe data useGetRecipeById from params.recipeId)
│ │ ├── page.tsx # Recipe Overview page (No specific query params, uses path param)
│ │ └── ingredient-links/ # Nested route segment for ingredient links (List)
│ │ ├── page.tsx # Page to list ingredient links for this recipe.
│ │ │ # Fetches useListRecipeIngredientLinks, uses path param recipeId.
│ │ │ # OpenAPI GET /recipes/{recipeId}/ingredientLinks has no query params currently.
│ │ │ # Possible Query Params:
│ │ │ # - ?ingredientId=<string> (filter by ingredient)
│ │ │ # - ?page=<number>&limit=<number>
│ │ └── create/ # Route segment to create a link
│ │ └── page.tsx # Page with form to create ingredient link (POST /recipes/{recipeId}/ingredientLinks). Uses path param recipeId for the request body.
│ └── modifiers/ # Route segment for global modifiers (groups) (List)
│ ├── page.tsx # Page to list all modifiers.
│ │ # Fetches useListModifiers. OpenAPI GET /modifiers has no query params currently.
│ │ # Possible Query Params for filtering/pagination:
│ │ # - ?page=<number>
│ │ # - ?limit=<number>
│ │ # - ?name=<string> (search by name)
│ └── [modifierId]/ # Dynamic segment for a single modifier group
│ ├── layout.tsx # Layout for a single modifier (Fetches modifier data useGetModifierById from params.modifierId)
│ ├── page.tsx # Modifier Group Overview page (No specific query params, uses path param)
│ └── options/ # Nested route segment for modifier options (List)
│ ├── page.tsx # Page to list options for this group.
│ │ # Fetches useListModifierOptions, uses path param modifierId.
│ │ # OpenAPI GET /modifiers/{modifierId}/options has no query params currently.
│ │ # Possible Query Params:
│ │ # - ?name=<string> (search by name)
│ │ # - ?page=<number>&limit=<number>
│ └── [modifierOptionId]/ # Dynamic segment for a single option
│ └── page.tsx # Page to view/edit option (GET /modifiers/{modifierId}/options/{modifierOptionId}). Uses path params modifierId, modifierOptionId.
├── tests/ # Test files directory
│ ├── setupTests.ts # Test setup file
│ └── \*\*/\_.test.tsx # Individual test files
└── public/ # Static assets
└── favicon.ico
└── mockServiceWorker.js # MSW worker script

For each page.tsx that corresponds to a GET operation designed to return a list of items, I've listed the relevant query parameters defined in your OpenAPI spec.
I've also included comments about possible additional query parameters (like page, limit, sortBy, name search) that are standard for API list endpoints and highly beneficial for frontend features like pagination, sorting, and filtering via deep linking, even if they are not currently defined in your OpenAPI spec. You would need to update your OpenAPI spec and backend implementation to support these for a full-featured client.
For GET operations returning a single item based only on path parameters (like getLocationById, getStaffByLocationAndId), query parameters are not typically used, so none are listed.
Mutation routes (create/page.tsx, /record/page.tsx, /new/page.tsx) don't typically use query parameters, as they send data in the request body or via path parameters.
The reports routes (inventory-summary/page.tsx, inventory-movements-timeline/page.tsx) have their required time-based query parameters explicitly noted, as these are essential for the report logic.
Query parameters passed in the URL (e.g., /locations?page=2&limit=10) would be accessible in the page.tsx component via the searchParams prop: export default function Page({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) { ... }. You would then pass these values to your generated Tanstack Query hooks (e.g., useListLocations({ page: searchParams.page, limit: searchParams.limit })).
