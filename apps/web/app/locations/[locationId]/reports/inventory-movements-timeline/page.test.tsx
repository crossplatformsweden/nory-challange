import { render, screen } from '@testing-library/react';
import InventoryMovementsTimelinePage from './page';

describe('InventoryMovementsTimelinePage', () => {
  it('renders the page title', () => {
    render(<InventoryMovementsTimelinePage />);
    expect(screen.getByTestId('inventory-movements-timeline-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<InventoryMovementsTimelinePage />);
    expect(screen.getByTestId('inventory-movements-timeline-content')).toBeInTheDocument();
  });
}); 