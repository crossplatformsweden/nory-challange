import { ModifierOptionsController } from './ModifierOptionsController';
import { createMockRequest } from '../tests/utils/mockRequest';
import { createMockResponse } from '../tests/utils/mockResponse';

describe('ModifierOptionsController', () => {
  let controller: ModifierOptionsController;
  let mockService: any;
  let req: any;
  let res: any;

  beforeEach(() => {
    mockService = {
      listModifierOptions: jest.fn(),
      getModifierOptionById: jest.fn(),
      createModifierOption: jest.fn(),
      updateModifierOption: jest.fn(),
      deleteModifierOption: jest.fn(),
    };
    controller = new ModifierOptionsController(mockService);
    req = createMockRequest();
    res = createMockResponse();
  });

  it('calls service.listModifierOptions', async () => {
    await controller.listModifierOptions(req, res);
    expect(mockService.listModifierOptions).toHaveBeenCalled();
  });

  it('calls service.getModifierOptionById', async () => {
    await controller.getModifierOptionById(req, res);
    expect(mockService.getModifierOptionById).toHaveBeenCalled();
  });

  it('calls service.createModifierOption', async () => {
    await controller.createModifierOption(req, res);
    expect(mockService.createModifierOption).toHaveBeenCalled();
  });

  it('calls service.updateModifierOption', async () => {
    await controller.updateModifierOption(req, res);
    expect(mockService.updateModifierOption).toHaveBeenCalled();
  });

  it('calls service.deleteModifierOption', async () => {
    await controller.deleteModifierOption(req, res);
    expect(mockService.deleteModifierOption).toHaveBeenCalled();
  });
});
