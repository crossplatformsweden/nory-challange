import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as inventoryStockService from '../services/InventoryStockService.js';
import { OpenAPIRequest } from '../types/common.js';

export class InventoryStockController extends Controller {
  constructor(service?: unknown) {
    super(service || inventoryStockService);
  }

  /**
   * Create a new inventory stock entry
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async createInventoryStock(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/InventoryStockService.js'))
        .createInventoryStock
    );
  }

  /**
   * Delete an inventory stock entry
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async deleteInventoryStock(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/InventoryStockService.js'))
        .deleteInventoryStock
    );
  }

  /**
   * Get an inventory stock entry by its ID
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async getInventoryStockById(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/InventoryStockService.js'))
        .getInventoryStockById
    );
  }

  /**
   * List all inventory stock entries
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async listInventoryStock(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/InventoryStockService.js'))
        .listInventoryStock
    );
  }

  /**
   * Update an inventory stock entry
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async updateInventoryStock(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/InventoryStockService.js'))
        .updateInventoryStock
    );
  }
}
