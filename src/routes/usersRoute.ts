import { check } from 'express-validator';
import { Router } from 'express';

import { getUsers, postUser, putUser } from '../controllers/usersController';
import { validateFields } from '../middlewares/validate-fields';
import { emailExists, isValidRole } from '../helpers/validators';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post(
  '/',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password must have 6 or more characters').isLength({
      min: 6,
    }),
    check('email', 'Email format is invalid').isEmail(),
    check('role').custom(isValidRole),
    check('email').custom(emailExists),
    validateFields,
  ],
  postUser,
);
usersRouter.put('/:id', putUser);

export { usersRouter };
