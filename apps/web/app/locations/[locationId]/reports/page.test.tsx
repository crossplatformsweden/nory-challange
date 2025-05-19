import { render, screen } from '@testing-library/react';
import ReportsOverviewPage from './page';

describe('ReportsOverviewPage', () => {
  it('renders the page title', () => {
    render(<ReportsOverviewPage />);
    expect(screen.getByTestId('reports-overview-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<ReportsOverviewPage />);
    expect(screen.getByTestId('reports-overview-content')).toBeInTheDocument();
  });
}); 