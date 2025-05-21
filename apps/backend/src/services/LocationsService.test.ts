import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import * as locationsService from './LocationsService';
import Service from './Service';
import { listLocationsResponse } from '@repo/zod-clients';
import {
  generateValidLocationCreate,
  generateValidLocationUpdate,
} from '../tests/utils/testData';

describe('LocationsService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createLocation', () => {
    it('should successfully create a location with valid data', async () => {
      const validLocationCreateData = generateValidLocationCreate();
      const result = await locationsService.createLocation({
        locationCreate: validLocationCreateData,
      });
      expect(result).toEqual(Service.successResponse(expect.any(Object), 200));
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      // Validate payload with Zod
      const validatedPayload = listLocationsResponse.parse([result.payload]);
      expect(validatedPayload[0]).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: validLocationCreateData.name,
          address: validLocationCreateData.address,
        })
      );
    });
  });

  describe('deleteLocation', () => {
    it('should successfully delete a location with valid ID', async () => {
      const locationId = 'location-123';
      const result = await locationsService.deleteLocation({ locationId });
      expect(result).toEqual(
        Service.successResponse(
          expect.objectContaining({
            success: true,
            message: expect.stringContaining(locationId),
          }),
          200
        )
      );
      expect(result.code).toBe(200);
      expect((result.payload as { success: boolean }).success).toBe(true);
    });
    it('should return error for invalid location ID', async () => {
      const result = await locationsService.deleteLocation({ locationId: '' });
      expect(result.code).toBe(405);
      expect(result.error).toBe('Invalid location ID');
    });
  });

  describe('getLocationById', () => {
    it('should return a location for a valid ID', async () => {
      const locationId = 'location-123';
      const result = await locationsService.getLocationById({ locationId });
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      expect((result.payload as { id: string }).id).toBe(locationId);
      expect((result.payload as { name: string }).name).toBeDefined();
      expect((result.payload as { address: string }).address).toBeDefined();
    });
    it('should return error for invalid ID', async () => {
      const result = await locationsService.getLocationById({ locationId: '' });
      expect(result.code).toBe(400);
      expect(result.error).toBeDefined();
    });
  });

  describe('listLocations', () => {
    it('should return a list of locations', async () => {
      const result = await locationsService.listLocations();
      expect(result.code).toBe(200);
      expect(Array.isArray(result.payload)).toBe(true);
      expect((result.payload as Array<{ id: string }>).length).toBeGreaterThan(
        0
      );
      expect((result.payload as Array<{ id: string }>)[0]).toHaveProperty('id');
      expect((result.payload as Array<{ name: string }>)[0]).toHaveProperty(
        'name'
      );
      expect((result.payload as Array<{ address: string }>)[0]).toHaveProperty(
        'address'
      );
    });
  });

  describe('updateLocation', () => {
    it('should update a location with valid data', async () => {
      const locationId = 'location-123';
      const updateData = generateValidLocationUpdate();
      const result = await locationsService.updateLocation({
        locationId,
        locationUpdate: updateData,
      });
      expect(result.code).toBe(200);
      expect(result.payload).toBeDefined();
      expect((result.payload as { id: string }).id).toBe(locationId);
      expect((result.payload as { name: string }).name).toBe(updateData.name);
      expect((result.payload as { address: string }).address).toBe(
        updateData.address
      );
    });
    it('should return error for invalid update data', async () => {
      const locationId = 'location-123';
      const result = await locationsService.updateLocation({
        locationId,
        locationUpdate: {}, // invalid
      });
      expect(result.code).toBe(400);
      expect(result.error).toBeDefined();
    });
  });
});
