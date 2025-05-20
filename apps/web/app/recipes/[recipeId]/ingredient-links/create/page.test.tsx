import { render, screen } from '@testing-library/react';
import CreateRecipeIngredientLinkPage from './page';
import { useParams } from 'next/navigation';
import {
  useListIngredients,
  useCreateRecipeIngredientLink,
  useGetRecipeById,
} from '@repo/api-client';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

// Mock the API client hooks
jest.mock('@repo/api-client', () => ({
  useListIngredients: jest.fn(),
  useCreateRecipeIngredientLink: jest.fn(),
  useGetRecipeById: jest.fn(),
}));

describe('CreateRecipeIngredientLinkPage', () => {
  beforeEach(() => {
    // Mock the recipe ID parameter
    (useParams as jest.Mock).mockReturnValue({ recipeId: '123' });

    // Mock the API responses
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: {
        data: {
          id: '123',
          name: 'Test Recipe',
          description: 'Test Description',
        },
      },
      isLoading: false,
      error: null,
    });

    (useListIngredients as jest.Mock).mockReturnValue({
      data: {
        data: [
          { id: '1', name: 'Test Ingredient 1', unit: 'g' },
          { id: '2', name: 'Test Ingredient 2', unit: 'kg' },
        ],
      },
      isLoading: false,
      error: null,
    });

    (useCreateRecipeIngredientLink as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });
  });

  it('renders page with all required elements', () => {
    render(<CreateRecipeIngredientLinkPage />);

    // Check main page elements
    expect(
      screen.getByTestId('create-recipe-ingredient-link-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-recipe-ingredient-link-back-button')
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
  });

  it('shows loading state', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    (useListIngredients as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CreateRecipeIngredientLinkPage />);
    expect(
      screen.getByTestId('create-recipe-ingredient-link-loading')
    ).toBeInTheDocument();
  });
});
