const express = require("express");
const authRouter = express.Router();
const authcontroller  = require("../controllers/auth.controller")

authRouter.post("/register", authcontroller.RegisterController );

authRouter.post("/login",authcontroller.loginController );

module.exports = authRouter;
