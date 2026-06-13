import { Router } from "express";
import {companyValidationController} from '../controllers/validate.controllers.js'

const validateRouter=Router();

/**
 * @route req of search about company /api/validate
 * @description Get details of loged in user 
 * @access public 
 */
validateRouter.post('/',companyValidationController);

export {validateRouter}