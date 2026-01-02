// import local modules
import { APISuccessResponse } from '../../response.api.js';

/**
 * GET /healthcheck
 * @security
 * @summary Health Check Controller
 * @tags HealthCheck - Health Check Routes
 * @description Controller to check the health status of the server.
 * @return {APISuccessResponse} 200 - Successful response
 * @example response - 200 - Successful response example
 * {
 *  "success": true,
 *  "statusCode": 200,
 *  "response": {
 *    "message": "Server is Running"
 *  }
 * }
 */
export const healthCheck = (_, res) => {
  return res.status(200).json(new APISuccessResponse(200, { message: 'Server is Running' }));
};
