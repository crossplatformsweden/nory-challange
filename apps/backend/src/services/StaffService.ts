import Service from './Service.js';
import { ServiceResponse, ServiceError } from '../types/common.js';
import { isServiceError } from '../types/errors.js';
import { z } from 'zod';
import {
  createStaffAtLocationBody,
  getStaffByLocationAndIdResponse,
  listStaffByLocationResponse,
  updateStaffAtLocationBody,
  updateStaffAtLocationResponse,
} from '@repo/zod-clients';

/**
 * Create a new staff member for a location
 * Add a new staff member associated with the specified location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.staffCreate - Data for creating a new staff member
 * @returns Promise with the created staff member
 */
const createStaffAtLocation = async ({
  locationId,
  staffCreate,
}: {
  locationId: string;
  staffCreate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = createStaffAtLocationBody.parse(staffCreate);

    // Mock implementation - create a new staff member
    const newStaff = {
      id: `staff-${Date.now()}`,
      locationId,
      name: validatedData.name,
      dob: validatedData.dob,
      role: validatedData.role,
      iban: validatedData.iban,
      bic: validatedData.bic,
    };

    return Service.successResponse(newStaff);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Delete a staff member from a location
 * Remove a staff member association with the specified location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.staffId - The staff ID to delete
 * @returns Promise with success response
 */
const deleteStaffAtLocation = async ({
  locationId,
  staffId,
}: {
  locationId: string;
  staffId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - validate IDs and return success
    if (!locationId || !locationId.trim() || !staffId || !staffId.trim()) {
      throw new Error('Invalid location ID or staff ID');
    }

    return Service.successResponse({
      success: true,
      message: `Staff member ${staffId} at location ${locationId} deleted successfully`,
    });
  } catch (e) {
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Get a staff member by ID for a specific location
 * Retrieve a specific staff member using their unique ID within the context of a location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.staffId - The staff ID to retrieve
 * @returns Promise with the staff member
 */
const getStaffByLocationAndId = async ({
  locationId,
  staffId,
}: {
  locationId: string;
  staffId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockStaff = {
      id: staffId,
      locationId,
      name: 'John Doe',
      dob: '1990-01-01',
      role: 'Chef',
      iban: 'DE89370400440532013000',
      bic: 'COBADEFFXXX',
    };

    // Validate the response using Zod
    const validatedResponse = getStaffByLocationAndIdResponse.parse(mockStaff);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * List staff for a specific location
 * Retrieve a list of all staff members working at the specified location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @returns Promise with list of staff members
 */
const listStaffByLocation = async ({
  locationId,
}: {
  locationId: string;
}): Promise<ServiceResponse> => {
  try {
    // Mock implementation - create sample data
    const mockStaff = [
      {
        id: 'staff-1',
        locationId,
        name: 'John Doe',
        dob: '1990-01-01',
        role: 'Chef',
        iban: 'DE89370400440532013000',
        bic: 'COBADEFFXXX',
      },
      {
        id: 'staff-2',
        locationId,
        name: 'Jane Smith',
        dob: '1985-05-15',
        role: 'Server',
        iban: 'DE91100000000123456789',
        bic: 'MARKDEF1100',
      },
    ];

    // Validate the response using Zod
    const validatedResponse = listStaffByLocationResponse.parse(mockStaff);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

/**
 * Update a staff member for a location
 * Update details of an existing staff member associated with the specified location.
 *
 * @param params - Request parameters
 * @param params.locationId - The location ID
 * @param params.staffId - The staff ID to update
 * @param params.staffUpdate - Data for updating the staff member
 * @returns Promise with the updated staff member
 */
const updateStaffAtLocation = async ({
  locationId,
  staffId,
  staffUpdate,
}: {
  locationId: string;
  staffId: string;
  staffUpdate: unknown;
}): Promise<ServiceResponse> => {
  try {
    // Validate the input data using Zod
    const validatedData = updateStaffAtLocationBody.parse(staffUpdate);

    // Mock implementation - update staff and return
    const updatedStaff = {
      id: staffId,
      locationId,
      name: validatedData.name || 'Updated Name',
      dob: validatedData.dob || '1990-01-01',
      role: validatedData.role || 'Updated Role',
      iban: validatedData.iban || 'DE89370400440532013000',
      bic: validatedData.bic || 'COBADEFFXXX',
    };

    // Validate the response using Zod
    const validatedResponse = updateStaffAtLocationResponse.parse(updatedStaff);

    return Service.successResponse(validatedResponse);
  } catch (e) {
    if (e instanceof z.ZodError) {
      return Service.rejectResponse(
        { message: 'Validation error', details: e.errors },
        400
      );
    }
    const error = e as ServiceError;
    const status = isServiceError(e) ? e.status : 405;
    return Service.rejectResponse(error.message || 'Invalid input', status);
  }
};

export {
  createStaffAtLocation,
  deleteStaffAtLocation,
  getStaffByLocationAndId,
  listStaffByLocation,
  updateStaffAtLocation,
};
