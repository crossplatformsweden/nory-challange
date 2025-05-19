import { render, screen } from '@testing-library/react';
import LocationsPage from './page';

describe('LocationsPage', () => {
  it('renders the page title', () => {
    render(<LocationsPage />);
    expect(screen.getByTestId('locations-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<LocationsPage />);
    expect(screen.getByTestId('locations-content')).toBeInTheDocument();
  });
}); 