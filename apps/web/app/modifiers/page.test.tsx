import { render, screen } from '@testing-library/react';
import ModifiersListPage from './page';
import { useListModifiers } from '@nory/api-client';

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

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useListModifiers: jest.fn(),
}));

describe('ModifiersListPage', () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it('renders the page container, title, and content in the initial state', () => {
    // Mock the hook to return empty data
    (useListModifiers as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
    });

    render(<ModifiersListPage />);

    // Basic page elements
    expect(screen.getByTestId('modifiers-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('modifiers-list-title')).toBeInTheDocument();
    expect(screen.getByTestId('modifiers-list-content')).toBeInTheDocument();
    expect(
      screen.getByTestId('modifiers-list-create-button')
    ).toBeInTheDocument();
    expect(screen.getByTestId('modifiers-list-empty')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    // Mock the hook to return loading state
    (useListModifiers as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<ModifiersListPage />);

    expect(screen.getByTestId('modifiers-list-loading')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    // Mock the hook to return error state
    (useListModifiers as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch modifiers'),
    });

    render(<ModifiersListPage />);

    expect(screen.getByTestId('modifiers-list-error')).toBeInTheDocument();
  });

  it('renders modifier cards when data is available', () => {
    // Mock the hook to return sample data
    const mockModifiers = [
      {
        id: '1',
        name: 'Size Options',
        description: 'Choose your size',
        selectionType: 'SINGLE',
      },
      {
        id: '2',
        name: 'Extra Toppings',
        description: 'Add extra ingredients',
        selectionType: 'MULTIPLE',
      },
    ];

    (useListModifiers as jest.Mock).mockReturnValue({
      data: { data: mockModifiers },
      isLoading: false,
      error: null,
    });

    render(<ModifiersListPage />);

    // Check modifier cards are rendered
    expect(screen.getByTestId('modifier-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('modifier-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('modifier-name-1')).toBeInTheDocument();
    expect(screen.getByTestId('modifier-description-1')).toBeInTheDocument();
    expect(screen.getByTestId('modifier-type-1')).toBeInTheDocument();
    expect(screen.getByTestId('modifier-options-1')).toBeInTheDocument();
    expect(screen.getByTestId('modifier-view-1')).toBeInTheDocument();
  });
});
