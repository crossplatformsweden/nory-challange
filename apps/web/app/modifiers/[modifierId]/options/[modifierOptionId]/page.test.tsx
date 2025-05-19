import { render, screen } from '@testing-library/react';
import ModifierOptionDetailPage from './page';

describe('ModifierOptionDetailPage', () => {
  it('renders the page title', () => {
    render(<ModifierOptionDetailPage />);
    expect(screen.getByTestId('modifier-option-detail-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<ModifierOptionDetailPage />);
    expect(screen.getByTestId('modifier-option-detail-content')).toBeInTheDocument();
  });
}); 