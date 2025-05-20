import { Request, Response } from 'express';
import Controller from './Controller';
import * as modifierOptionsService from '../services/ModifierOptionsService';
import { OpenAPIRequest } from '../types/common.js';

export class ModifierOptionsController extends Controller {
  constructor(service?: unknown) {
    super(service || modifierOptionsService);
  }

  async createModifierOption(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof modifierOptionsService).createModifierOption
    );
  }

  async deleteModifierOption(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof modifierOptionsService).deleteModifierOption
    );
  }

  async getModifierOptionById(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof modifierOptionsService).getModifierOptionById
    );
  }

  async listModifierOptions(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof modifierOptionsService).listModifierOptions
    );
  }

  async updateModifierOption(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof modifierOptionsService).updateModifierOption
    );
  }
}
