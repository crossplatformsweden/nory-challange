import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import RecipeIngredientLinksPage from './page';
import {
  useListRecipeIngredientLinks,
  useDeleteRecipeIngredientLink,
  useGetRecipeById,
  useGetIngredientById,
  Recipe,
  RecipeIngredientLink,
} from '@nory/api-client';
import { useParams, useRouter } from 'next/navigation';

// Mock the API client hooks
jest.mock('@nory/api-client', () => ({
  useListRecipeIngredientLinks: jest.fn(),
  useDeleteRecipeIngredientLink: jest.fn(),
  useGetRecipeById: jest.fn(),
  useGetIngredientById: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ recipeId: '123' }),
  useRouter: jest.fn().mockReturnValue({
    back: jest.fn(),
    push: jest.fn(),
  }),
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

describe('RecipeIngredientLinksPage', () => {
  const mockRecipe: Recipe = {
    id: '123',
    name: 'Test Recipe',
    description: 'Test Description',
  };

  const mockIngredientLinks: RecipeIngredientLink[] = [
    {
      id: '1',
      recipeId: '123',
      ingredientId: 'ing1',
      quantity: 250,
    },
  ];

  const mockIngredients: Record<string, { name: string; unit: string }> = {
    ing1: {
      name: 'Test Ingredient',
      unit: 'kg',
    },
  };

  // Mock the mutation return value
  const mockDeleteMutation = {
    mutateAsync: jest.fn().mockResolvedValue({}),
    isPending: false,
    isError: false,
    error: null,
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();

    // Default mock implementations
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: { data: mockRecipe },
      isLoading: false,
      error: null,
    });

    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: { data: mockIngredientLinks },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useDeleteRecipeIngredientLink as jest.Mock).mockReturnValue(
      mockDeleteMutation
    );

    // Add mock for useGetIngredientById
    (useGetIngredientById as jest.Mock).mockImplementation((id) => ({
      data: {
        data: mockIngredients[id] || { name: 'Unknown', unit: 'unknown' },
      },
      isLoading: false,
      error: null,
    }));
  });

  it('renders the page container and title', () => {
    render(<RecipeIngredientLinksPage />);

    expect(
      screen.getByTestId('recipe-ingredient-links-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-content')
    ).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
      refetch: jest.fn(),
    });

    render(<RecipeIngredientLinksPage />);

    expect(
      screen.getByTestId('recipe-ingredient-links-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-loading')
    ).toBeInTheDocument();
  });

  it('shows error state correctly', () => {
    const errorMessage = 'Failed to load ingredient links';
    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(errorMessage),
      refetch: jest.fn(),
    });

    render(<RecipeIngredientLinksPage />);

    expect(
      screen.getByTestId('recipe-ingredient-links-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-error')
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Error loading recipe ingredients: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it('renders ingredient links correctly when data is loaded', async () => {
    render(<RecipeIngredientLinksPage />);

    // Check main elements are present
    expect(
      screen.getByTestId('recipe-ingredient-links-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-content')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-back-button')
    ).toBeInTheDocument();

    // Check loading and error states are not present
    expect(
      screen.queryByTestId('recipe-ingredient-links-loading')
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId('recipe-ingredient-links-error')
    ).not.toBeInTheDocument();

    // Check table elements
    expect(
      screen.getByTestId('recipe-ingredient-links-table-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-table')
    ).toBeInTheDocument();

    // Check recipe details summary
    expect(
      screen.getByTestId('recipe-ingredient-links-recipe-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-recipe-id')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-recipe-description')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-ingredient-links-recipe-link')
    ).toBeInTheDocument();

    // Check each ingredient row
    mockIngredientLinks.forEach((link) => {
      expect(
        screen.getByTestId(`recipe-ingredient-link-row-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-link-name-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-link-amount-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-link-unit-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-link-delete-${link.id}`)
      ).toBeInTheDocument();
    });

    // Check data displayed correctly
    await waitFor(() => {
      expect(
        screen.getByTestId('recipe-ingredient-links-title')
      ).toHaveTextContent(`${mockRecipe.name} - Ingredients`);
      expect(
        screen.getByTestId('recipe-ingredient-links-recipe-id')
      ).toHaveTextContent(mockRecipe.id);
      expect(
        screen.getByTestId('recipe-ingredient-links-recipe-description')
      ).toHaveTextContent(mockRecipe.description || '');

      mockIngredientLinks.forEach((link) => {
        expect(
          screen.getByTestId(`recipe-ingredient-link-name-${link.id}`)
        ).toHaveTextContent(mockIngredients[link.ingredientId]?.name || '');
        expect(
          screen.getByTestId(`recipe-ingredient-link-amount-${link.id}`)
        ).toHaveTextContent(link.quantity.toString());
        expect(
          screen.getByTestId(`recipe-ingredient-link-unit-${link.id}`)
        ).toHaveTextContent(mockIngredients[link.ingredientId]?.unit || '');
      });
    });
  });

  it('shows empty state when no ingredient links exist', () => {
    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    render(<RecipeIngredientLinksPage />);

    expect(
      screen.getByTestId('recipe-ingredient-links-empty')
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'No ingredients added yet. Click "Add Ingredient" to add some.'
      )
    ).toBeInTheDocument();
  });

  it('calls delete mutation when delete button is clicked', async () => {
    render(<RecipeIngredientLinksPage />);

    // Find and click the delete button for the first ingredient link
    const deleteButton = screen.getByTestId(
      `recipe-ingredient-link-delete-${mockIngredientLinks[0]?.id || ''}`
    );
    fireEvent.click(deleteButton);

    // Verify the mutation was called with correct parameters
    expect(mockDeleteMutation.mutateAsync).toHaveBeenCalledWith({
      recipeId: '123',
      recipeIngredientLinkId: mockIngredientLinks[0]?.id || '',
    });
  });

  it('refetches data after successful deletion', async () => {
    const mockRefetch = jest.fn();
    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: { data: mockIngredientLinks },
      isLoading: false,
      error: null,
      refetch: mockRefetch,
    });

    render(<RecipeIngredientLinksPage />);

    // Find and click the delete button
    const deleteButton = screen.getByTestId(
      `recipe-ingredient-link-delete-${mockIngredientLinks[0]?.id || ''}`
    );
    fireEvent.click(deleteButton);

    // Wait for the mutation to resolve
    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it('navigates back when back button is clicked', () => {
    const mockRouter = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<RecipeIngredientLinksPage />);

    const backButton = screen.getByTestId(
      'recipe-ingredient-links-back-button'
    );
    fireEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('calls hooks with correct parameters', () => {
    render(<RecipeIngredientLinksPage />);

    expect(useGetRecipeById).toHaveBeenCalledWith('123', {
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    });

    expect(useListRecipeIngredientLinks).toHaveBeenCalledWith('123', {
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    });

    expect(useDeleteRecipeIngredientLink).toHaveBeenCalled();
  });
});
