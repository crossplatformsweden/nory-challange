import { render, screen } from '@testing-library/react';
import LocationDetailPage from './page';
import { useParams, useRouter } from 'next/navigation';
import { useGetLocationById } from '@nory/api-client';

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
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
}));

// Mock the hook
jest.mock('@nory/api-client', () => ({
  useGetLocationById: jest.fn(),
}));

describe('LocationDetailPage', () => {
  const mockLocation = {
    id: '123',
    name: 'Downtown Store',
    address: '123 Main St',
    phoneNumber: '555-1234',
    email: 'downtown@example.com',
    openingHours: 'Mon-Fri: 9am-5pm',
  };

  const renderComponent = (loading = false, error: Error | null = null) => {
    // Mock useParams
    (useParams as jest.Mock).mockReturnValue({ locationId: '123' });

    // Mock the API hook response
    (useGetLocationById as jest.Mock).mockReturnValue({
      data: loading ? null : { data: mockLocation },
      isLoading: loading,
      error: error || null,
    });

    render(<LocationDetailPage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and back button', () => {
    renderComponent();

    expect(screen.getByTestId('location-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('location-detail-title')).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-back-button')
    ).toBeInTheDocument();
  });

  it('renders location details when data is loaded', () => {
    renderComponent();

    expect(screen.getByTestId('location-detail-content')).toBeInTheDocument();
    expect(screen.getByTestId('location-detail-name')).toBeInTheDocument();
    expect(screen.getByTestId('location-detail-address')).toBeInTheDocument();
    expect(screen.getByTestId('location-detail-phone')).toBeInTheDocument();
    expect(screen.getByTestId('location-detail-email')).toBeInTheDocument();
    expect(screen.getByTestId('location-detail-hours')).toBeInTheDocument();

    // Buttons and links
    expect(
      screen.getByTestId('location-detail-edit-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-delete-button')
    ).toBeInTheDocument();

    // Navigation links
    expect(
      screen.getByTestId('location-detail-staff-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-menu-items-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-ingredient-costs-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-inventory-stock-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-inventory-movements-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-sales-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('location-detail-reports-link')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(screen.getByTestId('location-detail-loading')).toBeInTheDocument();
    expect(
      screen.queryByTestId('location-detail-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, new Error('Failed to load location'));

    expect(screen.getByTestId('location-detail-error')).toBeInTheDocument();
    expect(
      screen.queryByTestId('location-detail-content')
    ).not.toBeInTheDocument();
  });
});
