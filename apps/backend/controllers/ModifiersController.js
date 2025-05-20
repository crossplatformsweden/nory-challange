/**
 * The ModifiersController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/ModifiersService');
const createModifier = async (request, response) => {
  await Controller.handleRequest(request, response, service.createModifier);
};

const deleteModifier = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteModifier);
};

const getModifierById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getModifierById);
};

const listModifiers = async (request, response) => {
  await Controller.handleRequest(request, response, service.listModifiers);
};

const updateModifier = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateModifier);
};

module.exports = {
  createModifier,
  deleteModifier,
  getModifierById,
  listModifiers,
  updateModifier,
};
