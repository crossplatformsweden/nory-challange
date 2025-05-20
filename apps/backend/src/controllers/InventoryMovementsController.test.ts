import { InventoryMovementsController } from './InventoryMovementsController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';
import * as InventoryMovementsService from '../services/InventoryMovementsService';

describe('InventoryMovementsController', () => {
  let controller: InventoryMovementsController;
  let req: any;
  let res: any;

  beforeEach(() => {
    controller = new InventoryMovementsController();
    req = createMockRequest();
    res = createMockResponse();
  });

  it('should call InventoryMovementsService and return data for listInventoryMovements', async () => {
    const mockData = [{ id: '1', type: 'add' }];
    jest
      .spyOn(InventoryMovementsService, 'listInventoryMovements')
      .mockResolvedValue({ code: 200, payload: mockData });
    await controller.listInventoryMovements(req, res);
    expect(InventoryMovementsService.listInventoryMovements).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(mockData);
  });

  // Add similar tests for other controller methods (getById, create, update, delete)
});
