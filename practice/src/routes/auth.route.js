const express = require("express")
const authRoute = express.Router();
const authcontroller = require("../controller/auth.controller")

authRoute.post("/register",authcontroller.RegistrationForUser)
authRoute.post("/login",authcontroller.LoginUser)

module.exports = authRoute