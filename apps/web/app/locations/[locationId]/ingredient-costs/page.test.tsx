import { render, screen, fireEvent } from '@testing-library/react';
import IngredientCostsListPage from './page';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useListLocationIngredientCosts } from '@nory/api-client';

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
jest.mock('next/navigation', () => {
  const mockUseParams = jest.fn(() => ({ locationId: '123' }));
  const mockUseRouter = jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  }));
  const mockUseSearchParams = jest.fn(() => new URLSearchParams());

  return {
    useParams: mockUseParams,
    useRouter: mockUseRouter,
    useSearchParams: mockUseSearchParams,
  };
});

// Mock the API hook
jest.mock('@nory/api-client', () => ({
  useListLocationIngredientCosts: jest.fn(),
}));

describe('IngredientCostsListPage', () => {
  const mockData = {
    data: [
      {
        id: '1',
        costPerUnit: 10.99,
        ingredientId: 'ing1',
        ingredient: {
          id: 'ing1',
          name: 'Flour',
          unit: 'kg',
        },
      },
      {
        id: '2',
        costPerUnit: 5.99,
        ingredientId: 'ing2',
        ingredient: {
          id: 'ing2',
          name: 'Sugar',
          unit: 'kg',
        },
      },
    ],
  };

  const renderComponent = (
    loading = false,
    error: Error | null = null,
    data = mockData
  ) => {
    // Mock the API hook response
    (useListLocationIngredientCosts as jest.Mock).mockReturnValue({
      data: loading ? null : data,
      isLoading: loading,
      error: error || null,
    });

    render(<IngredientCostsListPage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page', () => {
    renderComponent();
    expect(
      screen.getByTestId('ingredient-costs-list-page')
    ).toBeInTheDocument();
  });

  it('renders the page container, title, and navigation elements', () => {
    renderComponent();

    expect(
      screen.getByTestId('ingredient-costs-list-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-back-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-create-button')
    ).toBeInTheDocument();
  });

  it('renders the table when data is loaded', () => {
    renderComponent();

    // Check table headers
    expect(
      screen.getByTestId('ingredient-costs-list-table-header-ingredient')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-table-header-cost')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-table-header-unit')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-table-header-actions')
    ).toBeInTheDocument();

    // Check table rows
    expect(
      screen.getByTestId('ingredient-costs-list-item-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-item-2')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(
      screen.getByTestId('ingredient-costs-list-loading')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('ingredient-costs-list-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, new Error('Failed to load ingredient costs'));

    expect(
      screen.getByTestId('ingredient-costs-list-error')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('ingredient-costs-list-content')
    ).not.toBeInTheDocument();
  });

  it('renders empty state when no costs exist', () => {
    renderComponent(false, null, { data: [] });

    expect(
      screen.getByTestId('ingredient-costs-list-content')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-costs-list-empty')
    ).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: jest.fn(),
    });

    renderComponent();
    screen.getByTestId('ingredient-costs-list-back-button').click();

    expect(mockBack).toHaveBeenCalled();
  });

  it('navigates to create page when create button is clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
      push: mockPush,
    });

    renderComponent();
    screen.getByTestId('ingredient-costs-list-create-button').click();

    expect(mockPush).toHaveBeenCalledWith(
      '/locations/123/ingredient-costs/create'
    );
  });

  it('navigates to detail page when view button is clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: jest.fn(),
      push: mockPush,
    });

    renderComponent();
    screen.getByTestId('ingredient-costs-list-view-button-1').click();

    expect(mockPush).toHaveBeenCalledWith('/locations/123/ingredient-costs/1');
  });
});
