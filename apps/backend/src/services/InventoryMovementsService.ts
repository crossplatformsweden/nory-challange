import Service from './Service.js';
import { ServiceResponse } from '../types/common.js';
import { z } from 'zod';
import {
  createInventoryMovementBody,
  listInventoryMovementsQueryParams,
  listInventoryMovementsResponse,
  listInventoryMovementsResponseItem,
} from '@repo/zod-clients';

/**
 * Type for inventory movement parameters
 */
interface ListInventoryMovementsParams {
  locationId?: string;
  ingredientId?: string;
  type?:
    | 'waste'
    | 'restock'
    | 'sale'
    | 'adjustment'
    | 'transfer_in'
    | 'transfer_out';
  startTime?: string;
  endTime?: string;
}

/**
 * Create a new inventory movement (e.g., log waste or restock)
 * Record a change in stock for a specific ingredient at a location. This is the preferred way to track stock changes over direct stock updates.
 *
 * @param params - Request parameters
 * @param params.inventoryMovementCreate - Data for creating a new inventory movement
 * @returns Promise with the created inventory movement
 */
const createInventoryMovement = async ({
  inventoryMovementCreate,
}: {
  inventoryMovementCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createInventoryMovementBody.parse(
      inventoryMovementCreate
    );

    // Mock implementation - create a new movement
    const newMovement = {
      id: `movement-${Date.now()}`,
      ...validatedData,
      createdAt: new Date().toISOString(),
      ingredient: {
        id: validatedData.ingredientId,
        name: 'Mock Ingredient',
        unit: 'kg',
      },
      unit: 'kg',
      costPerUnit: 10.0,
    };

    // Validate the response using Zod
    const validatedResponse =
      listInventoryMovementsResponseItem.parse(newMovement);

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
      (e as any).status || 405
    );
  }
};

/**
 * List inventory movements (stock changes)
 * Retrieve a history of inventory stock changes (movements), useful for tracking usage, waste, and restocking.
 * Includes embedded ingredient summaries.
 *
 * @param params - Query parameters for filtering movements
 * @param params.locationId - Optional, filter movements by location ID
 * @param params.ingredientId - Optional, filter movements by ingredient ID
 * @param params.type - Optional, filter movements by type
 * @param params.startTime - Optional, filter movements from this timestamp onwards
 * @param params.endTime - Optional, filter movements up to this timestamp
 * @returns Promise with list of inventory movements
 */
const listInventoryMovements = async (
  params: ListInventoryMovementsParams
): Promise<ServiceResponse> => {
  try {
    // Validate the query parameters using Zod
    const validatedParams = listInventoryMovementsQueryParams.parse(params);

    // Mock implementation - create sample data
    const mockMovements = [
      {
        id: 'movement-1',
        locationId: validatedParams.locationId || 'location-1',
        ingredientId: validatedParams.ingredientId || 'ingredient-1',
        quantity: 5.0,
        type: (validatedParams.type || 'restock') as 'restock',
        notes: 'Weekly restock',
        createdAt: new Date().toISOString(),
        recordedByStaffId: 'staff-1',
        ingredient: {
          id: validatedParams.ingredientId || 'ingredient-1',
          name: 'Mock Ingredient 1',
          unit: 'kg',
        },
        unit: 'kg',
        costPerUnit: 10.0,
      },
      {
        id: 'movement-2',
        locationId: validatedParams.locationId || 'location-1',
        ingredientId: validatedParams.ingredientId || 'ingredient-2',
        quantity: -2.0,
        type: (validatedParams.type || 'waste') as 'waste',
        notes: 'Expired items',
        createdAt: new Date().toISOString(),
        recordedByStaffId: 'staff-2',
        ingredient: {
          id: validatedParams.ingredientId || 'ingredient-2',
          name: 'Mock Ingredient 2',
          unit: 'l',
        },
        unit: 'l',
        costPerUnit: 15.0,
      },
    ];

    // Validate the response using Zod
    const validatedResponse =
      listInventoryMovementsResponse.parse(mockMovements);

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
      (e as any).status || 405
    );
  }
};

export { createInventoryMovement, listInventoryMovements };
