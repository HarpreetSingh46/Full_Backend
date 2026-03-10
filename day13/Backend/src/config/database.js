const mongosse = require("mongoose")



async function ConnectTODb() {

    await  mongosse.connect(process.env.MONGO_URI);
    console.log("Mongo connected successfully");
    
    
}


module.exports = ConnectTODb