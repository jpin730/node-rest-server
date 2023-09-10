'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.User = void 0;
const mongoose_1 = require('mongoose');
const UserSchema = new mongoose_1.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  avatar: {
    type: String,
  },
});
UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.__v;
  delete user.password;
  delete user.status;
  user.uid = user._id;
  delete user._id;
  return user;
};
exports.User = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=user.js.map
