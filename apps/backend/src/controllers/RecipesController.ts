import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as recipesService from '../services/RecipesService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new recipe
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createRecipe = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipesService.createRecipe
  );
};

/**
 * Delete a recipe
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteRecipe = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipesService.deleteRecipe
  );
};

/**
 * Get a recipe by ID
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getRecipeById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipesService.getRecipeById
  );
};

/**
 * List all recipes
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listRecipes = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipesService.listRecipes
  );
};

/**
 * Update a recipe
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateRecipe = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipesService.updateRecipe
  );
};

export { createRecipe, deleteRecipe, getRecipeById, listRecipes, updateRecipe };
