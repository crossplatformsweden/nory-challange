'use client';

import { FC } from 'react';
import { useGetLocationMenuItemById } from '@repo/api-client';
import { useParams } from 'next/navigation';
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
 * import { useGetLocationMenuItemById } from '@repo/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useGetLocationMenuItemById();
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

interface MenuItemDetailPageProps {}

const MenuItemDetailPage: FC<MenuItemDetailPageProps> = () => {
  const { locationId, menuItemId } = useParams();
  const { data, isLoading, error } = useGetLocationMenuItemById(
    locationId as string,
    menuItemId as string
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span
          className="loading loading-spinner loading-lg"
          data-testid="menu-item-detail-loading"
        ></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error" data-testid="menu-item-detail-error">
        <span>Error loading menu item: {error.message}</span>
      </div>
    );
  }

  if (!data?.data) {
    return (
      <div
        className="alert alert-warning"
        data-testid="menu-item-detail-not-found"
      >
        <span>Menu item not found</span>
      </div>
    );
  }

  const menuItem = data.data;

  return (
    <div
      className="card bg-base-100 shadow-xl"
      data-testid="menu-item-detail-page"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h1
            className="card-title text-2xl font-bold"
            data-testid="menu-item-detail-title"
          >
            Menu Item Details
          </h1>
          <div className="flex gap-2">
            <Link
              href={`/locations/${locationId}/menu-items/${menuItemId}/edit`}
              className="btn btn-warning"
              data-testid="menu-item-edit-button"
            >
              Edit
            </Link>
            <Link
              href={`/locations/${locationId}/menu-items`}
              className="btn btn-ghost"
              data-testid="menu-item-back-button"
            >
              Back to List
            </Link>
          </div>
        </div>

        <div className="divider"></div>

        <div
          className="grid grid-cols-2 gap-4"
          data-testid="menu-item-detail-content"
        >
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold">Price</h3>
              <p data-testid="menu-item-price">${menuItem.price.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="font-semibold">Recipe ID</h3>
              <p data-testid="menu-item-recipe-id">{menuItem.recipeId}</p>
            </div>
            {menuItem.modifierIds && menuItem.modifierIds.length > 0 && (
              <div>
                <h3 className="font-semibold">Modifiers</h3>
                <ul data-testid="menu-item-modifiers">
                  {menuItem.modifierIds.map((modifierId) => (
                    <li key={modifierId}>{modifierId}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDetailPage;
