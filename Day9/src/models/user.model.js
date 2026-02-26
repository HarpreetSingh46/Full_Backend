const mongoose = require("mongoose")


const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type:String,
        unique:[true,"WITH THIS EMAIL ACCOUNT ALREADY EXIST"]
    },
    passwornd:String,

})

const userModel = mongoose.model("users",userSchema);

module.exports =userModel