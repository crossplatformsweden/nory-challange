import { render, screen } from '@testing-library/react';
import RecipeIngredientLinksPage from './page';
import { useParams } from 'next/navigation';
import {
  useListRecipeIngredientLinks,
  useDeleteRecipeIngredientLink,
  useGetRecipeById,
  useGetIngredientById,
} from '@repo/api-client';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

// Mock the API client hooks
jest.mock('@repo/api-client', () => ({
  useListRecipeIngredientLinks: jest.fn(),
  useDeleteRecipeIngredientLink: jest.fn(),
  useGetRecipeById: jest.fn(),
  useGetIngredientById: jest.fn(),
}));

describe('RecipeIngredientLinksPage', () => {
  beforeEach(() => {
    // Mock the recipe ID parameter
    (useParams as jest.Mock).mockReturnValue({ recipeId: '123' });

    // Mock the API responses
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: { data: { name: 'Test Recipe', description: 'Test Description' } },
      isLoading: false,
      error: null,
    });

    (useListRecipeIngredientLinks as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
      refetch: jest.fn(),
    });

    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: { data: { name: 'Test Ingredient', unit: 'g' } },
      isLoading: false,
      error: null,
    });

    (useDeleteRecipeIngredientLink as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn(),
    });
  });

  it('renders the page container', () => {
    render(<RecipeIngredientLinksPage />);
    expect(
      screen.getByTestId('recipe-ingredient-links-page')
    ).toBeInTheDocument();
  });

  it('renders the page title', () => {
    render(<RecipeIngredientLinksPage />);
    expect(
      screen.getByTestId('recipe-ingredient-links-title')
    ).toBeInTheDocument();
  });

  it('renders the add ingredient button', () => {
    render(<RecipeIngredientLinksPage />);
    expect(
      screen.getByTestId('recipe-ingredient-links-add-button')
    ).toBeInTheDocument();
  });

  it('renders the ingredients table', () => {
    render(<RecipeIngredientLinksPage />);
    expect(
      screen.getByTestId('recipe-ingredient-links-table')
    ).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<RecipeIngredientLinksPage />);
    expect(
      screen.getByTestId('recipe-ingredient-links-loading')
    ).toBeInTheDocument();
  });
});
