import { Router } from 'express';
import { check } from 'express-validator';

import {
  getAllCategories,
  postCategory,
} from '../controllers/categoryController';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.post(
  '/',
  [validateJWT, check('name', 'Name is required').notEmpty(), validateFields],
  postCategory,
);

export { categoryRouter };
