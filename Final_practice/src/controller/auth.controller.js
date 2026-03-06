const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../model/user.model");
const cookie = require("cookie-parser");



async function  RegisterUser(req,res){
    const {username , email  , password} =  req.body;
    const isUserName = await userModel.findOne({username});
    if(isUserName){
        return res.status(404).json({
            message:"Username is already exist"
        })
    }
    const isEmailExist = await userModel.findOne({email})
    if(isEmailExist){
        return res.status(404).json({
            message:"Email is already exisit"
        })
    }

    const hash = await bcrypt.hash(password,10);
    const user = await  userModel.create({
        username,
        email,
        password:hash,
    })
    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SCRET,{expiresIn:"1d"},)

    res.cookie("token",token)
    res.status(201).json({
        message:"User register successfully",
        user:{
            username:user.username,
            email:user.email,
            password:user.password,
        }
    })
}

async function LoginUser(req,res){
    const{username, email , password} = req.body;
    const user = await userModel.findOne({
        $or:[
            {username},
            {email},
        ]
    })
    if(!user){
        return res.status(404).json({
            message:"unauthorised user login"
        })
    }
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched){
        return res.status(409).json({
            message:"Your passwornd is wrong try again"
        })
    }
    res.status(201).json({
        message:"User Logged in successfully",
        user:{
            user:user.username,
            email:user.email,
            password:user.password
        }
    })
}


module.exports = {
    RegisterUser,
    LoginUser,
}