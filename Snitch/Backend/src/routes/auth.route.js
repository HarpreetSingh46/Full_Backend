import {Router} from 'express';
import { validateRegister } from '../validators/auth.validator.js';
import {register} from '../controllers/auth.controller.js';
const router = Router();


router.post("/register", validateRegister, register);






export default router;