const express = require("express");
const authRoute = express.Router();
const authRouterController = require("../controllers/auth.controller")

authRoute.post("/register", authRouterController.Registration);
authRoute.post("/login", authRouterController.LoginUser )


module.exports = authRoute