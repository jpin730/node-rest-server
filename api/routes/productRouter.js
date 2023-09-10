'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.productRouter = void 0;
const express_1 = require('express');
const express_validator_1 = require('express-validator');
const productController_1 = require('../controllers/productController');
const validateJWT_1 = require('../middlewares/validateJWT');
const validateFields_1 = require('../middlewares/validateFields');
const validators_1 = require('../helpers/validators');
const productRouter = (0, express_1.Router)();
exports.productRouter = productRouter;
productRouter.get(
  '/',
  [validateJWT_1.validateJWT],
  productController_1.getAllProducts,
);
productRouter.get(
  '/:id',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.productExists),
    validateFields_1.validateFields,
  ],
  productController_1.getProduct,
);
productRouter.post(
  '/',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('name', 'Name is required').notEmpty(),
    (0, express_validator_1.check)(
      'category',
      'Category is invalid',
    ).isMongoId(),
    (0, express_validator_1.check)('category').custom(
      validators_1.categoryExists,
    ),
    validateFields_1.validateFields,
  ],
  productController_1.postProduct,
);
productRouter.put(
  '/:id',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.productExists),
    (0, express_validator_1.check)('name', 'Name is required').notEmpty(),
    (0, express_validator_1.check)(
      'category',
      'Category is invalid',
    ).isMongoId(),
    (0, express_validator_1.check)('category').custom(
      validators_1.categoryExists,
    ),
    validateFields_1.validateFields,
  ],
  productController_1.putProduct,
);
productRouter.delete(
  '/:id',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.productExists),
    validateFields_1.validateFields,
  ],
  productController_1.deleteProduct,
);
//# sourceMappingURL=productRouter.js.map
