import { render, screen } from '@testing-library/react';
import InventorySummaryReportPage from './page';
import { useRouter, useParams } from 'next/navigation';
import { useListInventoryStock, useGetIngredientById } from '@repo/api-client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

// Create a new QueryClient for each test
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

// Mock the navigation hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useParams: jest.fn(() => ({ locationId: '123' })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock the API hooks
jest.mock('@repo/api-client', () => ({
  useListInventoryStock: jest.fn(() => ({
    data: {
      data: [],
    },
    isLoading: false,
    error: null,
  })),
  useGetIngredientById: jest.fn().mockImplementation(() => ({
    data: {
      data: {
        cost: 2.5,
      },
    },
    isLoading: false,
    error: null,
  })),
  getIngredientById: jest.fn().mockImplementation(() =>
    Promise.resolve({
      data: {
        cost: 2.5,
      },
    })
  ),
}));

describe('InventorySummaryReportPage', () => {
  const mockRouter = {
    back: jest.fn(),
  };

  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useParams as jest.Mock).mockReturnValue({ locationId: '123' });
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('renders the page', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <InventorySummaryReportPage />
      </QueryClientProvider>
    );
    expect(
      screen.getByTestId('inventory-summary-report-page')
    ).toBeInTheDocument();
  });

  const mockInventoryData = {
    data: [
      {
        id: '1',
        ingredient: {
          id: 'ing1',
          name: 'Flour',
          unit: 'kg',
        },
        quantity: 10.5,
      },
      {
        id: '2',
        ingredient: {
          id: 'ing2',
          name: 'Sugar',
          unit: 'kg',
        },
        quantity: 3,
      },
    ],
  };

  const mockIngredientData = {
    data: {
      cost: 2.5,
    },
  };

  const renderComponent = (
    loading = false,
    error: Error | null = null,
    inventoryData = mockInventoryData,
    ingredientData = mockIngredientData
  ) => {
    // Mock the API hook responses
    (useListInventoryStock as jest.Mock).mockReturnValue({
      data: inventoryData,
      isLoading: loading,
      error: error,
    });

    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: ingredientData,
      isLoading: false,
      error: null,
    });

    render(
      <QueryClientProvider client={queryClient}>
        <InventorySummaryReportPage />
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and navigation elements', () => {
    renderComponent();

    expect(
      screen.getByTestId('inventory-summary-report-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-back-button')
    ).toBeInTheDocument();
  });

  it('renders the summary cards when data is loaded', async () => {
    renderComponent();

    // Wait for loading state to complete
    await screen.findByTestId('inventory-summary-report-content');

    // Check summary cards
    expect(
      screen.getByTestId('inventory-summary-report-total-value-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-total-value')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-total-items-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-total-items')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-low-stock-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-low-stock')
    ).toBeInTheDocument();
  });

  it('renders the stock items table when data is loaded', async () => {
    renderComponent();

    // Wait for loading state to complete
    await screen.findByTestId('inventory-summary-report-content');

    // Check table headers
    expect(
      screen.getByTestId('inventory-summary-report-table-header-ingredient')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-table-header-quantity')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-table-header-value')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-table-header-status')
    ).toBeInTheDocument();

    // Check table rows
    expect(
      screen.getByTestId('inventory-summary-report-item-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-item-2')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-ingredient-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-quantity-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-value-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-status-1')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(
      screen.getByTestId('inventory-summary-report-loading')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('inventory-summary-report-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, new Error('Failed to load inventory summary'));

    expect(
      screen.getByTestId('inventory-summary-report-error')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('inventory-summary-report-content')
    ).not.toBeInTheDocument();
  });

  it('renders empty state when no items exist', () => {
    renderComponent(false, null, { data: [] });

    expect(
      screen.getByTestId('inventory-summary-report-content')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-summary-report-empty')
    ).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    renderComponent();
    screen.getByTestId('inventory-summary-report-back-button').click();

    expect(mockBack).toHaveBeenCalled();
  });
});
