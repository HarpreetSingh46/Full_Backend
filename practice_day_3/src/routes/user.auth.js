const express = require("express");
const authRoute = express.Router();
const userModel =require("../model/user.model")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

authRoute.post("/register", async function (req, res) {
  const { username, email, password } = req.body;
  const isUserNameExist = await userModel.findOne({ username });
  if (isUserNameExist) {
    return res.status(409).json({
      message: "this username is already exist in database ",
    });
  }

  const isEmailIsExist = await userModel.findOne({ email });
  if (isEmailIsExist) {
    return res.status(409).json({
      message: "this email is already exist in database",
    });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user register successfully",
    user,
  });
});


authRoute.post("/login", async function(req,res){
    const{username , email , password}= req.body;
    const user = await userModel.findOne({
        $or:[
            {email},
            {username},
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"unauthorised user"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(409).json({
            message:"your password is wrong"
        })
    }
    const token  = jwt.sign({
        id:user._id
    },process.env.JWT_SCRET,{expiresIn:"1d"},)
    res.cookie("token",token)
    res.status(201).json({
        message:"user logged in successfully",
        user:{
            user:user.username,
            email:user.email,
        }
    })
})


module.exports = authRoute