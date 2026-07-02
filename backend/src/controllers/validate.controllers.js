import Validation from "../models/validation.model.js";
import Company from "../models/company.model.js";
import { validationService } from "../services/validation/index.service.js";
import { normalizeUrl } from "../services/validation/url.service.js";

async function companyValidationController(req, res) {
  try {
      const userId = req.user.id;
  const { websiteUrl } = req.body;

  if (!websiteUrl) {
    return res.status(400).json({
      success: false,
      message: "website required are required",
    });
  }

  const { force: forceQuery } = req.query;
  const force = forceQuery === "true";

  const { hostname, originalUrl } = normalizeUrl(websiteUrl);

  let company = await Company.findOne({ hostname });

  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const isStale = !company || company.lastValidatedAt < oneDayAgo;

  // CACHE RETURN
  if (company && !force && !isStale) {
    await Validation.create({
        userId,
        companyId: company._id,
        appliedChecks: company.appliedChecks,
        trustScore: company.trustScore,
        riskLevel: company.riskLevel,
        summary: company.summary,
        searchedAt: new Date(),,
      });
    return res.json({
      success: true,
      cached: true,
      data: company,
    });
  }

    // if (company && company.lastValidatedAt < oneDayAgo && force !== "true") {
    //   await Validation.create({
    //     userId,
    //     companyId: company._id,
    //     appliedChecks: company.appliedChecks,
    //     trustScore: company.trustScore,
    //     riskLevel: company.riskLevel,
    //     summary: company.summary,
    //     validatedAt: company.lastValidatedAt,
    //   });
    //   return res.status(200).json({
    //     success: true,
    //     cached: true,
    //     data: company,
    //   });
    // }
    //run validation engine
    const result = await validationService(hostname);

    if (!company) {
      company = await Company.create({
        websiteUrl: originalUrl,
        hostname: hostname,
        trustScore: result.trustScore.score,
        appliedChecks: result.trustScore.breakdownScore,
        riskLevel: result.riskLevel,
        summary: result.summary,
        lastValidatedAt: result.lastValidatedAt,
      });
    } else {
      company.trustScore = result.trustScore.score;
      company.appliedChecks = result.trustScore.breakdownScore;
      company.riskLevel = result.riskLevel;
      company.summary = result.summary;
      company.lastValidatedAt = result.lastValidatedAt;
      await company.save();
    }
    //ADD IN VALIDATION MODEL
    await Validation.create({
      userId: userId,
      companyId: company._id,
      appliedChecks: result.trustScore.breakdownScore,
      trustScore: result.trustScore.score,
      riskLevel: result.riskLevel,
      summary: result.summary,
      searchedAt: new Date()
    });
    return res.status(200).json({
      success: true,
      message: "validation done sussesfully",
      data: company,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export { companyValidationController };
