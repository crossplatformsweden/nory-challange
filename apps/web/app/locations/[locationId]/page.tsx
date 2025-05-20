'use client';

import { FC } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
// Using the hook as specified in nextjsroutes.md
import { useGetLocationById } from '@nory/api-client';

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
 * import { useGetLocationById } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useGetLocationById();
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

interface LocationDetailPageProps {}

const LocationDetailPage: FC<LocationDetailPageProps> = () => {
  const params = useParams();
  const router = useRouter();
  const locationId = params.locationId as string;

  // Using the hook as specified in nextjsroutes.md
  const { data, isLoading, error } = useGetLocationById(locationId, {
    query: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      retry: false,
    },
  });

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="location-detail-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center">
        <button
          onClick={handleGoBack}
          className="btn btn-circle btn-ghost mr-4"
          data-testid="location-detail-back-button"
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
        <h1 className="text-3xl font-bold" data-testid="location-detail-title">
          Location Details
        </h1>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div
          className="my-8 flex justify-center"
          data-testid="location-detail-loading"
        >
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="alert alert-error" data-testid="location-detail-error">
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
            Error loading location:{' '}
            {error instanceof Error ? error.message : 'Unknown error'}
          </span>
        </div>
      )}

      {/* Location Details */}
      {!isLoading && !error && data?.data && (
        <div data-testid="location-detail-content">
          {/* Basic Information Card */}
          <div className="card bg-base-100 mb-6 shadow-xl">
            <div className="card-body">
              <h2
                className="card-title text-2xl"
                data-testid="location-detail-name"
              >
                {data.data.name}
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">Address</h3>
                    <p
                      className="whitespace-pre-line"
                      data-testid="location-detail-address"
                    >
                      {data.data.address || 'No address provided'}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold">
                      Contact Information
                    </h3>
                    <p data-testid="location-detail-phone">
                      <span className="font-medium">Phone:</span> Not provided
                    </p>
                    <p data-testid="location-detail-email">
                      <span className="font-medium">Email:</span> Not provided
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold">Opening Hours</h3>
                  <p
                    className="whitespace-pre-line"
                    data-testid="location-detail-hours"
                  >
                    No opening hours specified
                  </p>
                </div>
              </div>

              <div className="card-actions mt-6 justify-end">
                <Link
                  href={`/locations/${data.data.id}/edit`}
                  className="btn btn-primary"
                  data-testid="location-detail-edit-button"
                >
                  Edit Location
                </Link>
                <button
                  className="btn btn-error"
                  data-testid="location-detail-delete-button"
                >
                  Delete Location
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="card bg-base-100 mb-6 shadow-xl">
            <div className="card-body">
              <h2 className="card-title">Manage Location</h2>

              <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Link
                  href={`/locations/${data.data.id}/staff`}
                  className="btn btn-outline"
                  data-testid="location-detail-staff-link"
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
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Staff
                </Link>

                <Link
                  href={`/locations/${data.data.id}/menu-items`}
                  className="btn btn-outline"
                  data-testid="location-detail-menu-items-link"
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
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                  Menu Items
                </Link>

                <Link
                  href={`/locations/${data.data.id}/sales`}
                  className="btn btn-outline"
                  data-testid="location-detail-sales-link"
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Sales
                </Link>

                <Link
                  href={`/locations/${data.data.id}/ingredient-costs`}
                  className="btn btn-outline"
                  data-testid="location-detail-ingredient-costs-link"
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
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Ingredient Costs
                </Link>

                <Link
                  href={`/locations/${data.data.id}/inventory-stock`}
                  className="btn btn-outline"
                  data-testid="location-detail-inventory-stock-link"
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
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                  Inventory Stock
                </Link>

                <Link
                  href={`/locations/${data.data.id}/inventory-movements/record`}
                  className="btn btn-outline"
                  data-testid="location-detail-inventory-movements-link"
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
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                  Record Movement
                </Link>

                <Link
                  href={`/locations/${data.data.id}/reports`}
                  className="btn btn-outline"
                  data-testid="location-detail-reports-link"
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
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  Reports
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetailPage;
