import { render, screen } from '@testing-library/react';
import RecordInventoryMovementPage from './page';

describe('RecordInventoryMovementPage', () => {
  it('renders the page title', () => {
    render(<RecordInventoryMovementPage />);
    expect(screen.getByTestId('record-inventory-movement-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<RecordInventoryMovementPage />);
    expect(screen.getByTestId('record-inventory-movement-content')).toBeInTheDocument();
  });
}); 