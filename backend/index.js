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

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/judge", judgeRoutes);
app.use("/api/project", projectRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});