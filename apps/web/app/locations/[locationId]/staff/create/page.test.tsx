import { render, screen } from '@testing-library/react';
import CreateStaffPage from './page';

describe('CreateStaffPage', () => {
  it('renders the page title', () => {
    render(<CreateStaffPage />);
    expect(screen.getByTestId('create-staff-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<CreateStaffPage />);
    expect(screen.getByTestId('create-staff-content')).toBeInTheDocument();
  });
}); 