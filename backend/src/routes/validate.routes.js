import { Router } from "express";
import {companyValidationController} from '../controllers/validate.controllers.js'

const validateRouter=Router();

/**
 * @route /api/validate/?force=true
 * @description run validation engine
 * @access public 
 */
validateRouter.post('/',companyValidationController);

export {validateRouter}