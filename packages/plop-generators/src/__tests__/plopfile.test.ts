import { NodePlopAPI } from 'plop';

describe('plopfile', () => {
  it('should export a function', () => {
    const plopfile = require('../plopfile');
    expect(typeof plopfile).toBe('function');
  });

  it('should set up the next-page generator', () => {
    const mockPlop = {
      setGenerator: jest.fn(),
    } as unknown as NodePlopAPI;

    const plopfile = require('../plopfile');
    plopfile(mockPlop);

    expect(mockPlop.setGenerator).toHaveBeenCalledWith('next-page', expect.any(Object));
  });
}); 