const blackListModel = require("../models/blacklist.model");
const userModel = require("../models/user.model")
const Redis = require("../config/cache")

const jwt = require("jsonwebtoken")

async function authUse(req,res,next){

    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    const isTokenBlacklisted=  await redis.get(token)
    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Invalid token"
        })
    }
    let decoded= null;
    try{
        decoded =jwt.verify(token,process.env.JWT_SCERET)
        req.user= decoded
        next()
    }catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }

}


module.exports = {authUse}