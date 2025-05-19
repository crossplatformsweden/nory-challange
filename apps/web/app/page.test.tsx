import { render, screen } from '@testing-library/react';
import HomePage from './page';

describe('HomePage', () => {
  it('renders the page title', () => {
    render(<HomePage />);
    expect(screen.getByTestId('home-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<HomePage />);
    expect(screen.getByTestId('home-content')).toBeInTheDocument();
  });
}); 