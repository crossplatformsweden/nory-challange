import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as modifierOptionsService from '../services/ModifierOptionsService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new modifier option for a group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createModifierOption = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifierOptionsService.createModifierOption
  );
};

/**
 * Delete a modifier option from a group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteModifierOption = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifierOptionsService.deleteModifierOption
  );
};

/**
 * Get a modifier option by ID for a group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getModifierOptionById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifierOptionsService.getModifierOptionById
  );
};

/**
 * List options for a modifier group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listModifierOptions = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifierOptionsService.listModifierOptions
  );
};

/**
 * Update a modifier option for a group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateModifierOption = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifierOptionsService.updateModifierOption
  );
};

export {
  createModifierOption,
  deleteModifierOption,
  getModifierOptionById,
  listModifierOptions,
  updateModifierOption,
};
