const mongoose = require("mongoose")


function connectToDb(){
    mongoose.connect("mongodb://localhost:27017")
    .then(function(){
        console.log("Connected to DB");
        
    })
}
module.exports= connectToDb