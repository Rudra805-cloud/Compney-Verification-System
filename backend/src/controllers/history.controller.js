//kya chiye
//histroy model
import Validation from "../models/validation.model.js";
async function historyController(req, res) {
  try {
    const userId = req.user.id;
    // const history = await Validation.findOne({
    //   userId,
    // });
    const history = await Validation.find({
      userId,
    })
      .populate(
        "companyId",
        "companyName hostname websiteUrl trustScore riskLevel",
      )
      .sort({ validatedAt: -1 });
    if (history.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No history found",
      });
    }

    console.log(history);
    return res.status(200).json({
      success: true,
      message: "history fecth sussesfully",
      data: history,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
export { historyController };
