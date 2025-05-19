import { render, screen } from '@testing-library/react';
import IngredientDetailPage from './page';

describe('IngredientDetailPage', () => {
  it('renders the page title', () => {
    render(<IngredientDetailPage />);
    expect(screen.getByTestId('ingredient-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<IngredientDetailPage />);
    expect(screen.getByTestId('ingredient-detail-content')).toBeInTheDocument();
  });
}); 