import { render, screen } from '@testing-library/react';
import RecipeIngredientLinksPage from './page';

describe('RecipeIngredientLinksPage', () => {
  it('renders the page title', () => {
    render(<RecipeIngredientLinksPage />);
    expect(screen.getByTestId('recipe-ingredient-links-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<RecipeIngredientLinksPage />);
    expect(screen.getByTestId('recipe-ingredient-links-content')).toBeInTheDocument();
  });
}); 