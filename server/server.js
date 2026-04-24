require('dotenv').config();
const http = require('http');
const app = require('./app');
const { initSocket } = require('./socket');
const { port } = require('./config/env');
const prisma = require('./lib/prisma');

const httpServer = http.createServer(app);
initSocket(httpServer);

async function start() {
  try {
    await prisma.$connect();
    console.log('Database connected via Prisma');
    httpServer.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

start();
