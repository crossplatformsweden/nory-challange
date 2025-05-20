import { Response } from 'express';
import { jest } from '@jest/globals';

/**
 * Creates a mock Express Response object with spies for status, json, and end.
 * @returns A mock Response object.
 */
export const createMockResponse = (): Response => {
  const res = {} as Response;
  res.status = jest.fn().mockReturnThis() as unknown as Response['status'];
  res.json = jest.fn() as unknown as Response['json'];
  res.end = jest.fn() as unknown as Response['end'];
  return res;
};
