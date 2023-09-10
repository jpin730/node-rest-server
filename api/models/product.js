'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Product = void 0;
const mongoose_1 = require('mongoose');
const ProductSchema = new mongoose_1.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  category: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  user: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  description: { type: String },
  price: {
    type: Number,
    default: 0,
  },
  inStock: { type: Boolean, default: true },
});
ProductSchema.methods.toJSON = function () {
  const category = this.toObject();
  delete category.__v;
  delete category.status;
  return category;
};
exports.Product = (0, mongoose_1.model)('Product', ProductSchema);
//# sourceMappingURL=product.js.map
