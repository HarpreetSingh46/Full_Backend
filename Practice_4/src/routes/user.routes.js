
const express= require("express")
const authRouter = express.Router()
const controller = require("../controller/user.controller")



authRouter.post("/register", controller.RegisterUser )

authRouter.post("/login", controller.LoginUser)

module.exports = authRouter