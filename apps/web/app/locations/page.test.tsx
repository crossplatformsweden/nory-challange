import { render, screen } from '@testing-library/react';
import LocationsListPage from './page';
import { useListLocations } from '@nory/api-client';

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

// Mock the hook
jest.mock('@nory/api-client', () => ({
  useListLocations: jest.fn(),
}));

describe('LocationsListPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders the page container, title, and content in the initial state', () => {
    // Mock the hook to return empty data
    (useListLocations as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
    });

    render(<LocationsListPage />);

    // Basic page elements
    expect(screen.getByTestId('locations-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('locations-list-title')).toBeInTheDocument();
    expect(screen.getByTestId('locations-list-content')).toBeInTheDocument();
    expect(
      screen.getByTestId('locations-list-create-button')
    ).toBeInTheDocument();
    expect(screen.getByTestId('locations-list-empty')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    // Mock the hook to return loading state
    (useListLocations as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<LocationsListPage />);

    expect(screen.getByTestId('locations-list-loading')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    // Mock the hook to return error state
    (useListLocations as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch locations'),
    });

    render(<LocationsListPage />);

    expect(screen.getByTestId('locations-list-error')).toBeInTheDocument();
  });

  it('renders location cards when data is available', () => {
    // Mock the hook to return sample data
    const mockLocations = [
      { id: '1', name: 'Downtown Store', address: '123 Main St' },
      { id: '2', name: 'Mall Kiosk', address: '456 Market Ave' },
    ];

    (useListLocations as jest.Mock).mockReturnValue({
      data: { data: mockLocations },
      isLoading: false,
      error: null,
    });

    render(<LocationsListPage />);

    // Check location cards are rendered
    expect(screen.getByTestId('location-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('location-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('location-name-1')).toBeInTheDocument();
    expect(screen.getByTestId('location-address-1')).toBeInTheDocument();
    expect(screen.getByTestId('location-view-1')).toBeInTheDocument();
  });
});
