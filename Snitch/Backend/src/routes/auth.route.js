import {Router} from 'express';
import {validateRegister} from "../validators/auth.validator.js";
import {register} from '../controllers/auth.controller.js';
const authRouter = Router();

authRouter.post("/register", validateRegister, register);






export default authRouter;