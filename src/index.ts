import 'dotenv/config';

import { Server } from './models/server';

const server = new Server();

server.listen();

console.log(process.env.NODE_ENV);
