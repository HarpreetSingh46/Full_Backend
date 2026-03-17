import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";
// Register Controller
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const user = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (user) {
    return res.status(400).json({
      success: false,
      message: "Username or email already in use",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const Newuser = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
 await sendEmail({
  to: email,
  subject: "Welcome to our platform",
  html: `<p>Hello ${username},</p>
         <p>Thank you for registering on our platform! We're excited to have you on board.</p>
         <p>Best regards,<br>The Team</p>`,
});
  // Generate JWT token
  const token = jwt.sign(
    { id: Newuser._id, email: Newuser.email },
    process.env.JWT_SECRET,

    { expiresIn: "7d" },
  );
  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",

    Newuser: {
      id: Newuser._id,
      username: Newuser.username,
      email: Newuser.email,
      verified: Newuser.verified,
    },
  });
};
