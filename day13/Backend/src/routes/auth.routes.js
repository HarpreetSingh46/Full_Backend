const express = require("express")
const authcontroller = require("../controllers/auth.controller")
const AuthRouter =  express.Router()



AuthRouter.post("/register",authcontroller.RegisterUser)



module.exports = AuthRouter