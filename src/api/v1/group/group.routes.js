// import local modules
import { createGroup, getCohortDetailsandGroups, getGroupDetails } from './group.controllers.js';
import { isUserAlreadyInAGroup, isUserAllowedInGroup } from '../../../utils/route-protector.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router({ mergeParams: true });

// @route GET /
router.get('/', getCohortDetailsandGroups);

// @route POST /
router.post('/', isUserAlreadyInAGroup, createGroup);

// @route GET /:groupName
router.get('/:groupName', isUserAllowedInGroup, getGroupDetails);

// export router
export default router;
