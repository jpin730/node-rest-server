import { Router } from 'express';

import { uploadFile } from '../controllers/uploadController';

const uploadRouter = Router();

uploadRouter.post('/', uploadFile);

export { uploadRouter };
