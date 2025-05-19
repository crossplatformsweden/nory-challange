import { render, screen } from '@testing-library/react';
import StaffDetailPage from './page';

describe('StaffDetailPage', () => {
  it('renders the page title', () => {
    render(<StaffDetailPage />);
    expect(screen.getByTestId('staff-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<StaffDetailPage />);
    expect(screen.getByTestId('staff-detail-content')).toBeInTheDocument();
  });
}); 