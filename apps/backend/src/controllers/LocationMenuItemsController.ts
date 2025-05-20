import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as locationMenuItemsService from '../services/LocationMenuItemsService.js';
import { OpenAPIRequest } from '../types/common.js';

export class LocationMenuItemsController extends Controller {
  constructor(service?: unknown) {
    super(service || locationMenuItemsService);
  }

  async createLocationMenuItem(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .createLocationMenuItem
    );
  }

  async deleteLocationMenuItem(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .deleteLocationMenuItem
    );
  }

  async getLocationMenuItemById(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .getLocationMenuItemById
    );
  }

  async listLocationMenuItems(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .listLocationMenuItems
    );
  }

  async updateLocationMenuItem(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/LocationMenuItemsService.js'))
        .updateLocationMenuItem
    );
  }
}
