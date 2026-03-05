const express =  require("express");
const postRouter =  express.Router()
const postModel =  require("../model/post.model")
const postauth = require("../controllers/post.controller")
const upload = multer({ storage: multer.memoryStorage() })

postRouter.post("/CreatePost", upload.single("image"), postauth.CreatePost)
postRouter.get("/getPost", postauth.Getpost)








module.exports = postauth