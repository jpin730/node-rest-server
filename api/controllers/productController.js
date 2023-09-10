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
exports.deleteProduct =
  exports.putProduct =
  exports.postProduct =
  exports.getProduct =
  exports.getAllProducts =
    void 0;
const product_1 = require('../models/product');
const intParser_1 = require('../helpers/intParser');
const constants_1 = require('../utils/constants');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const getAllProducts = (req, res) =>
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
    const [total, products] = yield Promise.all([
      product_1.Product.countDocuments(filter),
      product_1.Product.find(filter)
        .populate('user', 'username')
        .populate('category', 'name')
        .skip(parsedOffset)
        .limit(parsedLimit),
    ]);
    res.status(200).json({
      total,
      limit: parsedLimit,
      offset: parsedOffset,
      products,
    });
  });
exports.getAllProducts = getAllProducts;
const getProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const product = yield product_1.Product.findById(id)
      .populate('user', 'username')
      .populate('category', 'name');
    res.status(200).json({ product });
  });
exports.getProduct = getProduct;
const postProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const name = req.body.name.toUpperCase();
    const { category, user, description, price, inStock } = req.body;
    const productExists = !!(yield product_1.Product.findOne({ name }));
    if (productExists) {
      return res
        .status(400)
        .json(
          (0, createErrorResponse_1.createErrorResponse)(
            'Product already exists',
          ),
        );
    }
    const createdProduct = new product_1.Product({
      name,
      status: true,
      category,
      user: user._id,
      description,
      price,
      inStock,
    });
    try {
      yield createdProduct.save();
      res.status(201).json({ createdProduct });
    } catch (_a) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.postProduct = postProduct;
const putProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();
    const { category, user, description, price, inStock } = req.body;
    try {
      const updatedProduct = yield product_1.Product.findByIdAndUpdate(
        id,
        {
          name,
          category,
          user: user._id,
          description,
          price,
          inStock,
        },
        { new: true },
      )
        .populate('user', 'username')
        .populate('category', 'name');
      res.status(201).json({ updatedProduct });
    } catch (_b) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.putProduct = putProduct;
const deleteProduct = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
      const deletedProduct = yield product_1.Product.findByIdAndUpdate(
        id,
        { status: false },
        { new: true },
      )
        .populate('user', 'username')
        .populate('category', 'name');
      res.json({ deletedProduct });
    } catch (_c) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.deleteProduct = deleteProduct;
//# sourceMappingURL=productController.js.map
