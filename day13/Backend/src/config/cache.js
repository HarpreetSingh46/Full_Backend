const Redis = require("ioredis").default

const redis = new Redis({
    host:process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
})



redis.on("connect",function(){
    console.log("server is connect to redis")
})

redis.on("error",function(){
    console.log(error)
})


module.exports = redis