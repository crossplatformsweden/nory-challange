const Service = require('./Service');

/**
 * Add an ingredient to a recipe
 * Link an ingredient to a recipe with a specific required quantity.
 *
 * recipeId String
 * recipeIngredientLinkCreate RecipeIngredientLinkCreate
 * returns RecipeIngredientLink
 * */
const createRecipeIngredientLink = ({ recipeId, recipeIngredientLinkCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          recipeId,
          recipeIngredientLinkCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Remove a recipe ingredient link
 * Remove a specific ingredient requirement from a recipe.
 *
 * recipeId String
 * recipeIngredientLinkId String
 * no response value expected for this operation
 * */
const deleteRecipeIngredientLink = ({ recipeId, recipeIngredientLinkId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          recipeId,
          recipeIngredientLinkId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List ingredient links for a recipe
 * Retrieve a list of all ingredients required for the specified recipe, including their quantities.
 *
 * recipeId String
 * returns List
 * */
const listRecipeIngredientLinks = ({ recipeId }) =>
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

module.exports = {
  createRecipeIngredientLink,
  deleteRecipeIngredientLink,
  listRecipeIngredientLinks,
};
