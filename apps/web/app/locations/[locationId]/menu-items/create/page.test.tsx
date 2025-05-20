import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateMenuItemPage from './page';
import { useCreateLocationMenuItem } from '@nory/api-client';
import { useParams, useRouter } from 'next/navigation';

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
  useCreateLocationMenuItem: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  useRouter: jest.fn(),
}));

describe('CreateMenuItemPage', () => {
  const mockMutate = jest.fn();
  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useParams as jest.Mock).mockReturnValue({ locationId: 'location1' });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useCreateLocationMenuItem as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error: null,
    });
  });

  it('renders the create menu item form', () => {
    render(<CreateMenuItemPage />);

    expect(screen.getByTestId('create-menu-item-page')).toBeInTheDocument();
    expect(screen.getByTestId('create-menu-item-title')).toHaveTextContent(
      'Create Menu Item'
    );
    expect(screen.getByTestId('create-menu-item-form')).toBeInTheDocument();
    expect(
      screen.getByTestId('create-menu-item-recipe-id-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-menu-item-price-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-menu-item-category-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-menu-item-description-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-menu-item-active-input')
    ).toBeInTheDocument();
    expect(
      screen.getByTestId('create-menu-item-submit-button')
    ).toBeInTheDocument();
  });

  it('shows loading state when submitting', async () => {
    (useCreateLocationMenuItem as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      error: null,
    });

    render(<CreateMenuItemPage />);

    expect(screen.getByTestId('create-menu-item-submit-button')).toBeDisabled();
    expect(
      screen.getByTestId('create-menu-item-submit-button')
    ).toContainElement(screen.getByRole('status'));
  });

  it('shows error message when mutation fails', () => {
    const error = new Error('Failed to create menu item');
    (useCreateLocationMenuItem as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: false,
      error,
    });

    render(<CreateMenuItemPage />);

    expect(screen.getByTestId('create-menu-item-error')).toHaveTextContent(
      'Error creating menu item: Failed to create menu item'
    );
  });

  it('submits form data correctly', async () => {
    render(<CreateMenuItemPage />);

    // Fill in the form
    fireEvent.change(screen.getByTestId('create-menu-item-recipe-id-input'), {
      target: { value: 'recipe1' },
    });
    fireEvent.change(screen.getByTestId('create-menu-item-price-input'), {
      target: { value: '9.99' },
    });
    fireEvent.change(screen.getByTestId('create-menu-item-category-input'), {
      target: { value: 'Main Course' },
    });
    fireEvent.change(screen.getByTestId('create-menu-item-description-input'), {
      target: { value: 'A delicious dish' },
    });

    // Submit the form
    fireEvent.click(screen.getByTestId('create-menu-item-submit-button'));

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        {
          locationId: 'location1',
          data: {
            recipeId: 'recipe1',
            price: 9.99,
            modifierIds: null,
          },
        },
        expect.any(Object)
      );
    });
  });

  it('validates required fields', async () => {
    render(<CreateMenuItemPage />);

    // Submit the form without filling required fields
    fireEvent.click(screen.getByTestId('create-menu-item-submit-button'));

    // Wait for validation to complete
    await waitFor(() => {
      expect(
        screen.getByTestId('create-menu-item-recipe-id-error')
      ).toHaveTextContent('Recipe ID is required');
    });

    await waitFor(() => {
      expect(
        screen.getByTestId('create-menu-item-price-error')
      ).toHaveTextContent('Price is required');
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('navigates back to list page when clicking back button', () => {
    render(<CreateMenuItemPage />);

    fireEvent.click(screen.getByTestId('create-menu-item-back-button'));

    expect(mockRouter.push).toHaveBeenCalledWith(
      '/locations/location1/menu-items'
    );
  });
});
