 import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';



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







export default app;