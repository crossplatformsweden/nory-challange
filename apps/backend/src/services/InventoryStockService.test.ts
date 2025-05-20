import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { z } from 'zod';
import * as inventoryStockService from './InventoryStockService';
import {
  listInventoryStockResponseItem,
  getInventoryStockByIdResponse,
  updateInventoryStockResponse,
} from '@repo/zod-clients';
import Service from './Service';
import {
  generateValidInventoryStockCreate,
  generateValidInventoryStockUpdate,
} from '../tests/utils/testData';

describe('InventoryStockService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createInventoryStock', () => {
    it('should successfully create inventory stock with valid data', async () => {
      const validData = generateValidInventoryStockCreate();
      const result = await inventoryStockService.createInventoryStock({
        inventoryStockCreate: validData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      listInventoryStockResponseItem.parse(result.payload);
    });
    it('should return a validation error for invalid input data', async () => {
      const invalidData = { quantity: 'not-a-number' };
      const result = await inventoryStockService.createInventoryStock({
        inventoryStockCreate: invalidData,
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

  describe('listInventoryStock', () => {
    it('should successfully return a list of inventory stock', async () => {
      const result = await inventoryStockService.listInventoryStock({
        locationId: 'location-1',
      });
      expect(result).toEqual(Service.successResponse(expect.any(Array), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      expect(Array.isArray(result.payload)).toBe(true);
      (result.payload as unknown[]).forEach((item: unknown) => {
        listInventoryStockResponseItem.parse(item);
      });
    });
  });

  describe('getInventoryStockById', () => {
    it('should successfully return inventory stock by ID', async () => {
      const inventoryStockId = 'test-inventory-stock-id';
      const result = await inventoryStockService.getInventoryStockById({
        stockId: inventoryStockId,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      getInventoryStockByIdResponse.parse(result.payload);
    });
    it('should return a 405 error if inventory stock not found', async () => {
      const inventoryStockId = 'non-existent-id';
      const result = await inventoryStockService.getInventoryStockById({
        stockId: inventoryStockId,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('updateInventoryStock', () => {
    it('should successfully update inventory stock with valid data', async () => {
      const inventoryStockId = 'test-inventory-stock-id';
      const validUpdateData = generateValidInventoryStockUpdate();
      const result = await inventoryStockService.updateInventoryStock({
        stockId: inventoryStockId,
        inventoryStockUpdate: validUpdateData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      updateInventoryStockResponse.parse(result.payload);
    });
    it('should return a validation error for invalid update data', async () => {
      const inventoryStockId = 'test-inventory-stock-id';
      const invalidUpdateData = { quantity: 'not-a-number' };
      const result = await inventoryStockService.updateInventoryStock({
        stockId: inventoryStockId,
        inventoryStockUpdate: invalidUpdateData,
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
    it('should return an error if inventory stock not found', async () => {
      const inventoryStockId = 'non-existent-id';
      const validUpdateData = generateValidInventoryStockUpdate();
      const result = await inventoryStockService.updateInventoryStock({
        stockId: inventoryStockId,
        inventoryStockUpdate: validUpdateData,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('deleteInventoryStock', () => {
    it('should successfully delete inventory stock by ID', async () => {
      const inventoryStockId = 'test-inventory-stock-id';
      const result = await inventoryStockService.deleteInventoryStock({
        stockId: inventoryStockId,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toEqual({
        success: true,
        message: 'Inventory stock deleted',
      });
    });
    it('should return an error if inventory stock ID is invalid or not found', async () => {
      const inventoryStockId = '';
      const result = await inventoryStockService.deleteInventoryStock({
        stockId: inventoryStockId,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid inventory stock ID');
    });
  });
});
