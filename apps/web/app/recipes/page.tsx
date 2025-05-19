'use client';

import { FC } from 'react';
import Link from 'next/link';
// Using the hook as specified in nextjsroutes.md
import { useListRecipes } from '@nory/api-client';

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
 * import { useListRecipes } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useListRecipes();
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

interface RecipesListPageProps {}

const RecipesListPage: FC<RecipesListPageProps> = () => {
  // Using the hook as specified in nextjsroutes.md
  const { data, isLoading, error } = useListRecipes({
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="recipes-list-page"
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold" data-testid="recipes-list-title">
          Recipes
        </h1>
        <Link
          href="/recipes/create"
          className="btn btn-primary"
          data-testid="recipes-list-create-button"
        >
          Add Recipe
        </Link>
      </div>

      {/* Description */}
      <div className="alert bg-base-200 mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="stroke-info h-6 w-6 shrink-0"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
        <div>
          <h3 className="font-bold">About Recipes</h3>
          <div className="text-sm">
            Recipes define the ingredients and quantities needed to prepare menu
            items. Create recipes and link them to menu items to track inventory
            usage.
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="recipes-list-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error" data-testid="recipes-list-error">
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
            Error loading recipes:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Recipes List */}
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        data-testid="recipes-list-content"
      >
        {data?.data?.map((recipe) => (
          <div
            key={recipe.id}
            className="card bg-base-100 shadow-xl"
            data-testid={`recipe-card-${recipe.id}`}
          >
            <div className="card-body">
              <h2
                className="card-title"
                data-testid={`recipe-name-${recipe.id}`}
              >
                {recipe.name}
              </h2>
              <p
                className="text-sm"
                data-testid={`recipe-description-${recipe.id}`}
              >
                {recipe.description || 'No description provided'}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <div
                  className="badge badge-outline"
                  data-testid={`recipe-badge-${recipe.id}`}
                >
                  Recipe
                </div>
                <div className="text-sm text-gray-500">
                  {/* Recipe details */}
                </div>
              </div>

              <div className="card-actions mt-4 justify-end">
                <Link
                  href={`/recipes/${recipe.id}/ingredient-links`}
                  className="btn btn-outline btn-sm"
                  data-testid={`recipe-ingredients-${recipe.id}`}
                >
                  Ingredients
                </Link>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="btn btn-primary btn-sm"
                  data-testid={`recipe-view-${recipe.id}`}
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {!isLoading && data?.data?.length === 0 && (
          <div
            className="alert alert-info col-span-full"
            data-testid="recipes-list-empty"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              No recipes found. Click the "Add Recipe" button to create one.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipesListPage;
