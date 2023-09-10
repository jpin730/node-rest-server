import express from 'express';
import cors, { CorsOptions } from 'cors';
import fileUpload, { Options } from 'express-fileupload';

import { usersRouter } from '../routes/usersRouter';
import { dbConnection } from '../database/config';
import { authRouter } from '../routes/authRouter';
import { categoryRouter } from '../routes/categoryRouter';
import { productRouter } from '../routes/productRouter';
import { searchRouter } from '../routes/searchRouter';
import { uploadRouter } from '../routes/uploadRouter';
import { rolesRouter } from '../routes/rolesRouter';

export class Server {
  app = express();
  private port = process.env.PORT;
  private corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
  };
  private fileUploadOptions: Options = {
    useTempFiles: true,
    tempFileDir: '/tmp/',
  };
  private path = {
    users: '/api/users',
    roles: '/api/roles',
    auth: '/api/auth',
    category: '/api/category',
    product: '/api/product',
    search: '/api/search',
    upload: '/api/upload',
  };

  constructor() {
    this.connectDatabase();
    this.middleware();
    this.routes();
  }

  private connectDatabase() {
    dbConnection();
  }

  private middleware() {
    this.app.use(cors(this.corsOptions));
    this.app.use(express.json());
    if (process.env.NODE_ENV !== 'production')
      this.app.use(express.static('public'));
    this.app.use(fileUpload(this.fileUploadOptions));
  }

  private routes() {
    this.app.use(this.path.users, usersRouter);
    this.app.use(this.path.roles, rolesRouter);
    this.app.use(this.path.auth, authRouter);
    this.app.use(this.path.category, categoryRouter);
    this.app.use(this.path.product, productRouter);
    this.app.use(this.path.search, searchRouter);
    this.app.use(this.path.upload, uploadRouter);
    this.app.use('*', (_, res) => res.redirect('/'));
  }

  listen() {
    this.app.listen(this.port, () =>
      // eslint-disable-next-line no-console
      console.log(`Running on port ${this.port}`),
    );
  }
}
