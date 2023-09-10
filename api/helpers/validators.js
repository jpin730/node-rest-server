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
exports.productExists =
  exports.categoryExists =
  exports.userExist =
  exports.emailDoesNotExists =
  exports.isValidRole =
    void 0;
const category_1 = require('../models/category');
const product_1 = require('../models/product');
const role_1 = require('../models/role');
const user_1 = require('../models/user');
const isValidRole = (role) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const roleExists = yield role_1.Role.findOne({ role });
    if (!roleExists) {
      throw new Error('Role value is invalid');
    }
  });
exports.isValidRole = isValidRole;
const emailDoesNotExists = (email) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const emailExists = yield user_1.User.findOne({ email });
    if (emailExists) {
      throw new Error('Email already exists');
    }
  });
exports.emailDoesNotExists = emailDoesNotExists;
const userExist = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const userExists = yield user_1.User.findById(id);
      if (!userExists) {
        throw new Error();
      }
    } catch (_a) {
      throw new Error("User doesn't exist");
    }
  });
exports.userExist = userExist;
const categoryExists = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const categoryExists = !!(yield category_1.Category.findById(id));
      if (!categoryExists) {
        throw new Error();
      }
    } catch (_b) {
      throw new Error("Category doesn't exist");
    }
  });
exports.categoryExists = categoryExists;
const productExists = (id) =>
  __awaiter(void 0, void 0, void 0, function* () {
    try {
      const productExists = !!(yield product_1.Product.findById(id));
      if (!productExists) {
        throw new Error();
      }
    } catch (_c) {
      throw new Error("Product doesn't exist");
    }
  });
exports.productExists = productExists;
//# sourceMappingURL=validators.js.map
