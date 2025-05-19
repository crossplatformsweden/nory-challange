import { render, screen } from '@testing-library/react';
import ModifierOptionsListPage from './page';

describe('ModifierOptionsListPage', () => {
  it('renders the page title', () => {
    render(<ModifierOptionsListPage />);
    expect(screen.getByTestId('modifier-options-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<ModifierOptionsListPage />);
    expect(screen.getByTestId('modifier-options-list-content')).toBeInTheDocument();
  });
}); 