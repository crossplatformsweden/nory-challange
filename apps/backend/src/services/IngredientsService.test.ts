import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import { z } from 'zod';
import * as ingredientsService from './IngredientsService';
import {
  listIngredientsResponse,
  getIngredientByIdResponse,
  updateIngredientResponse,
} from '@repo/zod-clients';
import {
  generateValidIngredientCreate,
  generateValidIngredientResponse,
  generateValidIngredientUpdate,
} from '../tests/utils/testData';
import Service from './Service';

describe('IngredientsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createIngredient', () => {
    it('should successfully create an ingredient with valid data', async () => {
      const validIngredientCreateData = generateValidIngredientCreate();
      const result = await ingredientsService.createIngredient({
        ingredientCreate: validIngredientCreateData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      const validatedPayload = listIngredientsResponse.parse([result.payload]);
      expect(validatedPayload[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: validIngredientCreateData.name,
          unit: validIngredientCreateData.unit,
          cost: validIngredientCreateData.cost,
        })
      );
    });
    it('should return a validation error for invalid input data', async () => {
      const invalidIngredientCreateData = { name: '', unit: 123 };
      const result = await ingredientsService.createIngredient({
        ingredientCreate: invalidIngredientCreateData,
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
      expect(zodError.issues.length).toBeGreaterThanOrEqual(2);
      expect(zodError.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['name'],
            code: z.ZodIssueCode.too_small,
          }),
          expect.objectContaining({
            path: ['unit'],
            code: z.ZodIssueCode.invalid_type,
          }),
        ])
      );
    });
  });

  describe('listIngredients', () => {
    it('should successfully return a list of ingredients', async () => {
      const result = await ingredientsService.listIngredients();
      expect(result).toEqual(Service.successResponse(expect.any(Array), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      const validatedPayload = listIngredientsResponse.parse(result.payload);
      expect(Array.isArray(validatedPayload)).toBe(true);
    });
  });

  describe('getIngredientById', () => {
    it('should successfully return an ingredient by ID', async () => {
      const ingredientId = 'test-ingredient-id';
      const mockIngredient = generateValidIngredientResponse({
        id: ingredientId,
      });
      const result = await ingredientsService.getIngredientById({
        ingredientId,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      const validatedPayload = getIngredientByIdResponse.parse(result.payload);
      expect(validatedPayload).toEqual(mockIngredient);
    });
    it('should return a 405 error if ingredient not found', async () => {
      const ingredientId = 'non-existent-id';
      const result = await ingredientsService.getIngredientById({
        ingredientId,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('updateIngredient', () => {
    it('should successfully update an ingredient with valid data', async () => {
      const ingredientId = 'test-ingredient-to-update';
      const validUpdateData = generateValidIngredientUpdate({
        name: 'Updated Name Only',
      });
      const mockUpdatedIngredient = generateValidIngredientResponse({
        id: ingredientId,
        ...validUpdateData,
        unit: 'grams',
        cost: undefined,
      });
      const result = await ingredientsService.updateIngredient({
        ingredientId,
        ingredientUpdate: validUpdateData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      const validatedPayload = updateIngredientResponse.parse(result.payload);
      expect(validatedPayload).toEqual(mockUpdatedIngredient);
    });
    it('should return a validation error for invalid update data', async () => {
      const ingredientId = 'test-ingredient-to-update';
      const invalidUpdateData = { cost: -5 };
      const result = await ingredientsService.updateIngredient({
        ingredientId,
        ingredientUpdate: invalidUpdateData,
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
      expect(zodError.issues).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            path: ['cost'],
            code: z.ZodIssueCode.too_small,
          }),
        ])
      );
    });
    it('should return an error if ingredient not found', async () => {
      const ingredientId = 'non-existent-id';
      const validUpdateData = generateValidIngredientUpdate();
      const result = await ingredientsService.updateIngredient({
        ingredientId,
        ingredientUpdate: validUpdateData,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid input');
    });
  });

  describe('deleteIngredient', () => {
    it('should successfully delete an ingredient by ID', async () => {
      const ingredientId = 'test-ingredient-to-delete';
      const result = await ingredientsService.deleteIngredient({
        ingredientId,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toEqual({
        success: true,
        message: 'Ingredient deleted',
      });
    });
    it('should return an error if ingredient ID is invalid or not found', async () => {
      const ingredientId = '';
      const result = await ingredientsService.deleteIngredient({
        ingredientId,
      });
      expect(result).toEqual(Service.rejectResponse(expect.any(String), 405));
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid ingredient ID');
    });
  });
});
