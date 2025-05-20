import { LocationsController } from './LocationsController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('LocationsController', () => {
  let controller: LocationsController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      listLocations: jest.fn(),
      getLocationById: jest.fn(),
      createLocation: jest.fn(),
      updateLocation: jest.fn(),
      deleteLocation: jest.fn(),
    };
    controller = new LocationsController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.listLocations', async () => {
    await controller.listLocations(req, res);
    expect(mockService.listLocations).toHaveBeenCalled();
  });

  it('calls service.getLocationById', async () => {
    await controller.getLocationById(req, res);
    expect(mockService.getLocationById).toHaveBeenCalled();
  });

  it('calls service.createLocation', async () => {
    await controller.createLocation(req, res);
    expect(mockService.createLocation).toHaveBeenCalled();
  });

  it('calls service.updateLocation', async () => {
    await controller.updateLocation(req, res);
    expect(mockService.updateLocation).toHaveBeenCalled();
  });

  it('calls service.deleteLocation', async () => {
    await controller.deleteLocation(req, res);
    expect(mockService.deleteLocation).toHaveBeenCalled();
  });
});
