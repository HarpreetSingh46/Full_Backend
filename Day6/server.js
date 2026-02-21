const app = require("./src/app")
const mongoose = require("mongoose")

function connectToDb(){
    mongoose.connect("mongodb://localhost:27017")
    .then(()=>{
        console.log("server is start ")
    })
}
connectToDb()
app.listen(3000,function(){
    console.log("server is running on port 3000");
    
})









