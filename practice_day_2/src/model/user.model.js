const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:[true,"This email is already exisit"],
        required : [true,'Please write your email , Email is required']
    },
    password:String,
})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel