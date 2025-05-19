#!/bin/bash

# Script to generate Next.js page components based on routes in nextjsroutes.md
# This script parses the routes file and uses the plop generator to create page components

# Base path to the Next.js app
ROOT_PATH="/Users/xemil/Source/nory-challange/apps/web"
GENERATOR_CMD="pnpm --filter @repo/plop-generators generate:direct"

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Print header
echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}   Next.js Page Generator - Route Creation Tool   ${NC}"
echo -e "${BLUE}==================================================${NC}"
echo ""

# Map of routes to create
# Format: "route_path:component_name:test_url_path:hook_name"
# Use "None" if no specific hook is associated with the page's primary data fetching requirement.
declare -a ROUTES=(
    # Root pages
    ".:HomePage:/:None"
    "locations:LocationsListPage:locations:useListLocations"
    "locations/create:CreateLocationPage:locations/create:useCreateLocation"
    "locations/[locationId]:LocationDetailPage:locations/123:useGetLocationById"

    # Staff routes
    "locations/[locationId]/staff:StaffListPage:locations/123/staff:useListStaffByLocation"
    "locations/[locationId]/staff/create:CreateStaffPage:locations/123/staff/create:useCreateStaffAtLocation"
    "locations/[locationId]/staff/[staffId]:StaffDetailPage:locations/123/staff/456:useGetStaffByLocationAndId"

    # Menu items routes
    "locations/[locationId]/menu-items:MenuItemsListPage:locations/123/menu-items:useListLocationMenuItems"
    "locations/[locationId]/menu-items/create:CreateMenuItemPage:locations/123/menu-items/create:useCreateLocationMenuItem"
    "locations/[locationId]/menu-items/[menuItemId]:MenuItemDetailPage:locations/123/menu-items/456:useGetLocationMenuItemById"

    # Ingredient costs routes
    "locations/[locationId]/ingredient-costs:IngredientCostsListPage:locations/123/ingredient-costs:useListLocationIngredientCosts"
    "locations/[locationId]/ingredient-costs/create:CreateIngredientCostPage:locations/123/ingredient-costs/create:useCreateLocationIngredientCost"
    "locations/[locationId]/ingredient-costs/[locationIngredientCostId]:IngredientCostDetailPage:locations/123/ingredient-costs/456:useGetLocationIngredientCostById"

    # Inventory routes
    "locations/[locationId]/inventory-stock:InventoryStockPage:locations/123/inventory-stock:useListInventoryStock"
    "locations/[locationId]/inventory-movements/record:RecordInventoryMovementPage:locations/123/inventory-movements/record:useCreateInventoryMovement"

    # Sales routes
    "locations/[locationId]/sales:SalesListPage:locations/123/sales:None"
    "locations/[locationId]/sales/new:NewSalePage:locations/123/sales/new:None"
    "locations/[locationId]/sales/[saleId]:SaleDetailPage:locations/123/sales/456:None"

    # Reports routes
    "locations/[locationId]/reports:ReportsOverviewPage:locations/123/reports:None"
    "locations/[locationId]/reports/inventory-summary:InventorySummaryReportPage:locations/123/reports/inventory-summary:None"
    "locations/[locationId]/reports/inventory-movements-timeline:InventoryMovementsTimelinePage:locations/123/reports/inventory-movements-timeline:useListInventoryMovements"

    # Ingredients routes
    "ingredients:IngredientsListPage:ingredients:useListIngredients"
    "ingredients/[ingredientId]:IngredientDetailPage:ingredients/123:useGetIngredientById"

    # Recipes routes
    "recipes:RecipesListPage:recipes:useListRecipes"
    "recipes/[recipeId]:RecipeDetailPage:recipes/123:useGetRecipeById"
    "recipes/[recipeId]/ingredient-links:RecipeIngredientLinksPage:recipes/123/ingredient-links:useListRecipeIngredientLinks"
    "recipes/[recipeId]/ingredient-links/create:CreateRecipeIngredientLinkPage:recipes/123/ingredient-links/create:useCreateRecipeIngredientLink"

    # Modifiers routes
    "modifiers:ModifiersListPage:modifiers:useListModifiers"
    "modifiers/[modifierId]:ModifierDetailPage:modifiers/123:useGetModifierById"
    "modifiers/[modifierId]/options:ModifierOptionsListPage:modifiers/123/options:useListModifierOptions"
    "modifiers/[modifierId]/options/[modifierOptionId]:ModifierOptionDetailPage:modifiers/123/options/456:useGetModifierOptionById"
)

# Count of total pages to generate
TOTAL_PAGES=${#ROUTES[@]}
CURRENT=0
SUCCEEDED=0
FAILED=0

echo -e "${BLUE}Will generate ${TOTAL_PAGES} page components${NC}"
echo ""

# Function to generate a page
generate_page() {
    local route_path=$1
    local component_name=$2
    local test_url_path=$3
    local hook_name=$4

    echo -e "${YELLOW}Generating: ${component_name} at path: ${route_path}${NC}"

    # Run the generator
    if $GENERATOR_CMD --rootPath "$ROOT_PATH" --path "$route_path" --name "$component_name" --urlPath "$test_url_path" --hookName "$hook_name" >/dev/null; then
        echo -e "${GREEN}✓ Successfully generated ${component_name}${NC}"
        return 0
    else
        echo -e "${RED}✗ Failed to generate ${component_name}${NC}"
        return 1
    fi
}

# Process each route
for route in "${ROUTES[@]}"; do
    # Parse route info
    IFS=':' read -r route_path component_name test_url_path hook_name <<<"$route"

    # Update progress
    CURRENT=$((CURRENT + 1))
    echo -e "${BLUE}[${CURRENT}/${TOTAL_PAGES}] Processing ${component_name}...${NC}"

    # Generate the page
    if generate_page "$route_path" "$component_name" "$test_url_path" "$hook_name"; then
        SUCCEEDED=$((SUCCEEDED + 1))
    else
        FAILED=$((FAILED + 1))
    fi

    echo ""
done

# Print summary
echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}                 GENERATION SUMMARY              ${NC}"
echo -e "${BLUE}==================================================${NC}"
echo -e "${GREEN}Pages successfully generated: ${SUCCEEDED}${NC}"
if [ $FAILED -gt 0 ]; then
    echo -e "${RED}Pages failed to generate: ${FAILED}${NC}"
fi
echo -e "${BLUE}==================================================${NC}"

exit 0
