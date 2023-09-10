'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require('express'));
const cors_1 = __importDefault(require('cors'));
const express_fileupload_1 = __importDefault(require('express-fileupload'));
const usersRouter_1 = require('../routes/usersRouter');
const config_1 = require('../database/config');
const authRouter_1 = require('../routes/authRouter');
const categoryRouter_1 = require('../routes/categoryRouter');
const productRouter_1 = require('../routes/productRouter');
const searchRouter_1 = require('../routes/searchRouter');
const uploadRouter_1 = require('../routes/uploadRouter');
const rolesRouter_1 = require('../routes/rolesRouter');
class Server {
  constructor() {
    this.app = (0, express_1.default)();
    this.port = process.env.PORT;
    this.corsOptions = {
      origin: process.env.CORS_ORIGIN,
    };
    this.fileUploadOptions = {
      useTempFiles: true,
      tempFileDir: '/tmp/',
    };
    this.path = {
      users: '/api/users',
      roles: '/api/roles',
      auth: '/api/auth',
      category: '/api/category',
      product: '/api/product',
      search: '/api/search',
      upload: '/api/upload',
    };
    this.connectDatabase();
    this.middleware();
    this.routes();
  }
  connectDatabase() {
    (0, config_1.dbConnection)();
  }
  middleware() {
    this.app.use((0, cors_1.default)(this.corsOptions));
    this.app.use(express_1.default.json());
    if (process.env.NODE_ENV !== 'production')
      this.app.use(express_1.default.static('public'));
    this.app.use((0, express_fileupload_1.default)(this.fileUploadOptions));
  }
  routes() {
    this.app.use(this.path.users, usersRouter_1.usersRouter);
    this.app.use(this.path.roles, rolesRouter_1.rolesRouter);
    this.app.use(this.path.auth, authRouter_1.authRouter);
    this.app.use(this.path.category, categoryRouter_1.categoryRouter);
    this.app.use(this.path.product, productRouter_1.productRouter);
    this.app.use(this.path.search, searchRouter_1.searchRouter);
    this.app.use(this.path.upload, uploadRouter_1.uploadRouter);
    this.app.use('*', (_, res) => res.redirect('/'));
  }
  listen() {
    this.app.listen(this.port, () =>
      // eslint-disable-next-line no-console
      console.log(`Running on port ${this.port}`),
    );
  }
}
exports.Server = Server;
//# sourceMappingURL=server.js.map
