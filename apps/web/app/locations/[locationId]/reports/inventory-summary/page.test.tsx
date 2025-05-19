import { render, screen } from '@testing-library/react';
import InventorySummaryReportPage from './page';

describe('InventorySummaryReportPage', () => {
  it('renders the page title', () => {
    render(<InventorySummaryReportPage />);
    expect(screen.getByTestId('inventory-summary-report-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<InventorySummaryReportPage />);
    expect(screen.getByTestId('inventory-summary-report-content')).toBeInTheDocument();
  });
}); 