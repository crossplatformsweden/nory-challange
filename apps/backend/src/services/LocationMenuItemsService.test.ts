import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { z } from 'zod';
import * as locationMenuItemsService from './LocationMenuItemsService';
import {
  listLocationMenuItemsResponseItem,
  getLocationMenuItemByIdResponse,
  updateLocationMenuItemResponse,
} from '@repo/zod-clients';
import Service from './Service';
import {
  generateValidLocationMenuItemCreate,
  generateValidLocationMenuItemUpdate,
} from '../tests/utils/testData';

describe('LocationMenuItemsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createLocationMenuItem', () => {
    it('should successfully create location menu item with valid data', async () => {
      const validData = generateValidLocationMenuItemCreate();
      const result = await locationMenuItemsService.createLocationMenuItem({
        locationId: 'location-1',
        locationMenuItemCreate: validData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      listLocationMenuItemsResponseItem.parse(result.payload);
    });
    it('should return a validation error for invalid input data', async () => {
      const invalidData = { price: -1, recipeId: 'recipe-1' };
      const result = await locationMenuItemsService.createLocationMenuItem({
        locationId: 'location-1',
        locationMenuItemCreate: invalidData,
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

  describe('listLocationMenuItems', () => {
    it('should successfully return a list of location menu items', async () => {
      const result = await locationMenuItemsService.listLocationMenuItems({
        locationId: 'location-1',
      });
      expect(result).toEqual(Service.successResponse(expect.any(Array), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      expect(Array.isArray(result.payload)).toBe(true);
      (result.payload as unknown[]).forEach((item: unknown) => {
        listLocationMenuItemsResponseItem.parse(item);
      });
    });
  });

  describe('getLocationMenuItemById', () => {
    it('should successfully return location menu item by ID', async () => {
      const locationMenuItemId = 'test-location-menu-item-id';
      const result = await locationMenuItemsService.getLocationMenuItemById({
        locationId: 'location-1',
        menuItemId: locationMenuItemId,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      getLocationMenuItemByIdResponse.parse(result.payload);
    });
    it('should return a 405 error if location menu item not found', async () => {
      const locationMenuItemId = 'non-existent-id';
      const result = await locationMenuItemsService.getLocationMenuItemById({
        locationId: 'location-1',
        menuItemId: locationMenuItemId,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('updateLocationMenuItem', () => {
    it('should successfully update location menu item with valid data', async () => {
      const locationMenuItemId = 'test-location-menu-item-id';
      const validUpdateData = generateValidLocationMenuItemUpdate();
      const result = await locationMenuItemsService.updateLocationMenuItem({
        locationId: 'location-1',
        menuItemId: locationMenuItemId,
        locationMenuItemUpdate: validUpdateData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      updateLocationMenuItemResponse.parse(result.payload);
    });
    it('should return a validation error for invalid update data', async () => {
      const locationMenuItemId = 'test-location-menu-item-id';
      const invalidUpdateData = { price: 'not-a-number' };
      const result = await locationMenuItemsService.updateLocationMenuItem({
        locationId: 'location-1',
        menuItemId: locationMenuItemId,
        locationMenuItemUpdate: invalidUpdateData,
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
    it('should return an error if location menu item not found', async () => {
      const locationMenuItemId = 'non-existent-id';
      const validUpdateData = generateValidLocationMenuItemUpdate();
      const result = await locationMenuItemsService.updateLocationMenuItem({
        locationId: 'location-1',
        menuItemId: locationMenuItemId,
        locationMenuItemUpdate: validUpdateData,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('deleteLocationMenuItem', () => {
    it('should successfully delete location menu item by ID', async () => {
      const locationMenuItemId = 'test-location-menu-item-id';
      const result = await locationMenuItemsService.deleteLocationMenuItem({
        locationId: 'location-1',
        menuItemId: locationMenuItemId,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toEqual({
        success: true,
        message: 'Location menu item deleted',
      });
    });
    it('should return an error if location menu item ID is invalid or not found', async () => {
      const locationMenuItemId = '';
      const result = await locationMenuItemsService.deleteLocationMenuItem({
        locationId: 'location-1',
        menuItemId: locationMenuItemId,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid location menu item ID');
    });
  });
});
