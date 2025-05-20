const Service = require('./Service');

/**
 * Create a new inventory movement (e.g., log waste or restock)
 * Record a change in stock for a specific ingredient at a location. This is the preferred way to track stock changes over direct stock updates.
 *
 * inventoryMovementCreate InventoryMovementCreate
 * returns InventoryMovement
 * */
const createInventoryMovement = ({ inventoryMovementCreate }) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          inventoryMovementCreate,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });
/**
 * List inventory movements (stock changes)
 * Retrieve a history of inventory stock changes (movements), useful for tracking usage, waste, and restocking. Includes embedded ingredient summaries.
 *
 * locationId String Optional, filter movements by location ID. (optional)
 * ingredientId String Optional, filter movements by ingredient ID. (optional)
 * type String Optional, filter movements by type. (optional)
 * startTime Date Optional, filter movements from this timestamp onwards. (optional)
 * endTime Date Optional, filter movements up to this timestamp. (optional)
 * returns List
 * */
const listInventoryMovements = ({
  locationId,
  ingredientId,
  type,
  startTime,
  endTime,
}) =>
  new Promise(async (resolve, reject) => {
    try {
      resolve(
        Service.successResponse({
          locationId,
          ingredientId,
          type,
          startTime,
          endTime,
        })
      );
    } catch (e) {
      reject(
        Service.rejectResponse(e.message || 'Invalid input', e.status || 405)
      );
    }
  });

module.exports = {
  createInventoryMovement,
  listInventoryMovements,
};
