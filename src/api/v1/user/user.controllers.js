// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIErrorResponse, APISuccessResponse } from '../../response.api.js';
import { User } from '../../../models/index.js';
import { USER_ROLES } from '../../../utils/constants.js';

// @controller GET /profile
export const getUser = asyncHandler(async (req, res) => {
  // fetch user from db
  const existingUser = await User.findById(req.user.id)
    .select('_id email username role currentGroup professionalProfiles')
    .populate('currentGroup', 'groupName')
    .populate({
      path: 'enrolledCohorts',
      select: '_id cohortName -allowedUserEmails',
    })
    .lean();
  if (!existingUser)
    throw new APIErrorResponse(404, {
      message: 'User not found',
    });

  // send success status to user
  return res.status(200).json(
    new APISuccessResponse(200, {
      message: 'Fetched profile successfully',
      data: existingUser,
    })
  );
});

// @controller PATCH /update-professional-profiles
export const updateUserProfessionalProfiles = asyncHandler(async (req, res) => {
  // if no newProfessionalProfiles are present in the body, throw error
  if (!req.body.newProfessionalProfiles)
    throw new APIErrorResponse(400, {
      message: 'Atleast one professional profile is required to update',
    });

  // update user professionalProfiles
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      professionalProfiles: req.body.newProfessionalProfiles,
    },
    { runValidators: true, new: true }
  );

  // check if user was updated
  if (!updatedUser)
    throw new APIErrorResponse(500, {
      message: 'Failed to update user professional profiles',
    });

  // send success status to user
  return res.status(200).json(
    new APISuccessResponse(200, {
      message: 'ProfessionalProfiles updated successfully',
    })
  );
});

// @controller PATCH /update-role
export const updateUserRole = asyncHandler(async (req, res) => {
  // check if user is trying to update his own role
  if (req.user.email === req.body.userEmail)
    throw new APIErrorResponse(400, {
      message: 'You cannot update your own role',
    });

  // fetch user from db
  const existingUser = await User.findOne({ email: req.body.userEmail });
  if (!existingUser)
    throw new APIErrorResponse(404, {
      message: 'User not found',
    });

  // check if newRole is system_admin
  if (req.body.newRole === USER_ROLES.SYSTEM_ADMIN)
    throw new APIErrorResponse(403, {
      message: 'Only one system admin is allowed in the system',
    });

  // check if user has already the role
  if (existingUser.role === req.body.newRole)
    throw new APIErrorResponse(400, {
      message: `User already has the role of ${req.body.newRole}`,
    });

  // update user role
  existingUser.role = req.body.newRole;

  // save updated user to db
  await existingUser.save();

  // send success status to user
  return res.status(200).json(
    new APISuccessResponse(200, {
      message: 'User role updated successfully',
    })
  );
});
