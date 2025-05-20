const Service = require('./Service');

/**
 * Create a new recipe
 * Add a new recipe definition.
 *
 * recipeCreate RecipeCreate
 * returns Recipe
 * */
const createRecipe = ({ recipeCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          recipeCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete a recipe
 * Remove a recipe definition. This might require checks for existing ingredient links or menu item links.
 *
 * recipeId String
 * no response value expected for this operation
 * */
const deleteRecipe = ({ recipeId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          recipeId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get a recipe by ID
 * Retrieve a specific recipe using its unique ID.
 *
 * recipeId String
 * returns Recipe
 * */
const getRecipeById = ({ recipeId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          recipeId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List all recipes
 * Retrieve a list of all defined recipes.
 *
 * returns List
 * */
const listRecipes = () =>
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
 * Update a recipe
 * Update details of an existing recipe definition.
 *
 * recipeId String
 * recipeUpdate RecipeUpdate
 * returns Recipe
 * */
const updateRecipe = ({ recipeId, recipeUpdate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          recipeId,
          recipeUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  listRecipes,
  updateRecipe,
};
