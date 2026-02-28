const express = require("express")
const app  = express()
const authRouter = require("./routes/auth.route")

const cookieparsar = require("cookie-parser")

app.use(express.json())
app.use(cookieparsar())

app.use("/api/auth",authRouter)


module. exports = app