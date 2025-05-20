import { render, screen } from '@testing-library/react';
import MenuItemDetailPage from './page';
import { useGetLocationMenuItemById } from '@nory/api-client';
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
jest.mock('@nory/api-client', () => ({
  useGetLocationMenuItemById: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
}));

describe('MenuItemDetailPage', () => {
  const mockLocationId = '123';
  const mockMenuItemId = '456';
  const mockMenuItem = {
    id: mockMenuItemId,
    name: 'Test Menu Item',
    price: 9.99,
    category: 'Test Category',
    description: 'Test Description',
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-02T00:00:00Z',
  };

  beforeEach(() => {
    // Mock useParams
    (useParams as jest.Mock).mockReturnValue({
      locationId: mockLocationId,
      menuItemId: mockMenuItemId,
    });

    // Mock useGetLocationMenuItemById
    (useGetLocationMenuItemById as jest.Mock).mockReturnValue({
      data: mockMenuItem,
      isLoading: false,
      error: null,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useGetLocationMenuItemById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<MenuItemDetailPage />);
    expect(screen.getByTestId('menu-item-detail-loading')).toBeInTheDocument();
  });

  it('renders error state', () => {
    const errorMessage = 'Failed to load menu item';
    (useGetLocationMenuItemById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error(errorMessage),
    });

    render(<MenuItemDetailPage />);
    expect(screen.getByTestId('menu-item-detail-error')).toBeInTheDocument();
    expect(
      screen.getByText(`Error loading menu item: ${errorMessage}`)
    ).toBeInTheDocument();
  });

  it('renders not found state', () => {
    (useGetLocationMenuItemById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    });

    render(<MenuItemDetailPage />);
    expect(
      screen.getByTestId('menu-item-detail-not-found')
    ).toBeInTheDocument();
  });

  it('renders menu item details', () => {
    render(<MenuItemDetailPage />);

    // Check page structure
    expect(screen.getByTestId('menu-item-detail-page')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-detail-title')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-detail-content')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-edit-button')).toBeInTheDocument();
    expect(screen.getByTestId('menu-item-back-button')).toBeInTheDocument();

    // Check menu item details
    expect(screen.getByTestId('menu-item-name')).toHaveTextContent(
      mockMenuItem.name
    );
    expect(screen.getByTestId('menu-item-price')).toHaveTextContent(
      `$${mockMenuItem.price.toFixed(2)}`
    );
    expect(screen.getByTestId('menu-item-category')).toHaveTextContent(
      mockMenuItem.category
    );
    expect(screen.getByTestId('menu-item-description')).toHaveTextContent(
      mockMenuItem.description
    );
    expect(screen.getByTestId('menu-item-status')).toHaveTextContent('Active');
    expect(screen.getByTestId('menu-item-created-at')).toHaveTextContent(
      new Date(mockMenuItem.createdAt).toLocaleDateString()
    );
    expect(screen.getByTestId('menu-item-updated-at')).toHaveTextContent(
      new Date(mockMenuItem.updatedAt).toLocaleDateString()
    );
  });

  it('calls useGetLocationMenuItemById with correct menuItemId', () => {
    render(<MenuItemDetailPage />);
    expect(useGetLocationMenuItemById).toHaveBeenCalledWith(mockMenuItemId);
  });
});
