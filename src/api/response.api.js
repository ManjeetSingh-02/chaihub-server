// class to standardize API responses
export class APIResponse {
  constructor(statusCode, response = { message: 'Success', data: null }) {
    this.success = true;
    this.statusCode = statusCode;
    this.response = response;
  }
}
