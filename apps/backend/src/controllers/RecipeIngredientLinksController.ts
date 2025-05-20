import { Request, Response } from 'express';
import Controller from './Controller';
import * as recipeIngredientLinksService from '../services/RecipeIngredientLinksService';
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
          .service as typeof import('../services/RecipeIngredientLinksService')
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
          .service as typeof import('../services/RecipeIngredientLinksService')
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
          .service as typeof import('../services/RecipeIngredientLinksService')
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
          .service as typeof import('../services/RecipeIngredientLinksService')
      ).listRecipeIngredientLinks
    );
  }
}
