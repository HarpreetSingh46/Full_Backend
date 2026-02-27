const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const authRoutes = express.Router();
const crypto = require("crypto")

authRoutes.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });

  
  
  
  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "user already exisit please change your email or password",
    });
  }

  const hash = crypto.createHash("md5").update(password).digest("hex")
  
  
  
  
  const user = await userModel.create({
    email,
    password :hash,
    name,
  });


  const token =  jwt.sign({
    id: user._id,
    email : user.email
    
  },process.env.JWT_SECRET
)

res.cookie("jwt_token",token)

res.status(201).json({
  message: "user created successfully",
  user,
  token,
});
});

  authRoutes.post("/login",async (req,res)=>{
      const {email ,password}  = req.body;
      const user = await user.userModel.findOne({email})

      if(!user){
        return res.status(404).json({
          message:"user is not exist"
        })
      }
      const isPasswordMatched = user.password===crypto.createHash("md5").update(password).digest("hex")

      if(!isPasswordMatched){
        return res.status(401).json({
          message:"invalid password"
        })
      }
      const token = jwt.sign({
        id:user._id,

      },process.env.JWT_SECRET)

      res.cookie("jwt_token",token)
      res.status(200).json({
      message:"user is logend",
      user,
      })

  })

module.exports = authRoutes;
