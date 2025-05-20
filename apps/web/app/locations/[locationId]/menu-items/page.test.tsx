import { render, screen } from '@testing-library/react';
import MenuItemsListPage from './page';
import { useListLocationMenuItems } from '@repo/api-client';
import { useParams } from 'next/navigation';

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

// Mock the hooks
jest.mock('@repo/api-client', () => ({
  useListLocationMenuItems: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('MenuItemsListPage', () => {
  const mockLocationId = '123';
  const mockMenuItems = {
    data: [
      {
        id: '1',
        name: 'Test Item 1',
        price: 9.99,
        category: 'Test Category 1',
        recipeId: 'recipe-1',
        modifierIds: ['mod-1', 'mod-2'],
      },
      {
        id: '2',
        name: 'Test Item 2',
        price: 19.99,
        category: 'Test Category 2',
        recipeId: 'recipe-2',
        modifierIds: ['mod-3'],
      },
    ],
  };

  beforeEach(() => {
    // Mock useParams
    (useParams as jest.Mock).mockReturnValue({ locationId: mockLocationId });

    // Mock useListLocationMenuItems
    (useListLocationMenuItems as jest.Mock).mockReturnValue({
      data: mockMenuItems,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useListLocationMenuItems as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<MenuItemsListPage />);
    expect(screen.getByTestId('menu-items-list-loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Failed to load menu items';
    (useListLocationMenuItems as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(errorMessage),
    });

    render(<MenuItemsListPage />);
    expect(screen.getByTestId('menu-items-list-error')).toBeInTheDocument();
    expect(
      screen.getByText(`Error loading menu items: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it('renders menu items list', async () => {
    render(<MenuItemsListPage />);

    // Check page structure
    expect(screen.getByTestId('menu-items-list-page')).toBeInTheDocument();
    expect(screen.getByTestId('menu-items-list-title')).toBeInTheDocument();
    expect(screen.getByTestId('menu-items-list-content')).toBeInTheDocument();
    expect(screen.getByTestId('menu-items-create-button')).toBeInTheDocument();

    // Check table headers
    expect(screen.getByText('Recipe ID')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Modifiers')).toBeInTheDocument();
    expect(screen.getByText('Actions')).toBeInTheDocument();

    // Check menu items
    mockMenuItems.data.forEach((item) => {
      expect(
        screen.getByTestId(`menu-item-row-${item.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`menu-item-recipe-id-${item.id}`)
      ).toHaveTextContent(item.recipeId);
      expect(
        screen.getByTestId(`menu-item-price-${item.id}`)
      ).toHaveTextContent(`$${item.price.toFixed(2)}`);
      expect(
        screen.getByTestId(`menu-item-modifiers-${item.id}`)
      ).toHaveTextContent(item.modifierIds?.join(', ') || 'None');
      expect(
        screen.getByTestId(`menu-item-view-${item.id}`)
      ).toBeInTheDocument();
      expect(
        screen.getByTestId(`menu-item-edit-${item.id}`)
      ).toBeInTheDocument();
    });
  });

  it('calls useListLocationMenuItems with correct locationId', () => {
    render(<MenuItemsListPage />);
    expect(useListLocationMenuItems).toHaveBeenCalledWith(mockLocationId);
  });
});
