import { render, screen } from '@testing-library/react';
import IngredientCostDetailPage from './page';

describe('IngredientCostDetailPage', () => {
  it('renders the page title', () => {
    render(<IngredientCostDetailPage />);
    expect(screen.getByTestId('ingredient-cost-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<IngredientCostDetailPage />);
    expect(screen.getByTestId('ingredient-cost-detail-content')).toBeInTheDocument();
  });
}); 