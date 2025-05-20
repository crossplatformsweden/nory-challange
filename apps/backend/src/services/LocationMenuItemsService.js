const Service = require('./Service');

/**
 * Add a recipe as a menu item to a location
 * Create a link between a recipe and a location, defining its price and available modifiers as a menu item.
 *
 * locationId String
 * locationMenuItemCreate LocationMenuItemCreate
 * returns LocationMenuItem
 * */
const createLocationMenuItem = ({ locationId, locationMenuItemCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          locationMenuItemCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Remove a menu item from a location
 * Make a menu item unavailable at a specific location.
 *
 * locationId String
 * menuItemId String
 * no response value expected for this operation
 * */
const deleteLocationMenuItem = ({ locationId, menuItemId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          menuItemId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get a menu item by ID for a location
 * Retrieve a specific menu item using its unique ID within the context of a location.
 *
 * locationId String
 * menuItemId String
 * returns LocationMenuItem
 * */
const getLocationMenuItemById = ({ locationId, menuItemId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          menuItemId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List menu items for a specific location
 * Retrieve a list of all menu items available at the specified location, including prices and enabled modifiers.
 *
 * locationId String
 * returns List
 * */
const listLocationMenuItems = ({ locationId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Update a menu item for a location
 * Update details (like price or modifiers) of an existing menu item at the specified location.
 *
 * locationId String
 * menuItemId String
 * locationMenuItemUpdate LocationMenuItemUpdate
 * returns LocationMenuItem
 * */
const updateLocationMenuItem = ({
  locationId,
  menuItemId,
  locationMenuItemUpdate,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          menuItemId,
          locationMenuItemUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createLocationMenuItem,
  deleteLocationMenuItem,
  getLocationMenuItemById,
  listLocationMenuItems,
  updateLocationMenuItem,
};
