'use client';

import { FC } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import {
  useListIngredients,
  useCreateRecipeIngredientLink,
  useGetRecipeById,
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

interface CreateRecipeIngredientLinkPageProps {}

interface FormValues {
  ingredientId: string;
  amount: number;
}

const CreateRecipeIngredientLinkPage: FC<
  CreateRecipeIngredientLinkPageProps
> = () => {
  const params = useParams();
  const router = useRouter();
  const recipeId = params.recipeId as string;

  // Form setup
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      ingredientId: '',
      amount: 1,
    },
  });

  // Fetch recipe details
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

  // Fetch ingredients for dropdown
  const {
    data: ingredientsData,
    isLoading: ingredientsLoading,
    error: ingredientsError,
  } = useListIngredients({
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  // Create ingredient link mutation
  const createIngredientLinkMutation = useCreateRecipeIngredientLink();

  const handleGoBack = () => {
    router.back();
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await createIngredientLinkMutation.mutateAsync({
        recipeId,
        data: {
          ingredientId: data.ingredientId,
          quantity: data.amount,
        },
      });

      // Navigate back to ingredient links page after successful creation
      router.push(`/recipes/${recipeId}/ingredient-links`);
    } catch (error) {
      console.error('Error creating ingredient link:', error);
    }
  };

  const isLoading =
    recipeLoading ||
    ingredientsLoading ||
    createIngredientLinkMutation.isPending;
  const isError = ingredientsError || createIngredientLinkMutation.isError;
  const error = ingredientsError || createIngredientLinkMutation.error;

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="create-recipe-ingredient-link-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center">
        <button
          onClick={handleGoBack}
          className="btn btn-circle btn-ghost mr-4"
          data-testid="create-recipe-ingredient-link-back-button"
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
          data-testid="create-recipe-ingredient-link-title"
        >
          {recipeData?.data?.name
            ? `Add Ingredient to ${recipeData.data.name}`
            : 'Add Recipe Ingredient'}
        </h1>
      </div>

      {/* Loading State */}
      {isLoading && !createIngredientLinkMutation.isPending && (
        <div
          className="my-8 flex justify-center"
          data-testid="create-recipe-ingredient-link-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {isError && (
        <div
          className="alert alert-error"
          data-testid="create-recipe-ingredient-link-error"
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
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Main Content */}
      {!recipeLoading && !ingredientsLoading && (
        <div
          data-testid="create-recipe-ingredient-link-content"
          className="space-y-6"
        >
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title"
                data-testid="create-recipe-ingredient-link-form-title"
              >
                Add Ingredient
              </h2>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="mt-4 space-y-4"
              >
                {/* Ingredient Dropdown */}
                <div className="form-control">
                  <label className="label" htmlFor="ingredientId">
                    <span className="label-text">Ingredient</span>
                  </label>
                  <Controller
                    name="ingredientId"
                    control={control}
                    rules={{ required: 'Ingredient is required' }}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="ingredientId"
                        className={`select select-bordered w-full ${errors.ingredientId ? 'select-error' : ''}`}
                        data-testid="create-recipe-ingredient-link-ingredient-select"
                        disabled={createIngredientLinkMutation.isPending}
                      >
                        <option value="" disabled>
                          Select an ingredient
                        </option>
                        {ingredientsData?.data?.map((ingredient) => (
                          <option
                            key={ingredient.id}
                            value={ingredient.id}
                            data-testid={`create-recipe-ingredient-link-ingredient-option-${ingredient.id}`}
                          >
                            {ingredient.name} ({ingredient.unit})
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  {errors.ingredientId && (
                    <div
                      className="text-error mt-1 text-sm"
                      data-testid="create-recipe-ingredient-link-ingredient-error"
                    >
                      {errors.ingredientId.message}
                    </div>
                  )}
                </div>

                {/* Amount Input */}
                <div className="form-control">
                  <label className="label" htmlFor="amount">
                    <span className="label-text">Amount</span>
                  </label>
                  <Controller
                    name="amount"
                    control={control}
                    rules={{
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be positive' },
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        id="amount"
                        type="number"
                        step="0.01"
                        className={`input input-bordered w-full ${errors.amount ? 'input-error' : ''}`}
                        data-testid="create-recipe-ingredient-link-amount-input"
                        disabled={createIngredientLinkMutation.isPending}
                      />
                    )}
                  />
                  {errors.amount && (
                    <div
                      className="text-error mt-1 text-sm"
                      data-testid="create-recipe-ingredient-link-amount-error"
                    >
                      {errors.amount.message}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={handleGoBack}
                    className="btn btn-ghost"
                    data-testid="create-recipe-ingredient-link-cancel-button"
                    disabled={createIngredientLinkMutation.isPending}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-testid="create-recipe-ingredient-link-submit-button"
                    disabled={createIngredientLinkMutation.isPending}
                  >
                    {createIngredientLinkMutation.isPending ? (
                      <>
                        <span className="loading loading-spinner loading-sm"></span>
                        Adding...
                      </>
                    ) : (
                      'Add Ingredient'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Recipe Details Summary */}
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title"
                data-testid="create-recipe-ingredient-link-recipe-title"
              >
                Recipe Details
              </h2>

              <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <span className="text-sm text-gray-500">Recipe ID:</span>
                  <p
                    className="font-mono text-xs"
                    data-testid="create-recipe-ingredient-link-recipe-id"
                  >
                    {recipeId}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Recipe Name:</span>
                  <p data-testid="create-recipe-ingredient-link-recipe-name">
                    {recipeData?.data?.name || 'Loading...'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Recipe Yield:</span>
                  <p data-testid="create-recipe-ingredient-link-recipe-yield">
                    {recipeData?.data?.id || 'Loading...'}
                  </p>
                </div>
              </div>

              {recipeData?.data?.description && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Description</h3>
                  <p>{recipeData.data.description}</p>
                </div>
              )}

              <div className="card-actions mt-4 justify-end">
                <Link
                  href={`/recipes/${recipeId}/ingredient-links`}
                  className="btn btn-outline"
                  data-testid="create-recipe-ingredient-link-recipe-link"
                >
                  View All Ingredients
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateRecipeIngredientLinkPage;
