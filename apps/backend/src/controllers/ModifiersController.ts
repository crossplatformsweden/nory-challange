import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as modifiersService from '../services/ModifiersService.js';
import { OpenAPIRequest } from '../types/common.js';

export class ModifiersController extends Controller {
  constructor(service?: unknown) {
    super(service || modifiersService);
  }

  async createModifier(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/ModifiersService.js'))
        .createModifier
    );
  }

  async deleteModifier(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/ModifiersService.js'))
        .deleteModifier
    );
  }

  async getModifierById(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/ModifiersService.js'))
        .getModifierById
    );
  }

  async listModifiers(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/ModifiersService.js'))
        .listModifiers
    );
  }

  async updateModifier(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/ModifiersService.js'))
        .updateModifier
    );
  }
}
