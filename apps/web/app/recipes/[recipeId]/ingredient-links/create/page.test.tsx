import { render, screen } from '@testing-library/react';
import CreateRecipeIngredientLinkPage from './page';

describe('CreateRecipeIngredientLinkPage', () => {
  it('renders the page title', () => {
    render(<CreateRecipeIngredientLinkPage />);
    expect(screen.getByTestId('create-recipe-ingredient-link-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<CreateRecipeIngredientLinkPage />);
    expect(screen.getByTestId('create-recipe-ingredient-link-content')).toBeInTheDocument();
  });
}); 