import { render, screen } from '@testing-library/react';
import { LocationInventoryStockList } from './LocationInventoryStockList';
import { useListInventoryStock, InventoryStock } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useListInventoryStock: jest.fn(),
}));

// Mock the LocationInventoryStockRow sub-component
jest.mock('./LocationInventoryStockRow', () => ({
  LocationInventoryStockRow: jest.fn(({ locationInventoryStockId, ingredientId, quantity }) => (
    <tr data-testid={`mock-loc-inventory-stock-row-${locationInventoryStockId}`}>
      <td>Mocked Ingredient ID: {ingredientId}</td>
      <td>Quantity: {quantity !== null ? quantity : 'N/A'}</td>
    </tr>
  )),
}));

const mockInventoryStockData: InventoryStock[] = [
  { id: 'is1', locationId: 'loc1', ingredientId: 'ing1', quantity: 100 },
  { id: 'is2', locationId: 'loc1', ingredientId: 'ing2', quantity: 50 },
  { id: 'is3', locationId: 'loc1', ingredientId: 'ing3', quantity: null }, // Test null quantity
];

describe('LocationInventoryStockList Component', () => {
  beforeEach(() => {
    (useListInventoryStock as jest.Mock).mockReset();
    (require('./LocationInventoryStockRow').LocationInventoryStockRow as jest.Mock).mockClear();
  });

  test('renders loading state correctly', () => {
    (useListInventoryStock as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<LocationInventoryStockList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-stock-list-loading')).toBeInTheDocument();
    expect(screen.getByTestId('loc-inventory-stock-list-loading').children.length).toBeGreaterThan(2);
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch inventory stock';
    (useListInventoryStock as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    });

    render(<LocationInventoryStockList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-stock-list-error')).toBeInTheDocument();
    expect(screen.getByText('Error Loading Inventory Stock')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    (useListInventoryStock as jest.Mock).mockReturnValue({
      data: [], // Empty array
      isLoading: false,
      isError: false,
    });

    render(<LocationInventoryStockList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-stock-list-empty')).toBeInTheDocument();
    expect(screen.getByText('No inventory stock data found for this location.')).toBeInTheDocument();
  });

  test('renders inventory stock data and calls LocationInventoryStockRow with correct props', () => {
    (useListInventoryStock as jest.Mock).mockReturnValue({
      data: mockInventoryStockData,
      isLoading: false,
      isError: false,
    });

    render(<LocationInventoryStockList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-stock-list-container')).toBeInTheDocument();
    expect(screen.getByTestId('loc-inventory-stock-list-title')).toHaveTextContent('Inventory Stock Levels');
    expect(screen.getByTestId('loc-inventory-stock-table')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByRole('columnheader', { name: 'Ingredient Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Current Quantity' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Unit' })).toBeInTheDocument();

    // Check that LocationInventoryStockRow is called for each item with correct props
    const MockedRowComponent = require('./LocationInventoryStockRow').LocationInventoryStockRow;
    expect(MockedRowComponent).toHaveBeenCalledTimes(mockInventoryStockData.length);

    mockInventoryStockData.forEach(item => {
      expect(MockedRowComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          locationInventoryStockId: item.id,
          ingredientId: item.ingredientId,
          quantity: item.quantity !== undefined ? item.quantity : null,
        }),
        {} // Second argument to component calls (context)
      );
      expect(screen.getByTestId(`mock-loc-inventory-stock-row-${item.id}`)).toBeInTheDocument();
    });
  });
});
