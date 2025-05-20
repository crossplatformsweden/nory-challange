import { LocationIngredientCostsController } from './LocationIngredientCostsController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('LocationIngredientCostsController', () => {
  let controller: LocationIngredientCostsController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      createLocationIngredientCost: jest.fn(),
      deleteLocationIngredientCost: jest.fn(),
      getLocationIngredientCostById: jest.fn(),
      listLocationIngredientCosts: jest.fn(),
      updateLocationIngredientCost: jest.fn(),
    };
    controller = new LocationIngredientCostsController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.createLocationIngredientCost', async () => {
    await controller.createLocationIngredientCost(req, res);
    expect(mockService.createLocationIngredientCost).toHaveBeenCalled();
  });

  it('calls service.deleteLocationIngredientCost', async () => {
    await controller.deleteLocationIngredientCost(req, res);
    expect(mockService.deleteLocationIngredientCost).toHaveBeenCalled();
  });

  it('calls service.getLocationIngredientCostById', async () => {
    await controller.getLocationIngredientCostById(req, res);
    expect(mockService.getLocationIngredientCostById).toHaveBeenCalled();
  });

  it('calls service.listLocationIngredientCosts', async () => {
    await controller.listLocationIngredientCosts(req, res);
    expect(mockService.listLocationIngredientCosts).toHaveBeenCalled();
  });

  it('calls service.updateLocationIngredientCost', async () => {
    await controller.updateLocationIngredientCost(req, res);
    expect(mockService.updateLocationIngredientCost).toHaveBeenCalled();
  });
});
