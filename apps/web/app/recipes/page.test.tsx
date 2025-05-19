import { render, screen } from '@testing-library/react';
import RecipesListPage from './page';

describe('RecipesListPage', () => {
  it('renders the page title', () => {
    render(<RecipesListPage />);
    expect(screen.getByTestId('recipes-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<RecipesListPage />);
    expect(screen.getByTestId('recipes-list-content')).toBeInTheDocument();
  });
}); 