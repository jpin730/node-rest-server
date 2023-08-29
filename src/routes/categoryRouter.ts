import { Router } from 'express';
import { check } from 'express-validator';

import { postCategory } from '../controllers/categoryController';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';

const categoryRouter = Router();

categoryRouter.post(
  '/',
  [validateJWT, check('name', 'Name is required').notEmpty(), validateFields],
  postCategory,
);

export { categoryRouter };
