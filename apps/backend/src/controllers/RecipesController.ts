import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as recipesService from '../services/RecipesService.js';
import { OpenAPIRequest } from '../types/common.js';

export class RecipesController extends Controller {
  constructor(service?: unknown) {
    super(service || recipesService);
  }

  async createRecipe(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService.js'))
        .createRecipe
    );
  }

  async deleteRecipe(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService.js'))
        .deleteRecipe
    );
  }

  async getRecipeById(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService.js'))
        .getRecipeById
    );
  }

  async listRecipes(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService.js'))
        .listRecipes
    );
  }

  async updateRecipe(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService.js'))
        .updateRecipe
    );
  }
}
