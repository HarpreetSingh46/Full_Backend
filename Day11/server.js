require("dotenv").config()
const app = require("./src/app")
const connectodb= require("./src/config/database")



connectodb()
app.listen(3000,function(){
    console.log("server start");
    
})        