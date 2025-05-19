import { render, screen } from '@testing-library/react';
import ReportsOverviewPage from './page';
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

// Mock the API client hook
jest.mock('@nory/api-client', () => ({
  useGetLocationById: jest.fn(),
}));

describe('ReportsOverviewPage', () => {
  const mockLocation = {
    id: '123',
    name: 'Downtown Store',
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

    render(<ReportsOverviewPage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and back button', () => {
    renderComponent();

    expect(screen.getByTestId('reports-overview-page')).toBeInTheDocument();
    expect(screen.getByTestId('reports-overview-title')).toBeInTheDocument();
    expect(
      screen.getByTestId('reports-overview-back-button')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(screen.getByTestId('reports-overview-loading')).toBeInTheDocument();
    expect(
      screen.queryByTestId('reports-overview-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    const errorMessage = 'Failed to load reports';
    renderComponent(false, new Error(errorMessage));

    expect(screen.getByTestId('reports-overview-error')).toBeInTheDocument();
    expect(
      screen.getByText(/Error loading reports:.*Failed to load reports/)
    ).toBeInTheDocument();
  });

  it('renders reports content when data is loaded', () => {
    renderComponent();

    expect(screen.getByTestId('reports-overview-content')).toBeInTheDocument();
    expect(
      screen.getByTestId('reports-overview-inventory-summary-link')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('reports-overview-inventory-timeline-link')
    ).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const mockRouter = {
      back: jest.fn(),
    };
    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    renderComponent();

    const backButton = screen.getByTestId('reports-overview-back-button');
    backButton.click();

    expect(mockRouter.back).toHaveBeenCalledTimes(1);
  });
});
