const postModel = require("../model/post.model");
const jwt = require("jsonwebtoken")
const ImageKit = require("@imagekit/nodejs")
const {toFile} = require("@imagekit/nodejs")
const imagekit = ImageKit({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY
})

async function createPostController(req,res){
    console.log(req.body,req.file)
    const token  = req.cookies.token
    if(!token){
       return res.status(401).json({
        message:"token not provide"

       })
    }
    let decoded = null;
    try{

         decoded = jwt.verify(token.process.env.JWT_SCRET)
    }catch(err){
      return  res.status(409).json({
            message:"unauthorised user",
        })
    }

    const file =  await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer),'file'),
        fileName:"test"
    })
 const post = await postModel.create({
    caption:req.body.caption,
    imgUrl:file.url,
    user:decoded.id
 })
 res.status(201).json({
    message: "post created successfully",
    post 
 })
}


module.exports ={
    createPostController
}