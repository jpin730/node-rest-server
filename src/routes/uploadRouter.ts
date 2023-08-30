import { Router } from 'express';

import { putAvatar } from '../controllers/uploadController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { userExist } from '../helpers/validators';
import { validateFile } from '../middlewares/validateFile';

const uploadRouter = Router();

uploadRouter.put(
  '/avatar/:id',
  [
    validateFile,
    check('id').isMongoId(),
    check('id').custom(userExist),
    validateFields,
  ],
  putAvatar,
);

export { uploadRouter };
