import { Router } from 'express';

import { validateJWT } from '../middlewares/validateJWT';
import { isAdmin } from '../middlewares/validateRoles';
import { getAllRoles } from '../controllers/rolesControlller';

const rolesRouter = Router();

rolesRouter.get('/', [validateJWT, isAdmin], getAllRoles);

export { rolesRouter };
