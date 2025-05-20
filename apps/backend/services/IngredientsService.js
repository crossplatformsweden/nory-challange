const Service = require('./Service');

/**
 * Create a new ingredient
 * Add a new ingredient definition to the inventory.
 *
 * ingredientCreate IngredientCreate
 * returns Ingredient
 * */
const createIngredient = ({ ingredientCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          ingredientCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete an ingredient
 * Remove an ingredient definition from the system. This might require checks for existing stock or recipe links.
 *
 * ingredientId String
 * no response value expected for this operation
 * */
const deleteIngredient = ({ ingredientId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          ingredientId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get an ingredient by ID
 * Retrieve a specific ingredient definition using its unique ID.
 *
 * ingredientId String
 * returns Ingredient
 * */
const getIngredientById = ({ ingredientId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          ingredientId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List all ingredients
 * Retrieve a list of all defined inventory ingredients.
 *
 * returns List
 * */
const listIngredients = () =>
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
 * Update an ingredient
 * Update details of an existing ingredient definition.
 *
 * ingredientId String
 * ingredientUpdate IngredientUpdate
 * returns Ingredient
 * */
const updateIngredient = ({ ingredientId, ingredientUpdate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          ingredientId,
          ingredientUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createIngredient,
  deleteIngredient,
  getIngredientById,
  listIngredients,
  updateIngredient,
};
