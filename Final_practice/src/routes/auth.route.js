const express = require("express");
const authRoute = express.Router();
const authController = require("../controller/auth.controller")


authRoute.post("/register",authController.RegisterUser)
authRoute.post("/login",authController.LoginUser)



module.exports = authRoute