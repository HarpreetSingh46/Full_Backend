import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

async function sendTokenResponse(user, res, message) {
  const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.cookie = ("token", token);

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      contact: user.contact,
      role: user.role,
    },
  });
}

export const register = async (req, res) => {
  const { email, password, fullName, contact ,isSeller } = req.body;

  try {
    const existingUser = await userModel.findOne({
      $or: [{ email }, { contact }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email or contact number already exists",
      });
    }
    const user = await userModel.create({
      fullName,
      email,
      password,
      contact,
      role: isSeller ? "seller" : "buyer",
    });

    await sendTokenResponse(user, res, "Registration successful");
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error" });
  }
};


