const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
const cookie = require("cookie-parser")
const userModel = require("../models/user.model");


async function RegisterUser(req,res){
    const{username, email,password} = req.body;
    const usernameExist = await userModel.findOne({username})
    if(usernameExist){
        return res.status(401).json({
            message:"Username is already exists"
        })
    }
    const isEmailExist = await userModel.findOne({email});
    if(isEmailExist){
        return res.status(401).json({
            message:"email is already exist in database"
        })
    }

    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash,
    })

    const token = jwt.sign({
        id:user._id,
    },process.env.JWT_SCRET,{expiresIn:"1d"})

    const cookie = ("token",token)

    res.status(200).json({
        message:"user register successfully",
        user:{
            username,
            email
        }
    })
}

 async function LoginUser(req,res){
    const{username , email, password} = req.body;
    const isUserExist = await userModel.findOne({
        $or:[
            {username},
            {email},
        ]
    })
        if(!isUserExist){
            return res.status(404).json({
                message:"User is not exist try another email or username"
            })
        }

    const isMatched = await bcrypt.compare(password,isUserExist.password)

        res.status(200).json({
            message:"user loggend successfully",
            isUserExist:{
                username,
                email,
            }
        })

}

module.exports={
    RegisterUser,
    LoginUser
}