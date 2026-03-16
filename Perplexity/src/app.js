 import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import authRouter from './routes/auth.routes.js';

// Load environment variables
dotenv.config();

// Create Express app instance
const app = express();

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies

// CORS configuration (optional - uncomment if needed)
// import cors from 'cors';
// app.use(cors());

// Routes
app.use('/api/auth', authRouter);

// Basic health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
  });
});




export default app;