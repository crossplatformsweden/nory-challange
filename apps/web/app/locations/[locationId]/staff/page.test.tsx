import { render, screen } from '@testing-library/react';
import StaffListPage from './page';

describe('StaffListPage', () => {
  it('renders the page title', () => {
    render(<StaffListPage />);
    expect(screen.getByTestId('staff-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<StaffListPage />);
    expect(screen.getByTestId('staff-list-content')).toBeInTheDocument();
  });
}); 