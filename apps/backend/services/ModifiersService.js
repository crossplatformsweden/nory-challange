const Service = require('./Service');

/**
 * Create a new modifier group
 * Add a new modifier group definition.
 *
 * modifierCreate ModifierCreate
 * returns Modifier
 * */
const createModifier = ({ modifierCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete a modifier group
 * Remove a modifier group definition. This might require checks for existing options or menu item links.
 *
 * modifierId String
 * no response value expected for this operation
 * */
const deleteModifier = ({ modifierId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get a modifier by ID
 * Retrieve a specific modifier group using its unique ID.
 *
 * modifierId String
 * returns Modifier
 * */
const getModifierById = ({ modifierId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List all modifiers
 * Retrieve a list of all defined modifier groups (e.g., \"Milk Options\").
 *
 * returns List
 * */
const listModifiers = () =>
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
 * Update a modifier group
 * Update details of an existing modifier group definition.
 *
 * modifierId String
 * modifierUpdate ModifierUpdate
 * returns Modifier
 * */
const updateModifier = ({ modifierId, modifierUpdate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierId,
          modifierUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createModifier,
  deleteModifier,
  getModifierById,
  listModifiers,
  updateModifier,
};
