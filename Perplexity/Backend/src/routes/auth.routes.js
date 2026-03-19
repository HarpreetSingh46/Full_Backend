import express from "express";
import { register , login,getme} from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
import { registerValidator, loginValidator  } from "../validators/auth.validator.js";
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
*/
const authRouter = express.Router();
authRouter.post("/register", registerValidator, register);


/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT token
 * @access Public
 * @body { email, password }
 */
authRouter.post("/login", loginValidator, login)



/**
 * @route GET /api/auth/get-me
 * @desc Get current logged in user's details
 * @access Private
 */
authRouter.get('/get-me', authUser, getme)

/**
 * @route GET /api/auth/verify-email
 * @desc Verify user's email address
 * @access Public
 * @query { token }
 */

export default authRouter;