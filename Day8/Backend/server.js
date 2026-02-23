// server start krna  or database se connect krna
const connectToDb = require("./src/config/dataBase")
const app = require("./src/app")


connectToDb()
app.listen(3000,function(){
    console.log("server is running on port 3000");
    
})
