import { render, screen } from '@testing-library/react';
import StaffListPage from './page';
import { useListStaffByLocation } from '@nory/api-client';

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

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({
    locationId: '123',
  })),
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    back: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  usePathname: jest.fn(() => '/mock-path'),
}));

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useListStaffByLocation: jest.fn(),
}));

describe('StaffListPage', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('renders the page container, title, and content in the initial state', () => {
    // Mock the hook to return empty data
    (useListStaffByLocation as jest.Mock).mockReturnValue({
      data: { data: [] },
      isLoading: false,
      error: null,
    });

    render(<StaffListPage />);

    // Basic page elements
    expect(screen.getByTestId('staff-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('staff-list-title')).toBeInTheDocument();
    expect(screen.getByTestId('staff-list-content')).toBeInTheDocument();
    expect(screen.getByTestId('staff-list-create-button')).toBeInTheDocument();
    expect(screen.getByTestId('staff-list-empty')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    // Mock the hook to return loading state
    (useListStaffByLocation as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<StaffListPage />);

    expect(screen.getByTestId('staff-list-loading')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    // Mock the hook to return error state
    (useListStaffByLocation as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch staff members'),
    });

    render(<StaffListPage />);

    expect(screen.getByTestId('staff-list-error')).toBeInTheDocument();
  });

  it('renders staff cards when data is available', () => {
    // Mock the hook to return sample data
    const mockStaff = [
      {
        id: '1',
        name: 'John Doe',
        role: 'Manager',
        dob: '1990-01-01',
      },
      {
        id: '2',
        name: 'Jane Smith',
        role: 'Staff',
        dob: '1992-02-02',
      },
    ];

    (useListStaffByLocation as jest.Mock).mockReturnValue({
      data: { data: mockStaff },
      isLoading: false,
      error: null,
    });

    render(<StaffListPage />);

    // Check staff cards are rendered
    expect(screen.getByTestId('staff-card-1')).toBeInTheDocument();
    expect(screen.getByTestId('staff-card-2')).toBeInTheDocument();
    expect(screen.getByTestId('staff-name-1')).toBeInTheDocument();
    expect(screen.getByTestId('staff-role-1')).toBeInTheDocument();
    expect(screen.getByTestId('staff-dob-1')).toBeInTheDocument();
    expect(screen.getByTestId('staff-view-1')).toBeInTheDocument();
  });
});
