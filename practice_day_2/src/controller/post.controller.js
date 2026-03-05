const postModel = require("../model/post.model")
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const imagekit = ImageKit({
     privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
})





async function CreatePost(req,res){
    const token = req.cookies.token;
    let decoded = null;
    try{
        decoded = jwt.verify(token,process.env.IMAGEKIT_PRIVATE_KEY)
    }catch(err){
        return res.status(404).json({
            message:"Unauthorised user"
        })
    }

    const file = await  imagekit.files.upload({
        file: toFile(Buffer.from(req.files.buffer),"files"),
        fileName:"files"
    })

    const post =  await  postModel.create({
        capiton:req.body.capiton,
        imgUrl:file.url,
        user:decoded.id,
    })

    res.status(201).json({
        message:"Post created successfully",
        post,
    })
}
 
async function Getpost(req,res){
    const token = req.cookies.token;

    if(!token){
        return res.status(404).json({
            message:"Unauthorised user"
        })
    }

    let decoded=null;
    try{
        decoded =  jwt.verify(token,process.env.IMAGEKIT_PRIVATE_KEY)
    }catch(err){
        return res.status(404).json({
            message:"invalid token id"
        })

    }

    const userId= decoded.id;
    const post = await postModel.find({
        user:userId,
    })

    res.status(201).json({
        message:"post fetched successfully",
        post,
    })
}


module.exports= {
    CreatePost,
    Getpost
}