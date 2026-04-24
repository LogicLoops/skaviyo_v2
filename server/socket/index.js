const { Server } = require('socket.io');
const { clientUrl } = require('../config/env');

let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: clientUrl,
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Vendor joins their personal room to receive order notifications
    socket.on('join_vendor_room', (vendorId) => {
      socket.join(`vendor_${vendorId}`);
      console.log(`Vendor ${vendorId} joined room`);
    });

    // User joins their personal room
    socket.on('join_user_room', (userId) => {
      socket.join(`user_${userId}`);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized');
  return io;
};

module.exports = { initSocket, getIO };
