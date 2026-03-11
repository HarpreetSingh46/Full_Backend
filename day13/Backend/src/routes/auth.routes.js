const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const AuthRouter =  express.Router()
const authMiddleware = require("../middleware/auth.middleware")



AuthRouter.post("/register",authcontroller.RegisterUser)
AuthRouter.post("/login",authcontroller.LoginUser)
AuthRouter.get("/get-me",authMiddleware.authUse,authcontroller.getMe)
AuthRouter.get("/logout",authcontroller.LogoutUser)

module.exports = AuthRouter