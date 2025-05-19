import { render, screen, waitFor } from '@testing-library/react';
import RecipesListPage from './page';
import { useListRecipes } from '@nory/api-client';

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useListRecipes: jest.fn(),
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

describe('RecipesListPage', () => {
  const mockRecipes = [
    {
      id: '1',
      name: 'Recipe 1',
      description: 'Description 1',
    },
    {
      id: '2',
      name: 'Recipe 2',
      description: 'Description 2',
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    (useListRecipes as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<RecipesListPage />);
    expect(screen.getByTestId('recipes-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipes-list-loading')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Failed to load recipes';
    (useListRecipes as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error(errorMessage),
      data: null,
    });

    render(<RecipesListPage />);
    expect(screen.getByTestId('recipes-list-page')).toBeInTheDocument();
    expect(screen.getByText(`Error loading recipes: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders recipe list when data is loaded', async () => {
    (useListRecipes as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: mockRecipes },
    });

    render(<RecipesListPage />);

    // Check main elements are present
    expect(screen.getByTestId('recipes-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipes-list-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipes-list-content')).toBeInTheDocument();

    // Check each recipe card is rendered
    mockRecipes.forEach(recipe => {
      expect(screen.getByTestId(`recipe-title-${recipe.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`recipe-description-${recipe.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`recipe-link-${recipe.id}`)).toBeInTheDocument();
    });

    // Check recipe data is displayed
    await waitFor(() => {
      mockRecipes.forEach(recipe => {
        expect(screen.getByTestId(`recipe-title-${recipe.id}`)).toHaveTextContent(recipe.name);
        expect(screen.getByTestId(`recipe-description-${recipe.id}`)).toHaveTextContent(recipe.description);
      });
    });
  });

  it('calls useListRecipes with correct parameters', () => {
    render(<RecipesListPage />);
    expect(useListRecipes).toHaveBeenCalledWith({
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    });
  });
}); 