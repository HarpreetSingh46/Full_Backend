const express = require("express")
const app = express()
const postRouter = require("./routes/post.route")
const authRouter = require("./routes/auth.route")
const cookieParsar = require("cookie-parser")
app.use(express.json())

app.use(cookieParsar())
app.use("/api/auth",authRouter)
app.use("/api/posts",postRouter)



module.exports=app