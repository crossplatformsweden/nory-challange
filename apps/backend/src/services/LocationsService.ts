import Service from './Service';
import { ServiceResponse } from '../types/common.js';
import { isServiceError } from '../types/errors';
import { z } from 'zod';
import {
  createLocationBody,
  getLocationByIdResponse,
  listLocationsResponse,
  updateLocationBody,
  updateLocationResponse,
} from '@repo/zod-clients';

/**
 * Create a new location
 * Add a new location to the inventory system.
 *
 * @param params - Request parameters
 * @param params.locationCreate - Data for creating a new location
 * @returns Promise with the created location
 */
const createLocation = async ({
  locationCreate,
}: {
  locationCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createLocationBody.parse(locationCreate);

    // Mock implementation - create a new location
    const newLocation = {
      id: `location-${Date.now()}`,
      name: validatedData.name,
      address: validatedData.address,
    };

    return Service.successResponse(newLocation);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Delete a location
 * Remove a location from the system. This might also require handling related data (staff, inventory, menu items, etc.).
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID to delete
 * @returns Promise with success response
 */
const deleteLocation = async ({
  locationId,
}: {
  locationId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - validate ID and return success
    if (!locationId || !locationId.trim()) {
      throw new Error('Invalid location ID');
    }

    return Service.successResponse({
      success: true,
      message: `Location ${locationId} deleted successfully`,
    });
  } catch (e) {
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Get a single location by ID
 * Retrieve a specific location using its unique ID.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID to retrieve
 * @returns Promise with the location
 */
const getLocationById = async ({
  locationId,
}: {
  locationId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockLocation = {
      id: locationId,
      name: 'Sample Location',
      address: '123 Main St',
    };

    // Validate the response using Zod
    const validatedResponse = getLocationByIdResponse.parse(mockLocation);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * List all locations
 * Retrieve a list of all locations managed in the inventory system.
 *
 * @returns Promise with list of locations
 */
const listLocations = async (): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockLocations = [
      {
        id: 'location-1',
        name: 'Downtown Branch',
        address: '123 Main St',
      },
      {
        id: 'location-2',
        name: 'Uptown Branch',
        address: '456 Oak Ave',
      },
    ];

    // Validate the response using Zod
    const validatedResponse = listLocationsResponse.parse(mockLocations);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Update a location
 * Update details of an existing location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID to update
 * @param params.locationUpdate - Data for updating the location
 * @returns Promise with the updated location
 */
const updateLocation = async ({
  locationId,
  locationUpdate,
}: {
  locationId: string;
  locationUpdate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = updateLocationBody.parse(locationUpdate);

    // Mock implementation - update location and return
    const updatedLocation = {
      id: locationId,
      name: validatedData.name || 'Updated Location',
      address: validatedData.address || '789 Updated St, City, Country',
    };

    // Validate the response using Zod
    const validatedResponse = updateLocationResponse.parse(updatedLocation);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as Error;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

export {
  createLocation,
  deleteLocation,
  getLocationById,
  listLocations,
  updateLocation,
};
