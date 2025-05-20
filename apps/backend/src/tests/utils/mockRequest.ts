// Removed unused import 'Request'
import { OpenAPIRequest } from '../../types/common'; // Adjust path if needed

/**
 * Creates a mock Express Request object with necessary properties for controller testing.
 * Includes a basic `openapi` structure populated based on provided parameters.
 *
 * @param options - Options to customize the mock request.
 * @param options.body - The request body.
 * @param options.query - The request query parameters.
 * @param options.params - The request path parameters (colon-prefixed in route definition).
 * @param options.pathParams - The actual parsed path parameters (used by express-openapi-validator).
 * @param options.openapiSchema - The relevant part of the openapi schema for this route (optional, but good for realism).
 * @param options.operationId - The operationId for the route.
 * @param options.serviceName - The x-openapi-router-service name.
 * @param options.controllerName - The x-openapi-router-controller name.
 * @returns A mock Request object cast to OpenAPIRequest.
 */
export const createMockRequest = ({
  body = {},
  query = {},
  params = {},
  pathParams = {},
  openapiSchema = {},
  operationId = 'mockOperation',
  serviceName = 'MockService',
  controllerName = 'MockController',
}: {
  body?: unknown;
  query?: unknown;
  params?: unknown;
  pathParams?: unknown;
  openapiSchema?: Record<string, unknown>;
  operationId?: string;
  serviceName?: string;
  controllerName?: string;
} = {}): OpenAPIRequest => {
  // Ensure openapiSchema is always an object for spreading
  const safeOpenapiSchema =
    openapiSchema && typeof openapiSchema === 'object' ? openapiSchema : {};
  const req = {
    body,
    query,
    params,
    headers: {},
    openapi: {
      schema: {
        operationId,
        'x-openapi-router-service': serviceName,
        'x-openapi-router-controller': controllerName,
        ...safeOpenapiSchema,
        requestBody: (safeOpenapiSchema as unknown as { requestBody?: unknown })
          .requestBody || {
          content: { 'application/json': { schema: { $ref: '' } } },
        },
      },
      pathParams,
    },
    files: undefined,
  } as unknown as OpenAPIRequest;
  return req;
};
