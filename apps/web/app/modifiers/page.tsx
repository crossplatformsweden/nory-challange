'use client';

import { FC } from 'react';
import Link from 'next/link';
// Using the hook as specified in nextjsroutes.md
import { useListModifiers } from '@repo/api-client';

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
 * import { useListModifiers } from '@repo/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useListModifiers();
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

interface ModifiersListPageProps {}

const ModifiersListPage: FC<ModifiersListPageProps> = () => {
  // Using the hook as specified in nextjsroutes.md
  const { data, isLoading, error } = useListModifiers({
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="modifiers-list-page"
    >
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold" data-testid="modifiers-list-title">
          Modifiers
        </h1>
        <Link
          href="/modifiers/create"
          className="btn btn-primary"
          data-testid="modifiers-list-create-button"
        >
          Add Modifier
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
          <h3 className="font-bold">About Modifiers</h3>
          <div className="text-sm">
            Modifiers are groups of options that can be added to menu items,
            such as toppings, sizes, or special requests.
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="modifiers-list-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error" data-testid="modifiers-list-error">
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
            Error loading modifiers:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Modifiers List */}
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        data-testid="modifiers-list-content"
      >
        {data?.data?.map((modifier) => (
          <div
            key={modifier.id}
            className="card bg-base-100 shadow-xl"
            data-testid={`modifier-card-${modifier.id}`}
          >
            <div className="card-body">
              <h2
                className="card-title"
                data-testid={`modifier-name-${modifier.id}`}
              >
                {modifier.name}
              </h2>
              <p data-testid={`modifier-description-${modifier.id}`}>
                No description provided
              </p>

              <div
                className="badge badge-outline mt-2"
                data-testid={`modifier-type-${modifier.id}`}
              >
                Single selection
              </div>

              <div className="card-actions mt-4 justify-end">
                <Link
                  href={`/modifiers/${modifier.id}/options`}
                  className="btn btn-outline btn-sm"
                  data-testid={`modifier-options-${modifier.id}`}
                >
                  View Options
                </Link>
                <Link
                  href={`/modifiers/${modifier.id}`}
                  className="btn btn-primary btn-sm"
                  data-testid={`modifier-view-${modifier.id}`}
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
            data-testid="modifiers-list-empty"
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
              No modifiers found. Click the "Add Modifier" button to create one.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModifiersListPage;
