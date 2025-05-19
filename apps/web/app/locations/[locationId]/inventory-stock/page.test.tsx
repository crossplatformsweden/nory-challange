import { render, screen, fireEvent } from '@testing-library/react';
import InventoryStockPage from './page';
import { useParams, useRouter } from 'next/navigation';
import { useListInventoryStock } from '@nory/api-client';

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
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
    push: jest.fn(),
  })),
}));

// Mock the API hook
jest.mock('@nory/api-client', () => ({
  useListInventoryStock: jest.fn(),
}));

describe('InventoryStockPage', () => {
  const mockStockItems = [
    {
      id: '1',
      locationId: '123',
      ingredientId: 'ing1',
      quantity: 10.5,
      ingredient: {
        id: 'ing1',
        name: 'Flour',
        unit: 'kg',
        cost: 2.5,
      },
    },
    {
      id: '2',
      locationId: '123',
      ingredientId: 'ing2',
      quantity: 5,
      ingredient: {
        id: 'ing2',
        name: 'Sugar',
        unit: 'kg',
        cost: 1.8,
      },
    },
  ];

  const renderComponent = (
    loading = false,
    error = null,
    data = mockStockItems
  ) => {
    // Mock useParams
    (useParams as jest.Mock).mockReturnValue({ locationId: '123' });

    // Mock the API hook response
    (useListInventoryStock as jest.Mock).mockReturnValue({
      data: loading ? null : { data },
      isLoading: loading,
      error,
    });

    render(<InventoryStockPage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page container, title, and navigation elements', () => {
    renderComponent();

    expect(screen.getByTestId('inventory-stock-page')).toBeInTheDocument();
    expect(screen.getByTestId('inventory-stock-title')).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-stock-back-button')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-stock-record-movement-button')
    ).toBeInTheDocument();
  });

  it('renders the inventory stock table when data is loaded', () => {
    renderComponent();

    expect(screen.getByTestId('inventory-stock-content')).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-stock-table-header-ingredient')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-stock-table-header-quantity')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-stock-table-header-value')
    ).toBeInTheDocument();

    // Check the stock rows
    expect(screen.getByTestId('inventory-stock-row-1')).toBeInTheDocument();
    expect(screen.getByTestId('inventory-stock-row-2')).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-stock-ingredient-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-stock-quantity-1')
    ).toBeInTheDocument();
    expect(screen.getByTestId('inventory-stock-value-1')).toBeInTheDocument();

    // Check action buttons
    expect(screen.getByTestId('inventory-stock-record-1')).toBeInTheDocument();
    expect(screen.getByTestId('inventory-stock-cost-1')).toBeInTheDocument();

    // Check total value
    expect(
      screen.getByTestId('inventory-stock-total-value')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(screen.getByTestId('inventory-stock-loading')).toBeInTheDocument();
    expect(
      screen.queryByTestId('inventory-stock-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, null);

    expect(screen.getByTestId('inventory-stock-error')).toBeInTheDocument();
    expect(
      screen.queryByTestId('inventory-stock-content')
    ).not.toBeInTheDocument();
  });

  it('renders empty state when no stock items exist', () => {
    renderComponent(false, null, []);

    expect(screen.getByTestId('inventory-stock-content')).toBeInTheDocument();
    expect(screen.getByTestId('inventory-stock-empty')).toBeInTheDocument();
  });

  it('allows filtering by ingredient', () => {
    renderComponent();

    const filterSelect = screen.getByTestId(
      'inventory-stock-ingredient-filter'
    );
    expect(filterSelect).toBeInTheDocument();

    // Simulate changing the filter
    fireEvent.change(filterSelect, { target: { value: 'ing1' } });

    // Check that the hook was called with the updated filter
    expect(useListInventoryStock).toHaveBeenCalledWith(
      expect.objectContaining({
        locationId: '123',
        ingredientId: 'ing1',
      }),
      expect.anything()
    );
  });
});
