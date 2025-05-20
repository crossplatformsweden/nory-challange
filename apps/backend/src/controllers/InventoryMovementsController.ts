import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as inventoryMovementsService from '../services/InventoryMovementsService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new inventory movement (e.g., log waste or restock)
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createInventoryMovement = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    inventoryMovementsService.createInventoryMovement
  );
};

/**
 * List inventory movements (stock changes)
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listInventoryMovements = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    inventoryMovementsService.listInventoryMovements
  );
};

export { createInventoryMovement, listInventoryMovements };
