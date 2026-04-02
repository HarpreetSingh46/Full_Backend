import  express from "express"

import {createServer} from "http"

import {Server} from "socket.io"

import {YSocketIO} from "y-socket.io/dist/server"

const app = express()

app.use(express.static("public"))

const httpSever= createServer(app)
  
const io = new Server(httpSever,{
    cors:{
        origin:"*",
        methods:['GET','POST']
    }
})


const  ySocketIO = new YSocketIO(io)
ySocketIO.initialize()


app.get("/health",function(req,res){
    res.status(200).json({
        message:"OK",
        success:true
    })
})

httpSever.listen(3000,()=>{
    console.log("Server is running  on port 3000")
})

