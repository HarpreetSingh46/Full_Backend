const mongoose = require("mongoose")

const connectToDb=()=>{
        mongoose.connect(process.env.MONGO_URI)
        console.log("connect to Mongo database")
}

module.exports = connectToDb