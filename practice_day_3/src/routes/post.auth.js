const express =  require("express");
const postModel =  require("../model/post.model")
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const {tofile} = require("@imagekit/nodejs")
const imagekit = ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

