import {Router} from 'express';
import { validateRegister } from '../validators/auth.validator.js';
const router = Router();


router.post("/Register", validateRegister, (req, res) => {
        const{fullName, email, password,contact} = req.body;


});



export default router;