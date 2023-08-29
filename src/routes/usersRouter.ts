import { check } from 'express-validator';
import { Router } from 'express';

import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/usersController';
import { validateFields } from '../middlewares/validate-fields';
import {
  emailDoesNotExists,
  isValidRole,
  userExist,
} from '../helpers/validators';

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
    check('email').custom(emailDoesNotExists),
    validateFields,
  ],
  postUser,
);
usersRouter.put(
  '/:id',
  [
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(userExist),
    check('role').custom(isValidRole),
    validateFields,
  ],
  putUser,
);
usersRouter.delete(
  '/:id',
  [
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(userExist),
    validateFields,
  ],
  deleteUser,
);

export { usersRouter };
