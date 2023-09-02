import { Router } from 'express';
import { check } from 'express-validator';

import { checkToken, googleSignIn, login } from '../controllers/authController';
import { validateFields } from '../middlewares/validateFields';
import { validateJWT } from '../middlewares/validateJWT';

const authRouter = Router();

authRouter.get('/check', validateJWT, checkToken);
authRouter.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields,
  ],
  login,
);
authRouter.post(
  '/google',
  [check('id_token', 'Token is required').notEmpty(), validateFields],
  googleSignIn,
);

export { authRouter };
