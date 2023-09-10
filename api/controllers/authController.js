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
exports.googleSignIn = exports.login = exports.checkToken = void 0;
const bcryptjs_1 = require('bcryptjs');
const user_1 = require('../models/user');
const generateJWT_1 = require('../helpers/generateJWT');
const googleVerify_1 = require('../helpers/googleVerify');
const constants_1 = require('../utils/constants');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const checkToken = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.body;
    try {
      const token = yield (0, generateJWT_1.generateJWT)(
        user.id,
        constants_1.TOKEN_EXP_TIME,
      );
      const refresh = yield (0, generateJWT_1.generateJWT)(
        user.id,
        constants_1.REFRESH_EXP_TIME,
      );
      res.status(201).json({ user, token, refresh });
    } catch (_a) {
      res
        .status(500)
        .json(
          (0, createErrorResponse_1.createErrorResponse)(
            'Could not complete login',
          ),
        );
    }
  });
exports.checkToken = checkToken;
const login = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
      const user = yield user_1.User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json(
            (0, createErrorResponse_1.createErrorResponse)(
              'Email or password are incorrect',
            ),
          );
      }
      if (!user.status) {
        return res
          .status(400)
          .json(
            (0, createErrorResponse_1.createErrorResponse)(
              'Email or password are incorrect',
            ),
          );
      }
      const validPassword = (0, bcryptjs_1.compareSync)(
        password,
        user.password,
      );
      if (!validPassword) {
        return res
          .status(400)
          .json(
            (0, createErrorResponse_1.createErrorResponse)(
              'Email or password are incorrect',
            ),
          );
      }
      const token = yield (0, generateJWT_1.generateJWT)(
        user.id,
        constants_1.TOKEN_EXP_TIME,
      );
      const refresh = yield (0, generateJWT_1.generateJWT)(
        user.id,
        constants_1.REFRESH_EXP_TIME,
      );
      res.status(201).json({ user, token, refresh });
    } catch (_b) {
      res
        .status(500)
        .json(
          (0, createErrorResponse_1.createErrorResponse)(
            'Could not complete login',
          ),
        );
    }
  });
exports.login = login;
const googleSignIn = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id_token } = req.body;
    try {
      const { username, email, avatar } = yield (0,
      googleVerify_1.googleVerify)(id_token);
      let user = yield user_1.User.findOne({ email });
      if (!user) {
        user = new user_1.User({
          username,
          email,
          password: 'google',
          avatar,
          google: true,
          role: constants_1.RolesEnum.USER,
        });
        yield user.save();
      }
      if (!(user === null || user === void 0 ? void 0 : user.status)) {
        return res
          .status(401)
          .json(
            (0, createErrorResponse_1.createErrorResponse)('User is disabled'),
          );
      }
      const token = yield (0, generateJWT_1.generateJWT)(user.id, '1h');
      const refresh = yield (0, generateJWT_1.generateJWT)(user.id, '2h');
      res.status(201).json({ user, token, refresh });
    } catch (_c) {
      res
        .status(500)
        .json(
          (0, createErrorResponse_1.createErrorResponse)(
            'Could not complete Google sign in',
          ),
        );
    }
  });
exports.googleSignIn = googleSignIn;
//# sourceMappingURL=authController.js.map
