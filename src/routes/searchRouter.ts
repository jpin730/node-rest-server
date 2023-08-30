import { Router } from 'express';
import { search } from '../controllers/searchController';

const searchRouter = Router();

searchRouter.get('/:collection/:query', search);

export { searchRouter };
