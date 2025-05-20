import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as locationMenuItemsService from '../services/LocationMenuItemsService.js';
import { OpenAPIRequest } from '../types/common.js';

export class MenuItemsController extends Controller {
  constructor(service?: unknown) {
    super(service || locationMenuItemsService);
  }

  /**
   * Create a new menu item
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async createMenuItem(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .createLocationMenuItem
    );
  }

  /**
   * Delete a menu item
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async deleteMenuItem(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .deleteLocationMenuItem
    );
  }

  /**
   * Get a menu item by its ID
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async getMenuItemById(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .getLocationMenuItemById
    );
  }

  /**
   * List all menu items
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async listMenuItems(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .listLocationMenuItems
    );
  }

  /**
   * Update a menu item
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async updateMenuItem(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .updateLocationMenuItem
    );
  }
}
