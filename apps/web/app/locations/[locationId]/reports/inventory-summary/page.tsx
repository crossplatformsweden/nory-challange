'use client';

import { FC, useMemo, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Removed useSearchParams as it's not used
// Import generated hooks and types
import { useListInventoryStock } from '@repo/api-client';
import type { InventoryStock } from '@repo/api-client';

// Import useQueries from React Query
// Assuming @tanstack/react-query is a dependency and the generated client works with it
import { useQueries } from '@tanstack/react-query';
// Assuming the fetcher function for useGetIngredientById is exposed
import { getIngredientById } from '@repo/api-client';

/**
 * // Update this page and corresponding test files. Make sure to use testId. And DaisyUI. Look in  utils/nextjsroutes.md To see what hook to use for this page. Source that hook and visualize/use it with daisyUI. Also look for the fakerjs implementation of that hook tanstack by genertaion orval noryApiClient. We will use the faker version in all tests. So all data coming will be random. So just test testId and hasValue() or similar. Use NextJS best practive for routing images etc. Not actual values. Use best pracitce for visualizing forms with use react-hook-form make sure check package.json with available libraries. Dont install any other libraries. For this File make sure you only change the page.tsx page.test.tsx and page.test.e2e.tsx. Verify using gh cli that its only max this 3 files changed. NO OTHER FILE. LEAVE THIS COMMENT IN THE FILE DO NOT REMOVE.
 */

/**
 * Implementation Guide:
 * 1. Use the hook from utils/nextjsroutes.md for data fetching (Interpreted as Next.js routing hooks for locationId and generated api client hooks)
 * 2. Implement the UI using DaisyUI components
 * 3. Add proper testIds to all interactive elements
 * 4. Use react-hook-form for any forms (N/A, no forms here)
 * 5. Use NextJS Image component for images (N/A, no images here)
 * 6. Use the orval generated client for API calls (`useListInventoryStock` and fetcher for `useGetIngredientById` via `useQueries`)
 * 7. Keep the testIds consistent with the test files
 */

/**
 * Use semantic class names from DaisyUI:
 * - card: for card components
 * - card-body: for card content
 * - card-title: for card titles
 * - text-2xl: for large text
 * - font-bold: for bold text
 */

// Define a sensible low stock threshold (e.g., 10 units or maybe 10% of expected usage?)
// The original code's condition `item.quantity <= item.quantity * 0.1` effectively checks `item.quantity <= 0`.
// Let's use a simple constant threshold for demonstration. Adjust as per business logic.
const LOW_STOCK_THRESHOLD = 10;

interface InventorySummaryReportPageProps {}

const InventorySummaryReportPage: FC<InventorySummaryReportPageProps> = () => {
  const { locationId } = useParams();
  const router = useRouter();
  // useSearchParams was unused, removed.

  // 1. Fetch the list of inventory stock items for the location
  const {
    data: inventoryData, // Renamed data to avoid conflict
    isLoading: isInventoryListLoading, // Renamed isLoading
    error: inventoryListError, // Renamed error
  } = useListInventoryStock(
    {
      locationId: locationId as string, // Ensure locationId is treated as string
    },
    {
      query: {
        enabled: !!locationId, // Only run this query if locationId is available
        // Add retry or other options as needed
      },
    }
  );

  const inventoryItems = inventoryData?.data; // Get the actual array of items

  // 2. Extract unique ingredient IDs from the fetched inventory items
  // Use useMemo to ensure this list is only recomputed when inventoryItems changes
  const uniqueIngredientIds = useMemo(() => {
    if (!inventoryItems) return [];
    return Array.from(
      new Set(inventoryItems.map((item) => item.ingredient.id))
    );
  }, [inventoryItems]); // Dependency array includes inventoryItems

  // 3. Use useQueries to fetch details for all unique ingredients in parallel
  // This is the correct way to fetch multiple related items based on a list from another query,
  // ensuring hooks are called at the top level based on a stable structure (the unique IDs array).
  const ingredientQueryResults = useQueries({
    queries: uniqueIngredientIds.map((id) => ({
      queryKey: ['ingredient', id], // Unique query key for each ingredient
      // Assuming getIngredientById is the fetcher function exported by @repo/api-client
      // It should return a Promise that resolves to the data shape expected by the generated hook.
      // Based on the original code's access `ingredientData?.data?.cost`,
      // we assume the fetcher returns an object like `{ data: { cost: number, ... } }`.
      queryFn: () => getIngredientById(id),
      enabled: !!id && !!inventoryItems, // Only run if ID is valid and we have inventory data
      staleTime: Infinity, // Ingredient data likely doesn't change often
      // Add error handling or other options as needed per ingredient query
    })),
  });

  // 4. Create a map from the ingredient query results for efficient lookup
  // Use useMemo to avoid recreating the map on every render if the results haven't changed
  const ingredientQueryResultMap = useMemo(() => {
    const map = new Map<string, (typeof ingredientQueryResults)[0]>();
    uniqueIngredientIds.forEach((id, index) => {
      // Map the ingredient ID to its corresponding result object from useQueries
      // Ensure index is within bounds, though useQueries should match uniqueIngredientIds length
      if (ingredientQueryResults[index]) {
        map.set(id, ingredientQueryResults[index]);
      }
    });
    return map;
  }, [uniqueIngredientIds, ingredientQueryResults]); // Dependencies: the list of IDs and the query results array

  // Handle navigation back using useCallback for stability
  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]); // Dependency on router object

  // 5. Calculate summary values using useMemo, looking up ingredient data from the map
  const totalValue = useMemo(() => {
    if (!inventoryItems) return 0;
    return inventoryItems.reduce((sum, item) => {
      // Look up the ingredient query result for the current item's ingredient ID using the map
      const ingredientQueryResult = ingredientQueryResultMap.get(
        item.ingredient.id
      );
      // Access the ingredient data and cost, defaulting to 0 if data is missing or loading
      // Access using ?.data?.data based on the assumed fetcher return structure
      const cost = ingredientQueryResult?.data?.data?.cost ?? 0;
      return sum + item.quantity * cost;
    }, 0);
  }, [inventoryItems, ingredientQueryResultMap]); // Dependencies on inventory items and the lookup map

  const totalItems = useMemo(
    () => inventoryItems?.length ?? 0,
    [inventoryItems]
  );

  // Calculate low stock items count using useMemo based on the defined threshold
  const lowStockItems = useMemo(() => {
    if (!inventoryItems) return 0;
    // Filter items where quantity is positive but below or equal to the threshold
    return inventoryItems.filter(
      (item) => item.quantity > 0 && item.quantity <= LOW_STOCK_THRESHOLD
    ).length;
  }, [inventoryItems]); // Dependency on inventory items

  // 6. Determine overall loading and error states
  // We are loading if the inventory list is loading OR any of the ingredient queries are loading
  const isLoading =
    isInventoryListLoading || ingredientQueryResults.some((q) => q.isLoading);
  // Report an error if the inventory list errored OR any of the ingredient queries errored
  const error =
    inventoryListError || ingredientQueryResults.find((q) => q.error)?.error;

  // 7. Prepare the data structure for displaying in the table using useMemo
  // This combines inventory item data with the fetched ingredient cost and loading state
  const displayedInventoryItems = useMemo(() => {
    if (!inventoryItems) return [];
    return inventoryItems.map((item: InventoryStock) => {
      // Look up the corresponding ingredient query result using the map
      const ingredientQueryResult = ingredientQueryResultMap.get(
        item.ingredient.id
      );
      // Access ingredient data assuming the structure { data: Ingredient }
      const ingredientData = ingredientQueryResult?.data?.data;
      const cost = ingredientData?.cost ?? 0; // Default cost to 0 if data missing
      const isIngredientLoading = ingredientQueryResult?.isLoading ?? true; // Default loading to true if result missing

      return {
        // Use the unique inventory stock item ID as the primary key for the table row
        id: item.id,
        ingredientId: item.ingredient.id, // Keep ingredient ID for reference if needed
        name: item.ingredient.name, // Get name from inventory list (already available)
        quantity: item.quantity,
        unit: item.ingredient.unit, // Get unit from inventory list (already available)
        costPerUnit: cost,
        totalCost: item.quantity * cost,
        isIngredientLoading: isIngredientLoading, // Pass loading state for this specific ingredient
      };
    });
  }, [inventoryItems, ingredientQueryResultMap]); // Dependencies on inventory items and the lookup map

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="inventory-summary-report-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="btn btn-circle btn-ghost mr-4"
            data-testid="inventory-summary-report-back-button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1
            className="text-3xl font-bold"
            data-testid="inventory-summary-report-title"
          >
            Inventory Summary Report
          </h1>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="inventory-summary-report-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="alert alert-error"
          data-testid="inventory-summary-report-error"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            Error loading inventory summary:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Report Content */}
      {!isLoading && !error && (
        <div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          data-testid="inventory-summary-report-content"
        >
          {/* Total Stock Value Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title"
                data-testid="inventory-summary-report-total-value-title"
              >
                Total Stock Value
              </h2>
              <p
                className="text-2xl font-bold"
                data-testid="inventory-summary-report-total-value"
              >
                ${totalValue.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Total Stock Items Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title"
                data-testid="inventory-summary-report-total-items-title"
              >
                Total Stock Items
              </h2>
              <p
                className="text-2xl font-bold"
                data-testid="inventory-summary-report-total-items"
              >
                {totalItems}
              </p>
            </div>
          </div>

          {/* Low Stock Items Card */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title"
                data-testid="inventory-summary-report-low-stock-title"
              >
                Low Stock Items
              </h2>
              <p
                className="text-2xl font-bold"
                data-testid="inventory-summary-report-low-stock"
              >
                {lowStockItems}
              </p>
            </div>
          </div>

          {/* Stock Items Table */}
          <div className="card bg-base-100 shadow-xl md:col-span-2 lg:col-span-3">
            <div className="card-body">
              <h2
                className="card-title mb-4"
                data-testid="inventory-summary-report-items-title"
              >
                Stock Items
              </h2>
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th data-testid="inventory-summary-report-table-header-ingredient">
                        Ingredient
                      </th>
                      <th data-testid="inventory-summary-report-table-header-quantity">
                        Quantity
                      </th>
                      <th data-testid="inventory-summary-report-table-header-value">
                        Value
                      </th>
                      <th data-testid="inventory-summary-report-table-header-status">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Display message if no items and not loading/error */}
                    {displayedInventoryItems.length === 0 &&
                      !isInventoryListLoading &&
                      !inventoryListError && (
                        <tr>
                          <td
                            colSpan={4}
                            className="py-4 text-center"
                            data-testid="inventory-summary-report-empty"
                          >
                            No inventory items found.
                          </td>
                        </tr>
                      )}

                    {/* Map over the prepared list of inventory items for the table rows */}
                    {displayedInventoryItems.map((item) => {
                      // Determine status based on the item's quantity and threshold
                      const status =
                        item.quantity <= 0
                          ? 'Out of Stock'
                          : item.quantity > 0 &&
                              item.quantity <= LOW_STOCK_THRESHOLD
                            ? 'Low Stock'
                            : 'In Stock'; // Quantity > LOW_STOCK_THRESHOLD

                      const badgeClass =
                        status === 'Out of Stock'
                          ? 'badge-error'
                          : status === 'Low Stock'
                            ? 'badge-warning'
                            : 'badge-success';

                      return (
                        <tr
                          key={item.id} // Use the unique inventory item ID as the key
                          data-testid={`inventory-summary-report-item-${item.id}`}
                        >
                          <td
                            data-testid={`inventory-summary-report-ingredient-${item.id}`}
                          >
                            {item.name}
                          </td>
                          <td
                            data-testid={`inventory-summary-report-quantity-${item.id}`}
                          >
                            {item.quantity} {item.unit}
                          </td>
                          <td
                            data-testid={`inventory-summary-report-value-${item.id}`}
                          >
                            {/* Show spinner if ingredient cost is still loading for this specific row */}
                            {item.isIngredientLoading ? (
                              <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                              // Display the calculated total cost for the item
                              `$${item.totalCost.toFixed(2)}`
                            )}
                          </td>
                          <td
                            data-testid={`inventory-summary-report-status-${item.id}`}
                          >
                            <span className={`badge ${badgeClass}`}>
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventorySummaryReportPage;
