const mongoose =  require("mongoose");

const userSchema =  new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"This username is already exist"],
        required:[true,"Enter your username"],
    },
    email:{
        type:String,
        unique:[true , "This email is already exist"],
        required:[true,"enter your email "]
    },
    password:String,
})


const userModel = mongoose.model("user",userSchema);
module.exports = userModel;