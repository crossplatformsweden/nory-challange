import { Request, Response, NextFunction } from 'express';
import logger from '../logger.js';
import { OpenAPIRequest } from '../types/common.js';

interface BaseService {
  [key: string]: unknown;
}

interface Controllers {
  [key: string]: new (service?: BaseService) => unknown;
}

interface Services {
  [key: string]: BaseService;
}

interface ErrorResponse {
  code: number;
  error: string;
}

function handleError(
  err: Error | string | ErrorResponse,
  request: Request,
  response: Response,
  next: NextFunction
): void {
  logger.error(err);
  const errorResponse: ErrorResponse = {
    code: typeof err === 'object' && 'code' in err ? err.code : 400,
    error:
      typeof err === 'string'
        ? err
        : typeof err === 'object' &&
            'error' in err &&
            typeof err.error === 'string'
          ? err.error
          : err instanceof Error && err.message
            ? err.message
            : 'Unknown error',
  };
  response.status(errorResponse.code);
  response.json(errorResponse);
  next();
}

/**
 * The purpose of this route is to collect the request variables as defined in the
 * OpenAPI document and pass them to the handling controller as another Express
 * middleware. All parameters are collected in the request.swagger.values key-value object
 *
 * The assumption is that security handlers have already verified and allowed access
 * to this path. If the business-logic of a particular path is dependent on authentication
 * parameters (e.g. scope checking) - it is recommended to define the authentication header
 * as one of the parameters expected in the OpenAPI/Swagger document.
 *
 *  Requests made to paths that are not in the OpenAPI scope
 *  are passed on to the next middleware handler.
 * @returns {Function}
 */
function openApiRouter(controllers: Controllers, services: Services) {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      /**
       * This middleware runs after a previous process have applied an openapi object
       * to the request.
       * If none was applied This is because the path requested is not in the schema.
       * If there's no openapi object, we have nothing to do, and pass on to next middleware.
       */
      const openApiRequest = request as OpenAPIRequest;
      if (
        openApiRequest.openapi === undefined ||
        openApiRequest.openapi.schema === undefined
      ) {
        next();
        return;
      }
      // request.swagger.paramValues = {};
      // request.swagger.params.forEach((param) => {
      //   request.swagger.paramValues[param.name] = getValueFromRequest(request, param);
      // });
      const controllerName =
        openApiRequest.openapi.schema['x-openapi-router-controller'];
      const serviceName =
        openApiRequest.openapi.schema['x-openapi-router-service'];
      if (
        !controllerName ||
        !controllers[controllerName] ||
        controllers[controllerName] === undefined
      ) {
        handleError(
          `request sent to controller '${controllerName}' which has not been defined`,
          request,
          response,
          next
        );
      } else {
        const apiController = new controllers[controllerName](
          services[serviceName || '']
        );
        const controllerOperation = openApiRequest.openapi.schema.operationId;
        if (!controllerOperation) {
          handleError(
            `No operationId found in schema for route`,
            request,
            response,
            next
          );
          return;
        }
        // Use type assertion to Record<string, unknown> for property access
        const handler = (apiController as Record<string, unknown>)[
          controllerOperation
        ];
        if (typeof handler === 'function') {
          await (
            handler as (
              req: Request,
              res: Response,
              next: NextFunction
            ) => Promise<void>
          )(request, response, next);
        } else {
          handleError(
            `Controller method '${controllerOperation}' not found on controller '${controllerName}'`,
            request,
            response,
            next
          );
        }
      }
    } catch (error) {
      logger.error(error);
      const err: ErrorResponse = {
        code: 500,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
      handleError(err, request, response, next);
    }
  };
}

export default openApiRouter;
