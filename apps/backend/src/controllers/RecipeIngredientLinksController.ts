import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as recipeIngredientLinksService from '../services/RecipeIngredientLinksService.js';
import { OpenAPIRequest } from '../types/common.js';

export class RecipeIngredientLinksController extends Controller {
  constructor(service?: unknown) {
    super(service || recipeIngredientLinksService);
  }

  /**
   * Create a new recipe ingredient link
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async createRecipeIngredientLink(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/RecipeIngredientLinksService.js')
      ).createRecipeIngredientLink
    );
  }

  /**
   * Delete a recipe ingredient link
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async deleteRecipeIngredientLink(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/RecipeIngredientLinksService.js')
      ).deleteRecipeIngredientLink
    );
  }

  /**
   * Get a recipe ingredient link by its ID
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async getRecipeIngredientLinkById(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/RecipeIngredientLinksService.js')
      ).getRecipeIngredientLinkById
    );
  }

  /**
   * List all recipe ingredient links
   *
   * @param request - The express request object
   * @param response - The express response object
   */
  async listRecipeIngredientLinks(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (
        this
          .service as typeof import('../services/RecipeIngredientLinksService.js')
      ).listRecipeIngredientLinks
    );
  }
}
