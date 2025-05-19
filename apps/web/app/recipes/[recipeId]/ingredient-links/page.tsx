'use client';

import { FC, useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  useListRecipeIngredientLinks,
  useDeleteRecipeIngredientLink,
  useGetRecipeById,
  useGetIngredientById,
} from '@nory/api-client';

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

interface RecipeIngredientLinksPageProps {}

interface IngredientDetailsProps {
  ingredientId: string;
  onData: (data: { name: string; unit: string }) => void;
  onError: (error: Error) => void;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({
  ingredientId,
  onData,
  onError,
}) => {
  const { data, error } = useGetIngredientById(ingredientId, {
    query: {
      enabled: !!ingredientId,
    },
  });

  useEffect(() => {
    if (data?.data) {
      onData({
        name: data.data.name,
        unit: data.data.unit,
      });
    }
    if (error) {
      onError(
        error instanceof Error ? error : new Error('Failed to fetch ingredient')
      );
    }
  }, [data, error, onData, onError]);

  return null;
};

interface IngredientRowProps {
  ingredientId: string;
  quantity: number;
  onDelete: (id: string) => void;
}

const IngredientRow: FC<IngredientRowProps> = ({
  ingredientId,
  quantity,
  onDelete,
}) => {
  const { data, isLoading } = useGetIngredientById(ingredientId, {
    query: {
      enabled: !!ingredientId,
    },
  });

  if (isLoading) {
    return (
      <tr>
        <td colSpan={4} className="text-center">
          <span className="loading loading-spinner loading-sm"></span>
        </td>
      </tr>
    );
  }

  if (!data?.data) {
    return null;
  }

  return (
    <tr data-testid={`recipe-ingredient-link-row-${ingredientId}`}>
      <td data-testid={`recipe-ingredient-link-name-${ingredientId}`}>
        {data.data.name}
      </td>
      <td data-testid={`recipe-ingredient-link-amount-${ingredientId}`}>
        {quantity}
      </td>
      <td data-testid={`recipe-ingredient-link-unit-${ingredientId}`}>
        {data.data.unit}
      </td>
      <td>
        <button
          onClick={() => onDelete(ingredientId)}
          className="btn btn-error btn-sm"
          data-testid={`recipe-ingredient-link-delete-${ingredientId}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </td>
    </tr>
  );
};

const RecipeIngredientLinksPage: FC<RecipeIngredientLinksPageProps> = () => {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.recipeId as string;

  // Fetch recipe details to display recipe name
  const { data: recipeData, isLoading: recipeLoading } = useGetRecipeById(
    recipeId,
    {
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    }
  );

  // Fetch recipe ingredient links
  const {
    data: ingredientLinksData,
    isLoading: ingredientLinksLoading,
    error: ingredientLinksError,
    refetch,
  } = useListRecipeIngredientLinks(recipeId, {
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  // Delete ingredient link mutation
  const deleteIngredientLinkMutation = useDeleteRecipeIngredientLink();

  const [ingredients, setIngredients] = useState<
    Record<string, { name: string; unit: string }>
  >({});
  const [error, setError] = useState<Error | null>(null);

  // Get all unique ingredient IDs
  const ingredientIds = useMemo(() => {
    if (!ingredientLinksData?.data) return [];
    return [
      ...new Set(ingredientLinksData.data.map((link) => link.ingredientId)),
    ];
  }, [ingredientLinksData?.data]);

  const handleIngredientData = useCallback(
    (id: string, data: { name: string; unit: string }) => {
      setIngredients((prev) => {
        // Only update if the data has changed
        if (prev[id]?.name === data.name && prev[id]?.unit === data.unit) {
          return prev;
        }
        return {
          ...prev,
          [id]: data,
        };
      });
    },
    []
  );

  const handleIngredientError = useCallback((error: Error) => {
    setError((prev) => {
      if (prev?.message === error.message) {
        return prev;
      }
      return error;
    });
  }, []);

  // Memoize the IngredientDetails components to prevent unnecessary re-renders
  const ingredientDetailsComponents = useMemo(() => {
    return ingredientIds.map((id) => (
      <IngredientDetails
        key={id}
        ingredientId={id}
        onData={(data) => handleIngredientData(id, data)}
        onError={handleIngredientError}
      />
    ));
  }, [ingredientIds, handleIngredientData, handleIngredientError]);

  const handleGoBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleDeleteIngredientLink = useCallback(
    async (ingredientLinkId: string) => {
      try {
        await deleteIngredientLinkMutation.mutateAsync({
          recipeId,
          recipeIngredientLinkId: ingredientLinkId,
        });
        // Refetch ingredient links after successful deletion
        refetch();
      } catch (error) {
        console.error('Error deleting ingredient link:', error);
      }
    },
    [recipeId, deleteIngredientLinkMutation, refetch]
  );

  const isLoading = recipeLoading || ingredientLinksLoading;

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="recipe-ingredient-links-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center">
        <button
          onClick={handleGoBack}
          className="btn btn-circle btn-ghost mr-4"
          data-testid="recipe-ingredient-links-back-button"
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
          data-testid="recipe-ingredient-links-title"
        >
          <span data-testid="recipe-detail-name">
            {recipeData?.data?.name || 'Recipe'}
          </span>{' '}
          - Ingredients
        </h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="recipe-ingredient-links-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {(ingredientLinksError || error) && (
        <div
          className="alert alert-error"
          data-testid="recipe-ingredient-links-error"
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
            Error loading recipe ingredients:{' '}
            {ingredientLinksError?.message || error?.message || 'Unknown error'}
          </span>
        </div>
      )}

      {/* Main Content */}
      {!isLoading && !ingredientLinksError && !error && (
        <div
          data-testid="recipe-ingredient-links-content"
          className="space-y-6"
        >
          {/* Action Button */}
          <div className="flex justify-end">
            <Link
              href={`/recipes/${recipeId}/ingredient-links/create`}
              className="btn btn-primary"
              data-testid="recipe-ingredient-links-add-button"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-2 h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add Ingredient
            </Link>
          </div>

          {/* Ingredients Table */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title"
                data-testid="recipe-ingredient-links-table-title"
              >
                Ingredients
              </h2>

              {/* Table */}
              <div className="overflow-x-auto">
                <table
                  className="table w-full"
                  data-testid="recipe-ingredient-links-table"
                >
                  <thead>
                    <tr>
                      <th data-testid="recipe-ingredient-links-table-header-ingredient">
                        Ingredient
                      </th>
                      <th data-testid="recipe-ingredient-links-table-header-amount">
                        Amount
                      </th>
                      <th>Unit</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredientLinksData?.data?.length ? (
                      ingredientLinksData.data.map((link) => (
                        <IngredientRow
                          key={link.id}
                          ingredientId={link.ingredientId}
                          quantity={link.quantity}
                          onDelete={() => handleDeleteIngredientLink(link.id)}
                        />
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center"
                          data-testid="recipe-ingredient-links-empty"
                        >
                          No ingredients added yet. Click "Add Ingredient" to
                          add some.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Recipe Details Summary */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title"
                data-testid="recipe-ingredient-links-recipe-title"
              >
                Recipe Details
              </h2>

              <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm text-gray-500">Recipe ID:</span>
                  <p
                    className="font-mono text-xs"
                    data-testid="recipe-ingredient-links-recipe-id"
                  >
                    {recipeId}
                  </p>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <div className="flex flex-col gap-1">
                    <span className="text-sm text-gray-500">Description:</span>
                    <p
                      data-testid="recipe-ingredient-links-recipe-description"
                      className="text-sm"
                    >
                      {recipeData?.data?.description ||
                        'No description provided'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-actions mt-4 justify-end">
                <Link
                  href={`/recipes/${recipeId}`}
                  className="btn btn-outline"
                  data-testid="recipe-ingredient-links-recipe-link"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Render IngredientDetails components */}
      {ingredientDetailsComponents}
    </div>
  );
};

export default RecipeIngredientLinksPage;
