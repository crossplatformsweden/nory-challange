import Service from './Service';
import { ServiceResponse, ServiceError } from '../types/common.js';
import { isServiceError } from '../types/errors';
import { z } from 'zod';
import { createRecipeIngredientLinkBody } from '@repo/zod-clients';

// Define the Zod schema for a single recipe ingredient link
const recipeIngredientLinkSchema = z.object({
  id: z.string(),
  recipeId: z.string(),
  ingredientId: z.string(),
  quantity: z.number().positive(),
});

// Export the type for TypeScript usage and use it in our functions
export type RecipeIngredientLink = z.infer<typeof recipeIngredientLinkSchema>;

// Schema for responses
export const getRecipeIngredientLinkByIdResponse = recipeIngredientLinkSchema;
export const listRecipeIngredientLinksResponse = z.array(
  recipeIngredientLinkSchema
);

/**
 * Add an ingredient to a recipe
 * Link an ingredient to a recipe with a specific required quantity.
 *
 * @param params - Request parameters
 * @param params.recipeId - The recipe ID
 * @param params.recipeIngredientLinkCreate - Data for creating a new recipe-ingredient link
 * @returns Promise with the created recipe-ingredient link
 */
const createRecipeIngredientLink = async ({
  recipeId,
  recipeIngredientLinkCreate,
}: {
  recipeId: string;
  recipeIngredientLinkCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createRecipeIngredientLinkBody.parse(
      recipeIngredientLinkCreate
    );

    // Mock implementation - create a new recipe-ingredient link
    const newLink = {
      id: `link-${Date.now()}`,
      recipeId,
      ingredientId: validatedData.ingredientId,
      quantity: validatedData.quantity,
    };

    return Service.successResponse(newLink);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Remove a recipe ingredient link
 * Remove a specific ingredient requirement from a recipe.
 *
 * @param params - Request parameters
 * @param params.recipeId - The recipe ID
 * @param params.recipeIngredientLinkId - The recipe-ingredient link ID to delete
 * @returns Promise with success response
 */
const deleteRecipeIngredientLink = async ({
  recipeId,
  linkId,
}: {
  recipeId: string;
  linkId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - validate IDs and return success
    if (!recipeId || !recipeId.trim() || !linkId || !linkId.trim()) {
      throw new Error('Invalid recipe ID or link ID');
    }

    return Service.successResponse({
      success: true,
      message: `Recipe ingredient link ${linkId} for recipe ${recipeId} deleted successfully`,
    });
  } catch (e) {
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * List ingredient links for a recipe
 * Retrieve a list of all ingredients required for the specified recipe, including their quantities.
 *
 * @param params - Request parameters
 * @param params.recipeId - The recipe ID
 * @returns Promise with list of recipe-ingredient links
 */
const listRecipeIngredientLinks = async ({
  recipeId,
}: {
  recipeId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockLinks = [
      {
        id: 'link-1',
        recipeId,
        ingredientId: 'ingredient-1',
        quantity: 2.5,
      },
      {
        id: 'link-2',
        recipeId,
        ingredientId: 'ingredient-2',
        quantity: 1.0,
      },
    ];

    // Validate the response using Zod
    const validatedResponse =
      listRecipeIngredientLinksResponse.parse(mockLinks);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

const getRecipeIngredientLinkById = async ({
  recipeId,
  linkId,
}: {
  recipeId: string;
  linkId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockLink = {
      id: linkId,
      recipeId,
      ingredientId: 'ingredient-1',
      quantity: 2.5,
    };

    // Validate the response using Zod
    const validatedResponse =
      getRecipeIngredientLinkByIdResponse.parse(mockLink);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

export {
  createRecipeIngredientLink,
  deleteRecipeIngredientLink,
  listRecipeIngredientLinks,
  getRecipeIngredientLinkById,
};
