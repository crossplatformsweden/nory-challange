import { render, screen } from '@testing-library/react';
import MenuItemDetailPage from './page';

describe('MenuItemDetailPage', () => {
  it('renders the page title', () => {
    render(<MenuItemDetailPage />);
    expect(screen.getByTestId('menu-item-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<MenuItemDetailPage />);
    expect(screen.getByTestId('menu-item-detail-content')).toBeInTheDocument();
  });
}); 