import express from 'express';
import cors, { CorsOptions } from 'cors';

import { usersRouter } from '../routes/usersRouter';
import { dbConnection } from '../database/config';
import { authRouter } from '../routes/authRouter';

export class Server {
  private app = express();
  private port = process.env.PORT;
  corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
  };

  private usersPath = '/api/users';
  private authPath = '/api/auth';

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
    this.app.use(this.usersPath, usersRouter);
    this.app.use(this.authPath, authRouter);
  }

  listen() {
    this.app.listen(this.port, () =>
      // eslint-disable-next-line no-console
      console.log(`Running on port ${this.port}`),
    );
  }
}
