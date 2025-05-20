import { RecipesController } from './RecipesController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('RecipesController', () => {
  let controller: RecipesController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      listRecipes: jest.fn(),
      getRecipeById: jest.fn(),
      createRecipe: jest.fn(),
      updateRecipe: jest.fn(),
      deleteRecipe: jest.fn(),
    };
    controller = new RecipesController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.listRecipes', async () => {
    await controller.listRecipes(req, res);
    expect(mockService.listRecipes).toHaveBeenCalled();
  });

  it('calls service.getRecipeById', async () => {
    await controller.getRecipeById(req, res);
    expect(mockService.getRecipeById).toHaveBeenCalled();
  });

  it('calls service.createRecipe', async () => {
    await controller.createRecipe(req, res);
    expect(mockService.createRecipe).toHaveBeenCalled();
  });

  it('calls service.updateRecipe', async () => {
    await controller.updateRecipe(req, res);
    expect(mockService.updateRecipe).toHaveBeenCalled();
  });

  it('calls service.deleteRecipe', async () => {
    await controller.deleteRecipe(req, res);
    expect(mockService.deleteRecipe).toHaveBeenCalled();
  });
});
