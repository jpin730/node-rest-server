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
exports.putAvatar = void 0;
const cloudinary_1 = require('cloudinary');
const user_1 = require('../models/user');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const putAvatar = (req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { file } = req.files;
    const { id } = req.params;
    try {
      const updatedUser = yield user_1.User.findById(id);
      const folder = 'node-rest-server';
      if (updatedUser.avatar) {
        const regex = new RegExp(`.+(${folder}.+)\\..*`);
        const public_id =
          updatedUser === null || updatedUser === void 0
            ? void 0
            : updatedUser.avatar.replace(regex, '$1');
        yield cloudinary_1.v2.uploader.destroy(public_id);
      }
      const { tempFilePath } = file;
      const { secure_url } = yield cloudinary_1.v2.uploader.upload(
        tempFilePath,
        {
          folder,
        },
      );
      updatedUser.avatar = secure_url;
      yield updatedUser.save();
      res.status(201).json({ updatedUser });
    } catch (_a) {
      res
        .status(500)
        .json((0, createErrorResponse_1.createErrorResponse)('Server error'));
    }
  });
exports.putAvatar = putAvatar;
//# sourceMappingURL=uploadController.js.map
