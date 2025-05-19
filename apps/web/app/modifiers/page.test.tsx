import { render, screen } from '@testing-library/react';
import ModifiersListPage from './page';

describe('ModifiersListPage', () => {
  it('renders the page title', () => {
    render(<ModifiersListPage />);
    expect(screen.getByTestId('modifiers-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    render(<ModifiersListPage />);
    expect(screen.getByTestId('modifiers-list-content')).toBeInTheDocument();
  });
}); 