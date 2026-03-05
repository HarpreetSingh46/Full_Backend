require("dotenv").config()
const app = require("./src/app")
const connectTodb = require("./src/database/database")


connectTodb()
app.listen(3000,function () {
        console.log("server start ");
        
})