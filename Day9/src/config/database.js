const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(function(){
        console.log("connected To Db");
        
    })
}

module.exports = connectToDb