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
# Format: "route_path:component_name:test_url_path"
declare -a ROUTES=(
  # Root pages
  ".:HomePage:/"
  "locations:LocationsPage:locations"
  "locations/create:CreateLocationPage:locations/create"
  "locations/[locationId]:LocationDetailPage:locations/123"
  
  # Staff routes
  "locations/[locationId]/staff:StaffListPage:locations/123/staff"
  "locations/[locationId]/staff/create:CreateStaffPage:locations/123/staff/create"
  "locations/[locationId]/staff/[staffId]:StaffDetailPage:locations/123/staff/456"
  
  # Menu items routes
  "locations/[locationId]/menu-items:MenuItemsListPage:locations/123/menu-items"
  "locations/[locationId]/menu-items/create:CreateMenuItemPage:locations/123/menu-items/create"
  "locations/[locationId]/menu-items/[menuItemId]:MenuItemDetailPage:locations/123/menu-items/456"
  
  # Ingredient costs routes
  "locations/[locationId]/ingredient-costs:IngredientCostsListPage:locations/123/ingredient-costs"
  "locations/[locationId]/ingredient-costs/create:CreateIngredientCostPage:locations/123/ingredient-costs/create"
  "locations/[locationId]/ingredient-costs/[locationIngredientCostId]:IngredientCostDetailPage:locations/123/ingredient-costs/456"
  
  # Inventory routes
  "locations/[locationId]/inventory-stock:InventoryStockPage:locations/123/inventory-stock"
  "locations/[locationId]/inventory-movements/record:RecordInventoryMovementPage:locations/123/inventory-movements/record"
  
  # Sales routes
  "locations/[locationId]/sales:SalesListPage:locations/123/sales"
  "locations/[locationId]/sales/new:NewSalePage:locations/123/sales/new"
  "locations/[locationId]/sales/[saleId]:SaleDetailPage:locations/123/sales/456"
  
  # Reports routes
  "locations/[locationId]/reports:ReportsOverviewPage:locations/123/reports"
  "locations/[locationId]/reports/inventory-summary:InventorySummaryReportPage:locations/123/reports/inventory-summary"
  "locations/[locationId]/reports/inventory-movements-timeline:InventoryMovementsTimelinePage:locations/123/reports/inventory-movements-timeline"
  
  # Ingredients routes
  "ingredients:IngredientsListPage:ingredients"
  "ingredients/[ingredientId]:IngredientDetailPage:ingredients/123"
  
  # Recipes routes
  "recipes:RecipesListPage:recipes"
  "recipes/[recipeId]:RecipeDetailPage:recipes/123"
  "recipes/[recipeId]/ingredient-links:RecipeIngredientLinksPage:recipes/123/ingredient-links"
  "recipes/[recipeId]/ingredient-links/create:CreateRecipeIngredientLinkPage:recipes/123/ingredient-links/create"
  
  # Modifiers routes
  "modifiers:ModifiersListPage:modifiers"
  "modifiers/[modifierId]:ModifierDetailPage:modifiers/123"
  "modifiers/[modifierId]/options:ModifierOptionsListPage:modifiers/123/options"
  "modifiers/[modifierId]/options/[modifierOptionId]:ModifierOptionDetailPage:modifiers/123/options/456"
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
    
    echo -e "${YELLOW}Generating: ${component_name} at path: ${route_path}${NC}"
    
    # Run the generator
    if $GENERATOR_CMD --rootPath "$ROOT_PATH" --path "$route_path" --name "$component_name" --urlPath "$test_url_path" > /dev/null; then
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
    IFS=':' read -r route_path component_name test_url_path <<< "$route"
    
    # Update progress
    CURRENT=$((CURRENT+1))
    echo -e "${BLUE}[${CURRENT}/${TOTAL_PAGES}] Processing ${component_name}...${NC}"
    
    # Generate the page
    if generate_page "$route_path" "$component_name" "$test_url_path"; then
        SUCCEEDED=$((SUCCEEDED+1))
    else
        FAILED=$((FAILED+1))
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