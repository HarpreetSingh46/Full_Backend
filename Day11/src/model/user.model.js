const mongoose = require("mongoose")



const userSchema = new mongoose.Schema({
    username:{
        type:String,
        uniqure:[true,"user name already exist"],
        required:[true,"user name is required"]
    },
    email:{
        type :String,
        uniqure:[true,"email already exist"],
        required :[true,"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    bio:String,
    profileImg:{
        type:String,
        default:"https://ik.imagekit.io/b3phfycer/default-avatar-profile-icon-vector-social-media-user-image-182145777.webp"
    }
    
})


const userModel = mongoose.model("user",userSchema)

module.exports = userModel