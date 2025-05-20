/**
 * The StaffController file is a very simple one, which does not need to be changed manually,
 * unless there's a case where business logic routes the request to an entity which is not
 * the service.
 * The heavy lifting of the Controller item is done in Request.js - that is where request
 * parameters are extracted and sent to the service, and where response is handled.
 */

const Controller = require('./Controller');
const service = require('../services/StaffService');
const createStaffAtLocation = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.createStaffAtLocation
  );
};

const deleteStaffAtLocation = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.deleteStaffAtLocation
  );
};

const getStaffByLocationAndId = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.getStaffByLocationAndId
  );
};

const listStaffByLocation = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.listStaffByLocation
  );
};

const updateStaffAtLocation = async (request, response) => {
  await Controller.handleRequest(
    request,
    response,
    service.updateStaffAtLocation
  );
};

module.exports = {
  createStaffAtLocation,
  deleteStaffAtLocation,
  getStaffByLocationAndId,
  listStaffByLocation,
  updateStaffAtLocation,
};
