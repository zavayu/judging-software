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
const allowedOrigins = [BASE_URL, 'https://tidal-judging-software.vercel.app', 'https://judging-software.vercel.app', "http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: function (origin, callback) {
        console.log('Origin:', origin); // Log the origin of the request
        console.log('Allowed Origins:', allowedOrigins); // Log the allowed origins
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

// Explicitly set the Access-Control-Allow-Origin header
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use("/api/auth", authRoutes);
app.use("/api/judge", judgeRoutes);
app.use("/api/project", projectRoutes);

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});