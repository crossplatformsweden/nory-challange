import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as locationsService from '../services/LocationsService.js';
import { OpenAPIRequest } from '../types/common.js';

export class LocationsController extends Controller {
  constructor(service?: unknown) {
    super(service || locationsService);
  }

  /**
   * Create a new location
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async createLocation(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationsService.js'))
        .createLocation
    );
  }

  /**
   * Delete a location
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async deleteLocation(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationsService.js'))
        .deleteLocation
    );
  }

  /**
   * Get a location by its ID
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async getLocationById(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationsService.js'))
        .getLocationById
    );
  }

  /**
   * List all locations
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async listLocations(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationsService.js'))
        .listLocations
    );
  }

  /**
   * Update a location
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async updateLocation(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationsService.js'))
        .updateLocation
    );
  }
}
