/**
 * @typedef {object} APISuccessResponse
 * @property {boolean} success - Indicates the request was successful
 * @property {number} statusCode - The HTTP status code
 * @property {object} response - The actual data payload
 * @property {string} response.message - Success message (Always present)
 * @property {object} [response.data] - The data returned (Object or null)
 */
// class to standardize API Success responses
export class APISuccessResponse {
  constructor(statusCode, response = { message: 'Success', data: null }) {
    this.success = true;
    this.statusCode = statusCode;
    this.response = response;
  }
}

/**
 * @typedef {object} APIErrorResponse
 * @property {boolean} success - Indicates the request failed
 * @property {number} statusCode - The HTTP status code
 * @property {object} error - Error details object
 * @property {string} error.type - Error type/name
 * @property {string} error.message - Description of the error
 * @property {array<string>} [error.issues] - List of issues (if any)
 */
// class to standardize API Errors responses
export class APIErrorResponse extends Error {
  constructor(statusCode, error = { type, message, issues: null }, stack = null) {
    super('Something went wrong');
    this.success = false;
    this.statusCode = statusCode;
    this.error = error;
    // if stack is present, use it, else capture the stack trace
    if (stack) this.stack = stack;
    else Error.captureStackTrace(this, this.constructor);
  }
}
