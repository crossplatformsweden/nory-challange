import { MenuItemsController } from './MenuItemsController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';
import * as MenuItemsService from '../services/LocationMenuItemsService';

describe('MenuItemsController', () => {
  let controller: MenuItemsController;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new MenuItemsController();
    req = createMockRequest();
    res = createMockResponse();
  });

  it('should call MenuItemsService and return data for listLocationMenuItems', async () => {
    const mockData = [{ id: '1', name: 'Pizza' }];
    jest
      .spyOn(MenuItemsService, 'listLocationMenuItems')
      .mockResolvedValue({ code: 200, payload: mockData });
    await controller.listMenuItems(req, res);
    expect(MenuItemsService.listLocationMenuItems).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  // Add similar tests for other controller methods (getById, create, update, delete)
});
