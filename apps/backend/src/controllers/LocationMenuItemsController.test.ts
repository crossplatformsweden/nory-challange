import { LocationMenuItemsController } from './LocationMenuItemsController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('LocationMenuItemsController', () => {
  let controller: LocationMenuItemsController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      createLocationMenuItem: jest.fn(),
      deleteLocationMenuItem: jest.fn(),
      getLocationMenuItemById: jest.fn(),
      listLocationMenuItems: jest.fn(),
      updateLocationMenuItem: jest.fn(),
    };
    controller = new LocationMenuItemsController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.createLocationMenuItem', async () => {
    await controller.createLocationMenuItem(req, res);
    expect(mockService.createLocationMenuItem).toHaveBeenCalled();
  });

  it('calls service.deleteLocationMenuItem', async () => {
    await controller.deleteLocationMenuItem(req, res);
    expect(mockService.deleteLocationMenuItem).toHaveBeenCalled();
  });

  it('calls service.getLocationMenuItemById', async () => {
    await controller.getLocationMenuItemById(req, res);
    expect(mockService.getLocationMenuItemById).toHaveBeenCalled();
  });

  it('calls service.listLocationMenuItems', async () => {
    await controller.listLocationMenuItems(req, res);
    expect(mockService.listLocationMenuItems).toHaveBeenCalled();
  });

  it('calls service.updateLocationMenuItem', async () => {
    await controller.updateLocationMenuItem(req, res);
    expect(mockService.updateLocationMenuItem).toHaveBeenCalled();
  });
});
