'use client';

import { FC } from 'react';
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
 * import { None } from '@repo/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = None();
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

interface HomePageProps {}

const HomePage: FC<HomePageProps> = () => {
  return (
    <div className="container mx-auto px-4" data-testid="home-page">
      <div data-testid="home-content">
        {/* Hero Section */}
        <div
          className="hero bg-base-200 rounded-box min-h-[60vh]"
          data-testid="home-hero"
        >
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold" data-testid="home-title">
                Welcome to Nory
              </h1>
              <p className="py-6" data-testid="home-description">
                Your comprehensive inventory management solution. Streamline
                your operations, track ingredients, manage recipes, and optimize
                your business with our powerful tools.
              </p>
              <Link
                href="https://github.com/crossplatformsweden/nory-challange"
                className="btn btn-primary"
                data-testid="home-get-started"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div
          className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4"
          data-testid="home-features"
        >
          {/* Locations Card */}
          <div
            className="card bg-base-100 shadow-xl"
            data-testid="home-locations-card"
          >
            <div className="card-body">
              <h2 className="card-title" data-testid="home-locations-title">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Locations
              </h2>
              <p data-testid="home-locations-description">
                Manage multiple locations, staff, and inventory across your
                business network.
              </p>
              <div className="card-actions justify-end">
                <Link
                  href="/locations"
                  className="btn btn-primary btn-sm"
                  data-testid="home-locations-link"
                >
                  View Locations
                </Link>
              </div>
            </div>
          </div>

          {/* Ingredients Card */}
          <div
            className="card bg-base-100 shadow-xl"
            data-testid="home-ingredients-card"
          >
            <div className="card-body">
              <h2 className="card-title" data-testid="home-ingredients-title">
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
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
                Ingredients
              </h2>
              <p data-testid="home-ingredients-description">
                Track and manage your ingredient inventory, costs, and
                suppliers.
              </p>
              <div className="card-actions justify-end">
                <Link
                  href="/ingredients"
                  className="btn btn-primary btn-sm"
                  data-testid="home-ingredients-link"
                >
                  View Ingredients
                </Link>
              </div>
            </div>
          </div>

          {/* Recipes Card */}
          <div
            className="card bg-base-100 shadow-xl"
            data-testid="home-recipes-card"
          >
            <div className="card-body">
              <h2 className="card-title" data-testid="home-recipes-title">
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
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Recipes
              </h2>
              <p data-testid="home-recipes-description">
                Create and manage recipes, track ingredient usage, and optimize
                costs.
              </p>
              <div className="card-actions justify-end">
                <Link
                  href="/recipes"
                  className="btn btn-primary btn-sm"
                  data-testid="home-recipes-link"
                >
                  View Recipes
                </Link>
              </div>
            </div>
          </div>

          {/* Modifiers Card */}
          <div
            className="card bg-base-100 shadow-xl"
            data-testid="home-modifiers-card"
          >
            <div className="card-body">
              <h2 className="card-title" data-testid="home-modifiers-title">
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
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
                Modifiers
              </h2>
              <p data-testid="home-modifiers-description">
                Create and manage modifiers for your menu items.
              </p>
              <div className="card-actions justify-end">
                <Link
                  href="/modifiers"
                  className="btn btn-primary btn-sm"
                  data-testid="home-modifiers-link"
                >
                  View Modifiers
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats mt-12 w-full shadow" data-testid="home-stats">
          <div className="stat" data-testid="home-locations-stat">
            <div className="stat-figure text-primary">
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
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
              </svg>
            </div>
            <div className="stat-title">Active Locations</div>
            <div
              className="stat-value text-primary"
              data-testid="home-locations-count"
            >
              0
            </div>
            <div className="stat-desc">↗︎ Add your first location</div>
          </div>

          <div className="stat" data-testid="home-ingredients-stat">
            <div className="stat-figure text-secondary">
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
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <div className="stat-title">Total Ingredients</div>
            <div
              className="stat-value text-secondary"
              data-testid="home-ingredients-count"
            >
              0
            </div>
            <div className="stat-desc">↗︎ Start adding ingredients</div>
          </div>

          <div className="stat" data-testid="home-recipes-stat">
            <div className="stat-figure text-accent">
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
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <div className="stat-title">Active Recipes</div>
            <div
              className="stat-value text-accent"
              data-testid="home-recipes-count"
            >
              0
            </div>
            <div className="stat-desc">↗︎ Create your first recipe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
