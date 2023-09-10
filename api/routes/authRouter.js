'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.authRouter = void 0;
const express_1 = require('express');
const express_validator_1 = require('express-validator');
const authController_1 = require('../controllers/authController');
const validateFields_1 = require('../middlewares/validateFields');
const validateJWT_1 = require('../middlewares/validateJWT');
const authRouter = (0, express_1.Router)();
exports.authRouter = authRouter;
authRouter.get(
  '/check',
  validateJWT_1.validateJWT,
  authController_1.checkToken,
);
authRouter.post(
  '/login',
  [
    (0, express_validator_1.check)('email', 'Email is required').isEmail(),
    (0, express_validator_1.check)(
      'password',
      'Password is required',
    ).notEmpty(),
    validateFields_1.validateFields,
  ],
  authController_1.login,
);
authRouter.post(
  '/google',
  [
    (0, express_validator_1.check)(
      'id_token',
      'Google token is required',
    ).notEmpty(),
    validateFields_1.validateFields,
  ],
  authController_1.googleSignIn,
);
//# sourceMappingURL=authRouter.js.map
