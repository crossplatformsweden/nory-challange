import Service from './Service.js';
import { ServiceResponse } from '../types/common.js';
import { z } from 'zod';
import {
  createIngredientBody,
  getIngredientByIdResponse,
  listIngredientsResponse,
  updateIngredientBody,
  updateIngredientResponse,
} from '@repo/zod-clients';

interface ServiceError extends Error {
  status?: number;
}

/**
 * Create a new ingredient
 * Add a new ingredient definition to the inventory.
 *
 * @param params - The request parameters
 * @param params.ingredientCreate - The ingredient create payload
 * @returns A promise resolving to the created ingredient
 */
const createIngredient = async ({
  ingredientCreate,
}: {
  ingredientCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate and parse the input data using Zod
    const validatedData = createIngredientBody.parse(ingredientCreate);

    // Mock implementation - in a real scenario we would save to a database
    const newIngredient = {
      id: `ingredient-${Date.now()}`,
      name: validatedData.name,
      unit: validatedData.unit,
      cost: validatedData.cost,
    };

    return Service.successResponse(newIngredient);
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
 * Delete an ingredient
 * Remove an ingredient definition from the system. This might require checks for existing stock or recipe links.
 *
 * @param params - The request parameters
 * @param params.ingredientId - The ingredient ID to delete
 */
const deleteIngredient = async ({
  ingredientId,
}: {
  ingredientId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - in a real scenario we would delete from a database
    // For now, just return success if the ID looks valid
    if (!ingredientId || !ingredientId.trim()) {
      throw new Error('Invalid ingredient ID');
    }

    return Service.successResponse({
      success: true,
      message: 'Ingredient deleted',
    });
  } catch (e) {
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as ServiceError).status || 405
    );
  }
};

/**
 * Get an ingredient by ID
 * Retrieve a specific ingredient definition using its unique ID.
 *
 * @param params - The request parameters
 * @param params.ingredientId - The ingredient ID to retrieve
 * @returns A promise resolving to the found ingredient
 */
const getIngredientById = async ({
  ingredientId,
}: {
  ingredientId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - in a real scenario we would fetch from a database
    const mockIngredient = {
      id: ingredientId,
      name: 'Mock Ingredient',
      unit: 'kg',
      cost: 10.5,
    };

    // Validate the output data using Zod
    const validatedData = getIngredientByIdResponse.parse(mockIngredient);

    return Service.successResponse(validatedData);
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
 * List all ingredients
 * Retrieve a list of all defined inventory ingredients.
 *
 * @returns A promise resolving to a list of ingredients
 */
const listIngredients = async (): Promise<ServiceResponse> => {
  try {
    // Mock implementation - in a real scenario we would fetch from a database
    const mockIngredients = [
      {
        id: 'ingredient-1',
        name: 'Mock Ingredient 1',
        unit: 'kg',
        cost: 10.5,
      },
      {
        id: 'ingredient-2',
        name: 'Mock Ingredient 2',
        unit: 'l',
        cost: 5.25,
      },
    ];

    // Validate the output data using Zod
    const validatedData = listIngredientsResponse.parse(mockIngredients);

    return Service.successResponse(validatedData);
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
 * Update an ingredient
 * Update details of an existing ingredient definition.
 *
 * @param params - The request parameters
 * @param params.ingredientId - The ingredient ID to update
 * @param params.ingredientUpdate - The update payload
 * @returns A promise resolving to the updated ingredient
 */
const updateIngredient = async ({
  ingredientId,
  ingredientUpdate,
}: {
  ingredientId: string;
  ingredientUpdate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate and parse the input data using Zod
    const validatedUpdateData = updateIngredientBody.parse(ingredientUpdate);

    // Mock implementation - in a real scenario we would update in a database
    const updatedIngredient = {
      id: ingredientId,
      name: validatedUpdateData.name || 'Mock Updated Ingredient',
      unit: validatedUpdateData.unit || 'kg',
      cost:
        validatedUpdateData.cost !== null ? validatedUpdateData.cost : 15.75,
    };

    // Validate the output data using Zod
    const validatedResponseData =
      updateIngredientResponse.parse(updatedIngredient);

    return Service.successResponse(validatedResponseData);
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
  createIngredient,
  deleteIngredient,
  getIngredientById,
  listIngredients,
  updateIngredient,
};
