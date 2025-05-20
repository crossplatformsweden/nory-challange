'use client';

import { FC } from 'react';
import { useCreateLocationMenuItem } from '@nory/api-client';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
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
 * import { useCreateLocationMenuItem } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useCreateLocationMenuItem();
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

interface CreateMenuItemFormData {
  recipeId: string;
  price: number;
  category: string;
  description: string;
  isActive: boolean;
  modifierIds?: string[] | null;
}

interface CreateMenuItemPageProps {}

const CreateMenuItemPage: FC<CreateMenuItemPageProps> = () => {
  const { locationId } = useParams();
  const router = useRouter();
  const { mutate, isPending, error } = useCreateLocationMenuItem();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateMenuItemFormData>({
    defaultValues: {
      recipeId: '',
      price: undefined,
      category: '',
      description: '',
      isActive: true,
      modifierIds: null,
    },
  });

  const onSubmit = (data: CreateMenuItemFormData) => {
    mutate(
      {
        locationId: locationId as string,
        data: {
          recipeId: data.recipeId,
          price: Number(data.price),
          modifierIds: data.modifierIds,
        },
      },
      {
        onSuccess: () => {
          router.push(`/locations/${locationId}/menu-items`);
        },
      }
    );
  };

  const handleBack = () => {
    router.push(`/locations/${locationId}/menu-items`);
  };

  return (
    <div
      className="card bg-base-100 shadow-xl"
      data-testid="create-menu-item-page"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h1
            className="card-title text-2xl font-bold"
            data-testid="create-menu-item-title"
          >
            Create Menu Item
          </h1>
          <button
            onClick={handleBack}
            className="btn btn-ghost"
            data-testid="create-menu-item-back-button"
          >
            Back to List
          </button>
        </div>

        <div className="divider"></div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          data-testid="create-menu-item-form"
        >
          <div className="space-y-4">
            <div className="form-control">
              <label className="label" htmlFor="recipeId">
                <span className="label-text">Recipe ID</span>
              </label>
              <input
                type="text"
                id="recipeId"
                className={`input input-bordered ${errors.recipeId ? 'input-error' : ''}`}
                data-testid="create-menu-item-recipe-id-input"
                {...register('recipeId', { required: 'Recipe ID is required' })}
              />
              {errors.recipeId && (
                <label className="label">
                  <span
                    className="label-text-alt text-error"
                    data-testid="create-menu-item-recipe-id-error"
                  >
                    {errors.recipeId.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="price">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                id="price"
                step="0.01"
                min="0"
                className={`input input-bordered ${errors.price ? 'input-error' : ''}`}
                data-testid="create-menu-item-price-input"
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                })}
              />
              {errors.price && (
                <label className="label">
                  <span
                    className="label-text-alt text-error"
                    data-testid="create-menu-item-price-error"
                  >
                    {errors.price.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="category">
                <span className="label-text">Category</span>
              </label>
              <input
                type="text"
                id="category"
                className={`input input-bordered ${errors.category ? 'input-error' : ''}`}
                data-testid="create-menu-item-category-input"
                {...register('category', { required: 'Category is required' })}
              />
              {errors.category && (
                <label className="label">
                  <span
                    className="label-text-alt text-error"
                    data-testid="create-menu-item-category-error"
                  >
                    {errors.category.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label" htmlFor="description">
                <span className="label-text">Description</span>
              </label>
              <textarea
                id="description"
                className={`textarea textarea-bordered ${errors.description ? 'textarea-error' : ''}`}
                data-testid="create-menu-item-description-input"
                {...register('description')}
              />
              {errors.description && (
                <label className="label">
                  <span
                    className="label-text-alt text-error"
                    data-testid="create-menu-item-description-error"
                  >
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Active</span>
                <input
                  type="checkbox"
                  className="toggle"
                  data-testid="create-menu-item-active-input"
                  {...register('isActive')}
                />
              </label>
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                data-testid="create-menu-item-submit-button"
                disabled={isPending}
              >
                {isPending ? (
                  <span
                    className="loading loading-spinner loading-sm"
                    role="status"
                  />
                ) : (
                  'Create Menu Item'
                )}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div
            className="alert alert-error mt-4"
            data-testid="create-menu-item-error"
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
            <span>Error creating menu item: {error.message}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateMenuItemPage;
