const express  = require("express")
const app = express() // server instance create 



app.get("/",function(req,res){
    app.res("hlo world")
})


app.listen(3000)  // server start request 