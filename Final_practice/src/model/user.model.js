const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name is already exist in database"],
        required:[true ,"Please enter the username...."]
    },
    email:{
        type:String,
        unique:[true,"This email is already exist in database"],
        required:[true,"Enter unique email this is already exisit in database"]
    },
    password:String,
})


const userModel= mongoose.model("user",userSchema);
module.exports =  userModel