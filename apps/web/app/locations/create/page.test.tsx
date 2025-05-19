import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateLocationPage from './page';
import { useCreateLocation } from '@nory/api-client';
import { useRouter } from 'next/navigation';

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

// Mock the hooks
jest.mock('@nory/api-client', () => ({
  useCreateLocation: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateLocationPage', () => {
  const mockRouter = {
    push: jest.fn(),
    back: jest.fn(),
  };

  const mockCreateLocation = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Mock router
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    // Mock create location hook
    (useCreateLocation as jest.Mock).mockReturnValue({
      mutateAsync: mockCreateLocation,
    });

    render(<CreateLocationPage />);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders the page container, title, and form elements', () => {
    // Page structure
    expect(screen.getByTestId('create-location-page')).toBeInTheDocument();
    expect(screen.getByTestId('create-location-title')).toBeInTheDocument();
    expect(screen.getByTestId('create-location-content')).toBeInTheDocument();

    // Form inputs
    expect(
      screen.getByTestId('create-location-name-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-location-address-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-location-phone-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-location-email-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-location-hours-input')
    ).toBeInTheDocument();

    // Buttons
    expect(
      screen.getByTestId('create-location-cancel-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-location-submit-button')
    ).toBeInTheDocument();
  });

  it('shows validation errors when submitting with empty required fields', async () => {
    // Get the submit button and click it without filling the form
    const submitButton = screen.getByTestId('create-location-submit-button');
    fireEvent.click(submitButton);

    // Wait for validation errors to appear
    await waitFor(() => {
      expect(
        screen.getByTestId('create-location-name-error')
      ).toBeInTheDocument();
      expect(
        screen.getByTestId('create-location-address-error')
      ).toBeInTheDocument();
    });

    // Verify the create location function was not called
    expect(mockCreateLocation).not.toHaveBeenCalled();
  });

  it('submits the form with valid data', async () => {
    // Mock success response
    mockCreateLocation.mockResolvedValue({
      data: { id: '123', name: 'Test Location' },
    });

    // Fill out the form
    fireEvent.change(screen.getByTestId('create-location-name-input'), {
      target: { value: 'Test Location' },
    });

    fireEvent.change(screen.getByTestId('create-location-address-input'), {
      target: { value: '123 Test Street' },
    });

    fireEvent.change(screen.getByTestId('create-location-email-input'), {
      target: { value: 'test@example.com' },
    });

    // Submit the form
    const submitButton = screen.getByTestId('create-location-submit-button');
    fireEvent.click(submitButton);

    // Wait for success state
    await waitFor(() => {
      expect(mockCreateLocation).toHaveBeenCalledWith({
        data: expect.objectContaining({
          name: 'Test Location',
          address: '123 Test Street',
          email: 'test@example.com',
        }),
      });
    });

    // Verify success message is shown after successful submission
    await waitFor(() => {
      expect(screen.getByTestId('create-location-success')).toBeInTheDocument();
    });

    // Verify router.push will be called after a delay
    jest.advanceTimersByTime(2000);
    expect(mockRouter.push).toHaveBeenCalledWith('/locations/123');
  });

  it('handles form submission errors', async () => {
    // Mock an error response
    const mockError = new Error('Failed to create location');
    mockCreateLocation.mockRejectedValue(mockError);

    // Fill out the form with minimum required fields
    fireEvent.change(screen.getByTestId('create-location-name-input'), {
      target: { value: 'Test Location' },
    });

    fireEvent.change(screen.getByTestId('create-location-address-input'), {
      target: { value: '123 Test Street' },
    });

    // Submit the form
    const submitButton = screen.getByTestId('create-location-submit-button');
    fireEvent.click(submitButton);

    // Verify the error message is displayed
    await waitFor(() => {
      expect(screen.getByTestId('create-location-error')).toBeInTheDocument();
      expect(screen.getByTestId('create-location-error')).toHaveTextContent(
        'Failed to create location'
      );
    });
  });

  it('navigates back when cancel button is clicked', () => {
    const cancelButton = screen.getByTestId('create-location-cancel-button');
    fireEvent.click(cancelButton);

    expect(mockRouter.back).toHaveBeenCalled();
  });
});
