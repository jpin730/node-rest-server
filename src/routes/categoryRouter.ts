import { Router } from 'express';
import { check } from 'express-validator';

import {
  deleteCategory,
  getAllCategories,
  getCategory,
  postCategory,
  putCategory,
} from '../controllers/categoryController';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';
import { categoryExists } from '../helpers/validators';
import { isAdmin } from '../middlewares/validateRoles';

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
categoryRouter.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Id is invalid').isMongoId(),
    check('name', 'Name is required').notEmpty(),
    check('id').custom(categoryExists),
    validateFields,
  ],
  putCategory,
);
categoryRouter.delete(
  '/:id',
  [
    validateJWT,
    isAdmin,
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(categoryExists),
    validateFields,
  ],
  deleteCategory,
);

export { categoryRouter };
