const mongoose = require("mongoose")


const user = userSchema= new mongoose.Schema({
    name:String,
    email:{
        type:String,
        unique:[true,'email alreadyy exist']
    },
    password :String,
})


const userModel = mongoose.model("user",userSchema);

module.exports = userModel