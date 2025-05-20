import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as locationIngredientCostsService from '../services/LocationIngredientCostsService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a location-specific ingredient cost record
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createLocationIngredientCost = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationIngredientCostsService.createLocationIngredientCost
  );
};

/**
 * Delete a location-specific ingredient cost record
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteLocationIngredientCost = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationIngredientCostsService.deleteLocationIngredientCost
  );
};

/**
 * Get a location-specific ingredient cost by ID
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getLocationIngredientCostById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationIngredientCostsService.getLocationIngredientCostById
  );
};

/**
 * List ingredient costs for a specific location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listLocationIngredientCosts = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationIngredientCostsService.listLocationIngredientCosts
  );
};

/**
 * Update a location-specific ingredient cost
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateLocationIngredientCost = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationIngredientCostsService.updateLocationIngredientCost
  );
};

export {
  createLocationIngredientCost,
  deleteLocationIngredientCost,
  getLocationIngredientCostById,
  listLocationIngredientCosts,
  updateLocationIngredientCost,
};
