import express from 'express';
import cors from 'cors';

export class Server {
  private app = express();
  private port = process.env.PORT;

  constructor() {
    this.middleware();

    this.routes();
  }

  private middleware() {
    this.app.use(cors());
    this.app.use(express.static('public'));
  }

  private routes() {
    this.app.get('/api', (req, res) => {
      res.send('Hello World!');
    });
  }

  listen() {
    this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log(`App listening on port ${this.port}`);
    });
  }
}
