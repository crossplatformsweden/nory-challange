'use client';

import { FC } from 'react';
import { useGetRecipeById } from '@nory/api-client';
import { useParams } from 'next/navigation';

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
 * import { useGetRecipeById } from '@nory/api-client';
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
  const recipeId = params.recipeId as string;

  const { data, isLoading, error } = useGetRecipeById(recipeId, {
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4" data-testid="recipe-detail-page">
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="loading loading-spinner loading-lg" data-testid="recipe-detail-loading"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4" data-testid="recipe-detail-page">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading recipe: {error.message}</span>
        </div>
      </div>
    );
  }

  const recipe = data?.data;

  return (
    <div className="container mx-auto px-4" data-testid="recipe-detail-page">
      <div className="flex justify-between items-center my-8">
        <h1 className="text-4xl font-bold" data-testid="recipe-detail-title">
          {recipe?.name}
        </h1>
        <div className="flex gap-4">
          <a
            href={`/recipes/${recipeId}/ingredient-links`}
            className="btn btn-primary"
            data-testid="recipe-detail-ingredients-link"
          >
            Manage Ingredients
          </a>
          <a href="/recipes" className="btn btn-outline" data-testid="recipe-detail-back-link">
            Back to Recipes
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" data-testid="recipe-detail-content">
        {/* Recipe Details */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4" data-testid="recipe-detail-description-title">
              Description
            </h2>
            <p data-testid="recipe-detail-description">
              {recipe?.description}
            </p>
          </div>
        </div>

        {/* Recipe Metadata */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4" data-testid="recipe-detail-metadata-title">
              Recipe Information
            </h2>
            <div className="stats shadow">
              <div className="stat">
                <div className="stat-title">ID</div>
                <div className="stat-value text-sm" data-testid="recipe-detail-id">{recipe?.id}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
