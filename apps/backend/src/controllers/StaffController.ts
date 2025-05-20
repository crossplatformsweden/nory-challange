import { Request, Response } from 'express';
import Controller from './Controller.js';
import * as staffService from '../services/StaffService.js';
import { OpenAPIRequest } from '../types/common.js';

/**
 * Create a new staff member for a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const createStaffAtLocation = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    staffService.createStaffAtLocation
  );
};

/**
 * Delete a staff member from a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const deleteStaffAtLocation = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    staffService.deleteStaffAtLocation
  );
};

/**
 * Get a staff member by ID for a specific location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const getStaffByLocationAndId = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    staffService.getStaffByLocationAndId
  );
};

/**
 * List staff for a specific location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const listStaffByLocation = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    staffService.listStaffByLocation
  );
};

/**
 * Update a staff member for a location
 *
 * @param request - The express request object
 * @param response - The express response object
 */
const updateStaffAtLocation = async (
  request: Request,
  response: Response
): Promise<void> => {
  await Controller.handleRequest(
    request as OpenAPIRequest,
    response,
    staffService.updateStaffAtLocation
  );
};

export {
  createStaffAtLocation,
  deleteStaffAtLocation,
  getStaffByLocationAndId,
  listStaffByLocation,
  updateStaffAtLocation,
};
