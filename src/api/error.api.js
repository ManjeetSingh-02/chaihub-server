// class to standardize API Errors
export class APIError extends Error {
  constructor(statusCode, response = { message: 'Failed', errors: null }, stack = null) {
    super(response.message);
    this.success = false;
    this.statusCode = statusCode;
    this.response = response;
    // if stack is present, use it, else capture the stack trace
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
