import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as ingredientsService from '../services/IngredientsService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new ingredient
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createIngredient = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    ingredientsService.createIngredient
  );
};

/**
 * Delete an ingredient
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteIngredient = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    ingredientsService.deleteIngredient
  );
};

/**
 * Get an ingredient by its ID
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getIngredientById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    ingredientsService.getIngredientById
  );
};

/**
 * List all ingredients
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listIngredients = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    ingredientsService.listIngredients
  );
};

/**
 * Update an ingredient
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateIngredient = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    ingredientsService.updateIngredient
  );
};

export {
  createIngredient,
  deleteIngredient,
  getIngredientById,
  listIngredients,
  updateIngredient,
};
