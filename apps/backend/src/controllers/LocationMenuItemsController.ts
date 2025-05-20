import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as locationMenuItemsService from '../services/LocationMenuItemsService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Add a recipe as a menu item to a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createLocationMenuItem = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationMenuItemsService.createLocationMenuItem
  );
};

/**
 * Remove a menu item from a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteLocationMenuItem = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationMenuItemsService.deleteLocationMenuItem
  );
};

/**
 * Get a menu item by ID for a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getLocationMenuItemById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationMenuItemsService.getLocationMenuItemById
  );
};

/**
 * List menu items for a specific location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listLocationMenuItems = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationMenuItemsService.listLocationMenuItems
  );
};

/**
 * Update a menu item for a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateLocationMenuItem = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    locationMenuItemsService.updateLocationMenuItem
  );
};

export {
  createLocationMenuItem,
  deleteLocationMenuItem,
  getLocationMenuItemById,
  listLocationMenuItems,
  updateLocationMenuItem,
};
