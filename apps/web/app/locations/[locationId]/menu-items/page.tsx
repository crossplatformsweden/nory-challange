'use client';

import { FC } from 'react';
import { useListLocationMenuItems } from '@nory/api-client';
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
 * import { useListLocationMenuItems } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useListLocationMenuItems();
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

interface MenuItemsListPageProps {}

const MenuItemsListPage: FC<MenuItemsListPageProps> = () => {
  const { locationId } = useParams();
  const { data, isLoading, error } = useListLocationMenuItems(
    locationId as string
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span
          className="loading loading-spinner loading-lg"
          data-testid="menu-items-list-loading"
        ></span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error" data-testid="menu-items-list-error">
        <span>Error loading menu items: {error.message}</span>
      </div>
    );
  }

  return (
    <div
      className="card bg-base-100 shadow-xl"
      data-testid="menu-items-list-page"
    >
      <div className="card-body">
        <div className="flex items-center justify-between">
          <h1
            className="card-title text-2xl font-bold"
            data-testid="menu-items-list-title"
          >
            Menu Items
          </h1>
          <Link
            href={`/locations/${locationId}/menu-items/create`}
            className="btn btn-primary"
            data-testid="menu-items-create-button"
          >
            Create Menu Item
          </Link>
        </div>

        <div className="overflow-x-auto" data-testid="menu-items-list-content">
          <table className="table">
            <thead>
              <tr>
                <th>Recipe ID</th>
                <th>Price</th>
                <th>Modifiers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item) => (
                <tr key={item.id} data-testid={`menu-item-row-${item.id}`}>
                  <td data-testid={`menu-item-recipe-id-${item.id}`}>
                    {item.recipeId}
                  </td>
                  <td data-testid={`menu-item-price-${item.id}`}>
                    ${item.price.toFixed(2)}
                  </td>
                  <td data-testid={`menu-item-modifiers-${item.id}`}>
                    {item.modifierIds?.join(', ') || 'None'}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Link
                        href={`/locations/${locationId}/menu-items/${item.id}`}
                        className="btn btn-sm btn-info"
                        data-testid={`menu-item-view-${item.id}`}
                      >
                        View
                      </Link>
                      <Link
                        href={`/locations/${locationId}/menu-items/${item.id}/edit`}
                        className="btn btn-sm btn-warning"
                        data-testid={`menu-item-edit-${item.id}`}
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MenuItemsListPage;
