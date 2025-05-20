const Service = require('./Service');

/**
 * Create a location-specific ingredient cost record
 * Define the cost of an ingredient specifically for a location.
 *
 * locationId String
 * locationIngredientCostCreate LocationIngredientCostCreate
 * returns LocationIngredientCost
 * */
const createLocationIngredientCost = ({
  locationId,
  locationIngredientCostCreate,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          locationIngredientCostCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete a location-specific ingredient cost record
 * Remove a specific ingredient cost record for a location.
 *
 * locationId String
 * locationIngredientCostId String
 * no response value expected for this operation
 * */
const deleteLocationIngredientCost = ({
  locationId,
  locationIngredientCostId,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          locationIngredientCostId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get a location-specific ingredient cost by ID
 * Retrieve a specific ingredient cost record for a location using its unique ID.
 *
 * locationId String
 * locationIngredientCostId String
 * returns LocationIngredientCost
 * */
const getLocationIngredientCostById = ({
  locationId,
  locationIngredientCostId,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          locationIngredientCostId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List ingredient costs for a specific location
 * Retrieve a list of location-specific costs for ingredients.
 *
 * locationId String
 * returns List
 * */
const listLocationIngredientCosts = ({ locationId }) =>
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
 * Update a location-specific ingredient cost
 * Update the cost value for an existing ingredient cost record at a location.
 *
 * locationId String
 * locationIngredientCostId String
 * locationIngredientCostUpdate LocationIngredientCostUpdate
 * returns LocationIngredientCost
 * */
const updateLocationIngredientCost = ({
  locationId,
  locationIngredientCostId,
  locationIngredientCostUpdate,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          locationIngredientCostId,
          locationIngredientCostUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createLocationIngredientCost,
  deleteLocationIngredientCost,
  getLocationIngredientCostById,
  listLocationIngredientCosts,
  updateLocationIngredientCost,
};
