const express = require("express");
const authController = require("../controller/auth.controlle");
const authRoute = express.Router()






authRoute.post("/register", authController.UserRegistration);
authRoute.post("/login",authController.LoginUser);
module.exports = authRoute;
