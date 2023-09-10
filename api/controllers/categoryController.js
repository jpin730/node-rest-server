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
exports.deleteCategory =
  exports.putCategory =
  exports.postCategory =
  exports.getCategory =
  exports.getAllCategories =
    void 0;
const category_1 = require('../models/category');
const intParser_1 = require('../helpers/intParser');
const constants_1 = require('../utils/constants');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const getAllCategories = (req, res) =>
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
    const [total, categories] = yield Promise.all([
      category_1.Category.countDocuments(filter),
      category_1.Category.find(filter)
        .populate('user', 'username')
        .skip(parsedOffset)
        .limit(parsedLimit),
    ]);
    res
      .status(200)
      .json({ total, limit: parsedLimit, offset: parsedOffset, categories });
  });
exports.getAllCategories = getAllCategories;
const getCategory = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield category_1.Category.findById(id).populate(
      'user',
      'username',
    );
    res.status(200).json({ category });
  });
exports.getCategory = getCategory;
const postCategory = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toUpperCase();
    const categoryExists = !!(yield category_1.Category.findOne({ name }));
    if (categoryExists) {
      return res
        .status(400)
        .json(
          (0, createErrorResponse_1.createErrorResponse)(
            'Category already exists',
          ),
        );
    }
    const createdCategory = new category_1.Category({
      name,
      user: req.body.user.id,
    });
    try {
      yield createdCategory.save();
      res.status(201).json({ createdCategory });
    } catch (_a) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.postCategory = postCategory;
const putCategory = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let { name, user } = req.body;
    name = name.toUpperCase();
    user = req.body.user.id;
    try {
      const updatedCategory = yield category_1.Category.findByIdAndUpdate(
        id,
        { name, user },
        { new: true },
      ).populate('user', 'username');
      res.status(201).json({ updatedCategory });
    } catch (_b) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.putCategory = putCategory;
const deleteCategory = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const deletedCategory = yield category_1.Category.findByIdAndUpdate(id, {
        status: false,
      }).populate('user', 'username');
      res.status(201).json({ deletedCategory });
    } catch (_c) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.deleteCategory = deleteCategory;
//# sourceMappingURL=categoryController.js.map
