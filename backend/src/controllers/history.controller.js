//kya chiye
//histroy model
import Validation from "../models/validation.model.js";

/**
 * @name getHistoryController
 * @description history side bar for user to see his past search
 * @access protected
 */
async function getHistoryController(req, res) {
  try {
    const userId = req.user.id;
    // const history = await Validation.findOne({
    //   userId,
    // });
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;
    const history = await Validation.find({ userId })
      .sort({ validatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .select("_id validatedAt")
      .populate("companyId", "companyName hostname");
    if (history.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No history found",
      });
    }
    const total = await Validation.countDocuments({ userId });
    return res.status(200).json({
      success: true,
      message: "history fecth sussesfully",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
/**
 * @name getHistoryDetailsController
 * @description get complete deatil of a particular history
 * @access protected
 */
async function getHistoryDetailsController(req, res) {
  try {
    const validationId = req.params.validationId;
    const detailedHistory = await Validation.findOne({
      _id: validationId,
    }).populate(
    "companyId",
    "companyName hostname websiteUrl"
  );
  return res.status(200).json({
      success: true,
      message: "history fecth sussesfully",
      data: detailedHistory,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { getHistoryController,getHistoryDetailsController};
