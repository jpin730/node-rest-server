'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validateFile = void 0;
const constants_1 = require('../utils/constants');
const createErrorResponse_1 = require('../helpers/createErrorResponse');
const validateFile = (req, res, next) => {
  const { files } = req;
  if (!files || Object.keys(files).length === 0) {
    return res
      .status(400)
      .json(
        (0, createErrorResponse_1.createErrorResponse)('No file was uploaded'),
      );
  }
  const { file } = files;
  if (!file) {
    return res
      .status(400)
      .json((0, createErrorResponse_1.createErrorResponse)('File is required'));
  }
  const { mimetype } = file;
  if (!constants_1.VALID_IMG_MIME_TYPES.includes(mimetype)) {
    return res
      .status(400)
      .json(
        (0, createErrorResponse_1.createErrorResponse)(
          `Invalid file type. Allowed files: ${constants_1.VALID_IMG_MIME_TYPES}`,
        ),
      );
  }
  next();
};
exports.validateFile = validateFile;
//# sourceMappingURL=validateFile.js.map
