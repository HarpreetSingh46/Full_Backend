const express = require("express");
const app =  express()
const authRoute = require("../src/routes/user.auth")
const cookie = require("cookie-parser")
app.use(express.json())
app.use(cookie())

app.use("/api/auth",authRoute)






module.exports=  app