import { render, screen } from '@testing-library/react';
import MenuItemsListPage from './page';

describe('MenuItemsListPage', () => {
  it('renders the page title', () => {
    render(<MenuItemsListPage />);
    expect(screen.getByTestId('menu-items-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<MenuItemsListPage />);
    expect(screen.getByTestId('menu-items-list-content')).toBeInTheDocument();
  });
}); 