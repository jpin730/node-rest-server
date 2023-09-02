import { RequestHandler } from 'express';
import { UploadedFile } from 'express-fileupload';
import { VALID_IMG_MIME_TYPES } from '../utils/constants';
import { createErrorResponse } from '../helpers/createErrorResponse';

export const validateFile: RequestHandler = (req, res, next) => {
  const { files } = req;

  if (!files || Object.keys(files).length === 0) {
    return res.status(400).json(createErrorResponse('No file was uploaded'));
  }

  const { file } = files;

  if (!file) {
    return res.status(400).json(createErrorResponse('File is required'));
  }

  const { mimetype } = file as UploadedFile;

  if (!VALID_IMG_MIME_TYPES.includes(mimetype)) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          `Invalid file type. Allowed files: ${VALID_IMG_MIME_TYPES}`,
        ),
      );
  }

  next();
};
