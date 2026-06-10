import User from "../models/user.model.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

/**
 * @name handelUserRegisterController
 * @description Handle user register contain user name ,password etc
 * @access public
 */

async function handelUserRegisterController(req, res) {
 //Data Extract
 console.log(req.body);
 
  const { username, password, email } = req.body;
  if (!username  || !password || !email) {
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
   const user=await User.create({
        username,
        email,
        password: hashPassword
    })

    //assign token
    const token=jwt.sign(
        {
            id:user._id,
            username:user.username
        },
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
    )
    
    return res.status(201).json({
        success: true,
        message:"User Register successfully",
        token,
        user : {
            id:user._id,
            username:user.username,
            email:user.email
        }
    })
}

export {handelUserRegisterController}
