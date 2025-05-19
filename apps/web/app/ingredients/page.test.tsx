import { render, screen } from '@testing-library/react';
import IngredientsListPage from './page';

/**
 * Testing Guide:
 * 1. Test the presence of all elements with testIds
 * 2. Test any form validation if forms are added
 * 3. Test any data loading states
 * 4. Test any error states
 * 5. Use the faker implementation from the hook for test data
 * 6. Mock the orval generated client responses
 * 7. Test any user interactions
 * 
 * Note: Only test the presence of elements and their states.
 * Do not test specific content as it will be random from faker.
 */

describe('IngredientsListPage', () => {
  beforeEach(() => {
    render(<IngredientsListPage />);
  });

  it('renders the page container', () => {
    expect(screen.getByTestId('ingredients-list-page')).toBeInTheDocument();
  });

  it('renders the page title', () => {
    expect(screen.getByTestId('ingredients-list-title')).toBeInTheDocument();
  });

  it('renders the page content', () => {
    expect(screen.getByTestId('ingredients-list-content')).toBeInTheDocument();
  });
}); 