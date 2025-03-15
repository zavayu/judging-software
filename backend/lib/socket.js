import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://192.168.0.15:5173",
    //origin: "http://localhost:5173"
  },
});

export function getUserSocketId(userId) {
  return userSocketMap[userId];
}

const userSocketMap = {};

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) userSocketMap[userId] = socket.id;

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});

export { app, io, server };
