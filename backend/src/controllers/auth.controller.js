import User from "../models/user.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @name handelUserRegisterController
 * @description Handle user register contain user name ,password etc
 * @access public
 */

async function handelUserRegisterController(req, res) {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //is user already exist
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists) {
      return res.status(400).json({
        success: false,
        message: "User already exist with email",
      });
    }
    //bcrypt password

    const hashPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      username,
      email,
      password: hashPassword,
    });

    //assign token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    return res.status(201).json({
      success: true,
      message: "User Register successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
/**
 * @name handelUserLoginController
 * @description Handle user register contain user name ,password etc
 * @access public
 */

async function handelUserLoginController(req, res) {
  try {
    console.log(req.body);
    
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //search in db
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    //compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { handelUserRegisterController, handelUserLoginController };
