import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as recipeIngredientLinksService from '../services/RecipeIngredientLinksService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Add an ingredient to a recipe
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createRecipeIngredientLink = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipeIngredientLinksService.createRecipeIngredientLink
  );
};

/**
 * Remove a recipe ingredient link
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteRecipeIngredientLink = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipeIngredientLinksService.deleteRecipeIngredientLink
  );
};

/**
 * List ingredient links for a recipe
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listRecipeIngredientLinks = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    recipeIngredientLinksService.listRecipeIngredientLinks
  );
};

export {
  createRecipeIngredientLink,
  deleteRecipeIngredientLink,
  listRecipeIngredientLinks,
};
