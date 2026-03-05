const mongoose = require("mongoose")

async function ConnectTodb(){
    await mongoose.connect(process.env.MONGO_URI);
    console.log("server is running");
    
}


module.exports = ConnectTodb