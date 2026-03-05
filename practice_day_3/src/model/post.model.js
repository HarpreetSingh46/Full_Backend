const mongoose = require("mongoose");


const postSchema  =  new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    imgUrl:{
        type:String,
        default:""
    },
    user:{
        ref:"user",
        type: mongoose.Schema.Types.ObjectId,
        required:[true ,"please login user"]
    }
})


const postModel =  mongoose.model("posts",postSchema);

module.exports = postModel;