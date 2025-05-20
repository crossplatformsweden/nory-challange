/**
 * The LocationsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/LocationsService');
const createLocation = async (request, response) => {
  await Controller.handleRequest(request, response, service.createLocation);
};

const deleteLocation = async (request, response) => {
  await Controller.handleRequest(request, response, service.deleteLocation);
};

const getLocationById = async (request, response) => {
  await Controller.handleRequest(request, response, service.getLocationById);
};

const listLocations = async (request, response) => {
  await Controller.handleRequest(request, response, service.listLocations);
};

const updateLocation = async (request, response) => {
  await Controller.handleRequest(request, response, service.updateLocation);
};

module.exports = {
  createLocation,
  deleteLocation,
  getLocationById,
  listLocations,
  updateLocation,
};
