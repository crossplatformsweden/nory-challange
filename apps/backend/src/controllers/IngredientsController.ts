import { Request, Response } from 'express';
import Controller from './Controller';
import * as ingredientsService from '../services/IngredientsService';
import { OpenAPIRequest } from '../types/common.js';

export class IngredientsController extends Controller {
  constructor(service?: unknown) {
    super(service || ingredientsService);
  }

  /**
   * Create a new ingredient
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async createIngredient(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof ingredientsService).createIngredient
    );
  }

  /**
   * Delete an ingredient
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async deleteIngredient(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof ingredientsService).deleteIngredient
    );
  }

  /**
   * Get an ingredient by its ID
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async getIngredientById(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof ingredientsService).getIngredientById
    );
  }

  /**
   * List all ingredients
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async listIngredients(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof ingredientsService).listIngredients
    );
  }

  /**
   * Update an ingredient
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async updateIngredient(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof ingredientsService).updateIngredient
    );
  }
}
