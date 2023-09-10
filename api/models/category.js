'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.Category = void 0;
const mongoose_1 = require('mongoose');
const CategorySchema = new mongoose_1.Schema({
  name: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: mongoose_1.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});
CategorySchema.methods.toJSON = function () {
  const category = this.toObject();
  delete category.__v;
  delete category.status;
  return category;
};
exports.Category = (0, mongoose_1.model)('Category', CategorySchema);
//# sourceMappingURL=category.js.map
