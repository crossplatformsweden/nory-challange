import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateStaffPage from './page';
import { useCreateStaffAtLocation } from '@nory/api-client';

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
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useCreateStaffAtLocation: jest.fn(),
}));

describe('CreateStaffPage', () => {
  const mockCreateStaff = jest.fn();
  const mockRouter = {
    back: jest.fn(),
    push: jest.fn(),
  };

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    (useCreateStaffAtLocation as jest.Mock).mockReturnValue({
      mutateAsync: mockCreateStaff,
    });
    (require('next/navigation').useRouter as jest.Mock).mockReturnValue(
      mockRouter
    );
  });

  it('renders the page container', () => {
    render(<CreateStaffPage />);
    expect(screen.getByTestId('create-staff-page')).toBeInTheDocument();
  });

  it('renders the page title', () => {
    render(<CreateStaffPage />);
    expect(screen.getByTestId('create-staff-title')).toBeInTheDocument();
  });

  it('renders the form with all required fields', () => {
    render(<CreateStaffPage />);
    expect(screen.getByTestId('create-staff-content')).toBeInTheDocument();
    expect(screen.getByTestId('create-staff-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('create-staff-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('create-staff-role-select')).toBeInTheDocument();
  });

  it('shows validation errors for required fields', async () => {
    render(<CreateStaffPage />);

    // Submit form without filling required fields
    fireEvent.click(screen.getByTestId('create-staff-submit-button'));

    // Check for validation errors
    await waitFor(() => {
      expect(screen.getByTestId('create-staff-name-error')).toBeInTheDocument();
      expect(
        screen.getByTestId('create-staff-email-error')
      ).toBeInTheDocument();
      expect(screen.getByTestId('create-staff-role-error')).toBeInTheDocument();
    });
  });

  it('shows validation error for invalid email', async () => {
    render(<CreateStaffPage />);

    // Enter invalid email
    fireEvent.change(screen.getByTestId('create-staff-email-input'), {
      target: { value: 'invalid-email' },
    });

    // Submit form
    fireEvent.click(screen.getByTestId('create-staff-submit-button'));

    // Check for email validation error
    await waitFor(() => {
      expect(
        screen.getByTestId('create-staff-email-error')
      ).toBeInTheDocument();
    });
  });

  it('submits form with valid data', async () => {
    const mockResponse = { data: { id: '456' } };
    mockCreateStaff.mockResolvedValueOnce(mockResponse);

    render(<CreateStaffPage />);

    // Fill form with valid data
    fireEvent.change(screen.getByTestId('create-staff-name-input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByTestId('create-staff-email-input'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByTestId('create-staff-role-select'), {
      target: { value: 'STAFF' },
    });

    // Submit form
    fireEvent.click(screen.getByTestId('create-staff-submit-button'));

    // Check if createStaff was called with correct data
    await waitFor(() => {
      expect(mockCreateStaff).toHaveBeenCalledWith({
        locationId: '123',
        data: {
          name: 'John Doe',
          email: 'john@example.com',
          role: 'STAFF',
        },
      });
    });

    // Check for success message
    expect(screen.getByTestId('create-staff-success')).toBeInTheDocument();
  });

  it('handles API error', async () => {
    const errorMessage = 'Failed to create staff member';
    mockCreateStaff.mockRejectedValueOnce(new Error(errorMessage));

    render(<CreateStaffPage />);

    // Fill form with valid data
    fireEvent.change(screen.getByTestId('create-staff-name-input'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByTestId('create-staff-email-input'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByTestId('create-staff-role-select'), {
      target: { value: 'STAFF' },
    });

    // Submit form
    fireEvent.click(screen.getByTestId('create-staff-submit-button'));

    // Check for error message
    await waitFor(() => {
      expect(screen.getByTestId('create-staff-error')).toBeInTheDocument();
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it('navigates back when cancel button is clicked', () => {
    render(<CreateStaffPage />);

    // Click cancel button
    fireEvent.click(screen.getByTestId('create-staff-cancel-button'));

    // Check if router.back was called
    expect(mockRouter.back).toHaveBeenCalled();
  });
});
