import { Router } from 'express';
import { check } from 'express-validator';

import {
  getAllCategories,
  getCategory,
  postCategory,
} from '../controllers/categoryController';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';
import { categoryExists } from '../helpers/validators';

const categoryRouter = Router();

categoryRouter.get('/', getAllCategories);
categoryRouter.get(
  '/:id',
  [
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(categoryExists),
    validateFields,
  ],
  getCategory,
);
categoryRouter.post(
  '/',
  [validateJWT, check('name', 'Name is required').notEmpty(), validateFields],
  postCategory,
);

export { categoryRouter };
