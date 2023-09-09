import 'dotenv/config';

import { Server } from './models/server';

const server = new Server();

console.log(process.env.NODE_ENV);

server.listen();
