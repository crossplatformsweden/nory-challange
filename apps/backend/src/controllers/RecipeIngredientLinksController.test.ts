import { RecipeIngredientLinksController } from './RecipeIngredientLinksController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';
import * as RecipeIngredientLinksService from '../services/RecipeIngredientLinksService';

describe('RecipeIngredientLinksController', () => {
  let controller: RecipeIngredientLinksController;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new RecipeIngredientLinksController();
    req = createMockRequest();
    res = createMockResponse();
  });

  it('should call RecipeIngredientLinksService and return data for listRecipeIngredientLinks', async () => {
    const mockData = [{ id: '1', ingredientId: '2' }];
    jest
      .spyOn(RecipeIngredientLinksService, 'listRecipeIngredientLinks')
      .mockResolvedValue({ code: 200, payload: mockData });
    await controller.listRecipeIngredientLinks(req, res);
    expect(
      RecipeIngredientLinksService.listRecipeIngredientLinks
    ).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  // Add similar tests for other controller methods (getById, create, update, delete)
});
