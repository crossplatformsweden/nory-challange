import { render, screen } from '@testing-library/react';
import { LocationInventoryMovementRow } from './LocationInventoryMovementRow';
import { useGetIngredientById, Ingredient } from '@repo/api-client';
import { format } from 'date-fns';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useGetIngredientById: jest.fn(),
}));

const mockIngredient: Ingredient = {
  id: 'ing1',
  name: 'Test Ingredient Movement',
  unit: 'kg',
  cost: 1.00,
  currentStock: 10, 
};

const mockMovement = {
  movementId: 'mov1',
  ingredientId: 'ing1',
  quantityChange: -5,
  type: 'SALE',
  createdAt: '2023-10-26T10:30:00.000Z',
};

describe('LocationInventoryMovementRow Component', () => {
  beforeEach(() => {
    (useGetIngredientById as jest.Mock).mockReset();
  });

  test('renders movement details correctly', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: mockIngredient,
      isLoading: false,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationInventoryMovementRow {...mockMovement} />
        </tbody>
      </table>
    );

    const expectedDate = format(new Date(mockMovement.createdAt), 'PPpp');
    expect(screen.getByTestId(`loc-movement-date-${mockMovement.movementId}`)).toHaveTextContent(expectedDate);
    expect(screen.getByTestId(`loc-movement-ingredient-name-${mockMovement.ingredientId}`)).toHaveTextContent('Test Ingredient Movement');
    expect(screen.getByTestId(`loc-movement-type-${mockMovement.movementId}`)).toHaveTextContent('SALE');
    expect(screen.getByTestId(`loc-movement-quantity-${mockMovement.movementId}`)).toHaveTextContent('-5');
  });

  test('renders loading state for ingredient name', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationInventoryMovementRow {...mockMovement} />
        </tbody>
      </table>
    );

    const nameCell = screen.getByTestId(`loc-movement-ingredient-name-${mockMovement.ingredientId}`);
    expect(nameCell.querySelector('.h-4.w-3\\/4')).toBeInTheDocument(); 
    expect(screen.getByTestId(`loc-movement-type-${mockMovement.movementId}`)).toHaveTextContent('SALE'); 
  });

  test('renders error state for ingredient name', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <table>
        <tbody>
          <LocationInventoryMovementRow {...mockMovement} />
        </tbody>
      </table>
    );

    expect(screen.getByTestId(`loc-movement-ingredient-name-${mockMovement.ingredientId}`)).toHaveTextContent('Error loading name');
  });

  test('renders N/A for null or undefined optional fields', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: mockIngredient, 
      isLoading: false,
      isError: false,
    });
    const movementWithNulls = {
      ...mockMovement,
      quantityChange: null,
      type: null,
      createdAt: null,
    };
    render(
      <table>
        <tbody>
          <LocationInventoryMovementRow {...movementWithNulls} />
        </tbody>
      </table>
    );

    expect(screen.getByTestId(`loc-movement-date-${mockMovement.movementId}`)).toHaveTextContent('N/A');
    expect(screen.getByTestId(`loc-movement-type-${mockMovement.movementId}`)).toHaveTextContent('N/A');
    expect(screen.getByTestId(`loc-movement-quantity-${mockMovement.movementId}`)).toHaveTextContent('N/A');
  });

   test('renders N/A for missing ingredient name after load', () => {
    (useGetIngredientById as jest.Mock).mockReturnValue({
      data: { ...mockIngredient, name: null } as unknown as Ingredient, 
      isLoading: false,
      isError: false,
    });
    render(
      <table>
        <tbody>
          <LocationInventoryMovementRow {...mockMovement} />
        </tbody>
      </table>
    );
    expect(screen.getByTestId(`loc-movement-ingredient-name-${mockMovement.ingredientId}`)).toHaveTextContent('N/A');
  });
});
