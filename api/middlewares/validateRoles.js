'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.hasRole = exports.isAdmin = void 0;
const constants_1 = require('../utils/constants');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const isAdmin = (req, res, next) => {
  const { role } = req.body.user;
  return role === constants_1.RolesEnum.ADMIN
    ? next()
    : res
        .status(403)
        .json(
          (0, createErrorResponse_1.createErrorResponse)(
            'User has not admin role',
          ),
        );
};
exports.isAdmin = isAdmin;
const hasRole =
  (...roles) =>
  (req, res, next) => {
    const { role } = req.body.user;
    return roles.includes(role)
      ? next()
      : res
          .status(403)
          .json(
            (0, createErrorResponse_1.createErrorResponse)(
              'User has no privilegies',
            ),
          );
  };
exports.hasRole = hasRole;
//# sourceMappingURL=validateRoles.js.map
