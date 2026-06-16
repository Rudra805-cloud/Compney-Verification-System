import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { historyController } from "../controllers/history.controller.js";
const historyRouter=Router();

/**
 * @route /api/validate/?force=true
 * @description run validation engine
 * @access private 
 */

historyRouter.get('/',authMiddleware,historyController);

export {historyRouter}