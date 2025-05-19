import { render, screen } from '@testing-library/react';
import IngredientsListPage from './page';

describe('IngredientsListPage', () => {
  it('renders the page title', () => {
    render(<IngredientsListPage />);
    expect(screen.getByTestId('ingredients-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<IngredientsListPage />);
    expect(screen.getByTestId('ingredients-list-content')).toBeInTheDocument();
  });
}); 