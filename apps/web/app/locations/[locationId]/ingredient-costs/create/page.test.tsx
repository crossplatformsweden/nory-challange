import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateIngredientCostPage from './page';
import { useRouter } from 'next/navigation';
import {
  useCreateLocationIngredientCost,
  useListIngredients,
} from '@repo/api-client';

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
  useParams: jest.fn(() => ({ locationId: '123' })),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

// Mock the API hooks
jest.mock('@repo/api-client', () => ({
  useCreateLocationIngredientCost: jest.fn(),
  useListIngredients: jest.fn(),
}));

describe('CreateIngredientCostPage', () => {
  const mockIngredientsData = {
    data: [
      {
        id: 'ing1',
        name: 'Flour',
        unit: 'kg',
      },
      {
        id: 'ing2',
        name: 'Sugar',
        unit: 'kg',
      },
    ],
  };

  const renderComponent = (
    loading = false,
    error: Error | null = null,
    ingredientsData = mockIngredientsData
  ) => {
    // Mock the API hooks
    (useListIngredients as jest.Mock).mockReturnValue({
      data: loading ? null : ingredientsData,
      isLoading: loading,
      error: error || null,
    });

    (useCreateLocationIngredientCost as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isPending: false,
    });

    render(<CreateIngredientCostPage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and navigation elements', () => {
    renderComponent();

    expect(
      screen.getByTestId('ingredient-cost-create-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-back-button')
    ).toBeInTheDocument();
  });

  it('renders the form when ingredients are loaded', () => {
    renderComponent();

    expect(
      screen.getByTestId('ingredient-cost-create-form')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-ingredient-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-ingredient-select')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-cost-label')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-cost-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-submit-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredient-cost-create-cancel-button')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(
      screen.getByTestId('ingredient-cost-create-loading')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('ingredient-cost-create-form')
    ).not.toBeInTheDocument();
  });

  it('shows validation errors when submitting empty form', async () => {
    renderComponent();

    fireEvent.click(screen.getByTestId('ingredient-cost-create-submit-button'));

    await waitFor(() => {
      expect(
        screen.getByTestId('ingredient-cost-create-ingredient-error')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('ingredient-cost-create-cost-error')
      ).toBeInTheDocument();
    });
  });

  it('navigates back when back button is clicked', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: jest.fn(),
    });

    renderComponent();
    screen.getByTestId('ingredient-cost-create-back-button').click();

    expect(mockBack).toHaveBeenCalled();
  });

  it('navigates back when cancel button is clicked', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
      push: jest.fn(),
    });

    renderComponent();
    screen.getByTestId('ingredient-cost-create-cancel-button').click();

    expect(mockBack).toHaveBeenCalled();
  });
});
