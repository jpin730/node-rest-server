import { Router } from 'express';

import { putAvatar } from '../controllers/uploadController';
import { check } from 'express-validator';
import { validateFields } from '../middlewares/validateFields';
import { userExist } from '../helpers/validators';
import { validateFile } from '../middlewares/validateFile';
import { validateJWT } from '../middlewares/validateJWT';

const uploadRouter = Router();

uploadRouter.put(
  '/avatar/:id',
  [
    validateJWT,
    validateFile,
    check('id').isMongoId(),
    check('id').custom(userExist),
    validateFields,
  ],
  putAvatar,
);

export { uploadRouter };
