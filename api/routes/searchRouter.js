'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.searchRouter = void 0;
const express_1 = require('express');
const searchController_1 = require('../controllers/searchController');
const validateJWT_1 = require('../middlewares/validateJWT');
const searchRouter = (0, express_1.Router)();
exports.searchRouter = searchRouter;
searchRouter.get(
  '/:collection/:query',
  [validateJWT_1.validateJWT],
  searchController_1.search,
);
//# sourceMappingURL=searchRouter.js.map
