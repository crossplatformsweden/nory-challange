import { ModifiersController } from './ModifiersController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('ModifiersController', () => {
  let controller: ModifiersController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      listModifiers: jest.fn(),
      getModifierById: jest.fn(),
      createModifier: jest.fn(),
      updateModifier: jest.fn(),
      deleteModifier: jest.fn(),
    };
    controller = new ModifiersController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.listModifiers', async () => {
    await controller.listModifiers(req, res);
    expect(mockService.listModifiers).toHaveBeenCalled();
  });

  it('calls service.getModifierById', async () => {
    await controller.getModifierById(req, res);
    expect(mockService.getModifierById).toHaveBeenCalled();
  });

  it('calls service.createModifier', async () => {
    await controller.createModifier(req, res);
    expect(mockService.createModifier).toHaveBeenCalled();
  });

  it('calls service.updateModifier', async () => {
    await controller.updateModifier(req, res);
    expect(mockService.updateModifier).toHaveBeenCalled();
  });

  it('calls service.deleteModifier', async () => {
    await controller.deleteModifier(req, res);
    expect(mockService.deleteModifier).toHaveBeenCalled();
  });
});
