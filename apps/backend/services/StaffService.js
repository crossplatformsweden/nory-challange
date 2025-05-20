const Service = require('./Service');

/**
 * Create a new staff member for a location
 * Add a new staff member associated with the specified location.
 *
 * locationId String
 * staffCreate StaffCreate
 * returns Staff
 * */
const createStaffAtLocation = ({ locationId, staffCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          staffCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete a staff member from a location
 * Remove a staff member association with the specified location.
 *
 * locationId String
 * staffId String
 * no response value expected for this operation
 * */
const deleteStaffAtLocation = ({ locationId, staffId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          staffId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get a staff member by ID for a specific location
 * Retrieve a specific staff member using their unique ID within the context of a location.
 *
 * locationId String
 * staffId String
 * returns Staff
 * */
const getStaffByLocationAndId = ({ locationId, staffId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          staffId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List staff for a specific location
 * Retrieve a list of all staff members working at the specified location.
 *
 * locationId String
 * returns List
 * */
const listStaffByLocation = ({ locationId }) =>
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
 * Update a staff member for a location
 * Update details of an existing staff member associated with the specified location.
 *
 * locationId String
 * staffId String
 * staffUpdate StaffUpdate
 * returns Staff
 * */
const updateStaffAtLocation = ({ locationId, staffId, staffUpdate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          staffId,
          staffUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createStaffAtLocation,
  deleteStaffAtLocation,
  getStaffByLocationAndId,
  listStaffByLocation,
  updateStaffAtLocation,
};
