import { Router } from 'express';
import { check } from 'express-validator';

import { login } from '../controllers/authController';
import { validateFields } from '../middlewares/validateFields';

const authRouter = Router();

authRouter.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').notEmpty(),
    validateFields,
  ],
  login,
);

export { authRouter };
