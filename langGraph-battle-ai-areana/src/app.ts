import express from 'express'
import  useGraph from "./services/graph.ai.services.js"
const app = express()

app.get("/health",function(req,res){
    res.status(200).json({
        status:'OK'
    })
})

app.post("/use-graph", async (req,res)=>{
        await useGraph("What is the capital of france")
})

export default app;