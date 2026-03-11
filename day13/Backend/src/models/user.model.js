const mongoose  = require("mongoose");

const userSchema  = new mongoose.Schema({
    username:{
        type:String,
        unique:[true ,"username is already required"],
        required:[true ,"user is required"]
    },
    email:{
        type:String,
        unique:[true ,"Email is already required"],
        required:[true ,"Email is required"]
    },
    password : {
        type :String,
        required:[true ,"Password is required"],
        select : false
    }
})

const userModel  = mongoose.model("user",userSchema);


module.exports =  userModel;