import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import CreateRecipeIngredientLinkPage from './page';
import {
  useListIngredients,
  useCreateRecipeIngredientLink,
  useGetRecipeById,
} from '@nory/api-client';
import { useParams, useRouter } from 'next/navigation';

// Mock the API client hooks
jest.mock('@nory/api-client', () => ({
  useListIngredients: jest.fn(),
  useCreateRecipeIngredientLink: jest.fn(),
  useGetRecipeById: jest.fn(),
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

describe('CreateRecipeIngredientLinkPage', () => {
  const mockRecipe = {
    id: '123',
    name: 'Test Recipe',
    description: 'Test Description',
    yield: '4 servings',
  };

  const mockIngredients = [
    {
      id: '1',
      name: 'Test Ingredient',
      unit: 'kg',
      cost: 10,
    },
  ];

  // Mock the mutation return value
  const mockCreateMutation = {
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

    (useListIngredients as jest.Mock).mockReturnValue({
      data: { data: mockIngredients },
      isLoading: false,
      error: null,
    });

    (useCreateRecipeIngredientLink as jest.Mock).mockReturnValue(
      mockCreateMutation
    );
  });

  it('renders the page container, title, and form elements', () => {
    render(<CreateRecipeIngredientLinkPage />);

    // Check main elements
    expect(
      screen.getByTestId('create-recipe-ingredient-link-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-content')
    ).toBeInTheDocument();

    // Check form elements
    expect(
      screen.getByTestId('create-recipe-ingredient-link-form-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-ingredient-select')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-amount-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-submit-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-cancel-button')
    ).toBeInTheDocument();

    // Check recipe details
    expect(
      screen.getByTestId('create-recipe-ingredient-link-recipe-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-recipe-id')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-recipe-name')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-recipe-yield')
    ).toBeInTheDocument();
  });

  it('shows loading state correctly', () => {
    (useListIngredients as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CreateRecipeIngredientLinkPage />);

    expect(
      screen.getByTestId('create-recipe-ingredient-link-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-loading')
    ).toBeInTheDocument();
  });

  it('shows error state correctly', () => {
    const errorMessage = 'Failed to load ingredients';
    (useListIngredients as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(errorMessage),
    });

    render(<CreateRecipeIngredientLinkPage />);

    expect(
      screen.getByTestId('create-recipe-ingredient-link-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-error')
    ).toBeInTheDocument();
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
  });

  it('renders ingredient options correctly', () => {
    render(<CreateRecipeIngredientLinkPage />);

    // Check select contains all ingredient options
    const select = screen.getByTestId(
      'create-recipe-ingredient-link-ingredient-select'
    );

    // Check default option
    expect(select).toHaveTextContent('Select an ingredient');

    // Check each ingredient option
    mockIngredients.forEach((ingredient) => {
      expect(select).toHaveTextContent(
        `${ingredient.name} (${ingredient.unit})`
      );
    });
  });

  it('submits form with correct values', async () => {
    const mockRouter = { push: jest.fn(), back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<CreateRecipeIngredientLinkPage />);

    // Fill out the form
    const ingredientSelect = screen.getByTestId(
      'create-recipe-ingredient-link-ingredient-select'
    );
    const amountInput = screen.getByTestId(
      'create-recipe-ingredient-link-amount-input'
    );
    const submitButton = screen.getByTestId(
      'create-recipe-ingredient-link-submit-button'
    );

    // Select the first ingredient
    fireEvent.change(ingredientSelect, {
      target: { value: mockIngredients[0]?.id || '' },
    });
    fireEvent.change(amountInput, { target: { value: '250' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Verify the mutation was called with correct parameters
    await waitFor(() => {
      expect(mockCreateMutation.mutateAsync).toHaveBeenCalledWith({
        recipeId: '123',
        data: {
          ingredientId: mockIngredients[0]?.id || '',
          amount: 250,
        },
      });
    });

    // Verify navigation after success
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/recipes/123/ingredient-links'
      );
    });
  });

  it('shows form validation errors when empty values are submitted', async () => {
    render(<CreateRecipeIngredientLinkPage />);

    // Try to submit the form without entering any data
    const submitButton = screen.getByTestId(
      'create-recipe-ingredient-link-submit-button'
    );
    fireEvent.click(submitButton);

    // Check for validation errors
    await waitFor(() => {
      expect(
        screen.getByTestId('create-recipe-ingredient-link-ingredient-error')
      ).toBeInTheDocument();
    });
  });

  it('shows pending state during submission', async () => {
    // Mock pending state
    (useCreateRecipeIngredientLink as jest.Mock).mockReturnValue({
      ...mockCreateMutation,
      isPending: true,
    });

    render(<CreateRecipeIngredientLinkPage />);

    // Check loading state in submit button
    const submitButton = screen.getByTestId(
      'create-recipe-ingredient-link-submit-button'
    );
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Adding...');
  });

  it('navigates back when cancel button is clicked', () => {
    const mockRouter = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<CreateRecipeIngredientLinkPage />);

    const cancelButton = screen.getByTestId(
      'create-recipe-ingredient-link-cancel-button'
    );
    fireEvent.click(cancelButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('navigates back when back button is clicked', () => {
    const mockRouter = { back: jest.fn() };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<CreateRecipeIngredientLinkPage />);

    const backButton = screen.getByTestId(
      'create-recipe-ingredient-link-back-button'
    );
    fireEvent.click(backButton);

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });

  it('calls hooks with correct parameters', () => {
    render(<CreateRecipeIngredientLinkPage />);

    expect(useGetRecipeById).toHaveBeenCalledWith('123', {
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    });

    expect(useListIngredients).toHaveBeenCalledWith({
      query: {
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retry: false,
      },
    });

    expect(useCreateRecipeIngredientLink).toHaveBeenCalled();
  });
});
