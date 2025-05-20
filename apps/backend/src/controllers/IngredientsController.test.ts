import { IngredientsController } from './IngredientsController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('IngredientsController', () => {
  let controller: IngredientsController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      listIngredients: jest.fn(),
      getIngredientById: jest.fn(),
      createIngredient: jest.fn(),
      updateIngredient: jest.fn(),
      deleteIngredient: jest.fn(),
    };
    controller = new IngredientsController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.listIngredients', async () => {
    await controller.listIngredients(req, res);
    expect(mockService.listIngredients).toHaveBeenCalled();
  });

  it('calls service.getIngredientById', async () => {
    await controller.getIngredientById(req, res);
    expect(mockService.getIngredientById).toHaveBeenCalled();
  });

  it('calls service.createIngredient', async () => {
    await controller.createIngredient(req, res);
    expect(mockService.createIngredient).toHaveBeenCalled();
  });

  it('calls service.updateIngredient', async () => {
    await controller.updateIngredient(req, res);
    expect(mockService.updateIngredient).toHaveBeenCalled();
  });

  it('calls service.deleteIngredient', async () => {
    await controller.deleteIngredient(req, res);
    expect(mockService.deleteIngredient).toHaveBeenCalled();
  });
});
