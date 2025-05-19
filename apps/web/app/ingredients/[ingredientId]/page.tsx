'use client';

import { FC } from 'react';
import { useGetIngredientById } from '@nory/api-client';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

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
 * import { useGetIngredientById } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useGetIngredientById();
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

interface IngredientDetailPageProps {}

const IngredientDetailPage: FC<IngredientDetailPageProps> = () => {
  const params = useParams();
  const router = useRouter();
  const ingredientId = params.ingredientId as string;

  const { data, isLoading, error } = useGetIngredientById(ingredientId, {
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="ingredient-detail-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center">
        <button
          onClick={handleGoBack}
          className="btn btn-circle btn-ghost mr-4"
          data-testid="ingredient-detail-back-button"
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
          data-testid="ingredient-detail-title"
        >
          Ingredient Details
        </h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="ingredient-detail-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div
          className="alert alert-error"
          data-testid="ingredient-detail-error"
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
            Error loading ingredient:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Ingredient Details */}
      {!isLoading && !error && data?.data && (
        <div
          className="card bg-base-100 shadow-xl"
          data-testid="ingredient-detail-content"
        >
          <div className="card-body">
            <h2
              className="card-title text-2xl"
              data-testid="ingredient-detail-name"
            >
              {data.data.name}
            </h2>

            <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="stat bg-base-200 rounded-box">
                <div className="stat-title">Unit</div>
                <div
                  className="stat-value text-lg"
                  data-testid="ingredient-detail-unit"
                >
                  {data.data.unit}
                </div>
              </div>

              {data.data.cost !== null && data.data.cost !== undefined && (
                <div className="stat bg-base-200 rounded-box">
                  <div className="stat-title">Cost per Unit</div>
                  <div
                    className="stat-value text-lg"
                    data-testid="ingredient-detail-cost"
                  >
                    ${data.data.cost.toFixed(2)}
                  </div>
                </div>
              )}
            </div>

            <div className="divider"></div>

            <h3 className="mb-4 text-xl font-semibold">Related Information</h3>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Link
                href={`/recipes?ingredientId=${data.data.id}`}
                className="btn btn-outline"
                data-testid="ingredient-detail-recipes-link"
              >
                View Recipes Using This Ingredient
              </Link>

              <Link
                href={`/locations?ingredientId=${data.data.id}`}
                className="btn btn-outline"
                data-testid="ingredient-detail-locations-link"
              >
                View Stock Levels by Location
              </Link>
            </div>

            <div className="card-actions mt-6 justify-end">
              <Link
                href={`/ingredients/${data.data.id}/edit`}
                className="btn btn-primary"
                data-testid="ingredient-detail-edit-button"
              >
                Edit Ingredient
              </Link>
              <button
                className="btn btn-error"
                data-testid="ingredient-detail-delete-button"
              >
                Delete Ingredient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientDetailPage;
