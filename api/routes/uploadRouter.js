'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.uploadRouter = void 0;
const express_1 = require('express');
const uploadController_1 = require('../controllers/uploadController');
const express_validator_1 = require('express-validator');
const validateFields_1 = require('../middlewares/validateFields');
const validators_1 = require('../helpers/validators');
const validateFile_1 = require('../middlewares/validateFile');
const validateJWT_1 = require('../middlewares/validateJWT');
const uploadRouter = (0, express_1.Router)();
exports.uploadRouter = uploadRouter;
uploadRouter.put(
  '/avatar/:id',
  [
    validateJWT_1.validateJWT,
    validateFile_1.validateFile,
    (0, express_validator_1.check)('id', 'Id is invalid').isMongoId(),
    (0, express_validator_1.check)('id').custom(validators_1.userExist),
    validateFields_1.validateFields,
  ],
  uploadController_1.putAvatar,
);
//# sourceMappingURL=uploadRouter.js.map
