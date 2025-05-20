import { Request, Response } from 'express';
import Controller from './Controller';
import * as recipesService from '../services/RecipesService';
import { OpenAPIRequest } from '../types/common.js';

export class RecipesController extends Controller {
  constructor(service?: unknown) {
    super(service || recipesService);
  }

  async createRecipe(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService')).createRecipe
    );
  }

  async deleteRecipe(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService')).deleteRecipe
    );
  }

  async getRecipeById(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService'))
        .getRecipeById
    );
  }

  async listRecipes(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService')).listRecipes
    );
  }

  async updateRecipe(request: Request, response: Response): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/RecipesService')).updateRecipe
    );
  }
}
