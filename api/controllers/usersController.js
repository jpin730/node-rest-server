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
var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteUser =
  exports.putUser =
  exports.postUser =
  exports.getUsers =
    void 0;
const user_1 = require('../models/user');
const encrypt_1 = require('../helpers/encrypt');
const intParser_1 = require('../helpers/intParser');
const constants_1 = require('../utils/constants');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const getUsers = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { limit, offset } = req.query;
    const parsedLimit = (0, intParser_1.intParser)(
      limit,
      constants_1.DEFAULT_LIMIT,
    );
    const parsedOffset = (0, intParser_1.intParser)(
      offset,
      constants_1.DEFAULT_OFFSET,
    );
    const filter = { status: true };
    const [total, users] = yield Promise.all([
      user_1.User.count(filter),
      user_1.User.find(filter).limit(parsedLimit).skip(parsedOffset),
    ]);
    res
      .status(200)
      .json({ total, limit: parsedLimit, offset: parsedOffset, users });
  });
exports.getUsers = getUsers;
const postUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { password, email, username } = req.body;
    const createdUser = new user_1.User({
      role: constants_1.RolesEnum.USER,
      password,
      email,
      username,
    });
    createdUser.password = (0, encrypt_1.encrypt)(password);
    try {
      yield createdUser.save();
      res.status(201).json({ createdUser });
    } catch (_a) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.postUser = postUser;
const putUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { body, params } = req;
    delete body._id;
    delete body.google;
    delete body.email;
    const { password } = body,
      rest = __rest(body, ['password']);
    if (password) {
      rest.password = (0, encrypt_1.encrypt)(password);
    }
    try {
      const modifiedUser = yield user_1.User.findByIdAndUpdate(
        params.id,
        rest,
        { returnDocument: 'after' },
      );
      res.status(201).json({ modifiedUser });
    } catch (_b) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.putUser = putUser;
const deleteUser = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { params } = req;
    try {
      const deletedUser = yield user_1.User.findByIdAndUpdate(
        params.id,
        { status: false },
        { returnDocument: 'after' },
      );
      res.status(201).json({ deletedUser });
    } catch (_c) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.deleteUser = deleteUser;
//# sourceMappingURL=usersController.js.map
