import {Router} from 'express';
import {validateRegister, validateLogin} from "../validators/auth.validator.js";
import {register,loginUser} from '../controllers/auth.controller.js';
const authRouter = Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, loginUser);





export default authRouter;