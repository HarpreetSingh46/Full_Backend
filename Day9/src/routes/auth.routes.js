const express = require("express");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const authRoutes = express.Router();

authRoutes.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const isUserAlreadyExist = await userModel.findOne({ email });


  if (isUserAlreadyExist) {
    return res.status(409).json({
      message: "user already exisit please change your email or password",
    });
  }

  


  const user = await userModel.create({
    email,
    password,
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

module.exports = authRoutes;
