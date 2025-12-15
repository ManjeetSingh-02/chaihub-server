// import local modules
import { USER_ROLES } from '../../../utils/constants.js';
import { hasRequiredRole, isLoggedIn, validateSchema } from '../../../utils/route-protector.js';
import { createCohort, getAllCohorts } from './cohort.controllers.js';
import { createCohortSchema } from './cohort.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route POST /
router.post(
  '/',
  isLoggedIn,
  hasRequiredRole([USER_ROLES.SYSTEM_ADMIN]),
  validateSchema(createCohortSchema),
  createCohort
);

// @route GET /
router.get('/', isLoggedIn, getAllCohorts);

// export router
export default router;
