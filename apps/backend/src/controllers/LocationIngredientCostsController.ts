import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as locationIngredientCostsService from '../services/LocationIngredientCostsService.js';
import { OpenAPIRequest } from '../types/common.js';

export class LocationIngredientCostsController extends Controller {
  constructor(service?: unknown) {
    super(service || locationIngredientCostsService);
  }

  /**
   * Create a new location ingredient cost
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async createLocationIngredientCost(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/LocationIngredientCostsService.js')
      ).createLocationIngredientCost
    );
  }

  /**
   * Delete a location ingredient cost
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async deleteLocationIngredientCost(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/LocationIngredientCostsService.js')
      ).deleteLocationIngredientCost
    );
  }

  /**
   * Get a location ingredient cost by its ID
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async getLocationIngredientCostById(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/LocationIngredientCostsService.js')
      ).getLocationIngredientCostById
    );
  }

  /**
   * List all location ingredient costs
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async listLocationIngredientCosts(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/LocationIngredientCostsService.js')
      ).listLocationIngredientCosts
    );
  }

  /**
   * Update a location ingredient cost
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async updateLocationIngredientCost(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/LocationIngredientCostsService.js')
      ).updateLocationIngredientCost
    );
  }
}
