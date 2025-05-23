import { render, screen, waitFor, act } from '@testing-library/react';
import RecipeDetailPage from './page';
import {
  useGetRecipeById,
  useListRecipeIngredientLinks,
  useGetIngredientById, // Added for mocking
  Recipe,
  RecipeIngredientLink,
  Ingredient, // Added for mock data
} from '@repo/api-client';
import { useParams, useRouter } from 'next/navigation';

// Mock the API client hooks
jest.mock('@repo/api-client', () => ({
  useGetRecipeById: jest.fn(),
  useListRecipeIngredientLinks: jest.fn(),
  useGetIngredientById: jest.fn(), // Mock added
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

  // Mock Ingredients Data
  const mockIngredients: Record<string, Ingredient> = {
    ing1: { id: 'ing1', name: 'Flour', cost: 1.50, unit: 'kg', currentStock: 10 },
    ing2: { id: 'ing2', name: 'Sugar', cost: 2.00, unit: 'kg', currentStock: 20 },
    ing3_null_cost: { id: 'ing3_null_cost', name: 'Water', cost: null, unit: 'ml', currentStock: 1000 },
  };

  // Mock Recipe Ingredient Links
  const mockIngredientLinks: RecipeIngredientLink[] = [
    { id: 'link1', recipeId: '123', ingredientId: 'ing1', quantity: 2 }, // Cost: 2 * 1.50 = 3.00
    { id: 'link2', recipeId: '123', ingredientId: 'ing2', quantity: 1 }, // Cost: 1 * 2.00 = 2.00
  ];
  // Expected Total Recipe Cost = 3.00 + 2.00 = 5.00

  const mockIngredientLinksWithNullCost: RecipeIngredientLink[] = [
    ...mockIngredientLinks,
    { id: 'link3', recipeId: '123', ingredientId: 'ing3_null_cost', quantity: 500 }, // Cost: N/A
  ];


  beforeEach(() => {
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
    // Default mock for useGetIngredientById
    (useGetIngredientById as jest.Mock).mockImplementation((ingredientId: string) => {
      const ingredient = mockIngredients[ingredientId];
      if (ingredient) {
        return { data: ingredient, isLoading: false, isError: false, error: null };
      }
      // Default to error if not found in mockIngredients, to catch unexpected calls
      return { data: null, isLoading: false, isError: true, error: new Error(`Mock ingredient ${ingredientId} not found`) };
    });
  });

  it('shows loading state for recipe details (main content)', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: true,
      error: null,
      data: null,
    });
    // Also set ingredient links to loading for this initial page load scenario
    (useListRecipeIngredientLinks as jest.Mock).mockReturnValueOnce({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<RecipeDetailPage />);
    expect(screen.getByTestId('recipe-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-loading')).toBeInTheDocument(); // Main recipe loading
    expect(screen.getByTestId('recipe-ingredients-loading-skeleton')).toBeInTheDocument(); // Ingredients table loading
  });

  it('shows error state for recipe details (main content)', () => {
    const errorMessage = 'Failed to load recipe';
    (useGetRecipeById as jest.Mock).mockReturnValue({
      isLoading: false,
      error: new Error(errorMessage),
      data: null,
    });

    render(<RecipeDetailPage />);
    expect(screen.getByTestId('recipe-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-error')).toBeInTheDocument();
    expect(screen.getByText(`Error loading recipe: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders recipe details, ingredient costs, and total recipe cost when all data is loaded', async () => {
    render(<RecipeDetailPage />);

    // Wait for recipe details
    await waitFor(() => {
      expect(screen.getByTestId('recipe-detail-title')).toHaveTextContent(mockRecipe.name);
      expect(screen.getByTestId('recipe-detail-description')).toHaveTextContent(mockRecipe.description || '');
      expect(screen.getByTestId('recipe-detail-id')).toHaveTextContent(mockRecipe.id);
    });

    // Check table headers are updated
    expect(screen.getByText('Ingredient Name')).toBeInTheDocument();
    expect(screen.getByText('Cost per Unit')).toBeInTheDocument();
    expect(screen.getByText('Quantity')).toBeInTheDocument(); // Existing header
    expect(screen.getByText('Total Ingredient Cost')).toBeInTheDocument();

    // Check each ingredient row for correct data
    for (const link of mockIngredientLinks) {
      const ingredient = mockIngredients[link.ingredientId];
      const row = screen.getByTestId(`recipe-ingredient-row-${link.id}`);

      await waitFor(() => {
        // Ingredient Name
        expect(screen.getByTestId(`recipe-ingredient-name-${link.ingredientId}`)).toHaveTextContent(ingredient.name);
        // Cost per Unit
        expect(screen.getByTestId(`recipe-ingredient-cost-per-unit-${link.ingredientId}`)).toHaveTextContent(ingredient.cost!.toFixed(2));
        // Quantity (check within the row, assuming order of cells)
        const cells = row.querySelectorAll('td');
        expect(cells[2]).toHaveTextContent(link.quantity.toString());
        // Total Ingredient Cost
        const expectedTotal = (ingredient.cost! * link.quantity).toFixed(2);
        expect(screen.getByTestId(`recipe-ingredient-total-cost-${link.ingredientId}`)).toHaveTextContent(expectedTotal);
      });
    }

    // Check Total Recipe Cost
    await waitFor(() => {
      expect(screen.getByTestId('recipe-total-cost')).toHaveTextContent('5.00'); // 3.00 + 2.00
    });
    
    // Check link testIds are updated as per page.tsx changes
    expect(screen.getByTestId('recipe-detail-manage-ingredients-link')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-detail-view-all-ingredients-table-link')).toBeInTheDocument();
  });

  it('renders empty state for ingredients and total cost is 0.00 if no ingredients', async () => {
    const emptyRecipe = {
      data: { data: [] }, // No ingredient links
      isLoading: false,
      error: null,
    });

    render(<RecipeDetailPage />);

    await waitFor(() => {
      expect(screen.getByTestId('recipe-detail-ingredients-empty')).toBeInTheDocument();
      expect(screen.getByTestId('recipe-total-cost')).toHaveTextContent('0.00');
    });
  });

  it('shows "Calculating..." for total cost when an ingredient is loading', async () => {
    (useGetIngredientById as jest.Mock).mockImplementation((ingredientId: string) => {
      if (ingredientId === 'ing1') {
        return { data: null, isLoading: true, isError: false, error: null }; // ing1 is loading
      }
      return { data: mockIngredients[ingredientId], isLoading: false, isError: false, error: null };
    });

    render(<RecipeDetailPage />);
    
    // Check ing1 row shows loading skeletons
    const ing1Row = screen.getByTestId('recipe-ingredient-row-link1');
    expect(ing1Row.querySelector(`[data-testid="recipe-ingredient-name-ing1"] .h-4.w-full`)).toBeInTheDocument();
    expect(ing1Row.querySelector(`[data-testid="recipe-ingredient-cost-per-unit-ing1"] .h-4.w-full`)).toBeInTheDocument();
    expect(ing1Row.querySelector(`[data-testid="recipe-ingredient-total-cost-ing1"] .h-4.w-full`)).toBeInTheDocument();

    // Total cost should be "Calculating..."
    expect(screen.getByTestId('recipe-total-cost')).toHaveTextContent('Calculating...');
    expect(screen.getByTestId('recipe-total-cost-loading')).toBeInTheDocument();
  });

  it('shows "Error" for total cost and ingredient row when an ingredient fetch fails', async () => {
    (useGetIngredientById as jest.Mock).mockImplementation((ingredientId: string) => {
      if (ingredientId === 'ing1') {
        return { data: null, isLoading: false, isError: true, error: new Error("Fetch error") }; // ing1 has error
      }
      return { data: mockIngredients[ingredientId], isLoading: false, isError: false, error: null };
    });
    
    render(<RecipeDetailPage />);

    // Check ing1 row shows error state
    await waitFor(() => {
      expect(screen.getByTestId(`recipe-ingredient-name-ing1`)).toHaveTextContent('Error');
      expect(screen.getByTestId(`recipe-ingredient-cost-per-unit-ing1`)).toHaveTextContent('Error');
      expect(screen.getByTestId(`recipe-ingredient-total-cost-ing1`)).toHaveTextContent('Error');
    });
    
    // Total cost should show "Error"
    expect(screen.getByTestId('recipe-total-cost')).toHaveTextContent('Error');
    expect(screen.getByTestId('recipe-total-cost-error')).toBeInTheDocument();
  });

  it('handles ingredient with null cost by displaying "N/A" and calculating total correctly', async () => {
    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: { data: mockIngredientLinksWithNullCost }, // Has ing1, ing2, and ing3_null_cost
      isLoading: false,
      error: null,
    });
    // Ensure ing3_null_cost is specifically mocked to return cost: null and no error
    (useGetIngredientById as jest.Mock).mockImplementation((ingredientId: string) => {
        if (ingredientId === 'ing3_null_cost') {
            return { data: mockIngredients.ing3_null_cost, isLoading: false, isError: false, error: null };
        }
        return { data: mockIngredients[ingredientId], isLoading: false, isError: false, error: null };
    });
    
    render(<RecipeDetailPage />);

    // Check ing3_null_cost row for "N/A"
    await waitFor(() => {
      expect(screen.getByTestId(`recipe-ingredient-name-ing3_null_cost`)).toHaveTextContent(mockIngredients.ing3_null_cost.name);
      expect(screen.getByTestId(`recipe-ingredient-cost-per-unit-ing3_null_cost`)).toHaveTextContent('N/A');
      expect(screen.getByTestId(`recipe-ingredient-total-cost-ing3_null_cost`)).toHaveTextContent('N/A');
    });
    
    // Total recipe cost should be sum of ing1 and ing2 (5.00), as ing3_null_cost is N/A
    expect(screen.getByTestId('recipe-total-cost')).toHaveTextContent('5.00');
  });
  
  it('calls API hooks with correct parameters', () => {
    render(<RecipeDetailPage />);
    expect(useGetRecipeById).toHaveBeenCalledWith('test-recipe-id', expect.any(Object));
    expect(useListRecipeIngredientLinks).toHaveBeenCalledWith('test-recipe-id', expect.any(Object));
    // useGetIngredientById is called for each link by RecipeIngredientRow internally
    mockIngredientLinks.forEach(link => {
      expect(useGetIngredientById).toHaveBeenCalledWith(link.ingredientId);
    });
  });

  it('navigates back when back button is clicked', () => {
    const mockRouterBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockRouterBack, push: jest.fn() });
    render(<RecipeDetailPage />);
    screen.getByTestId('recipe-detail-back-button').click();
    expect(mockRouterBack).toHaveBeenCalledTimes(1);
  });
});
