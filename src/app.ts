import 'dotenv/config';

import { Server } from './models/server';

console.log(process.env.VERCEL_ENV);

const server = new Server();

server.listen();

const { app } = server;

export default app;
