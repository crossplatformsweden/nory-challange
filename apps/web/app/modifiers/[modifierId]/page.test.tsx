import { render, screen } from '@testing-library/react';
import ModifierDetailPage from './page';

describe('ModifierDetailPage', () => {
  it('renders the page title', () => {
    render(<ModifierDetailPage />);
    expect(screen.getByTestId('modifier-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<ModifierDetailPage />);
    expect(screen.getByTestId('modifier-detail-content')).toBeInTheDocument();
  });
}); 