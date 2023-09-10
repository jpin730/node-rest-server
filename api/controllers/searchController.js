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
exports.search = void 0;
const mongoose_1 = require('mongoose');
const constants_1 = require('../utils/constants');
const user_1 = require('../models/user');
const category_1 = require('../models/category');
const product_1 = require('../models/product');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const searchUsers = (query, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(query)) {
      const user = yield user_1.User.findById(query);
      if (user) {
        return res.json({ results: [user] });
      }
    }
    const regex = new RegExp(query, 'i');
    const usuarios = yield user_1.User.find({
      $or: [{ name: regex }, { email: regex }],
      $and: [{ status: true }],
    });
    res.json({
      results: usuarios,
    });
  });
const searchCategories = (query, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(query)) {
      const category = yield category_1.Category.findById(query).populate(
        'user',
        'username',
      );
      if (category) {
        return res.json({ results: [category] });
      }
    }
    const regex = new RegExp(query, 'i');
    const categories = yield category_1.Category.find({
      name: regex,
      status: true,
    }).populate('user', 'username');
    res.json({
      results: categories,
    });
  });
const searchProducts = (query, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    if ((0, mongoose_1.isValidObjectId)(query)) {
      const product = yield product_1.Product.findById(query)
        .populate('category', 'name')
        .populate('user', 'username');
      if (product) {
        return res.json({ results: [product] });
      }
    }
    const regex = new RegExp(query, 'i');
    const products = yield product_1.Product.find({
      name: regex,
      status: true,
    })
      .populate('category', 'name')
      .populate('user', 'username');
    res.json({
      results: products,
    });
  });
const search = (req, res) => {
  const { collection, query } = req.params;
  switch (collection) {
    case constants_1.CollectionEnum.USERS:
      searchUsers(query, res);
      break;
    case constants_1.CollectionEnum.CATEGORIES:
      searchCategories(query, res);
      break;
    case constants_1.CollectionEnum.PRODUCTS:
      searchProducts(query, res);
      break;
    default:
      res
        .status(400)
        .json(
          (0, createErrorResponse_1.createErrorResponse)(
            `Invalid collection. Allowed collections: ${constants_1.COLLECTIONS}`,
          ),
        );
      break;
  }
};
exports.search = search;
//# sourceMappingURL=searchController.js.map
