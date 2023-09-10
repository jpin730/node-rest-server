'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.rolesRouter = void 0;
const express_1 = require('express');
const validateJWT_1 = require('../middlewares/validateJWT');
const validateRoles_1 = require('../middlewares/validateRoles');
const rolesControlller_1 = require('../controllers/rolesControlller');
const rolesRouter = (0, express_1.Router)();
exports.rolesRouter = rolesRouter;
rolesRouter.get(
  '/',
  [validateJWT_1.validateJWT, validateRoles_1.isAdmin],
  rolesControlller_1.getAllRoles,
);
//# sourceMappingURL=rolesRouter.js.map
