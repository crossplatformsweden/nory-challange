'use client';

import { FC } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useListInventoryStock, useGetIngredientById } from '@nory/api-client';
import type { InventoryStock } from '@nory/api-client';

/**
 * // Update this page and corresponding test files. Make sure to use testId. And DaisyUI. Look in  utils/nextjsroutes.md To see what hook to use for this page. Source that hook and visualize/use it with daisyUI. Also look for the fakerjs implementation of that hook tanstack by genertaion orval noryApiClient. We will use the faker version in all tests. So all data coming will be random. So just test testId and hasValue() or similar. Use NextJS best practive for routing images etc. Not actual values. Use best pracitce for visualizing forms with use react-hook-form make sure check package.json with available libraries. Dont install any other libraries. For this File make sure you only change the page.tsx page.test.tsx and page.test.e2e.tsx. Verify using gh cli that its only max this 3 files changed. NO OTHER FILE. LEAVE THIS COMMENT IN THE FILE DO NOT REMOVE.
 */

/**
 * Implementation Guide:
 * 1. Use the hook from utils/nextjsroutes.md for data fetching
 * 2. Implement the UI using DaisyUI components
 * 3. Add proper testIds to all interactive elements
 * 4. Use react-hook-form for any forms
 * 5. Use NextJS Image component for images
 * 6. Use the orval generated client for API calls
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

/**
 * Example implementation using React Query and generated hooks:
 * 
 * import React from 'react';
 * import { None } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = None();
 * 
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error loading locations: {error.message}</div>;
 * 
 *   return (
 *     <div className="card bg-base-100 shadow-xl">
 *       <h1>Locations</h1>
 *       <ul>
 *         {data?.map((location) => (
 *           <li key={location.id}>{location.name}</li>
 *         ))}
 *       </ul>
 *     </div>
 *   );
 * }
 * 
 
 */

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  costPerUnit: number;
  totalCost: number;
  isLoading: boolean;
}

// Custom hook for ingredient queries
const useIngredientQueries = (inventoryItems: InventoryStock[] | undefined) => {
  return (
    inventoryItems?.map((item) => {
      const { data: ingredientData, isLoading: isIngredientLoading } =
        useGetIngredientById(item.ingredient.id);
      return {
        id: item.ingredient.id,
        data: ingredientData,
        isLoading: isIngredientLoading,
      };
    }) || []
  );
};

interface InventorySummaryReportPageProps {}

const InventorySummaryReportPage: FC<InventorySummaryReportPageProps> = () => {
  const { locationId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data, isLoading, error } = useListInventoryStock({
    locationId: locationId as string,
  });

  // Use the custom hook
  const ingredientQueries = useIngredientQueries(data?.data);

  const handleGoBack = () => {
    router.back();
  };

  // Calculate summary values
  const totalValue =
    data?.data?.reduce((sum, item) => {
      const ingredientQuery = ingredientQueries.find(
        (q) => q.id === item.ingredient.id
      );
      const cost = ingredientQuery?.data?.data?.cost || 0;
      return sum + item.quantity * cost;
    }, 0) || 0;

  const totalItems = data?.data?.length || 0;

  // Default minimum quantity is 10% of the current stock
  const lowStockItems =
    data?.data?.filter((item) => {
      const minQuantity = item.quantity * 0.1;
      return item.quantity <= minQuantity;
    }).length || 0;

  const inventoryItems = data?.data?.map((item: InventoryStock) => {
    const ingredientQuery = ingredientQueries.find(
      (q) => q.id === item.ingredient.id
    );
    const cost = ingredientQuery?.data?.data?.cost || 0;
    return {
      id: item.id,
      name: item.ingredient.name,
      quantity: item.quantity,
      unit: item.ingredient.unit,
      costPerUnit: cost,
      totalCost: item.quantity * cost,
      isLoading: ingredientQuery?.isLoading,
    };
  });

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
                    {data?.data?.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center"
                          data-testid="inventory-summary-report-empty"
                        >
                          No inventory items found for the selected period.
                        </td>
                      </tr>
                    )}

                    {data?.data?.map((item: InventoryStock) => {
                      const ingredientQuery = ingredientQueries.find(
                        (q) => q.id === item.ingredient.id
                      );
                      const cost = ingredientQuery?.data?.data?.cost || 0;
                      return (
                        <tr
                          key={item.id}
                          data-testid={`inventory-summary-report-item-${item.id}`}
                        >
                          <td
                            data-testid={`inventory-summary-report-ingredient-${item.id}`}
                          >
                            {item.ingredient.name}
                          </td>
                          <td
                            data-testid={`inventory-summary-report-quantity-${item.id}`}
                          >
                            {item.quantity} {item.ingredient.unit}
                          </td>
                          <td
                            data-testid={`inventory-summary-report-value-${item.id}`}
                          >
                            {ingredientQuery?.isLoading ? (
                              <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                              `$${(item.quantity * cost).toFixed(2)}`
                            )}
                          </td>
                          <td
                            data-testid={`inventory-summary-report-status-${item.id}`}
                          >
                            <span
                              className={`badge ${
                                item.quantity <= 0
                                  ? 'badge-error'
                                  : item.quantity <= item.quantity * 0.1
                                    ? 'badge-warning'
                                    : 'badge-success'
                              }`}
                            >
                              {item.quantity <= 0
                                ? 'Out of Stock'
                                : item.quantity <= item.quantity * 0.1
                                  ? 'Low Stock'
                                  : 'In Stock'}
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
