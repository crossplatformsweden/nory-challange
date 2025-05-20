import { render, screen, waitFor } from '@testing-library/react';
import RecipesListPage from './page';
import { useListRecipes } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
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
      name: 'Basic Pasta Recipe',
      description: 'Simple pasta recipe',
      yield: '4 servings',
      ingredientCount: 5,
    },
    {
      id: '2',
      name: 'Grilled Chicken',
      description: 'Juicy grilled chicken',
      yield: '2 servings',
      ingredientCount: 3,
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders the page container, title, and create button', () => {
    // Mock empty data
    (useListRecipes as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: [] },
    });

    render(<RecipesListPage />);

    expect(screen.getByTestId('recipes-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipes-list-title')).toBeInTheDocument();
    expect(
      screen.getByTestId('recipes-list-create-button')
    ).toBeInTheDocument();
    expect(screen.getByTestId('recipes-list-empty')).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    (useListRecipes as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<RecipesListPage />);

    expect(screen.getByTestId('recipes-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipes-list-loading')).toBeInTheDocument();
  });

  it('shows error state correctly', () => {
    const errorMessage = 'Failed to load recipes';
    (useListRecipes as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error(errorMessage),
      data: null,
    });

    render(<RecipesListPage />);

    expect(screen.getByTestId('recipes-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipes-list-error')).toBeInTheDocument();
    expect(
      screen.getByText(`Error loading recipes: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it('renders recipe cards correctly when data is loaded', async () => {
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

    // Check each recipe card is rendered with correct elements
    mockRecipes.forEach((recipe) => {
      expect(
        screen.getByTestId(`recipe-card-${recipe.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-name-${recipe.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-description-${recipe.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-yield-${recipe.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredients-count-${recipe.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredients-${recipe.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-view-${recipe.id}`)
      ).toBeInTheDocument();
    });

    // Check recipe data is displayed correctly
    await waitFor(() => {
      mockRecipes.forEach((recipe) => {
        expect(
          screen.getByTestId(`recipe-name-${recipe.id}`)
        ).toHaveTextContent(recipe.name);
        expect(
          screen.getByTestId(`recipe-description-${recipe.id}`)
        ).toHaveTextContent(recipe.description);
        expect(
          screen.getByTestId(`recipe-yield-${recipe.id}`)
        ).toHaveTextContent('Yield: N/A');
        expect(
          screen.getByTestId(`recipe-ingredients-count-${recipe.id}`)
        ).toHaveTextContent('0 ingredients');
      });
    });
  });

  it('calls useListRecipes with correct parameters', () => {
    (useListRecipes as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: [] },
    });

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
