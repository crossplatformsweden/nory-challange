import { render, screen } from '@testing-library/react';
import LocationDetailPage from './page';

describe('LocationDetailPage', () => {
  it('renders the page title', () => {
    render(<LocationDetailPage />);
    expect(screen.getByTestId('location-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<LocationDetailPage />);
    expect(screen.getByTestId('location-detail-content')).toBeInTheDocument();
  });
}); 