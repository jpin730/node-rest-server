'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.categoryRouter = void 0;
const express_1 = require('express');
const express_validator_1 = require('express-validator');
const categoryController_1 = require('../controllers/categoryController');
const validateFields_1 = require('../middlewares/validateFields');
const validateJWT_1 = require('../middlewares/validateJWT');
const validators_1 = require('../helpers/validators');
const categoryRouter = (0, express_1.Router)();
exports.categoryRouter = categoryRouter;
categoryRouter.get(
  '/',
  [validateJWT_1.validateJWT],
  categoryController_1.getAllCategories,
);
categoryRouter.get(
  '/:id',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.categoryExists),
    validateFields_1.validateFields,
  ],
  categoryController_1.getCategory,
);
categoryRouter.post(
  '/',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('name', 'Name is required').notEmpty(),
    validateFields_1.validateFields,
  ],
  categoryController_1.postCategory,
);
categoryRouter.put(
  '/:id',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('name', 'Name is required').notEmpty(),
    (0, express_validator_1.check)('id').custom(validators_1.categoryExists),
    validateFields_1.validateFields,
  ],
  categoryController_1.putCategory,
);
categoryRouter.delete(
  '/:id',
  [
    validateJWT_1.validateJWT,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.categoryExists),
    validateFields_1.validateFields,
  ],
  categoryController_1.deleteCategory,
);
//# sourceMappingURL=categoryRouter.js.map
