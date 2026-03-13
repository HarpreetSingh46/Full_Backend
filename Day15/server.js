import app from "./src/app.js";
import { createServer } from "http";
import { Server }  from "socket.io";







const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
  console.log("new connection created")

  socket.on("message",function(msg){
    console.log("user fired message event")
    console.log(msg)
    io.emit("abc")
  })
});


// socket.emit()
// socket.broadcast().emit()
// io.emit()









httpServer.listen(3000,function(){
    console.log("server is running at port 3000")
});