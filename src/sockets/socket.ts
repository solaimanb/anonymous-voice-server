import { Server as HTTPServer } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

import { logger } from '../shared/logger';

let io: SocketIOServer;

const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*', // Adjust this according to your CORS policy
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    console.log(' From Use Username:', username);
    socket.username = username;
    next();
  });

  io.on('connection', (socket: Socket) => {
    console.log('User connected:', socket.id);
    logger.info(`Socket connected: ${socket.id}`);

    // Send connected users list to the client
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        userID: id,
        username: socket.username,
        key: id,
      });
    }
    socket.emit('users', users);
    console.log(users);

    socket.broadcast.emit('user connected', {
      userID: socket.id,
      username: socket.username,
      key: socket.id,
      self: false,
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export { initializeSocket, io };
