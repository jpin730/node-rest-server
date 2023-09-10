import 'dotenv/config';

import { Server } from './models/server';

const server = new Server();

server.listen();

const { app } = server;

export default app;
