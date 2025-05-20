import { Request, Response, NextFunction } from 'express';

export interface ServiceResponse {
  payload?: unknown;
  error?: unknown;
  code: number;
}

export interface ServiceFunction {
  // Allow both Record<string, unknown> and specific types through generic parameter
  (params: Record<string, unknown>): Promise<ServiceResponse>;
}

export interface ControllerFunction {
  (request: Request, response: Response, next?: NextFunction): Promise<void>;
}

// Custom file interface to match what OpenAPI validator provides
export interface OpenAPIFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

// Custom request interface for OpenAPI using Omit to avoid the file type conflicts
export interface OpenAPIRequest extends Omit<Request, 'files'> {
  openapi: {
    schema: {
      'x-openapi-router-controller'?: string;
      'x-openapi-router-service'?: string;
      'x-codegen-request-body-name'?: string;
      operationId?: string;
      parameters?: Array<{
        name: string;
        in: 'path' | 'query' | 'header' | 'cookie';
      }>;
      requestBody?: {
        content: {
          'application/json'?: {
            schema: {
              $ref?: string;
            };
          };
          'multipart/form-data'?: {
            schema: {
              properties: Record<
                string,
                {
                  format?: string;
                }
              >;
            };
          };
        };
      };
    };
    pathParams: Record<string, string>;
  };
  files?: OpenAPIFile[];
}

export interface ServiceError extends Error {
  status?: number;
}
