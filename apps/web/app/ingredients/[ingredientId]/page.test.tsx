import { render, screen } from '@testing-library/react';
import IngredientDetailPage from './page';
import { useParams } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useGetIngredientById } from '@repo/api-client';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
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

  const mockIngredient = {
    id: '123',
    name: 'Test Ingredient',
    unit: 'kg',
    cost: 10.99,
  };

  const renderComponent = (loading = false, error: Error | null = null) => {
    // Mock useParams to return a test ingredientId
    (useParams as jest.Mock).mockReturnValue({ ingredientId: '123' });

    // Mock the API response
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: loading ? null : { data: mockIngredient },
      isLoading: loading,
      error,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <IngredientDetailPage />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and back button', () => {
    renderComponent();
    expect(screen.getByTestId('ingredient-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-detail-title')).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-detail-back-button')
    ).toBeInTheDocument();
  });

  it('renders ingredient details when data is loaded', () => {
    renderComponent();
    expect(screen.getByTestId('ingredient-detail-content')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-detail-name')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-detail-unit')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-detail-cost')).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-detail-edit-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-detail-delete-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-detail-recipes-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-detail-locations-link')
    ).toBeInTheDocument();
  });

  it('renders loading state when data is loading', () => {
    renderComponent(true);
    expect(screen.getByTestId('ingredient-detail-loading')).toBeInTheDocument();
  });

  it('renders error state when there is an error', () => {
    renderComponent(false, new Error('Failed to load ingredient'));
    expect(screen.getByTestId('ingredient-detail-error')).toBeInTheDocument();
  });
});
