import Service from './Service.js';
import { ServiceResponse } from '../types/common.js';
import { z } from 'zod';
import {
  createLocationIngredientCostBody,
  getLocationIngredientCostByIdResponse,
  listLocationIngredientCostsResponse,
  updateLocationIngredientCostBody,
  updateLocationIngredientCostResponse,
} from '@repo/zod-clients';

/**
 * Create a location-specific ingredient cost record
 * Define the cost of an ingredient specifically for a location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.locationIngredientCostCreate - Data for creating ingredient cost
 * @returns Promise with the created location ingredient cost
 */
const createLocationIngredientCost = async ({
  locationId,
  locationIngredientCostCreate,
}: {
  locationId: string;
  locationIngredientCostCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createLocationIngredientCostBody.parse(
      locationIngredientCostCreate
    );

    // Mock implementation - create a new cost record
    const newCostRecord = {
      id: `cost-${Date.now()}`,
      locationId,
      ingredientId: validatedData.ingredientId,
      costPerUnit: validatedData.costPerUnit,
      updatedAt: new Date().toISOString(),
    };

    return Service.successResponse(newCostRecord);
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
 * Delete a location-specific ingredient cost record
 * Remove a specific ingredient cost record for a location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.locationIngredientCostId - The cost record ID to delete
 * @returns Promise with success response
 */
const deleteLocationIngredientCost = async ({
  locationId,
  locationIngredientCostId,
}: {
  locationId: string;
  locationIngredientCostId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - validate IDs and return success
    if (
      !locationId ||
      !locationId.trim() ||
      !locationIngredientCostId ||
      !locationIngredientCostId.trim()
    ) {
      throw new Error('Invalid location ID or cost record ID');
    }

    return Service.successResponse({
      success: true,
      message: `Cost record ${locationIngredientCostId} for location ${locationId} deleted successfully`,
    });
  } catch (e) {
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as any).status || 405
    );
  }
};

/**
 * Get a location-specific ingredient cost by ID
 * Retrieve a specific ingredient cost record for a location using its unique ID.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.locationIngredientCostId - The cost record ID to retrieve
 * @returns Promise with the cost record
 */
const getLocationIngredientCostById = async ({
  locationId,
  locationIngredientCostId,
}: {
  locationId: string;
  locationIngredientCostId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockCostRecord = {
      id: locationIngredientCostId,
      locationId,
      ingredientId: 'ingredient-1',
      costPerUnit: 12.5,
      updatedAt: new Date().toISOString(),
    };

    // Validate the response using Zod
    const validatedResponse =
      getLocationIngredientCostByIdResponse.parse(mockCostRecord);

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
 * List ingredient costs for a specific location
 * Retrieve a list of location-specific costs for ingredients.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @returns Promise with list of cost records
 */
const listLocationIngredientCosts = async ({
  locationId,
}: {
  locationId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockCostRecords = [
      {
        id: 'cost-1',
        locationId,
        ingredientId: 'ingredient-1',
        costPerUnit: 12.5,
        updatedAt: new Date().toISOString(),
      },
      {
        id: 'cost-2',
        locationId,
        ingredientId: 'ingredient-2',
        costPerUnit: 8.75,
        updatedAt: new Date().toISOString(),
      },
    ];

    // Validate the response using Zod
    const validatedResponse =
      listLocationIngredientCostsResponse.parse(mockCostRecords);

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
 * Update a location-specific ingredient cost
 * Update the cost value for an existing ingredient cost record at a location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.locationIngredientCostId - The cost record ID to update
 * @param params.locationIngredientCostUpdate - Data for updating the cost
 * @returns Promise with the updated cost record
 */
const updateLocationIngredientCost = async ({
  locationId,
  locationIngredientCostId,
  locationIngredientCostUpdate,
}: {
  locationId: string;
  locationIngredientCostId: string;
  locationIngredientCostUpdate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = updateLocationIngredientCostBody.parse(
      locationIngredientCostUpdate
    );

    // Mock implementation - update cost and return
    const updatedCostRecord = {
      id: locationIngredientCostId,
      locationId,
      ingredientId: 'ingredient-1',
      costPerUnit: validatedData.costPerUnit,
      updatedAt: new Date().toISOString(),
    };

    // Validate the response using Zod
    const validatedResponse =
      updateLocationIngredientCostResponse.parse(updatedCostRecord);

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

export {
  createLocationIngredientCost,
  deleteLocationIngredientCost,
  getLocationIngredientCostById,
  listLocationIngredientCosts,
  updateLocationIngredientCost,
};
