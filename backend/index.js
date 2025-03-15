import connectDB from './lib/connectDB.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { app, server } from "./lib/socket.js";
import authRoutes from './routes/auth.routes.js';
import judgeRoutes from './routes/judge.routes.js';
import projectRoutes from './routes/project.routes.js';
import express from 'express';

dotenv.config();
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || "http://localhost:5173";

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: BASE_URL, 
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/judge", judgeRoutes);
app.use("/api/project", projectRoutes);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});