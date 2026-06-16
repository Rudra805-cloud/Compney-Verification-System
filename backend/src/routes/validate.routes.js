import { Router } from "express";
import {companyValidationController} from '../controllers/validate.controllers.js'
import authMiddleware from '../middlewares/auth.middleware.js'

const validateRouter=Router();

/**
 * @route /api/validate/?force=true
 * @description run validation engine
 * @access private 
 */
validateRouter.post('/',authMiddleware,companyValidationController);

export {validateRouter}