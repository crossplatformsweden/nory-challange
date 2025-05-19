'use client';

import { FC, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useListInventoryMovements } from '@nory/api-client';
import type { ListInventoryMovementsType } from '@nory/api-client';

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
 * import { useListInventoryMovements } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useListInventoryMovements();
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

interface InventoryMovementsTimelinePageProps {}

const InventoryMovementsTimelinePage: FC<
  InventoryMovementsTimelinePageProps
> = () => {
  const { locationId } = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedIngredient, setSelectedIngredient] = useState<string>(
    searchParams.get('ingredientId') || ''
  );
  const [selectedMovementType, setSelectedMovementType] = useState<string>(
    searchParams.get('movementType') || ''
  );
  const [selectedStaff, setSelectedStaff] = useState<string>(
    searchParams.get('staffId') || ''
  );

  const handleFilterChange = (filter: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    switch (filter) {
      case 'ingredient':
        setSelectedIngredient(value);
        if (value) {
          params.set('ingredientId', value);
        } else {
          params.delete('ingredientId');
        }
        break;
      case 'movementType':
        setSelectedMovementType(value);
        if (value) {
          params.set('movementType', value);
        } else {
          params.delete('movementType');
        }
        break;
      case 'staff':
        setSelectedStaff(value);
        if (value) {
          params.set('staffId', value);
        } else {
          params.delete('staffId');
        }
        break;
    }

    // Update the URL with the new parameters
    router.push(`?${params.toString()}`);
  };

  const { data, isLoading, error } = useListInventoryMovements({
    locationId: locationId as string,
    startTime: searchParams.get('startTime') || undefined,
    endTime: searchParams.get('endTime') || undefined,
    ingredientId: selectedIngredient === '' ? undefined : selectedIngredient,
    type:
      selectedMovementType === ''
        ? undefined
        : (selectedMovementType as ListInventoryMovementsType),
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="inventory-movements-timeline-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="btn btn-circle btn-ghost mr-4"
            data-testid="inventory-movements-timeline-back-button"
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
            data-testid="inventory-movements-timeline-title"
          >
            Inventory Timeline
          </h1>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="inventory-movements-timeline-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="alert alert-error"
          data-testid="inventory-movements-timeline-error"
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
            Error loading inventory timeline:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Filters */}
      {!isLoading && !error && (
        <div
          className="mb-6 grid gap-4 md:grid-cols-3"
          data-testid="inventory-movements-timeline-filters"
        >
          <select
            className="select select-bordered w-full"
            value={selectedIngredient}
            onChange={(e) => handleFilterChange('ingredient', e.target.value)}
            data-testid="inventory-movements-timeline-ingredient-filter"
          >
            <option value="">All Ingredients</option>
            {data?.data?.map((movement) => (
              <option
                key={movement.ingredient.id}
                value={movement.ingredient.id}
              >
                {movement.ingredient.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={selectedMovementType}
            onChange={(e) => handleFilterChange('movementType', e.target.value)}
            data-testid="inventory-movements-timeline-movement-type-filter"
          >
            <option value="">All Movement Types</option>
            <option value="restock">Restock</option>
            <option value="waste">Waste</option>
            <option value="sale">Sale</option>
            <option value="adjustment">Adjustment</option>
            <option value="transfer_in">Transfer In</option>
            <option value="transfer_out">Transfer Out</option>
          </select>

          <select
            className="select select-bordered w-full"
            value={selectedStaff}
            onChange={(e) => handleFilterChange('staff', e.target.value)}
            data-testid="inventory-movements-timeline-staff-filter"
          >
            <option value="">All Staff</option>
            {data?.data?.map((movement) => (
              <option
                key={movement.recordedByStaffId || ''}
                value={movement.recordedByStaffId || ''}
              >
                {movement.recordedByStaffId || 'Unknown Staff'}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Timeline Content */}
      {!isLoading && !error && (
        <div
          className="card bg-base-100 shadow-xl"
          data-testid="inventory-movements-timeline-content"
        >
          <div className="card-body">
            <h2
              className="card-title mb-4"
              data-testid="inventory-movements-timeline-items-title"
            >
              Movement History
            </h2>
            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th data-testid="inventory-movements-timeline-table-header-date">
                      Date
                    </th>
                    <th data-testid="inventory-movements-timeline-table-header-ingredient">
                      Ingredient
                    </th>
                    <th data-testid="inventory-movements-timeline-table-header-type">
                      Type
                    </th>
                    <th data-testid="inventory-movements-timeline-table-header-quantity">
                      Quantity
                    </th>
                    <th data-testid="inventory-movements-timeline-table-header-staff">
                      Staff
                    </th>
                    <th data-testid="inventory-movements-timeline-table-header-notes">
                      Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.data?.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-4 text-center"
                        data-testid="inventory-movements-timeline-empty"
                      >
                        No inventory movements found for the selected filters.
                      </td>
                    </tr>
                  )}

                  {data?.data?.map((movement) => (
                    <tr
                      key={movement.id}
                      data-testid={`inventory-movements-timeline-item-${movement.id}`}
                    >
                      <td
                        data-testid={`inventory-movements-timeline-date-${movement.id}`}
                      >
                        {new Date(movement.createdAt).toLocaleString()}
                      </td>
                      <td
                        data-testid={`inventory-movements-timeline-ingredient-${movement.id}`}
                      >
                        {movement.ingredient.name}
                      </td>
                      <td
                        data-testid={`inventory-movements-timeline-type-${movement.id}`}
                      >
                        <span
                          className={`badge ${
                            movement.type === 'restock'
                              ? 'badge-success'
                              : movement.type === 'waste'
                                ? 'badge-error'
                                : movement.type === 'sale'
                                  ? 'badge-warning'
                                  : movement.type === 'adjustment'
                                    ? 'badge-secondary'
                                    : movement.type === 'transfer_in'
                                      ? 'badge-info'
                                      : 'badge-neutral'
                          }`}
                        >
                          {movement.type}
                        </span>
                      </td>
                      <td
                        data-testid={`inventory-movements-timeline-quantity-${movement.id}`}
                      >
                        {movement.quantity} {movement.ingredient.unit}
                      </td>
                      <td
                        data-testid={`inventory-movements-timeline-staff-${movement.id}`}
                      >
                        {movement.recordedByStaffId || 'Unknown Staff'}
                      </td>
                      <td
                        data-testid={`inventory-movements-timeline-notes-${movement.id}`}
                      >
                        {movement.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryMovementsTimelinePage;
