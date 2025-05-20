import Service from './Service.js';
import { ServiceResponse } from '../types/common.js';
import { z } from 'zod';
import {
  createRecipeBody,
  getRecipeByIdResponse,
  listRecipesResponse,
  updateRecipeBody,
  updateRecipeResponse,
} from '@repo/zod-clients';

/**
 * Create a new recipe
 * Add a new recipe definition.
 *
 * @param params - Request parameters
 * @param params.recipeCreate - Data for creating a new recipe
 * @returns Promise with the created recipe
 */
const createRecipe = async ({
  recipeCreate,
}: {
  recipeCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createRecipeBody.parse(recipeCreate);

    // Mock implementation - create a new recipe
    const newRecipe = {
      id: `recipe-${Date.now()}`,
      name: validatedData.name,
      description: validatedData.description,
    };

    return Service.successResponse(newRecipe);
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
 * Delete a recipe
 * Remove a recipe definition. This might require checks for existing ingredient links or menu item links.
 *
 * @param params - Request parameters
 * @param params.recipeId - The recipe ID to delete
 * @returns Promise with success response
 */
const deleteRecipe = async ({
  recipeId,
}: {
  recipeId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - validate ID and return success
    if (!recipeId || !recipeId.trim()) {
      throw new Error('Invalid recipe ID');
    }

    return Service.successResponse({
      success: true,
      message: `Recipe ${recipeId} deleted successfully`,
    });
  } catch (e) {
    return Service.rejectResponse(
      (e as Error).message || 'Invalid input',
      (e as any).status || 405
    );
  }
};

/**
 * Get a recipe by ID
 * Retrieve a specific recipe using its unique ID.
 *
 * @param params - Request parameters
 * @param params.recipeId - The recipe ID to retrieve
 * @returns Promise with the recipe
 */
const getRecipeById = async ({
  recipeId,
}: {
  recipeId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockRecipe = {
      id: recipeId,
      name: 'Mock Recipe',
      description: 'This is a mock recipe description',
    };

    // Validate the response using Zod
    const validatedResponse = getRecipeByIdResponse.parse(mockRecipe);

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
 * List all recipes
 * Retrieve a list of all defined recipes.
 *
 * @returns Promise with list of recipes
 */
const listRecipes = async (): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockRecipes = [
      {
        id: 'recipe-1',
        name: 'Chicken Soup',
        description: 'A comforting chicken soup recipe',
      },
      {
        id: 'recipe-2',
        name: 'Caesar Salad',
        description: 'Classic Caesar salad with homemade dressing',
      },
    ];

    // Validate the response using Zod
    const validatedResponse = listRecipesResponse.parse(mockRecipes);

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
 * Update a recipe
 * Update details of an existing recipe definition.
 *
 * @param params - Request parameters
 * @param params.recipeId - The recipe ID to update
 * @param params.recipeUpdate - Data for updating the recipe
 * @returns Promise with the updated recipe
 */
const updateRecipe = async ({
  recipeId,
  recipeUpdate,
}: {
  recipeId: string;
  recipeUpdate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = updateRecipeBody.parse(recipeUpdate);

    // Mock implementation - update recipe and return
    const updatedRecipe = {
      id: recipeId,
      name: validatedData.name || 'Updated Recipe',
      description: validatedData.description || 'Updated recipe description',
    };

    // Validate the response using Zod
    const validatedResponse = updateRecipeResponse.parse(updatedRecipe);

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

export { createRecipe, deleteRecipe, getRecipeById, listRecipes, updateRecipe };
