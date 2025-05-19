import { render, screen } from '@testing-library/react';
import CreateIngredientCostPage from './page';

describe('CreateIngredientCostPage', () => {
  it('renders the page title', () => {
    render(<CreateIngredientCostPage />);
    expect(screen.getByTestId('create-ingredient-cost-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<CreateIngredientCostPage />);
    expect(screen.getByTestId('create-ingredient-cost-content')).toBeInTheDocument();
  });
}); 