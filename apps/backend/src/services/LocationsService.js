const Service = require('./Service');

/**
 * Create a new location
 * Add a new location to the inventory system.
 *
 * locationCreate LocationCreate
 * returns Location
 * */
const createLocation = ({ locationCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete a location
 * Remove a location from the system. This might also require handling related data (staff, inventory, menu items, etc.).
 *
 * locationId String
 * no response value expected for this operation
 * */
const deleteLocation = ({ locationId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get a single location by ID
 * Retrieve a specific location using its unique ID.
 *
 * locationId String
 * returns Location
 * */
const getLocationById = ({ locationId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List all locations
 * Retrieve a list of all locations managed in the inventory system.
 *
 * returns List
 * */
const listLocations = () =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(Service.successResponse({}));
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Update a location
 * Update details of an existing location.
 *
 * locationId String
 * locationUpdate LocationUpdate
 * returns Location
 * */
const updateLocation = ({ locationId, locationUpdate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          locationUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createLocation,
  deleteLocation,
  getLocationById,
  listLocations,
  updateLocation,
};
