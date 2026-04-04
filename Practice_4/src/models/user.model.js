const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"Username is already exist"],
        required:[true,"username is required"]
    },
    password:String,
    email:{
        type:String,
        unique:[true,"Email is already exist try another email address for login"],
        required:[true,"email is requred"]
    }
});

const userModel = mongoose.model("user",userSchema)

module.exports = userModel