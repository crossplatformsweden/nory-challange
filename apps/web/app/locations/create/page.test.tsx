import { render, screen } from '@testing-library/react';
import CreateLocationPage from './page';

describe('CreateLocationPage', () => {
  it('renders the page title', () => {
    render(<CreateLocationPage />);
    expect(screen.getByTestId('create-location-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<CreateLocationPage />);
    expect(screen.getByTestId('create-location-content')).toBeInTheDocument();
  });
}); 