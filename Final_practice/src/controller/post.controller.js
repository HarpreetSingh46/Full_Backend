const express = require("express");
const postModel = require("../model/post.model")
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const {tofile} = require("@imagekit/nodejs")
const imagekit= ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})


async function CreatePost(req,res) {
    const token = req.cookies.token

    let decoded = null;
    try{
        decoded = jwt.verify(token,process.env.IMAGEKIT_PRIVATE_KEY)
    }catch(err){
        return res.status(409).json({
            message:"Token expired"
        })
    }

    const file = await imagekit.files.upload({
        file : tofile(Buffer.from(req.files.buffer),"files"),
        fileName:"files"
    })

    const post = await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id,
    })
    res.status(201).json({
        message:"post created successfully",
        post,
    })


    
}


async function Getpost(req,res){

  const token = req.cookies.token

    let decoded = null;
    try{
        decoded = jwt.verify(token,process.env.IMAGEKIT_PRIVATE_KEY)
    }catch(err){
        return res.status(409).json({
            message:"Token expired"
        })
    }

    const userID = decoded.id
    const post = await postModel.findOne({
        user:userID
    })

    res.status(201).json({
        message:"post fetched successfully",
        post
    })


}

module.exports={
    CreatePost,
    Getpost,
}