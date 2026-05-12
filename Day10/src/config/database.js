const mongoose = require("mongoose")
function  connectToDb(){
    
    mongoose.connect('mongodb://localhost:27017/')
    .then(()=>{
        console.log("connect to the database..... \nConnected Successfully");
        console.log("Server Starting......... ")
    })
}
module.exports =connectToDb
