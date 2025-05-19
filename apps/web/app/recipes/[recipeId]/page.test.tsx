import { render, screen, waitFor } from '@testing-library/react';
import RecipeDetailPage from './page';
import { useGetRecipeById } from '@nory/api-client';
import { useParams, useRouter } from 'next/navigation';

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useGetRecipeById: jest.fn(),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({ recipeId: '123' }),
  useRouter: jest.fn().mockReturnValue({
    back: jest.fn(),
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

describe('RecipeDetailPage', () => {
  const mockRecipe = {
    id: '123',
    name: 'Test Recipe',
    description: 'Test Description',
    yield: '4 servings',
    prepTime: '20 minutes',
    cookTime: '30 minutes',
    ingredientLinks: [
      {
        id: 'link1',
        ingredient: {
          id: 'ing1',
          name: 'Flour',
          unit: 'g',
        },
        amount: 200,
      },
      {
        id: 'link2',
        ingredient: {
          id: 'ing2',
          name: 'Sugar',
          unit: 'g',
        },
        amount: 100,
      },
    ],
    menuItems: [
      {
        id: 'menu1',
        name: 'Menu Item 1',
        description: 'Menu Item Description',
        locationId: 'loc1',
      },
    ],
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

    // Check recipe information card
    expect(
      screen.getByTestId('recipe-detail-basics-title')
    ).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-description')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-yield')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-prep-time')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-cook-time')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-id')).toBeInTheDocument();

    // Check actions card
    expect(
      screen.getByTestId('recipe-detail-actions-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-ingredients-link')
    ).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-edit-button')).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-delete-button')
    ).toBeInTheDocument();

    // Check ingredients table
    expect(
      screen.getByTestId('recipe-detail-ingredients-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-view-all-ingredients')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-ingredients-table')
    ).toBeInTheDocument();

    // Check each ingredient row
    mockRecipe.ingredientLinks.forEach((link) => {
      expect(
        screen.getByTestId(`recipe-ingredient-row-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-name-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-amount-${link.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`recipe-ingredient-unit-${link.id}`)
      ).toBeInTheDocument();
    });

    // Check menu items section
    expect(
      screen.getByTestId('recipe-detail-menu-items-title')
    ).toBeInTheDocument();
    mockRecipe.menuItems.forEach((menuItem) => {
      expect(
        screen.getByTestId(`recipe-menu-item-${menuItem.id}`)
      ).toBeInTheDocument();
    });

    // Check recipe data is displayed
    await waitFor(() => {
      expect(screen.getByTestId('recipe-detail-title')).toHaveTextContent(
        mockRecipe.name
      );
      expect(screen.getByTestId('recipe-detail-description')).toHaveTextContent(
        mockRecipe.description
      );
      expect(screen.getByTestId('recipe-detail-yield')).toHaveTextContent(
        mockRecipe.yield
      );
      expect(screen.getByTestId('recipe-detail-prep-time')).toHaveTextContent(
        mockRecipe.prepTime
      );
      expect(screen.getByTestId('recipe-detail-cook-time')).toHaveTextContent(
        mockRecipe.cookTime
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
      ingredientLinks: [],
      menuItems: [],
    };

    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: null,
      data: { data: emptyRecipe },
    });

    render(<RecipeDetailPage />);

    expect(
      screen.getByTestId('recipe-detail-no-ingredients')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('recipe-detail-no-menu-items')
    ).toBeInTheDocument();
  });

  it('calls useGetRecipeById with correct parameters', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });

    render(<RecipeDetailPage />);

    expect(useGetRecipeById).toHaveBeenCalledWith('123', {
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
