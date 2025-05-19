import { render, screen } from '@testing-library/react';
import InventoryStockPage from './page';

describe('InventoryStockPage', () => {
  it('renders the page title', () => {
    render(<InventoryStockPage />);
    expect(screen.getByTestId('inventory-stock-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<InventoryStockPage />);
    expect(screen.getByTestId('inventory-stock-content')).toBeInTheDocument();
  });
}); 