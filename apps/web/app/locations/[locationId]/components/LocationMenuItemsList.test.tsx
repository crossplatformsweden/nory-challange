import { render, screen } from '@testing-library/react';
import { LocationMenuItemsList } from './LocationMenuItemsList';
import { useListLocationMenuItems, LocationMenuItem } from '@repo/api-client';

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useListLocationMenuItems: jest.fn(),
}));

// Mock the LocationMenuItemRow sub-component
jest.mock('./LocationMenuItemRow', () => ({
  LocationMenuItemRow: jest.fn(({ locationMenuItemId, recipeId, price }) => (
    <tr data-testid={`mock-menu-item-row-${locationMenuItemId}`}>
      <td>Mocked Recipe: {recipeId}</td>
      <td>Price: {price !== null ? price.toFixed(2) : 'N/A'}</td>
    </tr>
  )),
}));

const mockLocationMenuItems: LocationMenuItem[] = [
  { id: 'lmi1', locationId: 'loc1', recipeId: 'r1', price: 10.99 },
  { id: 'lmi2', locationId: 'loc1', recipeId: 'r2', price: 5.50 },
  { id: 'lmi3', locationId: 'loc1', recipeId: 'r3', price: null }, // Test null price
];

describe('LocationMenuItemsList Component', () => {
  beforeEach(() => {
    (useListLocationMenuItems as jest.Mock).mockReset();
    (require('./LocationMenuItemRow').LocationMenuItemRow as jest.Mock).mockClear(); // Clear mock calls
  });

  test('renders loading state correctly', () => {
    (useListLocationMenuItems as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(<LocationMenuItemsList locationId="loc1" />);

    expect(screen.getByTestId('menu-items-list-loading')).toBeInTheDocument();
    // Check for multiple skeleton rows
    expect(screen.getByTestId('menu-items-list-loading').children.length).toBeGreaterThan(2);
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Failed to fetch menu items';
    (useListLocationMenuItems as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      error: { message: errorMessage },
    });

    render(<LocationMenuItemsList locationId="loc1" />);

    expect(screen.getByTestId('menu-items-list-error')).toBeInTheDocument();
    expect(screen.getByText('Error Loading Menu Items')).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  test('renders empty state correctly', () => {
    (useListLocationMenuItems as jest.Mock).mockReturnValue({
      data: [], // Empty array
      isLoading: false,
      isError: false,
    });

    render(<LocationMenuItemsList locationId="loc1" />);

    expect(screen.getByTestId('menu-items-list-empty')).toBeInTheDocument();
    expect(screen.getByText('No menu items found for this location.')).toBeInTheDocument();
  });

  test('renders menu items data and calls LocationMenuItemRow with correct props', () => {
    (useListLocationMenuItems as jest.Mock).mockReturnValue({
      data: mockLocationMenuItems,
      isLoading: false,
      isError: false,
    });

    render(<LocationMenuItemsList locationId="loc1" />);

    expect(screen.getByTestId('menu-items-list-container')).toBeInTheDocument();
    expect(screen.getByTestId('menu-items-list-title')).toHaveTextContent('Menu Items');
    expect(screen.getByTestId('menu-items-list-table')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByRole('columnheader', { name: 'Recipe Name' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'Price' })).toBeInTheDocument();

    // Check that LocationMenuItemRow is called for each item with correct props
    const MockedRowComponent = require('./LocationMenuItemRow').LocationMenuItemRow;
    expect(MockedRowComponent).toHaveBeenCalledTimes(mockLocationMenuItems.length);

    mockLocationMenuItems.forEach(item => {
      expect(MockedRowComponent).toHaveBeenCalledWith(
        expect.objectContaining({
          locationMenuItemId: item.id,
          recipeId: item.recipeId,
          price: item.price !== undefined ? item.price : null,
        }),
        {} // Second argument to component calls (context)
      );
      // Check if the mocked row is rendered (optional, but good for sanity)
      expect(screen.getByTestId(`mock-menu-item-row-${item.id}`)).toBeInTheDocument();
    });
  });
});
