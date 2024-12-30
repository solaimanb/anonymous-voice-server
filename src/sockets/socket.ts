// socket.ts
import { Server as HTTPServer } from "http";
import { Server as SocketIOServer, Socket } from "socket.io";

import { logger } from "../shared/logger";

let io: SocketIOServer;

interface Room {
  id: string;
  users: Map<string, { username: string }>;
}

const rooms = new Map<string, Room>();

const initializeSocket = (server: HTTPServer) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket: Socket, next) => {
    const username = socket.handshake.auth.username;
    socket.username = username;
    next();
  });

  io.on("connection", (socket: Socket) => {
    console.log("User connected:", socket.id);
    logger.info(`Socket connected: ${socket.id}`);

    // Create a new room
    socket.on("create-room", (callback: (roomId: string) => void) => {
      const roomId = Math.random().toString(36).substring(7);
      rooms.set(roomId, {
        id: roomId,
        users: new Map().set(socket.id, { username: socket.username }),
      });

      socket.join(roomId);
      callback(roomId);

      logger.info(`Room created: ${roomId} by user: ${socket.username}`);
    });

    // Join a room
    socket.on(
      "join-room",
      (
        roomId: string,
        callback: (success: boolean, message?: string) => void
      ) => {
        const room = rooms.get(roomId);

        if (!room) {
          callback(false, "Room not found");
          return;
        }

        socket.join(roomId);
        room.users.set(socket.id, { username: socket.username });

        // Notify others in the room
        socket.to(roomId).emit("user-joined", {
          userId: socket.id,
          username: socket.username,
        });

        // Send current users in room
        const users = Array.from(room.users.entries()).map(([id, user]) => ({
          userId: id,
          username: user.username,
        }));

        callback(true);
        io.to(roomId).emit("room-users", users);

        logger.info(`User ${socket.username} joined room: ${roomId}`);
      }
    );

    // Handle voice data
    socket.on("voice-data", ({ roomId, data }) => {
      socket.to(roomId).emit("voice-data", {
        userId: socket.id,
        username: socket.username,
        data,
      });
    });

    // Leave room
    socket.on("leave-room", (roomId: string) => {
      handleUserLeaveRoom(socket, roomId);
    });

    // Disconnect handling
    socket.on("disconnect", () => {
      rooms.forEach((room, roomId) => {
        if (room.users.has(socket.id)) {
          handleUserLeaveRoom(socket, roomId);
        }
      });

      logger.info(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

function handleUserLeaveRoom(socket: Socket, roomId: string) {
  const room = rooms.get(roomId);
  if (room) {
    room.users.delete(socket.id);
    socket.to(roomId).emit("user-left", {
      userId: socket.id,
      username: socket.username,
    });

    if (room.users.size === 0) {
      rooms.delete(roomId);
      logger.info(`Room deleted: ${roomId}`);
    }
  }
  socket.leave(roomId);
}

export { initializeSocket, io };
