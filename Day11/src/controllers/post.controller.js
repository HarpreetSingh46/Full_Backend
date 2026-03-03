const postModel = require("../model/post.model");
const jwt = require("jsonwebtoken");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const imagekit = ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {

  const token = req.cookies.token;

  let decoded = null;
  try {
    decoded = jwt.verify(token.process.env.JWT_SCRET);
  } catch (err) {
    return res.status(409).json({
      message: "unauthorised user",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "test",
  });
  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });
  res.status(201).json({
    message: "post created successfully",
    post,
  });
}
async function getPostController(req,res){

    const token  = req.cookies.token
        if(!token){
      return res.status(401).json({
        message:"unauthorised acess"
      })
    }

  let decoded= null;
    try{
       decoded =  jwt.verify(token.process.env.JWT_SCRET)

    }catch(err){
      return  res.status(401).json({
        message:"token invalid"
      })
    }
     const userId= decoded.id;
     const posts = await postModel.find({
      user:userId
    })

    res.status(200).json({
      message:"posts fetched successfully",
      posts
    })

}

async function getPostDetails(req,res){
    const token = req.cookies.token;
    if(!token){
      return res.status(401).json({
        message:"unauthorised acess"
      })
    }
    let decoded =null;

    try{
      decoded = jwt.verify(token.process.env.JWT_SCRET)

    }catch(err){
      return res.status(401).json({
        message:"invalid token"
      })
    }
    const userId= decoded.id;
    const postId = req.params.postId;
    const post = await postModel.findById(postId)
    if(!post){
      return  res.status(404).json({
        message:"post not found"
      })
    }
  const isValidUser= post.user.toString() === userId;
  if(!isValidUser){
    return res.status(403).json({
      message:"forrbidden Content"
    })
  }
  return res.status(200).json({
    message:"Post fetched succeffully",
    post
  })

}


module.exports = {
  createPostController,
  getPostController,
  getPostDetails,
};
