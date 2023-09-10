'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.usersRouter = void 0;
const express_validator_1 = require('express-validator');
const express_1 = require('express');
const usersController_1 = require('../controllers/usersController');
const validateFields_1 = require('../middlewares/validateFields');
const validators_1 = require('../helpers/validators');
const validateJWT_1 = require('../middlewares/validateJWT');
const validateRoles_1 = require('../middlewares/validateRoles');
const constants_1 = require('../utils/constants');
const usersRouter = (0, express_1.Router)();
exports.usersRouter = usersRouter;
usersRouter.get(
  '/',
  [
    validateJWT_1.validateJWT,
    (0, validateRoles_1.hasRole)(constants_1.RolesEnum.ADMIN),
  ],
  usersController_1.getUsers,
);
usersRouter.post(
  '/',
  [
    (0, express_validator_1.check)(
      'username',
      'Username is required',
    ).notEmpty(),
    (0, express_validator_1.check)(
      'password',
      'Password must have 6 or more characters',
    ).isLength({
      min: 6,
    }),
    (0, express_validator_1.check)(
      'email',
      'Email format is invalid',
    ).isEmail(),
    (0, express_validator_1.check)('email').custom(
      validators_1.emailDoesNotExists,
    ),
    validateFields_1.validateFields,
  ],
  usersController_1.postUser,
);
usersRouter.put(
  '/:id',
  [
    validateJWT_1.validateJWT,
    validateRoles_1.isAdmin,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.userExist),
    (0, express_validator_1.check)('role').custom(validators_1.isValidRole),
    validateFields_1.validateFields,
  ],
  usersController_1.putUser,
);
usersRouter.delete(
  '/:id',
  [
    validateJWT_1.validateJWT,
    validateRoles_1.isAdmin,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.userExist),
    validateFields_1.validateFields,
  ],
  usersController_1.deleteUser,
);
//# sourceMappingURL=usersRouter.js.map
