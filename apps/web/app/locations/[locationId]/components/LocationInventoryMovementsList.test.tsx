import { render, screen } from '@testing-library/react';
import { LocationInventoryMovementsList } from './LocationInventoryMovementsList';
import { useListInventoryMovements, InventoryMovement } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useListInventoryMovements: jest.fn(),
}));

// Mock the LocationInventoryMovementRow sub-component
jest.mock('./LocationInventoryMovementRow', () => ({
  LocationInventoryMovementRow: jest.fn(({ movementId, ingredientId, quantityChange, type, createdAt }) => (
    <tr data-testid={`mock-loc-inventory-movement-row-${movementId}`}>
      <td>Date: {createdAt}</td>
      <td>Ingredient ID: {ingredientId}</td>
      <td>Type: {type}</td>
      <td>Quantity Change: {quantityChange}</td>
    </tr>
  )),
}));

const mockInventoryMovements: InventoryMovement[] = [
  { id: 'mov1', locationId: 'loc1', ingredientId: 'ing1', quantityChange: -5, type: 'SALE', createdAt: '2023-10-26T10:30:00.000Z', currentStock: 0, unitCost: 0, value: 0 },
  { id: 'mov2', locationId: 'loc1', ingredientId: 'ing2', quantityChange: 10, type: 'RECEIVED', createdAt: '2023-10-27T11:00:00.000Z', currentStock: 0, unitCost: 0, value: 0 },
  { id: 'mov3', locationId: 'loc1', ingredientId: 'ing3', quantityChange: null, type: 'ADJUSTMENT', createdAt: null, currentStock: 0, unitCost: 0, value: 0 },
];

describe('LocationInventoryMovementsList Component', () => {
  beforeEach(() => {
    (useListInventoryMovements as jest.Mock).mockReset();
    (require('./LocationInventoryMovementRow').LocationInventoryMovementRow as jest.Mock).mockClear();
  });

  test('renders loading state correctly', () => {
    (useListInventoryMovements as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<LocationInventoryMovementsList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-movements-list-loading')).toBeInTheDocument();
    expect(screen.getByTestId('loc-inventory-movements-list-loading').children.length).toBeGreaterThan(2);
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch inventory movements';
    (useListInventoryMovements as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    });

    render(<LocationInventoryMovementsList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-movements-list-error')).toBeInTheDocument();
    expect(screen.getByText('Error Loading Inventory Movements')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    (useListInventoryMovements as jest.Mock).mockReturnValue({
      data: [], // Empty array
      isLoading: false,
      isError: false,
    });

    render(<LocationInventoryMovementsList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-movements-list-empty')).toBeInTheDocument();
    expect(screen.getByText('No inventory movements found for this location.')).toBeInTheDocument();
  });

  test('renders inventory movements data and calls LocationInventoryMovementRow with correct props', () => {
    (useListInventoryMovements as jest.Mock).mockReturnValue({
      data: mockInventoryMovements,
      isLoading: false,
      isError: false,
    });

    render(<LocationInventoryMovementsList locationId="loc1" />);

    expect(screen.getByTestId('loc-inventory-movements-list-container')).toBeInTheDocument();
    expect(screen.getByTestId('loc-inventory-movements-list-title')).toHaveTextContent('Inventory Movements');
    expect(screen.getByTestId('loc-inventory-movements-table')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByRole('columnheader', { name: 'Date' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Ingredient Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Type' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Quantity Change' })).toBeInTheDocument();

    // Check that LocationInventoryMovementRow is called for each item with correct props
    const MockedRowComponent = require('./LocationInventoryMovementRow').LocationInventoryMovementRow;
    expect(MockedRowComponent).toHaveBeenCalledTimes(mockInventoryMovements.length);

    mockInventoryMovements.forEach(movement => {
      expect(MockedRowComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          movementId: movement.id,
          ingredientId: movement.ingredientId,
          quantityChange: movement.quantityChange !== undefined ? movement.quantityChange : null,
          type: movement.type !== undefined ? movement.type : null,
          createdAt: movement.createdAt !== undefined ? movement.createdAt : null,
        }),
        {} // Second argument to component calls (context)
      );
      expect(screen.getByTestId(`mock-loc-inventory-movement-row-${movement.id}`)).toBeInTheDocument();
    });
  });
});
