import { render, screen } from '@testing-library/react';
import { LocationIngredientCostRow } from './LocationIngredientCostRow';
import { useGetIngredientById, Ingredient } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useGetIngredientById: jest.fn(),
}));

const mockIngredient: Ingredient = {
  id: 'ing1',
  name: 'Test Ingredient',
  unit: 'kg',
  cost: 5.00, // Base cost, not necessarily used by this component directly but good for mock structure
  currentStock: 0,
};

describe('LocationIngredientCostRow Component', () => {
  beforeEach(() => {
    (useGetIngredientById as jest.Mock).mockReset();
  });

  test('renders ingredient name, cost, and unit correctly', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: mockIngredient,
      isLoading: false,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationIngredientCostRow
            locationIngredientCostId="lic1"
            ingredientId="ing1"
            costPerUnit={10.50}
          />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('loc-ingredient-name-ing1')).toHaveTextContent('Test Ingredient');
    expect(screen.getByTestId('loc-ingredient-cost-ing1')).toHaveTextContent('10.50');
    expect(screen.getByTestId('loc-ingredient-unit-ing1')).toHaveTextContent('kg');
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
          <LocationIngredientCostRow
            locationIngredientCostId="lic1"
            ingredientId="ing1"
            costPerUnit={10.50}
          />
        </tbody>
      </table>
    );

    const nameCell = screen.getByTestId('loc-ingredient-name-ing1');
    expect(nameCell.querySelector('.h-4.w-3\\/4')).toBeInTheDocument(); // Skeleton for name

    const unitCell = screen.getByTestId('loc-ingredient-unit-ing1');
    expect(unitCell.querySelector('.h-4.w-1\\/2')).toBeInTheDocument(); // Skeleton for unit
    
    expect(screen.getByTestId('loc-ingredient-cost-ing1')).toHaveTextContent('10.50'); // Cost is passed directly
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
          <LocationIngredientCostRow
            locationIngredientCostId="lic1"
            ingredientId="ing1"
            costPerUnit={10.50}
          />
        </tbody>
      </table>
    );
    
    expect(screen.getByTestId('loc-ingredient-name-ing1')).toHaveTextContent('Error loading name');
    expect(screen.getByTestId('loc-ingredient-unit-ing1')).toHaveTextContent('N/A'); // Error for unit as well
    expect(screen.getByTestId('loc-ingredient-cost-ing1')).toHaveTextContent('10.50');
  });

  test('renders N/A for null costPerUnit', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: mockIngredient,
      isLoading: false,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationIngredientCostRow
            locationIngredientCostId="lic1"
            ingredientId="ing1"
            costPerUnit={null}
          />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('loc-ingredient-cost-ing1')).toHaveTextContent('N/A');
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
          <LocationIngredientCostRow
            locationIngredientCostId="lic1"
            ingredientId="ing1"
            costPerUnit={10.50}
          />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('loc-ingredient-name-ing1')).toHaveTextContent('N/A');
    expect(screen.getByTestId('loc-ingredient-unit-ing1')).toHaveTextContent('N/A');
  });
});
