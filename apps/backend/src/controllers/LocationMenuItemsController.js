/**
 * The LocationMenuItemsController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/LocationMenuItemsService');
const createLocationMenuItem = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.createLocationMenuItem
  );
};

const deleteLocationMenuItem = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.deleteLocationMenuItem
  );
};

const getLocationMenuItemById = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.getLocationMenuItemById
  );
};

const listLocationMenuItems = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.listLocationMenuItems
  );
};

const updateLocationMenuItem = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.updateLocationMenuItem
  );
};

module.exports = {
  createLocationMenuItem,
  deleteLocationMenuItem,
  getLocationMenuItemById,
  listLocationMenuItems,
  updateLocationMenuItem,
};
