import fs from 'fs';
import path from 'path';
import camelCase from 'camelcase';
import { Response } from 'express';
import config from '../config';
import {
  OpenAPIRequest,
  ServiceFunction,
  ServiceResponse,
} from '../types/common.js';

class Controller {
  protected service: unknown;

  constructor(service?: unknown) {
    this.service = service;
  }

  protected sendResponse(
    response: Response,
    payload: ServiceResponse | unknown
  ): void {
    /**
     * The default response-code is 200. We want to allow to change that. in That case,
     * payload will be an object consisting of a code and a payload. If not customized
     * send 200 and the payload as received in this method.
     */
    const responsePayload =
      (payload as ServiceResponse).payload !== undefined
        ? (payload as ServiceResponse).payload
        : payload;

    response.status((payload as ServiceResponse).code || 200);

    if (responsePayload instanceof Object) {
      response.json(responsePayload);
    } else {
      response.end(responsePayload as string);
    }
  }

  protected sendError(
    response: Response,
    error: ServiceResponse | Error | unknown
  ): void {
    if (error instanceof Error) {
      response.status(500);
      response.end(error.message);
    } else if (
      typeof error === 'object' &&
      error !== null &&
      'code' in error &&
      'error' in error
    ) {
      response.status((error as ServiceResponse).code || 500);
      if ((error as ServiceResponse).error instanceof Object) {
        response.json((error as ServiceResponse).error);
      } else {
        response.end(((error as ServiceResponse).error as string) || '');
      }
    } else {
      response.status(500);
      response.end('Unknown error');
    }
  }

  /**
   * Files have been uploaded to the directory defined by config.ts as upload directory
   * Files have a temporary name, that was saved as 'filename' of the file object that is
   * referenced in request.files array.
   * This method finds the file and changes it to the file name that was originally called
   * when it was uploaded. To prevent files from being overwritten, a timestamp is added between
   * the filename and its extension
   * @param request
   * @param fieldName
   * @returns {string}
   */
  protected collectFile(request: OpenAPIRequest, fieldName: string): string {
    let uploadedFileName = '';
    if (request.files && request.files.length > 0) {
      const fileObject = request.files.find(
        (file) => file.fieldname === fieldName
      );
      if (fileObject) {
        const fileArray = fileObject.originalname.split('.');
        const extension = fileArray.pop();
        fileArray.push(`_${Date.now()}`);
        uploadedFileName = `${fileArray.join('')}.${extension}`;
        fs.renameSync(
          path.join(config.FILE_UPLOAD_PATH, fileObject.filename),
          path.join(config.FILE_UPLOAD_PATH, uploadedFileName)
        );
      }
    }
    return uploadedFileName;
  }

  protected getRequestBodyName(request: OpenAPIRequest): string {
    const codeGenDefinedBodyName =
      request.openapi.schema['x-codegen-request-body-name'];
    if (codeGenDefinedBodyName !== undefined) {
      return codeGenDefinedBodyName;
    }
    const refObjectPath =
      request.openapi.schema.requestBody?.content['application/json']?.schema
        .$ref;
    if (refObjectPath !== undefined && refObjectPath.length > 0) {
      return refObjectPath.substr(refObjectPath.lastIndexOf('/') + 1);
    }
    return 'body';
  }

  protected collectRequestParams(
    request: OpenAPIRequest
  ): Record<string, unknown> {
    const requestParams: Record<string, unknown> = {};
    if (
      request.openapi.schema.requestBody !== null &&
      request.openapi.schema.requestBody !== undefined
    ) {
      const { content } = request.openapi.schema.requestBody;
      if (content['application/json'] !== undefined) {
        const requestBodyName = camelCase(this.getRequestBodyName(request));
        requestParams[requestBodyName] = request.body;
      } else if (content['multipart/form-data'] !== undefined) {
        // Add null check for schema and properties
        const properties = content['multipart/form-data']?.schema?.properties;
        if (properties) {
          Object.keys(properties).forEach((property) => {
            const propertyObject = properties[property];
            if (
              propertyObject &&
              propertyObject.format !== undefined &&
              propertyObject.format === 'binary'
            ) {
              requestParams[property] = this.collectFile(request, property);
            } else {
              requestParams[property] = request.body[property];
            }
          });
        }
      }
    }

    if (request.openapi.schema.parameters !== undefined) {
      request.openapi.schema.parameters.forEach((param) => {
        if (param.in === 'path') {
          requestParams[param.name] = request.openapi.pathParams[param.name];
        } else if (param.in === 'query') {
          requestParams[param.name] = request.query[param.name];
        } else if (param.in === 'header') {
          requestParams[param.name] = request.headers[param.name];
        }
      });
    }
    return requestParams;
  }

  protected async handleRequest(
    request: OpenAPIRequest,
    response: Response,
    serviceOperation: ServiceFunction
  ): Promise<void> {
    try {
      const serviceResponse = await serviceOperation(
        this.collectRequestParams(request)
      );
      this.sendResponse(response, serviceResponse);
    } catch (error) {
      this.sendError(response, error);
    }
  }
}

export default Controller;
