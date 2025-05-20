'use client';

import { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useListLocationIngredientCosts } from '@repo/api-client';

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
 * import { useListLocationIngredientCosts } from '@repo/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useListLocationIngredientCosts();
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

interface IngredientCostsListPageProps {}

const IngredientCostsListPage: FC<IngredientCostsListPageProps> = () => {
  const { locationId } = useParams();
  const router = useRouter();

  const { data, isLoading, error } = useListLocationIngredientCosts(
    locationId as string
  );

  const handleGoBack = () => {
    router.back();
  };

  const handleCreateClick = () => {
    router.push(`/locations/${locationId}/ingredient-costs/create`);
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="ingredient-costs-list-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="btn btn-circle btn-ghost mr-4"
            data-testid="ingredient-costs-list-back-button"
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
            data-testid="ingredient-costs-list-title"
          >
            Ingredient Costs
          </h1>
        </div>
        <button
          onClick={handleCreateClick}
          className="btn btn-primary"
          data-testid="ingredient-costs-list-create-button"
        >
          Add New Cost
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="ingredient-costs-list-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="alert alert-error"
          data-testid="ingredient-costs-list-error"
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
            Error loading ingredient costs:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Content */}
      {!isLoading && !error && (
        <div
          className="card bg-base-100 shadow-xl"
          data-testid="ingredient-costs-list-content"
        >
          <div className="card-body">
            {data?.data?.length === 0 ? (
              <div
                className="text-center"
                data-testid="ingredient-costs-list-empty"
              >
                <p className="mb-4">No ingredient costs found.</p>
                <button
                  onClick={handleCreateClick}
                  className="btn btn-primary"
                  data-testid="ingredient-costs-list-empty-create-button"
                >
                  Add Your First Cost
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead>
                    <tr>
                      <th data-testid="ingredient-costs-list-table-header-ingredient">
                        Ingredient
                      </th>
                      <th data-testid="ingredient-costs-list-table-header-cost">
                        Cost
                      </th>
                      <th data-testid="ingredient-costs-list-table-header-unit">
                        Unit
                      </th>
                      <th data-testid="ingredient-costs-list-table-header-actions">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.data?.map((cost) => (
                      <tr
                        key={cost.id}
                        data-testid={`ingredient-costs-list-item-${cost.id}`}
                      >
                        <td
                          data-testid={`ingredient-costs-list-ingredient-${cost.id}`}
                        >
                          {cost.ingredientId}
                        </td>
                        <td
                          data-testid={`ingredient-costs-list-cost-${cost.id}`}
                        >
                          ${cost.costPerUnit.toFixed(2)}
                        </td>
                        <td
                          data-testid={`ingredient-costs-list-unit-${cost.id}`}
                        >
                          {cost.ingredientId}
                        </td>
                        <td>
                          <button
                            onClick={() =>
                              router.push(
                                `/locations/${locationId}/ingredient-costs/${cost.id}`
                              )
                            }
                            className="btn btn-ghost btn-sm"
                            data-testid={`ingredient-costs-list-view-button-${cost.id}`}
                          >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientCostsListPage;
