import { render, screen } from '@testing-library/react';
import { LocationIngredientCostsList } from './LocationIngredientCostsList';
import { useListLocationIngredientCosts, LocationIngredientCost } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useListLocationIngredientCosts: jest.fn(),
}));

// Mock the LocationIngredientCostRow sub-component
jest.mock('./LocationIngredientCostRow', () => ({
  LocationIngredientCostRow: jest.fn(({ locationIngredientCostId, ingredientId, costPerUnit }) => (
    <tr data-testid={`mock-loc-ingredient-cost-row-${locationIngredientCostId}`}>
      <td>Mocked Ingredient ID: {ingredientId}</td>
      <td>Cost: {costPerUnit !== null ? costPerUnit.toFixed(2) : 'N/A'}</td>
    </tr>
  )),
}));

const mockLocationIngredientCosts: LocationIngredientCost[] = [
  { id: 'lic1', locationId: 'loc1', ingredientId: 'ing1', cost: 12.50 },
  { id: 'lic2', locationId: 'loc1', ingredientId: 'ing2', cost: 7.75 },
  { id: 'lic3', locationId: 'loc1', ingredientId: 'ing3', cost: null }, // Test null cost
];

describe('LocationIngredientCostsList Component', () => {
  beforeEach(() => {
    (useListLocationIngredientCosts as jest.Mock).mockReset();
    (require('./LocationIngredientCostRow').LocationIngredientCostRow as jest.Mock).mockClear();
  });

  test('renders loading state correctly', () => {
    (useListLocationIngredientCosts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<LocationIngredientCostsList locationId="loc1" />);

    expect(screen.getByTestId('loc-ingredient-costs-list-loading')).toBeInTheDocument();
    expect(screen.getByTestId('loc-ingredient-costs-list-loading').children.length).toBeGreaterThan(2);
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch ingredient costs';
    (useListLocationIngredientCosts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    });

    render(<LocationIngredientCostsList locationId="loc1" />);

    expect(screen.getByTestId('loc-ingredient-costs-list-error')).toBeInTheDocument();
    expect(screen.getByText('Error Loading Ingredient Costs')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    (useListLocationIngredientCosts as jest.Mock).mockReturnValue({
      data: [], // Empty array
      isLoading: false,
      isError: false,
    });

    render(<LocationIngredientCostsList locationId="loc1" />);

    expect(screen.getByTestId('loc-ingredient-costs-list-empty')).toBeInTheDocument();
    expect(screen.getByText('No specific ingredient costs found for this location.')).toBeInTheDocument();
  });

  test('renders ingredient costs data and calls LocationIngredientCostRow with correct props', () => {
    (useListLocationIngredientCosts as jest.Mock).mockReturnValue({
      data: mockLocationIngredientCosts,
      isLoading: false,
      isError: false,
    });

    render(<LocationIngredientCostsList locationId="loc1" />);

    expect(screen.getByTestId('loc-ingredient-costs-list-container')).toBeInTheDocument();
    expect(screen.getByTestId('loc-ingredient-costs-list-title')).toHaveTextContent('Location-Specific Ingredient Costs');
    expect(screen.getByTestId('loc-ingredient-costs-table')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByRole('columnheader', { name: 'Ingredient Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Cost Per Unit' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Unit' })).toBeInTheDocument();

    // Check that LocationIngredientCostRow is called for each item with correct props
    const MockedRowComponent = require('./LocationIngredientCostRow').LocationIngredientCostRow;
    expect(MockedRowComponent).toHaveBeenCalledTimes(mockLocationIngredientCosts.length);

    mockLocationIngredientCosts.forEach(item => {
      expect(MockedRowComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          locationIngredientCostId: item.id,
          ingredientId: item.ingredientId,
          costPerUnit: item.cost !== undefined ? item.cost : null,
        }),
        {} // Second argument to component calls (context)
      );
      expect(screen.getByTestId(`mock-loc-ingredient-cost-row-${item.id}`)).toBeInTheDocument();
    });
  });
});
