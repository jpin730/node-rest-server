import { Router } from 'express';
import { search } from '../controllers/searchController';
import { validateJWT } from '../middlewares/validateJWT';

const searchRouter = Router();

searchRouter.get('/:collection/:query', [validateJWT], search);

export { searchRouter };
