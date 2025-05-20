'use client';

import { FC } from 'react';
import Link from 'next/link';
import {
  useGetRecipeById,
  useListRecipeIngredientLinks,
} from '@repo/api-client';
import { useParams, useRouter } from 'next/navigation';

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
 * import { useGetRecipeById } from '@repo/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useGetRecipeById();
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

interface RecipeDetailPageProps {}

const RecipeDetailPage: FC<RecipeDetailPageProps> = () => {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.recipeId as string;

  // Using the hook as specified in nextjsroutes.md
  const { data, isLoading, error } = useGetRecipeById(recipeId, {
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  const { data: ingredientLinksData } = useListRecipeIngredientLinks(recipeId, {
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  if (error) {
    return (
      <div
        className="container mx-auto px-4 py-8"
        data-testid="recipe-detail-page"
      >
        {/* Page Header */}
        <div className="mb-6 flex items-center">
          <button
            onClick={handleGoBack}
            className="btn btn-circle btn-ghost mr-4"
            data-testid="recipe-detail-back-button"
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
          <h1 className="text-3xl font-bold" data-testid="recipe-detail-title">
            Error
          </h1>
        </div>

        <div className="alert alert-error" data-testid="recipe-detail-error">
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
            Error loading recipe:{' '}
            {error ? (error as Error).message : 'Unknown error'}
          </span>
        </div>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div
        className="container mx-auto px-4 py-8"
        data-testid="recipe-detail-page"
      >
        {/* Page Header */}
        <div className="mb-6 flex items-center">
          <button
            onClick={handleGoBack}
            className="btn btn-circle btn-ghost mr-4"
            data-testid="recipe-detail-back-button"
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
          <h1 className="text-3xl font-bold" data-testid="recipe-detail-title">
            Loading...
          </h1>
        </div>

        {/* Loading State */}
        <div
          className="my-8 flex justify-center"
          data-testid="recipe-detail-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  const recipe = data.data;

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="recipe-detail-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center">
        <button
          onClick={handleGoBack}
          className="btn btn-circle btn-ghost mr-4"
          data-testid="recipe-detail-back-button"
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
        <h1 className="text-3xl font-bold" data-testid="recipe-detail-title">
          {recipe.name}
        </h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="recipe-detail-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error" data-testid="recipe-detail-error">
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
            Error loading recipe:{' '}
            {error ? (error as Error).message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Recipe Details */}
      {!isLoading && !error && recipe && (
        <div data-testid="recipe-detail-content">
          <div className="grid gap-6">
            {/* Recipe Details */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="grid gap-6">
                  <div>
                    <h3 className="text-lg font-semibold">Description</h3>
                    <p
                      className="text-gray-600"
                      data-testid="recipe-detail-description"
                    >
                      {recipe.description || 'No description provided'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">Details</h3>
                    <p className="text-gray-600" data-testid="recipe-detail-id">
                      Recipe ID: {recipe.id}
                    </p>
                  </div>
                </div>

                <div>
                  <h3
                    className="text-lg font-semibold"
                    data-testid="recipe-detail-actions-title"
                  >
                    Actions
                  </h3>
                  <div className="card-actions mt-6 justify-end">
                    <Link
                      href={`/recipes/${recipe.id}/ingredient-links`}
                      className="btn btn-outline"
                      data-testid="recipe-detail-ingredients-link"
                    >
                      Manage Ingredients
                    </Link>
                    <Link
                      href={`/recipes/${recipe.id}/edit`}
                      className="btn btn-primary"
                      data-testid="recipe-detail-edit-button"
                    >
                      Edit Recipe
                    </Link>
                    <button
                      className="btn btn-error"
                      data-testid="recipe-detail-delete-button"
                    >
                      Delete Recipe
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient Links */}
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2
                  className="text-2xl font-bold"
                  data-testid="recipe-detail-ingredients-title"
                >
                  Ingredients
                </h2>
                <Link
                  href={`/recipes/${recipe.id}/ingredient-links`}
                  className="btn btn-sm btn-outline"
                  data-testid="recipe-detail-view-all-ingredients"
                >
                  View All Ingredients
                </Link>
              </div>
              <div data-testid="recipe-detail-ingredients-content">
                {ingredientLinksData?.data?.length ? (
                  <div
                    className="overflow-x-auto"
                    data-testid="recipe-detail-ingredients-table"
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Ingredient ID</th>
                          <th>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ingredientLinksData.data.map((link) => (
                          <tr
                            key={link.id}
                            data-testid={`recipe-ingredient-row-${link.id}`}
                          >
                            <td
                              data-testid={`recipe-ingredient-name-${link.id}`}
                            >
                              {link.ingredientId}
                            </td>
                            <td
                              data-testid={`recipe-ingredient-amount-${link.id}`}
                            >
                              {link.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div data-testid="recipe-detail-ingredients-empty">
                    No ingredients linked to this recipe.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeDetailPage;
