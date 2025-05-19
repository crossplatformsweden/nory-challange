import { render, screen, waitFor } from '@testing-library/react';
import RecipeDetailPage from './page';
import { useGetRecipeById } from '@nory/api-client';

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useGetRecipeById: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: () => ({ recipeId: '123' }),
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

describe('RecipeDetailPage', () => {
  const mockRecipe = {
    id: '123',
    name: 'Test Recipe',
    description: 'Test Description',
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<RecipeDetailPage />);
    expect(screen.getByTestId('recipe-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-loading')).toBeInTheDocument();
  });

  it('shows error state', () => {
    const errorMessage = 'Failed to load recipe';
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error(errorMessage),
      data: null,
    });

    render(<RecipeDetailPage />);
    expect(screen.getByTestId('recipe-detail-page')).toBeInTheDocument();
    expect(screen.getByText(`Error loading recipe: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders recipe details when data is loaded', async () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: mockRecipe },
    });

    render(<RecipeDetailPage />);

    // Check main elements are present
    expect(screen.getByTestId('recipe-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-content')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-description-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-description')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-metadata-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-id')).toBeInTheDocument();

    // Check navigation elements
    expect(screen.getByTestId('recipe-detail-back-link')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-ingredients-link')).toBeInTheDocument();

    // Check recipe data is displayed
    await waitFor(() => {
      expect(screen.getByTestId('recipe-detail-title')).toHaveTextContent(mockRecipe.name);
      expect(screen.getByTestId('recipe-detail-description')).toHaveTextContent(mockRecipe.description);
      expect(screen.getByTestId('recipe-detail-id')).toHaveTextContent(mockRecipe.id);
    });

    // Check ingredient-links button has correct href
    const ingredientsLink = screen.getByTestId('recipe-detail-ingredients-link');
    expect(ingredientsLink).toHaveAttribute('href', `/recipes/${mockRecipe.id}/ingredient-links`);
  });

  it('calls useGetRecipeById with correct parameters', () => {
    render(<RecipeDetailPage />);
    expect(useGetRecipeById).toHaveBeenCalledWith('123', {
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    });
  });
}); 