import { ServiceResponse } from '../types/common.js';

class Service {
  static rejectResponse(error: unknown, code = 500): ServiceResponse {
    return { error, code };
  }

  static successResponse(payload: unknown, code = 200): ServiceResponse {
    return { payload, code };
  }
}

export default Service;
