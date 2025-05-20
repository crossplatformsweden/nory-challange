import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as inventoryStockService from '../services/InventoryStockService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new inventory stock record
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createInventoryStock = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    inventoryStockService.createInventoryStock
  );
};

/**
 * Delete an inventory stock record
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteInventoryStock = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    inventoryStockService.deleteInventoryStock
  );
};

/**
 * Get an inventory stock record by ID
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getInventoryStockById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    inventoryStockService.getInventoryStockById
  );
};

/**
 * List inventory stock levels
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listInventoryStock = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    inventoryStockService.listInventoryStock
  );
};

/**
 * Update an inventory stock entry
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateInventoryStock = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    inventoryStockService.updateInventoryStock
  );
};

export {
  createInventoryStock,
  deleteInventoryStock,
  getInventoryStockById,
  listInventoryStock,
  updateInventoryStock,
};
