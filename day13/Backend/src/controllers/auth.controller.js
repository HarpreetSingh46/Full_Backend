const  userModel  = require("../models/user.model")
const bcrypt  = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")
const blackListModel =  require("../models/blacklist.model")
async function RegisterUser(req,res){
    const  { username , email , password} = req.body;
    const isEmailExist = await userModel.findOne({email})

    if(isEmailExist){
        return res.status(404).json({
            message:"Email is already exist"
        })
    }

    const isUsernameExist = await userModel.findOne({username})
    if(isUsernameExist){
        return res.status(404).json({
            message:"Username is already exist"
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
    },process.env.JWT_SCERET,{expiresIn:"1h"},)

    const cookie =("token",token)
    res.status(202).json({
        message:"user created successfully",
        user:{
            user:user.username,
            email:user.email,
            password:user.password,
        }
    })

}

async  function LoginUser(req,res){
        const {username , email , password} = req.body;

        const user = await userModel.findOne({
            $or:[
                {email},
                {username}
            ]
        }).select("+password")

        if(!user){
            return res.status(404).json({
                message:"user is not exisit"
            })
        }

        
        const isMatched = await bcrypt.compare(password , user.password);
    
        if(!isMatched){
            return res.status(404).json({
                message:"password is wrong"
            })
        }

        res.status(202).json({
            message:"user logged successfully",
            user:{
                user:user.username,
                email:user.email,
                password:user.password
            }
        })
    }   
async function getMe(req,res){
    const user = await userModel.findById(req.user.id).select("-password")
    res.status(200).json({
        message:"user fetched",
        user
    })
}

async function LogoutUser(req,res){
    const  token  = req.cookie.token;
    res.clearCookie("token")
    await blackListModel.create({
        token
    })

    res.status(200).json({
        message:"logout successfully"
    })
}
module.exports={
    RegisterUser,
    LoginUser,
    getMe,
    LogoutUser,
}
