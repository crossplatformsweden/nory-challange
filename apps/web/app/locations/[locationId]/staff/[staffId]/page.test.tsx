import { render, screen } from '@testing-library/react';
import StaffDetailPage from './page';
import { useRouter, useParams } from 'next/navigation';
import { useGetStaffByLocationAndId } from '@nory/api-client';

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

// Mock the navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ locationId: '123', staffId: '456' })),
}));

// Mock the API hook
jest.mock('@nory/api-client', () => ({
  useGetStaffByLocationAndId: jest.fn(() => ({
    data: {
      data: {
        id: '456',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Manager',
      },
    },
    isLoading: false,
    error: null,
  })),
}));

describe('StaffDetailPage', () => {
  const mockRouter = {
    back: jest.fn(),
  };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useParams as jest.Mock).mockReturnValue({
      locationId: '123',
      staffId: '456',
    });
  });

  it('renders the page', () => {
    render(<StaffDetailPage />);
    expect(screen.getByTestId('staff-detail-page')).toBeInTheDocument();
  });

  const mockStaffData = {
    data: {
      id: '456',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Manager',
    },
  };

  const renderComponent = (
    loading = false,
    error: Error | null = null,
    data = mockStaffData
  ) => {
    // Mock the API hook response
    (useGetStaffByLocationAndId as jest.Mock).mockReturnValue({
      data: data,
      isLoading: loading,
      error: error,
    });

    render(<StaffDetailPage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and navigation elements', () => {
    renderComponent();

    expect(screen.getByTestId('staff-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('staff-detail-title')).toBeInTheDocument();
    expect(screen.getByTestId('staff-detail-back-button')).toBeInTheDocument();
  });

  it('renders staff information when data is loaded', () => {
    renderComponent();

    expect(screen.getByTestId('staff-detail-name')).toBeInTheDocument();
    expect(screen.getByTestId('staff-detail-email')).toBeInTheDocument();
    expect(screen.getByTestId('staff-detail-role')).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(screen.getByTestId('staff-detail-loading')).toBeInTheDocument();
    expect(
      screen.queryByTestId('staff-detail-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, new Error('Failed to load staff details'));

    expect(screen.getByTestId('staff-detail-error')).toBeInTheDocument();
    expect(
      screen.queryByTestId('staff-detail-content')
    ).not.toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    renderComponent();
    screen.getByTestId('staff-detail-back-button').click();

    expect(mockBack).toHaveBeenCalled();
  });
});
