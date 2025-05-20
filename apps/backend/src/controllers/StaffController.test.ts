import { StaffController } from './StaffController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('StaffController', () => {
  let controller: StaffController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      listStaffByLocation: jest.fn(),
      getStaffByLocationAndId: jest.fn(),
      createStaffAtLocation: jest.fn(),
      updateStaffAtLocation: jest.fn(),
      deleteStaffAtLocation: jest.fn(),
    };
    controller = new StaffController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.listStaffByLocation', async () => {
    await controller.listStaffByLocation(req, res);
    expect(mockService.listStaffByLocation).toHaveBeenCalled();
  });

  it('calls service.getStaffByLocationAndId', async () => {
    await controller.getStaffByLocationAndId(req, res);
    expect(mockService.getStaffByLocationAndId).toHaveBeenCalled();
  });

  it('calls service.createStaffAtLocation', async () => {
    await controller.createStaffAtLocation(req, res);
    expect(mockService.createStaffAtLocation).toHaveBeenCalled();
  });

  it('calls service.updateStaffAtLocation', async () => {
    await controller.updateStaffAtLocation(req, res);
    expect(mockService.updateStaffAtLocation).toHaveBeenCalled();
  });

  it('calls service.deleteStaffAtLocation', async () => {
    await controller.deleteStaffAtLocation(req, res);
    expect(mockService.deleteStaffAtLocation).toHaveBeenCalled();
  });
});
