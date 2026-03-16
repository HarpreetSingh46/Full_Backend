import { Router } from 'express';
import {
  registerValidationRules,
  loginValidationRules,

} from '../validators/auth.validator.js';
import {
  register,
  login,
  getCurrentUser,
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const authRouter = Router();

// Register route with validation
authRouter.post('/register', registerValidationRules(),  register);

// Login route with validation
authRouter.post('/login', loginValidationRules(),  login);

// Get current user (protected route)
authRouter.get('/me', verifyToken, getCurrentUser);

export default authRouter;