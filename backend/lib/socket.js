import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://192.168.0.15:5173"
        //origin: "http://localhost:5173"
    }
})

export { app, io, server };