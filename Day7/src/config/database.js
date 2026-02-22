const mongoose = require("mongoose")

function connectToDb(){
     mongoose.connect("mongodb://localhost:27017")
     .then(()=>{
        console.log("connecting......")
     })
    }
module.exports=connectToDb