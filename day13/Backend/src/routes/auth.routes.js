const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const AuthRouter =  express.Router()



AuthRouter.post("/register",authcontroller.RegisterUser)
AuthRouter.post("/login",authcontroller.LoginUser)
AuthRouter.get("/get-me")


module.exports = AuthRouter