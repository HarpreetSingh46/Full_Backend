const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const bcrypt = require("bcryptjs");
const userModel = require("../model/usermodel");


async function RegistrationForUser(req,res){
    const {username,email,password} = req.body;
    const IsEmailExist = await userModel.findOne({email});
    if(IsEmailExist){
        return res.status(409).json({
            message:"This email is already exist"
        })
    }
    const IsUserNameExist = await userModel.findOne({username})
    if(IsUserNameExist){
        return res.status(409).json({
            message:"This username is already exist"
        })
    }

    const hash = await bcrypt.hash(password,10);
    const user = await userModel.create({
        username,
        email,
        password:hash,
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SCRET,{expiresIn:"1d"},)
    res.cookie("token",token);
    res.status(201).json({
        username:user.username,
        email:user.email,
        password:user.password,
    })
}

async function LoginUser(req,res){
    const {username,email, password} = req.body;
    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(!user){
        return res.status(401).json({
            message:"User not found"
        })
    }

    const isPasswordMatch= await bcrypt.compare(password,user.password);
    if(!isPasswordMatch){
        return res.status(404).json({
            message:"your password is incorrect"
        })
    }

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SCRET,{expiresIn:"1d"},)

    res.cookie("token",token)
    res.status(201).json({
        message:"user logged successfully",
        user:{
            user:user.username,
            email:user.email,
            password:user.password
        }
    })
}

module.exports={
    RegistrationForUser,
    LoginUser,
}