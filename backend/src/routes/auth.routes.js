import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {handelUserRegisterController,handelUserLoginController,handelProfileController} from "../controllers/auth.controller.js"
const authRouter=Router();

/**
 * @route POST /api/auth/register
 * @description Register new user
 * @access public 
 */

authRouter.post("/register",handelUserRegisterController);
/**
 * @route POST /api/auth/login
 * @description Login a user
 * @access public 
 */
authRouter.post("/login",handelUserLoginController)

/**
 * @route get /api/auth/profile
 * @description Get details of loged in user 
 * @access public 
 */

authRouter.get("/profile",authMiddleware,handelProfileController)



export {authRouter}