import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { getHistoryController,getHistoryDetailsController } from "../controllers/history.controller.js";
const historyRouter=Router();

/**
 * @route GET /history?page=2&limit=20
 * @description get history side baar list
 * @access private 
 */

historyRouter.get('/',authMiddleware,getHistoryController);

/**
 * @route GET /api/history/:validationId
 * @description get complete detail of particular item in history sidebar
 * @access private 
 */

historyRouter.get('/:validationId',authMiddleware, getHistoryDetailsController);
// historyRouter.get('/:validationId', (req, res) => {
//   return res.json({
//     id: req.params.validationId
//   });
// });
export {historyRouter}