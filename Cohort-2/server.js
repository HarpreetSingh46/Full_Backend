import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";

import Redis from "ioredis";    

import {User} from "./models/user.models.js"


const connectToMongoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDb");
    }catch(error){
        console.error("Error connecting  to MongoDb",error)
    }
}

connectToMongoDB();

const redis = new Redis(process.env.REDIS_URI)

redis.once("ready",()=>{
    console.log("Connected to Redis")
})


const app =  express();
app.use(morgan("dev"))
app.use(express.json())



app.get("/users/:id", async (req,res)=>{
    try{
        const user =  await User.findOne({_id: req.params.id});
        res.json({
            message:"user fetch sucessfully",
            data : user
        });
    }catch(error){
        res.status(500).json({
            error :'Error fetching  user'
        })
    }
})

app.post("/user", async (req,res)=>{
    try{
        const newUser =  new User(req.body);
        await  newUser.save();
        res.json({
            message:"User created successfully",
            data:newUser
        });
        
    }catch(error){
        res.status(500).json({
            error :"Error creating user"
        })
    }
})


const PORT  =  process.env.PORT ||  3000;
app.listen(PORT,()=>{
    console.log(` SERVER IS RUNNING ON PORT ${PORT}`)
})