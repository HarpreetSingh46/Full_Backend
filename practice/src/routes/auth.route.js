const express = require("express")
const jwt= require("jsonwebtoken")
const authRoute = express.Router();
const bcrypt = require("bcryptjs");
const cookie = require("cookie-parser");
const userModel = require("../model/usermodel");


authRoute.post("/register", async (req,res)=>{
    const {username , email , password} = req.body;
    const isEmailExist = await userModel.findOne({email});
    if(isEmailExist){
        return res.status(409).json({
            message:"your email is already exist"
        })
    }

    const isUserNameExist = await userModel.findOne({username});
    if(isUserNameExist){
        return res.status(409).json({
            message:"this username is already exist"
        })
    }
    const hash = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        email,
        password:hash,
    })

    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SCRET,{expiresIn:"1d"},);

    res.cookie("token",token);
    res.status(201).json({
        username:user.username,
        email:user.email,
        password:user.password,
    })
})

module.exports = authRoute