import { render, screen } from '@testing-library/react';
import SaleDetailPage from './page';

describe('SaleDetailPage', () => {
  it('renders the page title', () => {
    render(<SaleDetailPage />);
    expect(screen.getByTestId('sale-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<SaleDetailPage />);
    expect(screen.getByTestId('sale-detail-content')).toBeInTheDocument();
  });
}); 