'use client';

import { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import {
  useCreateLocationIngredientCost,
  useListIngredients,
  Ingredient,
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

/**
 * Example implementation using React Query and generated hooks:
 * 
 * import React from 'react';
 * import { useCreateLocationIngredientCost } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useCreateLocationIngredientCost();
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

interface CreateIngredientCostFormData {
  ingredientId: string;
  costPerUnit: number;
}

const CreateIngredientCostPage: FC = () => {
  const { locationId } = useParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateIngredientCostFormData>();

  const { data: ingredientsData, isLoading: isLoadingIngredients } =
    useListIngredients();
  const { mutate: createIngredientCost, isPending: isCreating } =
    useCreateLocationIngredientCost();

  const handleGoBack = () => {
    router.back();
  };

  const onSubmit = async (data: CreateIngredientCostFormData) => {
    const formData = {
      locationId: locationId as string,
      data: {
        ingredientId: data.ingredientId,
        costPerUnit: Number(data.costPerUnit),
      },
    };

    createIngredientCost(formData, {
      onSuccess: () => {
        router.push(`/locations/${locationId}/ingredient-costs`);
      },
    });
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="ingredient-cost-create-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={handleGoBack}
            className="btn btn-circle btn-ghost mr-4"
            data-testid="ingredient-cost-create-back-button"
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
            data-testid="ingredient-cost-create-title"
          >
            Create Ingredient Cost
          </h1>
        </div>
      </div>

      {/* Loading State */}
      {isLoadingIngredients && (
        <div
          className="my-8 flex justify-center"
          data-testid="ingredient-cost-create-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Form */}
      {!isLoadingIngredients && (
        <div
          className="card bg-base-100 shadow-xl"
          data-testid="ingredient-cost-create-form"
        >
          <div className="card-body">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              data-testid="ingredient-cost-create-form-element"
              noValidate
            >
              {/* Ingredient Selection */}
              <div className="form-control w-full">
                <label
                  className="label"
                  data-testid="ingredient-cost-create-ingredient-label"
                >
                  <span className="label-text">Ingredient</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  {...register('ingredientId', {
                    required: 'Ingredient is required',
                  })}
                  data-testid="ingredient-cost-create-ingredient-select"
                >
                  <option value="">Select an ingredient</option>
                  {ingredientsData?.data?.map((ingredient: Ingredient) => (
                    <option key={ingredient.id} value={ingredient.id}>
                      {ingredient.name}
                    </option>
                  ))}
                </select>
                {errors.ingredientId && (
                  <label
                    className="label"
                    data-testid="ingredient-cost-create-ingredient-error"
                  >
                    <span className="label-text-alt text-error">
                      {errors.ingredientId.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Cost Input */}
              <div className="form-control w-full">
                <label
                  className="label"
                  data-testid="ingredient-cost-create-cost-label"
                >
                  <span className="label-text">Cost</span>
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  className="input input-bordered w-full"
                  {...register('costPerUnit', {
                    required: 'Cost is required',
                    min: {
                      value: 0,
                      message: 'Cost must be greater than or equal to 0',
                    },
                  })}
                  data-testid="ingredient-cost-create-cost-input"
                />
                {errors.costPerUnit && (
                  <label
                    className="label"
                    data-testid="ingredient-cost-create-cost-error"
                  >
                    <span className="label-text-alt text-error">
                      {errors.costPerUnit.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleGoBack}
                  className="btn btn-ghost"
                  data-testid="ingredient-cost-create-cancel-button"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting || isCreating}
                  data-testid="ingredient-cost-create-submit-button"
                >
                  {isSubmitting || isCreating ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : (
                    'Create Cost'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateIngredientCostPage;
