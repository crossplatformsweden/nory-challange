import { render, screen } from '@testing-library/react';
import NewSalePage from './page';

describe('NewSalePage', () => {
  it('renders the page title', () => {
    render(<NewSalePage />);
    expect(screen.getByTestId('new-sale-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<NewSalePage />);
    expect(screen.getByTestId('new-sale-content')).toBeInTheDocument();
  });
}); 