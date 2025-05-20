import { Request, Response } from 'express';
import Controller from './Controller';
import * as locationMenuItemsService from '../services/LocationMenuItemsService';
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
      (this.service as typeof import('../services/LocationMenuItemsService'))
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
      (this.service as typeof import('../services/LocationMenuItemsService'))
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
      (this.service as typeof import('../services/LocationMenuItemsService'))
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
      (this.service as typeof import('../services/LocationMenuItemsService'))
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
      (this.service as typeof import('../services/LocationMenuItemsService'))
        .updateLocationMenuItem
    );
  }
}
