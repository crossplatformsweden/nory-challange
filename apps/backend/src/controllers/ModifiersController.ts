import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as modifiersService from '../services/ModifiersService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new modifier group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createModifier = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifiersService.createModifier
  );
};

/**
 * Delete a modifier group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteModifier = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifiersService.deleteModifier
  );
};

/**
 * Get a modifier by ID
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getModifierById = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifiersService.getModifierById
  );
};

/**
 * List all modifiers
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listModifiers = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifiersService.listModifiers
  );
};

/**
 * Update a modifier group
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateModifier = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    modifiersService.updateModifier
  );
};

export {
  createModifier,
  deleteModifier,
  getModifierById,
  listModifiers,
  updateModifier,
};
