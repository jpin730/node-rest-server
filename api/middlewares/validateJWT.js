'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateJWT = void 0;
const jsonwebtoken_1 = require('jsonwebtoken');
const user_1 = require('../models/user');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const validateJWT = (req, res, next) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const token = req.header('x-token');
    if (!token) {
      return res
        .status(401)
        .json(
          (0, createErrorResponse_1.createErrorResponse)('Token is required'),
        );
    }
    try {
      const secret = process.env.JWT_SECRET;
      const { uid } = (0, jsonwebtoken_1.verify)(token, secret);
      const user = yield user_1.User.findById(uid);
      if (!user || !user.status) {
        return res
          .status(401)
          .json(
            (0, createErrorResponse_1.createErrorResponse)('Token is invalid'),
          );
      }
      req.body = Object.assign(Object.assign({}, req.body), { user });
      next();
    } catch (_a) {
      res
        .status(401)
        .json(
          (0, createErrorResponse_1.createErrorResponse)('Token is invalid'),
        );
    }
  });
exports.validateJWT = validateJWT;
//# sourceMappingURL=validateJWT.js.map
