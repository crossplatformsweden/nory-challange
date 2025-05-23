'use client';

import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useGetLocationById } from '@repo/api-client';
import { StaffList } from './components/StaffList';
import { LocationMenuItemsList } from './components/LocationMenuItemsList';
import { LocationIngredientCostsList } from './components/LocationIngredientCostsList';
import { LocationInventoryStockList } from './components/LocationInventoryStockList';
import { LocationInventoryMovementsList } from './components/LocationInventoryMovementsList'; // Import the new component

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
 * import { useGetLocationById } from '@repo/api-client';
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

type ActiveTab = 'staff' | 'menuItems' | 'ingredientCosts' | 'inventoryStock' | 'inventoryMovements';

const LocationDetailPage: FC<LocationDetailPageProps> = () => {
  const params = useParams();
  const router = useRouter();
  const locationId = params.locationId as string;
  const [activeTab, setActiveTab] = useState<ActiveTab>('staff');

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
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" // Staff icon
                    />
                  </svg>
                  Staff
                </Link>
                 {/* Other links are removed as they will be replaced by tabs/sections below */}
              </div>
            </div>
          </div>

          {/* Tabs for Child Entities */}
          <div role="tablist" className="tabs tabs-lifted tabs-lg" data-testid="location-detail-tabs">
            <button
              role="tab"
              className={`tab ${activeTab === 'staff' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('staff')}
              data-testid="tab-staff"
            >
              Staff
            </button>
            <button
              role="tab"
              className={`tab ${activeTab === 'menuItems' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('menuItems')}
              data-testid="tab-menu-items"
            >
              Menu Items
            </button>
            <button
              role="tab"
              className={`tab ${activeTab === 'ingredientCosts' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('ingredientCosts')}
              data-testid="tab-ingredient-costs"
            >
              Ingredient Costs
            </button>
            <button
              role="tab"
              className={`tab ${activeTab === 'inventoryStock' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('inventoryStock')}
              data-testid="tab-inventory-stock"
            >
              Inventory Stock
            </button>
            <button
              role="tab"
              className={`tab ${activeTab === 'inventoryMovements' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('inventoryMovements')}
              data-testid="tab-inventory-movements"
            >
              Inventory Movements
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-4 border border-t-0 rounded-b-box bg-base-100" data-testid="location-detail-tab-content">
            {activeTab === 'staff' && (
              <div data-testid="content-staff">
                <StaffList locationId={locationId} />
              </div>
            )}
            {activeTab === 'menuItems' && (
              <div data-testid="content-menu-items">
                <LocationMenuItemsList locationId={locationId} />
              </div>
            )}
            {activeTab === 'ingredientCosts' && (
              <div data-testid="content-ingredient-costs">
                <LocationIngredientCostsList locationId={locationId} />
              </div>
            )}
            {activeTab === 'inventoryStock' && (
              <div data-testid="content-inventory-stock">
                <LocationInventoryStockList locationId={locationId} />
              </div>
            )}
            {activeTab === 'inventoryMovements' && (
              <div data-testid="content-inventory-movements">
                <LocationInventoryMovementsList locationId={locationId} />
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default LocationDetailPage;
