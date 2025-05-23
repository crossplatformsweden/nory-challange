import { render, screen } from '@testing-library/react';
import { LocationInventoryStockRow } from './LocationInventoryStockRow';
import { useGetIngredientById, Ingredient } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useGetIngredientById: jest.fn(),
}));

const mockIngredient: Ingredient = {
  id: 'ing1',
  name: 'Test Ingredient Stock',
  unit: 'pcs',
  cost: 1.00, 
  currentStock: 100, // This field is on the top-level ingredient, not directly used by row from its props
};

describe('LocationInventoryStockRow Component', () => {
  beforeEach(() => {
    (useGetIngredientById as jest.Mock).mockReset();
  });

  test('renders ingredient name, quantity, and unit correctly', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: mockIngredient,
      isLoading: false,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationInventoryStockRow
            locationInventoryStockId="lis1"
            ingredientId="ing1"
            quantity={50}
          />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('loc-inventory-ingredient-name-ing1')).toHaveTextContent('Test Ingredient Stock');
    expect(screen.getByTestId('loc-inventory-quantity-ing1')).toHaveTextContent('50');
    expect(screen.getByTestId('loc-inventory-unit-ing1')).toHaveTextContent('pcs');
  });

  test('renders loading state for ingredient details', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationInventoryStockRow
            locationInventoryStockId="lis1"
            ingredientId="ing1"
            quantity={50}
          />
        </tbody>
      </table>
    );

    const nameCell = screen.getByTestId('loc-inventory-ingredient-name-ing1');
    expect(nameCell.querySelector('.h-4.w-3\\/4')).toBeInTheDocument(); // Skeleton for name

    const unitCell = screen.getByTestId('loc-inventory-unit-ing1');
    expect(unitCell.querySelector('.h-4.w-1\\/2')).toBeInTheDocument(); // Skeleton for unit
    
    expect(screen.getByTestId('loc-inventory-quantity-ing1')).toHaveTextContent('50'); // Quantity is passed directly
  });

  test('renders error state for ingredient details', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <table>
        <tbody>
          <LocationInventoryStockRow
            locationInventoryStockId="lis1"
            ingredientId="ing1"
            quantity={50}
          />
        </tbody>
      </table>
    );
    
    expect(screen.getByTestId('loc-inventory-ingredient-name-ing1')).toHaveTextContent('Error loading name');
    expect(screen.getByTestId('loc-inventory-unit-ing1')).toHaveTextContent('N/A'); 
    expect(screen.getByTestId('loc-inventory-quantity-ing1')).toHaveTextContent('50');
  });

  test('renders N/A for null quantity', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: mockIngredient,
      isLoading: false,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationInventoryStockRow
            locationInventoryStockId="lis1"
            ingredientId="ing1"
            quantity={null}
          />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('loc-inventory-quantity-ing1')).toHaveTextContent('N/A');
  });

  test('renders N/A for missing ingredient name or unit (after load)', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: { ...mockIngredient, name: null, unit: null } as unknown as Ingredient,
      isLoading: false,
      isError: false,
    });
    
    render(
      <table>
        <tbody>
          <LocationInventoryStockRow
            locationInventoryStockId="lis1"
            ingredientId="ing1"
            quantity={50}
          />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('loc-inventory-ingredient-name-ing1')).toHaveTextContent('N/A');
    expect(screen.getByTestId('loc-inventory-unit-ing1')).toHaveTextContent('N/A');
  });
});
