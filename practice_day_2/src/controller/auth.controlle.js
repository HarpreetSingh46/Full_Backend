const cookie = require("cookie-parser");
const bcrypt = require("bcryptjs");
const jwt= require("jsonwebtoken");
const userModel = require("../model/user.model")
async function UserRegistration(req,res){

    const {username , email , password} = req.body;
    const isEmailExist = await userModel.findOne({email});
    if(isEmailExist){
        return res.status(409).json({
            message:"This email is already exist in database"
        })
    }

    const userName= await userModel.findOne({username});
    if(userName){
        return res.status(409).json({
            message:"Username is already exist try unique username"
        })
    }
    const hash =  await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash,
    })
    const token = jwt.sign({
        id:user._id
    },process.env.JWT_SCRET,{expiresIn:"1d"},)

    res.cookie("token",token);
    res.status(201).json({
        username:user.username,
        email:user.email,
        password:user.password,
    })
}

 async function LoginUser(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });
  if (!user) {
    return res.status(404).json({
      message: "User is not exist",
    });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    return res.status(404).json({
      message: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCRET,
    { expiresIn: "1d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "user logged in successfully",
    user: {
      username: user.username,
      email: user.email,
    },
  });
}

module.exports ={
     UserRegistration,
    LoginUser,
    }