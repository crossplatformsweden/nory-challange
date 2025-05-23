'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  useGetRecipeById,
  useListRecipeIngredientLinks,
} from '@repo/api-client';
import { useParams, useRouter } from 'next/navigation';
import { RecipeIngredientRow } from "./RecipeIngredientRow";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/ui/components/ui/table";
import { Skeleton } from "@repo/ui/components/ui/skeleton";

// The comment above is preserved as requested, though some instructions might conflict with current file structure (e.g. DaisyUI vs Shadcn/ui)
// I will prioritize consistency with the existing codebase's UI component library.

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

interface IngredientCostState {
  cost: number | null;
  isLoading: boolean;
  isError: boolean;
}

const RecipeDetailPage: FC<RecipeDetailPageProps> = () => {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.recipeId as string;

  const { data: recipeData, isLoading: recipeLoading, error: recipeError } = useGetRecipeById(recipeId, {
    query: { refetchOnMount: true, refetchOnWindowFocus: false, retry: false },
  });

  const { data: ingredientLinksData, isLoading: ingredientLinksLoading } = useListRecipeIngredientLinks(recipeId, {
    query: { refetchOnMount: true, refetchOnWindowFocus: false, retry: false },
  });

  const [ingredientCostStates, setIngredientCostStates] = useState<Record<string, IngredientCostState>>({});

  const handleCostUpdate = useCallback((recipeIngredientLinkId: string, cost: number | null, isLoading: boolean, isError: boolean) => {
    setIngredientCostStates(prevStates => ({
      ...prevStates,
      [recipeIngredientLinkId]: { cost, isLoading, isError },
    }));
  }, []);
  
  const totalRecipeCostInfo = useMemo(() => {
    let totalCost = 0;
    let isCalculating = false;
    let hasError = false;
    let ingredientsAvailable = false;

    if (ingredientLinksLoading) {
      return { display: "Calculating...", isLoading: true, isError: false };
    }

    if (ingredientLinksData?.data && ingredientLinksData.data.length > 0) {
      ingredientsAvailable = true;
      for (const link of ingredientLinksData.data) {
        const state = ingredientCostStates[link.id];
        if (!state || state.isLoading) {
          isCalculating = true; // One ingredient is still loading its cost
          break; 
        }
        if (state.isError) {
          hasError = true; 
          // We can choose to stop calculation here or sum what we have and show error
        }
        if (state.cost !== null) {
          totalCost += state.cost;
        }
      }
    } else {
      // No ingredients linked, or still loading links
      return { display: "N/A", isLoading: ingredientLinksLoading, isError: false };
    }

    if (!ingredientsAvailable && !ingredientLinksLoading) { // No ingredients, and links have loaded
        return { display: "0.00", isLoading: false, isError: false }; // Or "N/A" if preferred for no ingredients
    }
    if (isCalculating) return { display: "Calculating...", isLoading: true, isError: false };
    // If there was an error for any ingredient, reflect it in the total.
    // You might want a more nuanced message if some costs are summed but others errored.
    if (hasError) return { display: "Error", isLoading: false, isError: true }; 
    return { display: totalCost.toFixed(2), isLoading: false, isError: false };
  }, [ingredientLinksData, ingredientCostStates, ingredientLinksLoading]);

  const handleGoBack = () => {
    router.back();
  };

  if (recipeError) {
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
            {recipeError ? (recipeError as Error).message : 'Unknown error'}
          </span>
        </div>
      </div>
    );
  }

  if (recipeLoading || !recipeData?.data) {
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

        {/* Loading State for main recipe data */}
        <div
          className="my-8 flex justify-center"
          data-testid="recipe-detail-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      </div>
    );
  }

  const recipe = recipeData.data;

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

      {/* Loading State for main recipe data */}
      {recipeLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="recipe-detail-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State for main recipe data */}
      {recipeError && (
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
            {recipeError ? (recipeError as Error).message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Recipe Details */}
      {!recipeLoading && !recipeError && recipe && (
        <div data-testid="recipe-detail-content">
          <div className="grid gap-6">
            {/* Recipe Details Card */}
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <div className="grid gap-6">
                  <div>
                    <h3 className="card-title">Description</h3>
                    <p data-testid="recipe-detail-description">
                      {recipe.description || "No description provided"}
                    </p>
                  </div>

                  <div>
                    <h3 className="card-title">Details</h3>
                    <p data-testid="recipe-detail-id">Recipe ID: {recipe.id}</p>
                  </div>
                </div>
                
                {/* Total Recipe Cost Display */}
                <div className="mt-4">
                  <h3 className="text-xl font-semibold">Total Recipe Cost</h3>
                  <p 
                    data-testid="recipe-total-cost" 
                    className={`text-2xl font-bold ${totalRecipeCostInfo.isLoading ? 'text-gray-500' : totalRecipeCostInfo.isError ? 'text-red-500' : ''}`}
                  >
                    {totalRecipeCostInfo.display}
                  </p>
                  {totalRecipeCostInfo.isLoading && !totalRecipeCostInfo.isError && <Skeleton className="h-8 w-1/4 mt-1" data-testid="recipe-total-cost-loading"/>}
                  {totalRecipeCostInfo.isError && <span className="text-sm text-red-500" data-testid="recipe-total-cost-error">Error calculating total cost.</span>}
                </div>

                <div className="card-actions mt-6 justify-end">
                  <h3
                    className="text-lg font-semibold sr-only" 
                    data-testid="recipe-detail-actions-title"
                  >
                    Actions
                  </h3>
                    <Link
                      href={`/recipes/${recipe.id}/ingredient-links`}
                      className="btn btn-outline"
                      data-testid="recipe-detail-manage-ingredients-link"
                    >
                      Manage Ingredients ({ingredientLinksData?.data?.length ?? 0})
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

            {/* Ingredients Table */}
            <div className="mt-8">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-2xl font-bold" data-testid="recipe-detail-ingredients-title">
                  Ingredients
                </h2>
                {/* Link to manage ingredients can be kept or removed based on product decision, manage button is in card above */}
                 <Link
                    href={`/recipes/${recipe.id}/ingredient-links`}
                    className="btn btn-sm btn-outline"
                    data-testid="recipe-detail-view-all-ingredients-table-link"
                  >
                    Manage Ingredients
                  </Link>
              </div>
              <div data-testid="recipe-detail-ingredients-content">
                {ingredientLinksLoading && ( // Loading skeleton for the table
                  <div className="flex flex-col gap-2 py-4" data-testid="recipe-ingredients-loading-skeleton">
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                    <Skeleton className="h-10 w-full" />
                  </div>
                )}
                {!ingredientLinksLoading && ingredientLinksData?.data?.length ? (
                  <div className="overflow-x-auto" data-testid="recipe-detail-ingredients-table-container">
                    <Table data-testid="recipe-detail-ingredients-table">
                      <TableHeader>
                        <TableRow>
                          <TableHead>Ingredient Name</TableHead>
                          <TableHead className="text-right">Cost per Unit</TableHead>
                          <TableHead className="text-right">Quantity</TableHead>
                          <TableHead className="text-right">Total Ingredient Cost</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {ingredientLinksData.data.map((link) => (
                          <RecipeIngredientRow
                            key={link.id}
                            recipeIngredientLinkId={link.id}
                            ingredientId={link.ingredientId}
                            quantity={link.quantity}
                            onCostUpdate={handleCostUpdate} // Pass the callback here
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  !ingredientLinksLoading && ( // Only show "no ingredients" if not loading and no data
                    <div data-testid="recipe-detail-ingredients-empty" className="py-4 text-center">
                      No ingredients linked to this recipe.
                    </div>
                  )
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
