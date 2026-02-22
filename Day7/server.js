require("dotenv").config()
const app = require("./src/app")
const connectToDb= require("./src/config/database")


connectToDb()

app.listen(3000,function(){
    console.log("server is connecting please wait....");
    
})