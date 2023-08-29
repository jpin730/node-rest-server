import express from 'express';
import cors, { CorsOptions } from 'cors';

import { usersRouter } from '../routes/usersRouter';
import { dbConnection } from '../database/config';
import { authRouter } from '../routes/authRouter';
import { categoryRouter } from '../routes/categoryRouter';

export class Server {
  private app = express();
  private port = process.env.PORT;
  corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
  };
  private path = {
    users: '/api/users',
    auth: '/api/auth',
    category: '/api/category',
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
    this.app.use(express.static('public'));
  }

  private routes() {
    this.app.use(this.path.users, usersRouter);
    this.app.use(this.path.auth, authRouter);
    this.app.use(this.path.category, categoryRouter);
  }

  listen() {
    this.app.listen(this.port, () =>
      // eslint-disable-next-line no-console
      console.log(`Running on port ${this.port}`),
    );
  }
}
