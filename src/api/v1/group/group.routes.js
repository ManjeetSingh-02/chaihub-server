// import local modules
import { createGroup, getCohortDetailsandGroups } from './group.controllers.js';
import { isUserAlreadyInAGroup } from '../../../utils/route-protector.js';

// import external modules
import { Router } from 'express';

// create a new router
const router = Router({ mergeParams: true });

// @route GET /
router.get('/', getCohortDetailsandGroups);

// @route POST /
router.post('/', isUserAlreadyInAGroup, createGroup);

// export router
export default router;
