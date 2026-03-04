const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    imgUrl:{
        type:String,
        required: [true,"enter image url"]

    },
    user:{
       ref:user,
       type:mongoose.Schema.Types.ObjectId,
       required:[true ,"user id is requred for creating user"]
    }
});

const postModel = mongoose.model("posts",postSchema);

module.exports = postModel;