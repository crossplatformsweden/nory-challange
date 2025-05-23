import { render, screen } from '@testing-library/react';
import { LocationMenuItemRow } from './LocationMenuItemRow';
import { useGetRecipeById, Recipe } from '@repo/api-client';

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode, href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

// Mock the API client hook
jest.mock('@repo/api-client', () => ({
  useGetRecipeById: jest.fn(),
}));

const mockRecipe: Recipe = {
  id: 'r1',
  name: 'Test Recipe Name',
  description: 'desc', // Add other required fields if your Recipe type needs them
  // Assuming other fields are optional or not used by the component directly
};

describe('LocationMenuItemRow Component', () => {
  beforeEach(() => {
    (useGetRecipeById as jest.Mock).mockReset();
  });

  test('renders recipe name and price correctly', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: mockRecipe,
      isLoading: false,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationMenuItemRow
            locationMenuItemId="lmi1"
            recipeId="r1"
            price={10.99}
          />
        </tbody>
      </table>
    );

    const nameCell = screen.getByTestId('menu-item-name-r1');
    expect(nameCell).toBeInTheDocument();
    expect(nameCell.querySelector('a')).toHaveTextContent('Test Recipe Name');
    expect(nameCell.querySelector('a')).toHaveAttribute('href', '/recipes/r1');
    expect(screen.getByTestId('menu-item-price-r1')).toHaveTextContent('10.99');
  });

  test('renders loading state for recipe name', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationMenuItemRow
            locationMenuItemId="lmi1"
            recipeId="r1"
            price={10.99}
          />
        </tbody>
      </table>
    );

    const nameCell = screen.getByTestId('menu-item-name-r1');
    // Check for skeleton presence (actual class might differ based on @repo/ui)
    expect(nameCell.querySelector('.h-4.w-3\\/4')).toBeInTheDocument(); 
    expect(screen.getByTestId('menu-item-price-r1')).toHaveTextContent('10.99');
  });

  test('renders error state for recipe name', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
    });

    render(
      <table>
        <tbody>
          <LocationMenuItemRow
            locationMenuItemId="lmi1"
            recipeId="r1"
            price={10.99}
          />
        </tbody>
      </table>
    );
    
    expect(screen.getByTestId('menu-item-name-r1')).toHaveTextContent('Error loading name');
    expect(screen.getByTestId('menu-item-price-r1')).toHaveTextContent('10.99');
  });

  test('renders N/A for null price', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: mockRecipe,
      isLoading: false,
      isError: false,
    });

    render(
      <table>
        <tbody>
          <LocationMenuItemRow
            locationMenuItemId="lmi1"
            recipeId="r1"
            price={null}
          />
        </tbody>
      </table>
    );

    expect(screen.getByTestId('menu-item-price-r1')).toHaveTextContent('N/A');
  });

  test('renders N/A for missing recipe name (after load, if data.name is null/undefined)', () => {
    (useGetRecipeById as jest.Mock).mockReturnValue({
      data: { ...mockRecipe, name: null } as unknown as Recipe, // Simulate null name
      isLoading: false,
      isError: false,
    });
    
    render(
      <table>
        <tbody>
          <LocationMenuItemRow
            locationMenuItemId="lmi1"
            recipeId="r1"
            price={10.99}
          />
        </tbody>
      </table>
    );

    const nameCell = screen.getByTestId('menu-item-name-r1');
    expect(nameCell.querySelector('a')).toHaveTextContent('N/A');
  });
});
