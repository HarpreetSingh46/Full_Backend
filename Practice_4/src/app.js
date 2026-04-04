require("dotenv").config()
const express = require("express")
const authRouter = require("./routes/user.routes")
const connectToDb = require("./config/database")
const cookieParser = require("cookie-parser")
const app = express()
app.use(express.json())
app.use(cookieParser())

connectToDb()
app.use("/api/auth",authRouter)

module.exports = app