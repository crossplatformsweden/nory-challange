import Service from './Service.js';
import { ServiceResponse } from '../types/common.js';
import { z } from 'zod';
import {
  createInventoryStockBody,
  getInventoryStockByIdResponse,
  listInventoryStockQueryParams,
  listInventoryStockResponse,
  updateInventoryStockBody,
  updateInventoryStockResponse,
} from '@repo/zod-clients';

interface ServiceError extends Error {
  status?: number;
}

/**
 * Interface for inventory stock list parameters
 */
interface ListInventoryStockParams {
  locationId?: string;
  ingredientId?: string;
}

/**
 * Create a new inventory stock record
 * Create a record for an ingredient's stock level at a specific location.
 * This is typically for initial setup or adding an item to a location for the first time.
 * Subsequent changes should use movements.
 *
 * @param params - Request parameters
 * @param params.inventoryStockCreate - Data for creating a new inventory stock record
 * @returns Promise with the created inventory stock record
 */
const createInventoryStock = async ({
  inventoryStockCreate,
}: {
  inventoryStockCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createInventoryStockBody.parse(inventoryStockCreate);

    // Mock implementation - create a new stock record
    const stockRecord = {
      id: `stock-${Date.now()}`,
      locationId: validatedData.locationId,
      ingredientId: validatedData.ingredientId,
      quantity: validatedData.quantity,
      updatedAt: new Date().toISOString(),
      ingredient: {
        id: validatedData.ingredientId,
        name: 'Mock Ingredient',
        unit: 'kg',
      },
      location: {
        id: validatedData.locationId,
        name: 'Mock Location',
      },
    };

    return Service.successResponse(stockRecord);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as ServiceError).status || 405
    );
  }
};

/**
 * Delete an inventory stock record
 * Remove a specific ingredient's stock record for a location.
 * Use with caution as this removes the historical link.
 *
 * @param params - Request parameters
 * @param params.stockId - The ID of the stock record to delete
 * @returns Promise with success response
 */
const deleteInventoryStock = async ({
  stockId,
}: {
  stockId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - validate stockId and return success
    if (!stockId || !stockId.trim()) {
      throw new Error('Invalid stock ID');
    }

    return Service.successResponse({
      success: true,
      message: `Stock record ${stockId} deleted successfully`,
    });
  } catch (e) {
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as ServiceError).status || 405
    );
  }
};

/**
 * Get an inventory stock record by ID
 * Retrieve a specific inventory stock record. Includes embedded location and ingredient summaries.
 *
 * @param params - Request parameters
 * @param params.stockId - The ID of the stock record to retrieve
 * @returns Promise with the stock record
 */
const getInventoryStockById = async ({
  stockId,
}: {
  stockId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockStock = {
      id: stockId,
      locationId: 'location-1',
      ingredientId: 'ingredient-1',
      quantity: 10.5,
      updatedAt: new Date().toISOString(),
      ingredient: {
        id: 'ingredient-1',
        name: 'Mock Ingredient',
        unit: 'kg',
      },
      location: {
        id: 'location-1',
        name: 'Mock Location',
      },
    };

    // Validate the response using Zod
    const validatedResponse = getInventoryStockByIdResponse.parse(mockStock);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as ServiceError).status || 405
    );
  }
};

/**
 * List inventory stock levels
 * Retrieve current inventory stock levels, optionally filtered by location or ingredient.
 * Includes embedded location and ingredient summaries.
 *
 * @param params - Query parameters for filtering stock records
 * @param params.locationId - Optional, filter stock by location ID
 * @param params.ingredientId - Optional, filter stock by ingredient ID
 * @returns Promise with list of inventory stock records
 */
const listInventoryStock = async (
  params: ListInventoryStockParams
): Promise<ServiceResponse> => {
  try {
    // Validate the query parameters using Zod
    const validatedParams = listInventoryStockQueryParams.parse(params);

    // Mock implementation - create sample data
    const mockStocks = [
      {
        id: 'stock-1',
        locationId: validatedParams.locationId || 'location-1',
        ingredientId: validatedParams.ingredientId || 'ingredient-1',
        quantity: 10.5,
        updatedAt: new Date().toISOString(),
        ingredient: {
          id: validatedParams.ingredientId || 'ingredient-1',
          name: 'Mock Ingredient 1',
          unit: 'kg',
        },
        location: {
          id: validatedParams.locationId || 'location-1',
          name: 'Mock Location 1',
        },
      },
      {
        id: 'stock-2',
        locationId: validatedParams.locationId || 'location-1',
        ingredientId: validatedParams.ingredientId || 'ingredient-2',
        quantity: 5.25,
        updatedAt: new Date().toISOString(),
        ingredient: {
          id: validatedParams.ingredientId || 'ingredient-2',
          name: 'Mock Ingredient 2',
          unit: 'l',
        },
        location: {
          id: validatedParams.locationId || 'location-1',
          name: 'Mock Location 1',
        },
      },
    ];

    // Validate the response using Zod
    const validatedResponse = listInventoryStockResponse.parse(mockStocks);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as ServiceError).status || 405
    );
  }
};

/**
 * Update an inventory stock entry (e.g., adjust quantity)
 * Directly adjust the quantity of a specific ingredient at a location.
 * Consider using Inventory Movements for auditable changes.
 *
 * @param params - Request parameters
 * @param params.stockId - The ID of the stock record to update
 * @param params.inventoryStockUpdate - Data for updating the stock record
 * @returns Promise with the updated stock record
 */
const updateInventoryStock = async ({
  stockId,
  inventoryStockUpdate,
}: {
  stockId: string;
  inventoryStockUpdate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = updateInventoryStockBody.parse(inventoryStockUpdate);

    // Mock implementation - update stock and return
    const updatedStock = {
      id: stockId,
      locationId: 'location-1',
      ingredientId: 'ingredient-1',
      quantity: validatedData.quantity,
      updatedAt: new Date().toISOString(),
      ingredient: {
        id: 'ingredient-1',
        name: 'Mock Ingredient',
        unit: 'kg',
      },
      location: {
        id: 'location-1',
        name: 'Mock Location',
      },
    };

    // Validate the response using Zod
    const validatedResponse = updateInventoryStockResponse.parse(updatedStock);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as ServiceError).status || 405
    );
  }
};

export {
  createInventoryStock,
  deleteInventoryStock,
  getInventoryStockById,
  listInventoryStock,
  updateInventoryStock,
};
