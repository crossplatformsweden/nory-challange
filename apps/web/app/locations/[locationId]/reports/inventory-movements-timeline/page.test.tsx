import { render, screen, fireEvent } from '@testing-library/react';
import InventoryMovementsTimelinePage from './page';
import { useParams, useRouter } from 'next/navigation';
import { useListInventoryMovements } from '@nory/api-client';

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

// Mock the navigation hooks
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(() => ({
    back: jest.fn(),
  })),
  useSearchParams: jest.fn(() => new URLSearchParams()),
}));

// Mock the API hook
jest.mock('@nory/api-client', () => ({
  useListInventoryMovements: jest.fn(),
}));

describe('InventoryMovementsTimelinePage', () => {
  const mockData = {
    data: {
      movements: [
        {
          id: '1',
          createdAt: '2024-01-01T00:00:00Z',
          type: 'ADD',
          quantity: 10,
          notes: 'Initial stock',
          ingredient: {
            id: 'ing1',
            name: 'Flour',
            unit: 'kg',
          },
          staff: {
            id: 'staff1',
            name: 'John Doe',
          },
        },
        {
          id: '2',
          createdAt: '2024-01-02T00:00:00Z',
          type: 'REMOVE',
          quantity: 5,
          notes: 'Used in recipe',
          ingredient: {
            id: 'ing2',
            name: 'Sugar',
            unit: 'kg',
          },
          staff: {
            id: 'staff2',
            name: 'Jane Smith',
          },
        },
      ],
      ingredients: [
        { id: 'ing1', name: 'Flour' },
        { id: 'ing2', name: 'Sugar' },
      ],
      staff: [
        { id: 'staff1', name: 'John Doe' },
        { id: 'staff2', name: 'Jane Smith' },
      ],
    },
  };

  const renderComponent = (
    loading = false,
    error: Error | null = null,
    data = mockData
  ) => {
    // Mock useParams
    (useParams as jest.Mock).mockReturnValue({ locationId: '123' });

    // Mock the API hook response
    (useListInventoryMovements as jest.Mock).mockReturnValue({
      data: loading ? null : data,
      isLoading: loading,
      error: error || null,
    });

    render(<InventoryMovementsTimelinePage />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the page', () => {
    renderComponent();
    expect(
      screen.getByTestId('inventory-movements-timeline-page')
    ).toBeInTheDocument();
  });

  it('renders the page container, title, and navigation elements', () => {
    renderComponent();

    expect(
      screen.getByTestId('inventory-movements-timeline-page')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-title')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-back-button')
    ).toBeInTheDocument();
  });

  it('renders the filters when data is loaded', () => {
    renderComponent();

    expect(
      screen.getByTestId('inventory-movements-timeline-filters')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-ingredient-filter')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-movement-type-filter')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-staff-filter')
    ).toBeInTheDocument();
  });

  it('renders the timeline table when data is loaded', () => {
    renderComponent();

    // Check table headers
    expect(
      screen.getByTestId('inventory-movements-timeline-table-header-date')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-table-header-ingredient')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-table-header-type')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-table-header-quantity')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-table-header-staff')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-table-header-notes')
    ).toBeInTheDocument();

    // Check table rows
    expect(
      screen.getByTestId('inventory-movements-timeline-item-1')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-item-2')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    renderComponent(true);

    expect(
      screen.getByTestId('inventory-movements-timeline-loading')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('inventory-movements-timeline-content')
    ).not.toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    renderComponent(false, new Error('Failed to load inventory timeline'));

    expect(
      screen.getByTestId('inventory-movements-timeline-error')
    ).toBeInTheDocument();
    expect(
      screen.queryByTestId('inventory-movements-timeline-content')
    ).not.toBeInTheDocument();
  });

  it('renders empty state when no movements exist', () => {
    renderComponent(false, null, {
      data: { movements: [], ingredients: [], staff: [] },
    });

    expect(
      screen.getByTestId('inventory-movements-timeline-content')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('inventory-movements-timeline-empty')
    ).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    renderComponent();
    screen.getByTestId('inventory-movements-timeline-back-button').click();

    expect(mockBack).toHaveBeenCalled();
  });
});
