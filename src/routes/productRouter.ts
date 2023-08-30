import { Router } from 'express';
import { check } from 'express-validator';

import {
  deleteProduct,
  getAllProducts,
  getProduct,
  postProduct,
  putProduct,
} from '../controllers/productController';
import { validateJWT } from '../middlewares/validateJWT';
import { validateFields } from '../middlewares/validateFields';
import { categoryExists, productExists } from '../helpers/validators';
import { isAdmin } from '../middlewares/validateRoles';

const productRouter = Router();

productRouter.get('/', getAllProducts);
productRouter.get(
  '/:id',
  [
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(productExists),
    validateFields,
  ],
  getProduct,
);
productRouter.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').notEmpty(),
    check('category', 'Category is invalid').isMongoId(),
    check('category').custom(categoryExists),
    validateFields,
  ],
  postProduct,
);
productRouter.put(
  '/:id',
  [
    validateJWT,
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(productExists),
    check('name', 'Name is required').notEmpty(),
    check('category', 'Category is invalid').isMongoId(),
    check('category').custom(categoryExists),
    validateFields,
  ],
  putProduct,
);
productRouter.delete(
  '/:id',
  [
    validateJWT,
    isAdmin,
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(productExists),
    validateFields,
  ],
  deleteProduct,
);

export { productRouter };
