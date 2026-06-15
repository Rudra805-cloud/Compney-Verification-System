import Validation from "../models/validation.model.js";
import Company from "../models/company.model.js";
import { validationService } from "../services/validation/index.service.js";
import { normalizeUrl } from "../services/validation/url.service.js";

async function companyValidationController(req, res) {
  try {
    const userId=req.user.id;
    const {force}=req.query
    const { companyName, websiteUrl } = req.body;
    //check inputs
    if (!companyName || !websiteUrl) {
      return res.status(400).json({
        success: false,
        message: "companyName and domain are required"
      });
    }

    //add checing to reduse no of hits of api
   const { hostname,originalUrl } = normalizeUrl(websiteUrl);
    let company = await Company.findOne({
      hostname: hostname
    });
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
     
    if (company && company.lastValidatedAt > oneDayAgo && force !== "true") {
      return res.status(200).json({
        success: true,
        cached: true,
        data: company
      });
    }
    //run validation engine
    const result = await validationService(companyName, hostname);

    if (!company) {
      company = await Company.create({
        companyName: result.companyName,
        websiteUrl:originalUrl,
        hostname: hostname,
        trustScore: result.trustScore.score,
        riskLevel: result.riskLevel,
        summary: result.summary,
        lastValidatedAt: result.lastValidatedAt
      });
    } else {
      company.companyName = result.companyName;
      company.trustScore = result.trustScore.score;
      company.riskLevel = result.riskLevel;
      company.summary = result.summary;
      company.lastValidatedAt = result.lastValidatedAt;
      await company.save();
    }
    //ADD IN VALIDATION MODEL
    await Validation.create({
      userId: userId,
      companyId: company._id,
      checks:result.trustScore.breakdownScore,
      trustScore: result.trustScore.score,
      riskLevel: result.riskLevel,
      summary: result.summary,
      validatedAt: result.lastValidatedAt,
    });
    return res.status(200).json({
      success: true,
      message: "validation done sussesfully",
      data: result
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

export { companyValidationController };
