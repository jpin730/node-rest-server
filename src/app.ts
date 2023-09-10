import 'dotenv/config';

import { Server } from './models/server';

const server = new Server();

server.listen();

const { app } = server;

export default app;

console.log(process.env.NODE_ENV, process.env.VERCEL_ENV);
