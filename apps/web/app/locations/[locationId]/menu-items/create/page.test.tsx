import { render, screen } from '@testing-library/react';
import CreateMenuItemPage from './page';

describe('CreateMenuItemPage', () => {
  it('renders the page title', () => {
    render(<CreateMenuItemPage />);
    expect(screen.getByTestId('create-menu-item-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<CreateMenuItemPage />);
    expect(screen.getByTestId('create-menu-item-content')).toBeInTheDocument();
  });
}); 