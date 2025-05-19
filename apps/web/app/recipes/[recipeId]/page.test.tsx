import { render, screen } from '@testing-library/react';
import RecipeDetailPage from './page';

describe('RecipeDetailPage', () => {
  it('renders the page title', () => {
    render(<RecipeDetailPage />);
    expect(screen.getByTestId('recipe-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<RecipeDetailPage />);
    expect(screen.getByTestId('recipe-detail-content')).toBeInTheDocument();
  });
}); 