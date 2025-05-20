import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { z } from 'zod';
import * as inventoryMovementsService from './InventoryMovementsService';
import {
  listInventoryMovementsResponse,
  listInventoryMovementsResponseItem,
} from '@repo/zod-clients';
import Service from './Service';
import { generateValidInventoryMovementCreate } from '../tests/utils/testData';

describe('InventoryMovementsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createInventoryMovement', () => {
    it('should successfully create an inventory movement with valid data', async () => {
      const validData = generateValidInventoryMovementCreate();
      const result = await inventoryMovementsService.createInventoryMovement({
        inventoryMovementCreate: validData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      // Validate payload with Zod
      listInventoryMovementsResponseItem.parse(result.payload);
    });
    it('should return a validation error for invalid input data', async () => {
      const invalidData = { type: 123 }; // type should be string, missing required fields
      const result = await inventoryMovementsService.createInventoryMovement({
        inventoryMovementCreate: invalidData,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(Object), 400));
      expect(result.code).toBe(400);
      expect(result.error).toBeDefined();
      expect((result.error as unknown as { message: string }).message).toBe(
        'Validation error'
      );
      expect(
        (result.error as unknown as { details: unknown[] }).details
      ).toBeInstanceOf(Array);
      const zodError = z.ZodError.create(
        (result.error as unknown as { details: z.ZodIssue[] })
          .details as z.ZodIssue[]
      );
      expect(zodError.issues.length).toBeGreaterThan(0);
    });
  });

  describe('listInventoryMovements', () => {
    it('should successfully return a list of inventory movements', async () => {
      const result = await inventoryMovementsService.listInventoryMovements({
        locationId: 'location-1',
      });
      expect(result).toEqual(Service.successResponse(expect.any(Array), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      expect(Array.isArray(result.payload)).toBe(true);
      // Validate the whole payload as an array
      listInventoryMovementsResponse.parse(result.payload);
    });
  });
});
