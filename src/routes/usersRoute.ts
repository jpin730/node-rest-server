import { Router } from 'express';

import { getUsers, postUser, putUser } from '../controllers/usersController';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.post('/', postUser);
usersRouter.put('/:id', putUser);

export { usersRouter };
