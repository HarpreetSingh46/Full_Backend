const express = require("express")
const app = express()
const authRoute = require("../src/routes/auth.route")
const cookie = require("cookie-parser")
app.use(express.json())
app.use(cookie())
app.use("/api/auth",authRoute)


module.exports= app;