import { Request, Response } from 'express';
import Controller from './Controller';
import * as staffService from '../services/StaffService';
import { OpenAPIRequest } from '../types/common.js';

export class StaffController extends Controller {
  constructor(service?: unknown) {
    super(service || staffService);
  }

  async createStaffAtLocation(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/StaffService'))
        .createStaffAtLocation
    );
  }

  async deleteStaffAtLocation(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/StaffService'))
        .deleteStaffAtLocation
    );
  }

  async getStaffByLocationAndId(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/StaffService'))
        .getStaffByLocationAndId
    );
  }

  async listStaffByLocation(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/StaffService'))
        .listStaffByLocation
    );
  }

  async updateStaffAtLocation(
    request: Request,
    response: Response
  ): Promise<void> {
    await this.handleRequest(
      request as OpenAPIRequest,
      response,
      (this.service as typeof import('../services/StaffService'))
        .updateStaffAtLocation
    );
  }
}
