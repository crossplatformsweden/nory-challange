import { jest, describe, it, expect, beforeEach } from '@jest/globals';
import * as locationsService from './LocationsService';
import Service from './Service';
import { listLocationsResponse } from '@repo/zod-clients';
import { generateValidLocationCreate } from '../tests/utils/testData';

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

  // TODO: Add tests for deleteLocation, getLocationById, listLocations, updateLocation
});
