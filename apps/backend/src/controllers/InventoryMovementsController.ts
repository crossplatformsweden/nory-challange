import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as inventoryMovementsService from '../services/InventoryMovementsService.js';
import { OpenAPIRequest } from '../types/common.js';

export class InventoryMovementsController extends Controller {
  constructor(service?: unknown) {
    super(service || inventoryMovementsService);
  }

  /**
   * Create a new inventory movement
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async createInventoryMovement(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/InventoryMovementsService.js')
      ).createInventoryMovement
    );
  }

  /**
   * List all inventory movements
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async listInventoryMovements(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/InventoryMovementsService.js')
      ).listInventoryMovements
    );
  }
}
