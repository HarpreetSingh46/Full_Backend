const mongoose = require("mongoose")

const blacklistSchema =  new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required for blacklist"],
    },
},{
    timestamps:true
})


const blackListModel = mongoose.model("blackList", blacklistSchema)


module.exports =  blackListModel 