import { check } from 'express-validator';
import { Router } from 'express';

import {
  deleteUser,
  getUsers,
  postUser,
  putUser,
} from '../controllers/usersController';
import { validateFields } from '../middlewares/validateFields';
import {
  emailDoesNotExists,
  isValidRole,
  userExist,
} from '../helpers/validators';
import { validateJWT } from '../middlewares/validateJWT';
import { hasRole, isAdmin } from '../middlewares/validateRoles';
import { RolesEnum } from '../utils/constants';

const usersRouter = Router();

usersRouter.get('/', [validateJWT, hasRole(RolesEnum.ADMIN)], getUsers);
usersRouter.post(
  '/',
  [
    check('username', 'Username is required').notEmpty(),
    check('password', 'Password must have 6 or more characters').isLength({
      min: 6,
    }),
    check('email', 'Email format is invalid').isEmail(),
    check('email').custom(emailDoesNotExists),
    validateFields,
  ],
  postUser,
);
usersRouter.put(
  '/:id',
  [
    validateJWT,
    isAdmin,
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
    validateJWT,
    isAdmin,
    check('id', 'Id is invalid').isMongoId(),
    check('id').custom(userExist),
    validateFields,
  ],
  deleteUser,
);

export { usersRouter };
