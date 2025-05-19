'use client';

import { FC } from 'react';
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
  const { data, isLoading, error } = useListRecipes({
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4" data-testid="recipes-list-page">
        <div className="flex justify-center items-center min-h-[60vh]">
          <span className="loading loading-spinner loading-lg" data-testid="recipes-list-loading"></span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4" data-testid="recipes-list-page">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Error loading recipes: {error.message}</span>
        </div>
      </div>
    );
  }

  const recipes = data?.data || [];

  return (
    <div className="container mx-auto px-4" data-testid="recipes-list-page">
      <h1 className="text-4xl font-bold my-8" data-testid="recipes-list-title">
        Recipes
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="recipes-list-content">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl" data-testid={`recipe-title-${recipe.id}`}>
                {recipe.name}
              </h2>
              <p data-testid={`recipe-description-${recipe.id}`}>
                {recipe.description}
              </p>
              <div className="card-actions justify-end">
                <a
                  href={`/recipes/${recipe.id}`}
                  className="btn btn-primary"
                  data-testid={`recipe-link-${recipe.id}`}
                >
                  View Recipe
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipesListPage;
