'use client';

import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useListInventoryStock } from '@nory/api-client';
import type { Ingredient, InventoryStock } from '@nory/api-client';

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
 * import { useListInventoryStock } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useListInventoryStock();
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

interface InventoryStockPageProps {}

interface InventoryStockWithIngredient extends InventoryStock {
  ingredient: Ingredient;
}

const InventoryStockPage: FC<InventoryStockPageProps> = () => {
  const { locationId } = useParams();
  const router = useRouter();
  const [selectedIngredient, setSelectedIngredient] = useState<string>('');

  const { data, isLoading, error } = useListInventoryStock(
    {
      locationId: locationId as string,
      ingredientId: selectedIngredient || undefined,
    },
    {
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    }
  );

  const stocks = data?.data as InventoryStockWithIngredient[] | undefined;

  const handleGoBack = () => {
    router.back();
  };

  // eslint-disable-next-line no-undef
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIngredient(e.target.value);
  };

  // Calculate total value using stocks
  const totalValue =
    stocks?.reduce((total, stock) => {
      return total + stock.quantity * (stock.ingredient.cost || 0);
    }, 0) || 0;

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="inventory-stock-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="btn btn-circle btn-ghost mr-4"
            data-testid="inventory-stock-back-button"
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
            data-testid="inventory-stock-title"
          >
            Inventory Stock
          </h1>
        </div>

        <Link
          href={`/locations/${locationId}/inventory-movements/record`}
          className="btn btn-primary"
          data-testid="inventory-stock-record-movement-button"
        >
          Record Movement
        </Link>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row">
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Filter by Ingredient</span>
          </label>
          <select
            className="select select-bordered w-full"
            value={selectedIngredient}
            onChange={handleFilterChange}
            data-testid="inventory-stock-ingredient-filter"
          >
            <option value="">All Ingredients</option>
            {stocks?.map((stock) => (
              <option key={stock.ingredientId} value={stock.ingredientId}>
                {stock.ingredient.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="inventory-stock-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error" data-testid="inventory-stock-error">
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
            Error loading inventory stock:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Inventory Stock Table */}
      {!isLoading && !error && (
        <div className="overflow-x-auto" data-testid="inventory-stock-content">
          <table className="table w-full">
            <thead>
              <tr>
                <th data-testid="inventory-stock-table-header-ingredient">
                  Ingredient
                </th>
                <th data-testid="inventory-stock-table-header-unit">Unit</th>
                <th data-testid="inventory-stock-table-header-quantity">
                  Current Stock
                </th>
                <th data-testid="inventory-stock-table-header-value">Value</th>
                <th data-testid="inventory-stock-table-header-actions">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {stocks?.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-4 text-center"
                    data-testid="inventory-stock-empty"
                  >
                    No inventory stock found. Record movements to update your
                    inventory.
                  </td>
                </tr>
              )}

              {stocks?.map((stock) => (
                <tr
                  key={stock.id}
                  data-testid={`inventory-stock-row-${stock.id}`}
                >
                  <td data-testid={`inventory-stock-ingredient-${stock.id}`}>
                    <div className="font-medium">{stock.ingredient.name}</div>
                  </td>
                  <td data-testid={`inventory-stock-unit-${stock.id}`}>
                    {stock.ingredient.unit}
                  </td>
                  <td data-testid={`inventory-stock-quantity-${stock.id}`}>
                    <span
                      className={`font-semibold ${stock.quantity <= 0 ? 'text-error' : ''}`}
                    >
                      {stock.quantity}
                    </span>
                  </td>
                  <td data-testid={`inventory-stock-value-${stock.id}`}>
                    ${/* DOES NOT HAVE COST */}
                    {/* {(
                      stock.quantity * (stock.cost || 0)
                    ).toFixed(2)} */}
                  </td>
                  <td>
                    <div className="flex space-x-2">
                      <Link
                        href={`/locations/${locationId}/inventory-movements/record?ingredientId=${stock.ingredientId}`}
                        className="btn btn-sm btn-outline"
                        data-testid={`inventory-stock-record-${stock.id}`}
                      >
                        Record Movement
                      </Link>
                      <Link
                        href={`/locations/${locationId}/ingredient-costs?ingredientId=${stock.ingredientId}`}
                        className="btn btn-sm btn-ghost"
                        data-testid={`inventory-stock-cost-${stock.id}`}
                      >
                        View Costs
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={3} className="text-right">
                  Total Value:
                </th>
                <th data-testid="inventory-stock-total-value">
                  ${totalValue.toFixed(2)}
                </th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default InventoryStockPage;
