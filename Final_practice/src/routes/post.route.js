const express = require("express");
const postController = require("../controller/post.controller");
const multer = require("multer")
const postRoute = express.Router()
const upload = multer({storage: multer.memoryStorage()})



postRoute.post("/", upload.single("image"),postController.CreatePost);
postRoute.get("/",postController.Getpost);



module.exports = postRoute;