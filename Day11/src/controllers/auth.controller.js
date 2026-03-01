const userModel = require("../model/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
async function RegisterController (req, res) {
  const { username, bio, password, email, profileImg } = req.body;
  // const isEmailExist= await userModel.findOne({email});
  // if(isEmailExist){
  //     return res.status(409).json({
  //         message:"user email is already exist",
  //     })
  // }

  // const isUserNameExist = await  userModel.findOne({username});
  // if(isUserNameExist){
  //     return res.status(409).json({
  //         message:"User Name is Already Exist",
  //     })
  // }

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUserExist) {
    return res.status(409).json({
      message:
        "user already exist" +
        (isUserExist.email == email
          ? "Email already exists"
          : "username already exists"),
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const user = await userModel.create({
    username,
    email,
    bio,
    profileImg,
    password: hash,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);
  res.status(201).json({
    message: "user registered successfully",
    user: {
      email: user.email,
      username: user.username,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}


async function loginController (req, res)  {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [
      {
        username: username,
      },
      {
        email: email,
      },
    ],
  });
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  const hash = crypto.createHash("sha256").update(password).digest("hex");
  const isPasswordValid = hash == user.password;
  if (!isPasswordValid) {
    return res.status(401).json({
      message: "passwornd invalid",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SCRET,
    { expiresIn: "1d" },
  );
  res.cookie = ("token", token);

  res.status(200).json({
    message: "user login successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
}


module.exports={
    RegisterController,
    loginController
}