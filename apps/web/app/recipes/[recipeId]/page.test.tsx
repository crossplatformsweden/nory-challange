import { render, screen, waitFor } from '@testing-library/react';
import RecipeDetailPage from './page';
import {
  useGetRecipeById,
  useListRecipeIngredientLinks,
  Recipe,
  RecipeIngredientLink,
} from '@nory/api-client';
import { useParams, useRouter } from 'next/navigation';

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useGetRecipeById: jest.fn(),
  useListRecipeIngredientLinks: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
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
  const mockRecipe: Recipe = {
    id: '123',
    name: 'Test Recipe',
    description: 'Test Description',
  };

  const mockIngredientLinks: RecipeIngredientLink[] = [
    {
      id: 'link1',
      recipeId: '123',
      ingredientId: 'ing1',
      quantity: 200,
    },
    {
      id: 'link2',
      recipeId: '123',
      ingredientId: 'ing2',
      quantity: 100,
    },
  ];

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ recipeId: 'test-recipe-id' });
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: { data: mockRecipe },
      isLoading: false,
      error: null,
    });
    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: { data: mockIngredientLinks },
      isLoading: false,
      error: null,
    });
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
    expect(screen.getByTestId('recipe-detail-error')).toBeInTheDocument();
    expect(
      screen.getByText(`Error loading recipe: ${errorMessage}`)
    ).toBeInTheDocument();
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

    // Check recipe information
    expect(screen.getByTestId('recipe-detail-description')).toBeInTheDocument();

    // Check actions
    expect(screen.getByTestId('recipe-detail-edit-button')).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-delete-button')
    ).toBeInTheDocument();

    // Check ingredients section
    expect(
      screen.getByTestId('recipe-detail-ingredients-title')
    ).toBeInTheDocument();

    // Check recipe information card
    expect(screen.getByTestId('recipe-detail-id')).toBeInTheDocument();

    // Check actions card
    expect(
      screen.getByTestId('recipe-detail-actions-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-ingredients-link')
    ).toBeInTheDocument();

    // Check ingredients table
    expect(
      screen.getByTestId('recipe-detail-view-all-ingredients')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-ingredients-table')
    ).toBeInTheDocument();

    // Check each ingredient row
    mockIngredientLinks.forEach((link) => {
      expect(
        screen.getByTestId(`recipe-ingredient-row-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-name-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-amount-${link.id}`)
      ).toBeInTheDocument();
    });

    // Check recipe data is displayed
    await waitFor(() => {
      expect(screen.getByTestId('recipe-detail-title')).toHaveTextContent(
        mockRecipe.name
      );
      expect(screen.getByTestId('recipe-detail-description')).toHaveTextContent(
        mockRecipe.description || ''
      );
      expect(screen.getByTestId('recipe-detail-id')).toHaveTextContent(
        mockRecipe.id
      );
    });

    // Check ingredient-links button has correct href
    const ingredientsLink = screen.getByTestId(
      'recipe-detail-ingredients-link'
    );
    expect(ingredientsLink).toHaveAttribute(
      'href',
      `/recipes/${mockRecipe.id}/ingredient-links`
    );
  });

  it('renders empty state for ingredients and menu items when none exist', async () => {
    const emptyRecipe = {
      ...mockRecipe,
    };

    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: emptyRecipe },
    });

    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
    });

    render(<RecipeDetailPage />);

    expect(
      screen.getByTestId('recipe-detail-ingredients-empty')
    ).toBeInTheDocument();
  });

  it('calls useGetRecipeById with correct parameters', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<RecipeDetailPage />);

    expect(useGetRecipeById).toHaveBeenCalledWith('test-recipe-id', {
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    });
  });

  it('navigates back when back button is clicked', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: mockRecipe },
    });

    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<RecipeDetailPage />);

    const backButton = screen.getByTestId('recipe-detail-back-button');
    backButton.click();

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
