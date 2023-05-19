import { type ApiErrorScheme } from './type';

class ApiException<ErrorCode = number> extends Error {
  declare code: ErrorCode;

  constructor(data: ApiErrorScheme, code: ErrorCode) {
    super(data['response-message']);
    this.name = 'ApiException';
    this.code = code;
  }
}

export default ApiException;
