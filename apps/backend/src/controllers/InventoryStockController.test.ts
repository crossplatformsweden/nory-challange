import { InventoryStockController } from './InventoryStockController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';
import * as InventoryStockService from '../services/InventoryStockService';

describe('InventoryStockController', () => {
  let controller: InventoryStockController;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new InventoryStockController();
    req = createMockRequest();
    res = createMockResponse();
  });

  it('should call InventoryStockService and return data for listInventoryStock', async () => {
    const mockData = [{ id: '1', quantity: 10 }];
    jest
      .spyOn(InventoryStockService, 'listInventoryStock')
      .mockResolvedValue({ code: 200, payload: mockData });
    await controller.listInventoryStock(req, res);
    expect(InventoryStockService.listInventoryStock).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  // Add similar tests for other controller methods (getById, create, update, delete)
});
