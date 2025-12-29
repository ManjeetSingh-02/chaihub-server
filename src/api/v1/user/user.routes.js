// import local modules
import { USER_ROLES } from '../../../utils/constants.js';
import {
  hasRequiredRole,
  isLoggedIn,
  validateSchema,
} from '../../../utils/route-protectors/index.js';
import { getUser, updateUserProfessionalProfiles, updateUserRole } from './user.controllers.js';
import { updateUserProfessionalProfilesSchema, updateUserRoleSchema } from './user.zodschemas.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router();

// @route GET /profile
router.get('/profile', isLoggedIn, getUser);

// @route PATCH /update-professional-profiles
router.patch(
  '/update-professional-profiles',
  isLoggedIn,
  validateSchema(updateUserProfessionalProfilesSchema),
  updateUserProfessionalProfiles
);

// @route PATCH /update-role
router.patch(
  '/update-role',
  isLoggedIn,
  hasRequiredRole([USER_ROLES.SYSTEM_ADMIN]),
  validateSchema(updateUserRoleSchema),
  updateUserRole
);

// export router
export default router;
