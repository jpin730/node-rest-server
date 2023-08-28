import express from 'express';
import cors, { CorsOptions } from 'cors';

import { usersRouter } from '../routes/usersRoute';

export class Server {
  private app = express();
  private port = process.env.PORT;
  corsOptions: CorsOptions = {
    origin: process.env.CORS_ORIGIN,
  };

  private usersPath = '/api/users';

  constructor() {
    this.middleware();
    this.routes();
  }

  private middleware() {
    this.app.use(cors(this.corsOptions));
    this.app.use(express.json());
    this.app.use(express.static('public'));
  }

  private routes() {
    this.app.use(this.usersPath, usersRouter);
  }

  listen() {
    this.app.listen(this.port);
  }
}
