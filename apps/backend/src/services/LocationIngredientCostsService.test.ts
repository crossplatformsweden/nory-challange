import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { z } from 'zod';
import * as locationIngredientCostsService from './LocationIngredientCostsService';
import {
  listLocationIngredientCostsResponseItem,
  getLocationIngredientCostByIdResponse,
  updateLocationIngredientCostResponse,
} from '@repo/zod-clients';
import Service from './Service';
import {
  generateValidLocationIngredientCostCreate,
  generateValidLocationIngredientCostUpdate,
} from '../tests/utils/testData';

describe('LocationIngredientCostsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createLocationIngredientCost', () => {
    it('should successfully create location ingredient cost with valid data', async () => {
      const validData = generateValidLocationIngredientCostCreate();
      const result =
        await locationIngredientCostsService.createLocationIngredientCost({
          locationId: 'location-1',
          locationIngredientCostCreate: validData,
        } as unknown as Parameters<
          typeof locationIngredientCostsService.createLocationIngredientCost
        >[0]);
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      listLocationIngredientCostsResponseItem.parse(result.payload);
    });
    it('should return a validation error for invalid input data', async () => {
      const invalidData = { cost: 'not-a-number' };
      const result =
        await locationIngredientCostsService.createLocationIngredientCost({
          locationId: 'location-1',
          locationIngredientCostCreate: invalidData,
        } as unknown as Parameters<
          typeof locationIngredientCostsService.createLocationIngredientCost
        >[0]);
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

  describe('listLocationIngredientCosts', () => {
    it('should successfully return a list of location ingredient costs', async () => {
      const result =
        await locationIngredientCostsService.listLocationIngredientCosts({
          locationId: 'location-1',
        });
      expect(result).toEqual(Service.successResponse(expect.any(Array), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      expect(Array.isArray(result.payload)).toBe(true);
      (result.payload as any[]).forEach((item: any) => {
        listLocationIngredientCostsResponseItem.parse(item);
      });
    });
  });

  describe('getLocationIngredientCostById', () => {
    it('should successfully return location ingredient cost by ID', async () => {
      const locationIngredientCostId = 'test-location-ingredient-cost-id';
      const result =
        await locationIngredientCostsService.getLocationIngredientCostById({
          locationId: 'location-1',
          locationIngredientCostId,
        });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      getLocationIngredientCostByIdResponse.parse(result.payload);
    });
    it('should return a 405 error if location ingredient cost not found', async () => {
      const locationIngredientCostId = 'non-existent-id';
      const result =
        await locationIngredientCostsService.getLocationIngredientCostById({
          locationId: 'location-1',
          locationIngredientCostId,
        });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('updateLocationIngredientCost', () => {
    it('should successfully update location ingredient cost with valid data', async () => {
      const locationIngredientCostId = 'test-location-ingredient-cost-id';
      const validUpdateData = generateValidLocationIngredientCostUpdate();
      const result =
        await locationIngredientCostsService.updateLocationIngredientCost({
          locationId: 'location-1',
          locationIngredientCostId,
          locationIngredientCostUpdate: validUpdateData,
        });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      updateLocationIngredientCostResponse.parse(result.payload);
    });
    it('should return a validation error for invalid update data', async () => {
      const locationIngredientCostId = 'test-location-ingredient-cost-id';
      const invalidUpdateData = { cost: 'not-a-number' };
      const result =
        await locationIngredientCostsService.updateLocationIngredientCost({
          locationId: 'location-1',
          locationIngredientCostId,
          locationIngredientCostUpdate: invalidUpdateData as unknown,
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
    it('should return an error if location ingredient cost not found', async () => {
      const locationIngredientCostId = 'non-existent-id';
      const validUpdateData = generateValidLocationIngredientCostUpdate();
      const result =
        await locationIngredientCostsService.updateLocationIngredientCost({
          locationId: 'location-1',
          locationIngredientCostId,
          locationIngredientCostUpdate: validUpdateData,
        });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('deleteLocationIngredientCost', () => {
    it('should successfully delete location ingredient cost by ID', async () => {
      const locationIngredientCostId = 'test-location-ingredient-cost-id';
      const result =
        await locationIngredientCostsService.deleteLocationIngredientCost({
          locationId: 'location-1',
          locationIngredientCostId,
        });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toEqual({
        success: true,
        message: 'Location ingredient cost deleted',
      });
    });
    it('should return an error if location ingredient cost ID is invalid or not found', async () => {
      const locationIngredientCostId = '';
      const result =
        await locationIngredientCostsService.deleteLocationIngredientCost({
          locationId: 'location-1',
          locationIngredientCostId,
        });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid location ingredient cost ID');
    });
  });
});
