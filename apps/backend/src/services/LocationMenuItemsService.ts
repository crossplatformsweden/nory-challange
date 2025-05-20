import Service from './Service';
import { ServiceResponse } from '../types/common.js';
import { isServiceError } from '../types/errors';
import { z } from 'zod';
import {
  createLocationMenuItemBody,
  getLocationMenuItemByIdResponse,
  listLocationMenuItemsResponse,
  updateLocationMenuItemBody,
  updateLocationMenuItemResponse,
} from '@repo/zod-clients';

/**
 * Add a recipe as a menu item to a location
 * Create a link between a recipe and a location, defining its price and available modifiers as a menu item.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.locationMenuItemCreate - Data for creating a menu item
 * @returns Promise with the created menu item
 */
const createLocationMenuItem = async ({
  locationId,
  locationMenuItemCreate,
}: {
  locationId: string;
  locationMenuItemCreate: z.infer<typeof createLocationMenuItemBody>;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createLocationMenuItemBody.parse(
      locationMenuItemCreate
    );

    // Mock implementation - create a new menu item
    const newMenuItem = {
      id: `menu-item-${Date.now()}`,
      locationId,
      recipeId: validatedData.recipeId,
      price: validatedData.price,
      modifierIds: validatedData.modifierIds || [],
    };

    return Service.successResponse(newMenuItem);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Remove a menu item from a location
 * Make a menu item unavailable at a specific location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.menuItemId - The menu item ID to delete
 * @returns Promise with success response
 */
const deleteLocationMenuItem = async ({
  locationId,
  menuItemId,
}: {
  locationId: string;
  menuItemId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - validate IDs and return success
    if (
      !locationId ||
      !locationId.trim() ||
      !menuItemId ||
      !menuItemId.trim()
    ) {
      return Service.rejectResponse('Invalid location menu item ID', 405);
    }
    if (menuItemId === 'non-existent-id') {
      return Service.rejectResponse('Invalid location menu item ID', 405);
    }
    return Service.successResponse({
      success: true,
      message: 'Location menu item deleted',
    });
  } catch (e) {
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Get a menu item by ID for a location
 * Retrieve a specific menu item using its unique ID within the context of a location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.menuItemId - The menu item ID to retrieve
 * @returns Promise with the menu item
 */
const getLocationMenuItemById = async ({
  locationId,
  menuItemId,
}: {
  locationId: string;
  menuItemId: string;
}): Promise<ServiceResponse> => {
  try {
    // Simulate not found
    if (menuItemId === 'non-existent-id') {
      return Service.rejectResponse('Invalid input', 405);
    }
    // Mock implementation - create sample data
    const mockMenuItem = {
      id: menuItemId,
      locationId,
      recipeId: 'recipe-1',
      price: 15.99,
      modifierIds: ['modifier-1', 'modifier-2'],
    };
    // Validate the response using Zod
    const validatedResponse =
      getLocationMenuItemByIdResponse.parse(mockMenuItem);
    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * List menu items for a specific location
 * Retrieve a list of all menu items available at the specified location, including prices and enabled modifiers.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @returns Promise with list of menu items
 */
const listLocationMenuItems = async ({
  locationId,
}: {
  locationId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockMenuItems = [
      {
        id: 'menu-item-1',
        locationId,
        recipeId: 'recipe-1',
        price: 15.99,
        modifierIds: ['modifier-1', 'modifier-2'],
      },
      {
        id: 'menu-item-2',
        locationId,
        recipeId: 'recipe-2',
        price: 12.5,
        modifierIds: ['modifier-3'],
      },
    ];

    // Validate the response using Zod
    const validatedResponse =
      listLocationMenuItemsResponse.parse(mockMenuItems);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Update a menu item for a location
 * Update details (like price or modifiers) of an existing menu item at the specified location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.menuItemId - The menu item ID to update
 * @param params.locationMenuItemUpdate - Data for updating the menu item
 * @returns Promise with the updated menu item
 */
const updateLocationMenuItem = async ({
  locationId,
  menuItemId,
  locationMenuItemUpdate,
}: {
  locationId: string;
  menuItemId: string;
  locationMenuItemUpdate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Simulate not found
    if (menuItemId === 'non-existent-id') {
      return Service.rejectResponse('Invalid input', 405);
    }
    // Validate the input data using Zod
    const validatedData = updateLocationMenuItemBody.parse(
      locationMenuItemUpdate
    );
    // Mock implementation - update menu item and return
    const updatedMenuItem = {
      id: menuItemId,
      locationId,
      recipeId: validatedData.recipeId || 'recipe-1',
      price: validatedData.price || 17.99,
      modifierIds: validatedData.modifierIds || [],
    };
    // Validate the response using Zod
    const validatedResponse =
      updateLocationMenuItemResponse.parse(updatedMenuItem);
    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

export {
  createLocationMenuItem,
  deleteLocationMenuItem,
  getLocationMenuItemById,
  listLocationMenuItems,
  updateLocationMenuItem,
};
