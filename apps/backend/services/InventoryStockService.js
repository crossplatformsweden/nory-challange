const Service = require('./Service');

/**
 * Create a new inventory stock record
 * Create a record for an ingredient's stock level at a specific location. This is typically for initial setup or adding an item to a location for the first time. Subsequent changes should use movements.
 *
 * inventoryStockCreate InventoryStockCreate
 * returns InventoryStock
 * */
const createInventoryStock = ({ inventoryStockCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          inventoryStockCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Delete an inventory stock record
 * Remove a specific ingredient's stock record for a location. Use with caution as this removes the historical link.
 *
 * stockId String
 * no response value expected for this operation
 * */
const deleteInventoryStock = ({ stockId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          stockId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * Get an inventory stock record by ID
 * Retrieve a specific inventory stock record. Includes embedded location and ingredient summaries.
 *
 * stockId String
 * returns InventoryStock
 * */
const getInventoryStockById = ({ stockId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          stockId,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List inventory stock levels
 * Retrieve current inventory stock levels, optionally filtered by location or ingredient. Includes embedded location and ingredient summaries.
 *
 * locationId String Optional, filter stock by location ID. (optional)
 * ingredientId String Optional, filter stock by ingredient ID. (optional)
 * returns List
 * */
const listInventoryStock = ({ locationId, ingredientId }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
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
 * Update an inventory stock entry (e.g., adjust quantity)
 * Directly adjust the quantity of a specific ingredient at a location. Consider using Inventory Movements for auditable changes.
 *
 * stockId String
 * inventoryStockUpdate InventoryStockUpdate
 * returns InventoryStock
 * */
const updateInventoryStock = ({ stockId, inventoryStockUpdate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          stockId,
          inventoryStockUpdate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createInventoryStock,
  deleteInventoryStock,
  getInventoryStockById,
  listInventoryStock,
  updateInventoryStock,
};
