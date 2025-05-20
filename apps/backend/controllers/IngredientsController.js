/**
 * The IngredientsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/IngredientsService');
const createIngredient = async (request, response) => {
  await Controller.handleRequest(request, response, service.createIngredient);
};

const deleteIngredient = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteIngredient);
};

const getIngredientById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getIngredientById);
};

const listIngredients = async (request, response) => {
  await Controller.handleRequest(request, response, service.listIngredients);
};

const updateIngredient = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateIngredient);
};

module.exports = {
  createIngredient,
  deleteIngredient,
  getIngredientById,
  listIngredients,
  updateIngredient,
};
