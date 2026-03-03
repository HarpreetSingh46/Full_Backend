const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:[true,"This email is already exist"],
        required:[true,"Email is required"]
    },
    password:String,
})


const userModel = mongoose.model("user",userSchema);

module.exports = userModel