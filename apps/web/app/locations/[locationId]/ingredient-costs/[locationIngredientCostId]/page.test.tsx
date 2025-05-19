import { render, screen } from '@testing-library/react';
import IngredientCostDetailPage from './page';
import { useParams, useRouter } from 'next/navigation';
import { useGetLocationIngredientCostById } from '@nory/api-client';

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

// Mock the navigation hooks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

// Mock the API hook
jest.mock('@nory/api-client', () => ({
  useGetLocationIngredientCostById: jest.fn(),
}));

describe('IngredientCostDetailPage', () => {
  const mockData = {
    data: {
      id: '1',
      costPerUnit: 10.99,
      ingredientId: 'ing1',
      ingredient: {
        id: 'ing1',
        name: 'Flour',
        unit: 'kg',
      },
    },
  };

  const renderComponent = (
    loading = false,
    error: Error | null = null,
    data = mockData
  ) => {
    // Mock useParams
    (useParams as jest.Mock).mockReturnValue({
      locationId: '123',
      locationIngredientCostId: '1',
    });

    // Mock the API hook response
    (useGetLocationIngredientCostById as jest.Mock).mockReturnValue({
      data: loading ? null : data,
      isLoading: loading,
      error: error || null,
    });

    render(<IngredientCostDetailPage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and navigation elements', () => {
    renderComponent();

    expect(
      screen.getByTestId('ingredient-cost-detail-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-back-button')
    ).toBeInTheDocument();
  });

  it('renders the ingredient information when data is loaded', () => {
    renderComponent();

    expect(
      screen.getByTestId('ingredient-cost-detail-ingredient-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-ingredient-name-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-ingredient-name')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-ingredient-unit-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-ingredient-unit')
    ).toBeInTheDocument();
  });

  it('renders the cost information when data is loaded', () => {
    renderComponent();

    expect(
      screen.getByTestId('ingredient-cost-detail-cost-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-cost-value-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-cost-value')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-cost-per-unit-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-detail-cost-per-unit')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(
      screen.getByTestId('ingredient-cost-detail-loading')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('ingredient-cost-detail-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, new Error('Failed to load ingredient cost'));

    expect(
      screen.getByTestId('ingredient-cost-detail-error')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('ingredient-cost-detail-content')
    ).not.toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    renderComponent();
    screen.getByTestId('ingredient-cost-detail-back-button').click();

    expect(mockBack).toHaveBeenCalled();
  });
});
