import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as locationsService from '../services/LocationsService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createLocation = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationsService.createLocation
  );
};

/**
 * Delete a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteLocation = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationsService.deleteLocation
  );
};

/**
 * Get a single location by ID
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getLocationById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationsService.getLocationById
  );
};

/**
 * List all locations
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listLocations = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationsService.listLocations
  );
};

/**
 * Update a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateLocation = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationsService.updateLocation
  );
};

export {
  createLocation,
  deleteLocation,
  getLocationById,
  listLocations,
  updateLocation,
};
