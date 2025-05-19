import { render, screen } from '@testing-library/react';
import SalesListPage from './page';

describe('SalesListPage', () => {
  it('renders the page title', () => {
    render(<SalesListPage />);
    expect(screen.getByTestId('sales-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<SalesListPage />);
    expect(screen.getByTestId('sales-list-content')).toBeInTheDocument();
  });
}); 