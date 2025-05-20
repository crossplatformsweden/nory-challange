'use client';

import { FC, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCreateStaffAtLocation } from '@nory/api-client';

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
 * import { useCreateStaffAtLocation } from '@nory/api-client';
 * 
 * // Create a client
 * const queryClient = new QueryClient();
 * 
 * export function LocationsList() {
 *   // Use the generated hook
 *   const { data, isLoading, error } = useCreateStaffAtLocation();
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

interface StaffFormData {
  name: string;
  email: string;
  role: string;
}

interface CreateStaffPageProps {}

const CreateStaffPage: FC<CreateStaffPageProps> = () => {
  const router = useRouter();
  const { locationId } = useParams();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StaffFormData>();

  const { mutateAsync: createStaff } = useCreateStaffAtLocation();

  const onSubmit = async (data: StaffFormData) => {
    try {
      setSubmitError(null);
      const response = await createStaff({
        locationId: locationId as string,
        data,
      });
      setIsSuccess(true);

      // Redirect to the staff list page after successful creation
      if (response?.data?.id) {
        setTimeout(() => {
          router.push(`/locations/${locationId}/staff`);
        }, 2000); // Short delay to show success message
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : 'An error occurred while creating the staff member'
      );
      console.error('Error creating staff:', error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div
      className="container mx-auto px-4 py-8"
      data-testid="create-staff-page"
    >
      {/* Page Header */}
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold" data-testid="create-staff-title">
          Create New Staff Member
        </h1>
        <button
          onClick={handleCancel}
          className="btn btn-ghost"
          data-testid="create-staff-cancel-button"
        >
          Cancel
        </button>
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div
          className="alert alert-success mb-6"
          data-testid="create-staff-success"
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Staff member created successfully! Redirecting...</span>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div
          className="alert alert-error mb-6"
          data-testid="create-staff-error"
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
          <span>{submitError}</span>
        </div>
      )}

      {/* Staff Form */}
      <div
        className="card bg-base-100 shadow-xl"
        data-testid="create-staff-content"
      >
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text">Full Name</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter staff member's full name"
                className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                {...register('name', { required: 'Name is required' })}
                data-testid="create-staff-name-input"
              />
              {errors.name && (
                <label className="label">
                  <span
                    className="label-text-alt text-error"
                    data-testid="create-staff-name-error"
                  >
                    {errors.name.message}
                  </span>
                </label>
              )}
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter email address"
                className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                data-testid="create-staff-email-input"
              />
              {errors.email && (
                <label className="label">
                  <span
                    className="label-text-alt text-error"
                    data-testid="create-staff-email-error"
                  >
                    {errors.email.message}
                  </span>
                </label>
              )}
            </div>

            {/* Role Field */}
            <div className="form-control">
              <label className="label" htmlFor="role">
                <span className="label-text">Role</span>
              </label>
              <select
                id="role"
                className={`select select-bordered w-full ${errors.role ? 'select-error' : ''}`}
                {...register('role', { required: 'Role is required' })}
                data-testid="create-staff-role-select"
              >
                <option value="">Select a role</option>
                <option value="MANAGER">Manager</option>
                <option value="STAFF">Staff</option>
                <option value="KITCHEN">Kitchen</option>
              </select>
              {errors.role && (
                <label className="label">
                  <span
                    className="label-text-alt text-error"
                    data-testid="create-staff-role-error"
                  >
                    {errors.role.message}
                  </span>
                </label>
              )}
            </div>

            {/* Form Actions */}
            <div className="card-actions mt-6 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-ghost"
                data-testid="create-staff-cancel-button-bottom"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting}
                data-testid="create-staff-submit-button"
              >
                {isSubmitting ? 'Creating...' : 'Create Staff Member'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateStaffPage;
