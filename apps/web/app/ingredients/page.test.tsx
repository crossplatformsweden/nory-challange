import { render, screen } from '@testing-library/react';
import IngredientsListPage from './page';
import { useListIngredients } from '@nory/api-client';

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

// Mock the hook
jest.mock('@nory/api-client', () => ({
  useListIngredients: jest.fn(),
}));

describe('IngredientsListPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders the page container, title, and content in the initial state', () => {
    // Mock the hook to return loading state
    (useListIngredients as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
    });

    render(<IngredientsListPage />);

    // Basic page elements
    expect(screen.getByTestId('ingredients-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('ingredients-list-title')).toBeInTheDocument();
    expect(screen.getByTestId('ingredients-list-content')).toBeInTheDocument();
    expect(
      screen.getByTestId('ingredients-list-create-button')
    ).toBeInTheDocument();
    expect(screen.getByTestId('ingredients-list-empty')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    // Mock the hook to return loading state
    (useListIngredients as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<IngredientsListPage />);

    expect(screen.getByTestId('ingredients-list-loading')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    // Mock the hook to return error state
    (useListIngredients as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch ingredients'),
    });

    render(<IngredientsListPage />);

    expect(screen.getByTestId('ingredients-list-error')).toBeInTheDocument();
  });

  it('renders ingredient cards when data is available', () => {
    // Mock the hook to return sample data
    const mockIngredients = [
      { id: '1', name: 'Flour', unit: 'kg' },
      { id: '2', name: 'Sugar', unit: 'g' },
    ];

    (useListIngredients as jest.Mock).mockReturnValue({
      data: { data: mockIngredients },
      isLoading: false,
      error: null,
    });

    render(<IngredientsListPage />);

    // Check ingredient cards are rendered
    expect(screen.getByTestId('ingredient-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-name-1')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-unit-1')).toBeInTheDocument();
    expect(screen.getByTestId('ingredient-view-1')).toBeInTheDocument();
  });
});
