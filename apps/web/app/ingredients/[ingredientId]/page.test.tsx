import { render, screen } from '@testing-library/react';
import IngredientDetailPage from './page';
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetIngredientById } from '@nory/api-client';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useGetIngredientById: jest.fn(),
}));

/**
 * Testing Guide:
 * 1. Test the presence of all elements with testIds
 * 2. Test any form validation if forms are added
 * 3. Test any data loading states
 * 4. Test any error states
 * 5. Use the faker implementation from the hook for test data
 * 6. Mock the orval generated client responses
 * 7. Test any user interactions
 *
 * Note: Only test the presence of elements and their states.
 * Do not test specific content as it will be random from faker.
 */

describe('IngredientDetailPage', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  beforeEach(() => {
    // Mock useParams to return a test ingredientId
    (useParams as jest.Mock).mockReturnValue({ ingredientId: '123' });

    // Mock the API response
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: {
        data: {
          name: 'Test Ingredient',
          unit: 'kg',
          cost: 10.99,
        },
      },
      isLoading: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <IngredientDetailPage />
      </QueryClientProvider>
    );
  });

  it('renders the page container', () => {
    expect(screen.getByTestId('ingredient-detail-page')).toBeInTheDocument();
  });

  it('renders the page title', () => {
    expect(screen.getByTestId('ingredient-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    expect(screen.getByTestId('ingredient-detail-content')).toBeInTheDocument();
  });
});
