import {Router} from 'express';
import {validateRegister, validateLogin} from "../validators/auth.validator.js";
import {register,loginUser} from '../controllers/auth.controller.js';

 import passport from "passport";
const authRouter = Router();

authRouter.post("/register", validateRegister, register);
authRouter.post("/login", validateLogin, loginUser);

authRouter.get("/google",
     passport.authenticate("google", { scope: ["profile", "email"] }));
authRouter.get("/google/callback", passport.authenticate("google",{session: false}),
 (req, res) => {
    res.send("Google login successful");
  }

);


export default authRouter;