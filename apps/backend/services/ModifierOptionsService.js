const Service = require('./Service');

/**
 * Create a new modifier option for a group
 * Add a new individual option to an existing modifier group.
 *
 * modifierId String
 * modifierOptionCreate ModifierOptionCreate
 * returns ModifierOption
 * */
const createModifierOption = ({ modifierId, modifierOptionCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierId,
          modifierOptionCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete a modifier option from a group
 * Remove a specific modifier option from the specified modifier group.
 *
 * modifierId String
 * modifierOptionId String
 * no response value expected for this operation
 * */
const deleteModifierOption = ({ modifierId, modifierOptionId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierId,
          modifierOptionId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get a modifier option by ID for a group
 * Retrieve a specific modifier option using its unique ID within the context of a modifier group.
 *
 * modifierId String
 * modifierOptionId String
 * returns ModifierOption
 * */
const getModifierOptionById = ({ modifierId, modifierOptionId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierId,
          modifierOptionId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List options for a modifier group
 * Retrieve a list of all individual options within the specified modifier group.
 *
 * modifierId String
 * returns List
 * */
const listModifierOptions = ({ modifierId }) =>
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
 * Update a modifier option for a group
 * Update details of an existing modifier option within the specified modifier group.
 *
 * modifierId String
 * modifierOptionId String
 * modifierOptionUpdate ModifierOptionUpdate
 * returns ModifierOption
 * */
const updateModifierOption = ({
  modifierId,
  modifierOptionId,
  modifierOptionUpdate,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          modifierId,
          modifierOptionId,
          modifierOptionUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createModifierOption,
  deleteModifierOption,
  getModifierOptionById,
  listModifierOptions,
  updateModifierOption,
};
