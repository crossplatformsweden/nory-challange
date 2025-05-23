import { render, screen, fireEvent } from '@testing-library/react';
import LocationDetailPage from './page';
import { useParams } from 'next/navigation';
import { useGetLocationById, Location } from '@repo/api-client';

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
  useRouter: jest.fn(() => ({ back: jest.fn() })),
}));

jest.mock('@repo/api-client', () => ({
  useGetLocationById: jest.fn(),
}));

// Mock child components
jest.mock('./components/StaffList', () => ({
  StaffList: jest.fn(({ locationId }) => <div data-testid="mock-staff-list">Staff List for {locationId}</div>),
}));
jest.mock('./components/LocationMenuItemsList', () => ({
  LocationMenuItemsList: jest.fn(({ locationId }) => <div data-testid="mock-menu-items-list">Menu Items List for {locationId}</div>),
}));
jest.mock('./components/LocationIngredientCostsList', () => ({
  LocationIngredientCostsList: jest.fn(({ locationId }) => <div data-testid="mock-loc-ingredient-costs-list">Ingredient Costs List for {locationId}</div>),
}));
jest.mock('./components/LocationInventoryStockList', () => ({
  LocationInventoryStockList: jest.fn(({ locationId }) => <div data-testid="mock-loc-inventory-stock-list">Inventory Stock List for {locationId}</div>),
}));
jest.mock('./components/LocationInventoryMovementsList', () => ({
  LocationInventoryMovementsList: jest.fn(({ locationId }) => <div data-testid="mock-loc-inventory-movements-list">Inventory Movements List for {locationId}</div>),
}));


describe('LocationDetailPage', () => {
  const mockLocationData: Location = {
    id: 'loc123',
    name: 'Test Location Name',
    address: '123 Test St, Test City',
    // Add other required fields from Location type if necessary for the tests
    // For example:
    // companyId: 'comp456',
    // conceptId: 'conc789',
    // currency: 'USD', 
    // settings: {},
    // etc.
  };

  const setupMocks = (
    { data = { data: mockLocationData }, isLoading = false, error = null }:
    { data?: { data: Location } | null, isLoading?: boolean, error?: Error | null } = {}
  ) => {
    (useParams as jest.Mock).mockReturnValue({ locationId: mockLocationData.id });
    (useGetLocationById as jest.Mock).mockReturnValue({ data, isLoading, error });
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state correctly', () => {
    setupMocks({ isLoading: true, data: null });
    render(<LocationDetailPage />);
    expect(screen.getByTestId('location-detail-loading')).toBeInTheDocument();
  });

  test('renders error state correctly', () => {
    const errorMessage = 'Failed to load location';
    setupMocks({ error: new Error(errorMessage), data: null });
    render(<LocationDetailPage />);
    expect(screen.getByTestId('location-detail-error')).toBeInTheDocument();
    expect(screen.getByText(`Error loading location: ${errorMessage}`)).toBeInTheDocument();
  });

  describe('when data is loaded', () => {
    beforeEach(() => {
      setupMocks();
      render(<LocationDetailPage />);
    });

    test('renders location details and tabs', () => {
      expect(screen.getByTestId('location-detail-page')).toBeInTheDocument();
      expect(screen.getByTestId('location-detail-title')).toHaveTextContent('Location Details');
      expect(screen.getByTestId('location-detail-name')).toHaveTextContent(mockLocationData.name);
      expect(screen.getByTestId('location-detail-address')).toHaveTextContent(mockLocationData.address);
      
      // Check for tabs container and specific tabs
      expect(screen.getByTestId('location-detail-tabs')).toBeInTheDocument();
      expect(screen.getByTestId('tab-staff')).toBeInTheDocument();
      expect(screen.getByTestId('tab-menu-items')).toBeInTheDocument();
      // ... add checks for other tabs once they are implemented
    });

    test('renders StaffList by default and passes correct locationId', () => {
      // Staff tab should be active by default
      expect(screen.getByTestId('tab-staff')).toHaveClass('tab-active');
      expect(screen.getByTestId('content-staff')).toBeVisible();
      
      const mockStaffList = screen.getByTestId('mock-staff-list');
      expect(mockStaffList).toBeInTheDocument();
      expect(mockStaffList).toHaveTextContent(`Staff List for ${mockLocationData.id}`);
    });

    test('switches to Menu Items tab and renders mocked LocationMenuItemsList', () => {
      const menuItemsTab = screen.getByTestId('tab-menu-items');
      fireEvent.click(menuItemsTab);

      expect(menuItemsTab).toHaveClass('tab-active');
      expect(screen.getByTestId('content-menu-items')).toBeVisible();
      
      const mockMenuItemsList = screen.getByTestId('mock-menu-items-list');
      expect(mockMenuItemsList).toBeInTheDocument();
      expect(mockMenuItemsList).toHaveTextContent(`Menu Items List for ${mockLocationData.id}`);
      expect(screen.queryByTestId('mock-staff-list')).not.toBeInTheDocument();
    });

    // Placeholder for other tab switching tests with actual components
    test('switches to Ingredient Costs tab and renders mocked LocationIngredientCostsList', () => {
      const ingredientCostsTab = screen.getByTestId('tab-ingredient-costs');
      fireEvent.click(ingredientCostsTab);
      expect(ingredientCostsTab).toHaveClass('tab-active');
      expect(screen.getByTestId('content-ingredient-costs')).toBeVisible();
      
      const mockIngredientCostsList = screen.getByTestId('mock-loc-ingredient-costs-list');
      expect(mockIngredientCostsList).toBeInTheDocument();
      expect(mockIngredientCostsList).toHaveTextContent(`Ingredient Costs List for ${mockLocationData.id}`);
      expect(screen.queryByTestId('mock-menu-items-list')).not.toBeInTheDocument();
    });

    test('switches to Inventory Stock tab and renders mocked LocationInventoryStockList', () => {
      const inventoryStockTab = screen.getByTestId('tab-inventory-stock');
      fireEvent.click(inventoryStockTab);
      expect(inventoryStockTab).toHaveClass('tab-active');
      expect(screen.getByTestId('content-inventory-stock')).toBeVisible();
      
      const mockInventoryStockList = screen.getByTestId('mock-loc-inventory-stock-list');
      expect(mockInventoryStockList).toBeInTheDocument();
      expect(mockInventoryStockList).toHaveTextContent(`Inventory Stock List for ${mockLocationData.id}`);
      expect(screen.queryByTestId('mock-loc-ingredient-costs-list')).not.toBeInTheDocument();
    });

    test('switches to Inventory Movements tab and renders mocked LocationInventoryMovementsList', () => {
      const inventoryMovementsTab = screen.getByTestId('tab-inventory-movements');
      fireEvent.click(inventoryMovementsTab);
      expect(inventoryMovementsTab).toHaveClass('tab-active');
      expect(screen.getByTestId('content-inventory-movements')).toBeVisible();
      
      const mockMovementsList = screen.getByTestId('mock-loc-inventory-movements-list');
      expect(mockMovementsList).toBeInTheDocument();
      expect(mockMovementsList).toHaveTextContent(`Inventory Movements List for ${mockLocationData.id}`);
      expect(screen.queryByTestId('mock-loc-inventory-stock-list')).not.toBeInTheDocument();
    });

    // Test that the old quick links are no longer present
    test('does not render old quick links card', () => {
      expect(screen.queryByTestId('location-detail-staff-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('location-detail-menu-items-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('location-detail-ingredient-costs-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('location-detail-inventory-stock-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('location-detail-inventory-movements-link')).not.toBeInTheDocument(); // This was the old link ID
      expect(screen.queryByTestId('location-detail-sales-link')).not.toBeInTheDocument();
      expect(screen.queryByTestId('location-detail-reports-link')).not.toBeInTheDocument();
    });
  });
});
=======
    renderComponent(true);

    expect(screen.getByTestId('location-detail-loading')).toBeInTheDocument();
    expect(
      screen.queryByTestId('location-detail-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, new Error('Failed to load location'));

    expect(screen.getByTestId('location-detail-error')).toBeInTheDocument();
    expect(
      screen.queryByTestId('location-detail-content')
    ).not.toBeInTheDocument();
  });
});
