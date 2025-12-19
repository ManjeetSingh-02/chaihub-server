// import local modules
import { asyncHandler } from '../../../utils/async-handler.js';
import { APIResponse } from '../../response.api.js';
import { APIError } from '../../error.api.js';
import { User } from '../../../models/index.js';

// @controller GET /
export const getAllUsers = asyncHandler(async (_, res) => {
  // fetch all users from the database
  const existingUsers = await User.find({})
    .select('_id googleID email username role currentGroup enrolledCohorts')
    .populate('currentGroup', 'groupName')
    .populate('enrolledCohorts', 'cohortName');

  // send success status to user
  return res.status(200).json(
    new APIResponse(200, {
      message: 'Fetched all users successfully',
      data: existingUsers,
    })
  );
});

// @controller GET /profile
export const getUser = asyncHandler(async (req, res) => {
  // fetch user from db
  const existingUser = await User.findById(req.user.id)
    .select('_id googleID email username role currentGroup enrolledCohorts')
    .populate('currentGroup', 'groupName')
    .populate('enrolledCohorts', 'cohortName');
  if (!existingUser)
    throw new APIError(404, {
      message: 'User not found',
    });

  // send success status to user
  return res.status(200).json(
    new APIResponse(200, {
      message: 'Fetched profile successfully',
      data: existingUser,
    })
  );
});
