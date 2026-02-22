const express = require("express")
const app = express()
const noteModel = require("./models/notes.modle")

app.use(express.json())

app.post("/notes",async function(req,res){
    const {title,description,age} = req.body;
 const  note =  await  noteModel.create({
        title,
        description,
        age,
    })
    res.status(201).json({
        message:"note created successfully",
        note
    })  
})


module.exports= app