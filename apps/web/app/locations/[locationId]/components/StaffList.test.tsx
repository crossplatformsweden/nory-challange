import { render, screen } from '@testing-library/react';
import { StaffList } from './StaffList';
import { useListStaff, Staff } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useListStaff: jest.fn(),
}));

const mockStaffData: Staff[] = [
  { id: 's1', name: 'John Doe', role: 'Manager', locationId: 'loc1', email: 'john@example.com', phone: '123' },
  { id: 's2', name: 'Jane Smith', role: 'Cashier', locationId: 'loc1', email: 'jane@example.com', phone: '456' },
];

describe('StaffList Component', () => {
  beforeEach(() => {
    // Reset mocks before each test
    (useListStaff as jest.Mock).mockReset();
  });

  test('renders loading state correctly', () => {
    (useListStaff as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    });

    render(<StaffList locationId="loc1" />);

    expect(screen.getByTestId('staff-list-loading')).toBeInTheDocument();
    // Check for multiple skeleton rows (assuming 3 for the test)
    const skeletons = screen.getAllByRole('generic', { name: /skeleton/i }); // Using a generic role if Skeleton doesn't have a specific one
    // This count will depend on how Skeleton is implemented and what roles it gets.
    // A more robust way is to check for specific data-testid on skeletons if they had them, or count children of the loading container.
    // For now, we check if the loading container is there.
    expect(screen.getByTestId('staff-list-loading').children.length).toBeGreaterThan(2); // Title + Header + Rows
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch staff';
    (useListStaff as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    });

    render(<StaffList locationId="loc1" />);

    expect(screen.getByTestId('staff-list-error')).toBeInTheDocument();
    expect(screen.getByText('Error Loading Staff')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    (useListStaff as jest.Mock).mockReturnValue({
      data: [], // Empty array for staff data
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<StaffList locationId="loc1" />);

    expect(screen.getByTestId('staff-list-empty')).toBeInTheDocument();
    expect(screen.getByText('No staff members found for this location.')).toBeInTheDocument();
  });

  test('renders staff data in a table correctly', () => {
    (useListStaff as jest.Mock).mockReturnValue({
      data: mockStaffData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<StaffList locationId="loc1" />);

    expect(screen.getByTestId('staff-list-container')).toBeInTheDocument();
    expect(screen.getByTestId('staff-list-title')).toHaveTextContent('Staff Members');
    expect(screen.getByTestId('staff-list-table')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument();

    // Check table rows and cells
    mockStaffData.forEach(staff => {
      expect(screen.getByTestId(`staff-row-${staff.id}`)).toBeInTheDocument();
      expect(screen.getByTestId(`staff-name-${staff.id}`)).toHaveTextContent(staff.name!);
      expect(screen.getByTestId(`staff-role-${staff.id}`)).toHaveTextContent(staff.role!);
    });
  });

   test('renders N/A for missing staff name or role', () => {
    const staffWithMissingData: Staff[] = [
      { id: 's3', name: null, role: 'Chef', locationId: 'loc1', email: 's3@e.com', phone: '1' },
      { id: 's4', name: 'Tim Cook', role: null, locationId: 'loc1', email: 's4@e.com', phone: '2' },
    ];
    (useListStaff as jest.Mock).mockReturnValue({
      data: staffWithMissingData,
      isLoading: false,
      isError: false,
      error: null,
    });

    render(<StaffList locationId="loc1" />);

    expect(screen.getByTestId('staff-name-s3')).toHaveTextContent('N/A');
    expect(screen.getByTestId('staff-role-s3')).toHaveTextContent('Chef');
    expect(screen.getByTestId('staff-name-s4')).toHaveTextContent('Tim Cook');
    expect(screen.getByTestId('staff-role-s4')).toHaveTextContent('N/A');
  });
});
