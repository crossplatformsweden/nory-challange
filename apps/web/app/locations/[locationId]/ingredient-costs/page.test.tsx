import { render, screen } from '@testing-library/react';
import IngredientCostsListPage from './page';

describe('IngredientCostsListPage', () => {
  it('renders the page title', () => {
    render(<IngredientCostsListPage />);
    expect(screen.getByTestId('ingredient-costs-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<IngredientCostsListPage />);
    expect(screen.getByTestId('ingredient-costs-list-content')).toBeInTheDocument();
  });
}); 