const express = require("express")
const app = express()


app.use(express.json())


const notes=[
    {
        title:"test title 1",
        description:"test description 1"
    },
    {
        title:"test title 2",
        description:"test description 2"
    }
]


    app.post("/notes",function(req,res){
        console.log(req.body)
        res.send("note created")

        notes.push(req.body)
        res.send("note created")
    })

    app.get("/notes",function(req,res){
        res.send(notes)
    })

app.get("/",function(req,res){
    res.send("hlo  world")
})

app.get("/about",function(req,res){
    res.send("this is about page ......")
})

app.listen(3000)