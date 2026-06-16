import { normalizeInput } from "./normalize.service.js";
import {normalizeUrl} from "./url.service.js"
import { checks } from "./checks.service.js";
import {calculateScore,getRiskLevel} from "./score.service.js"
import getSummary from "./summary.service.js";

async function validationService(companyName, websiteUrl) {
    //url and website noremalisation 
 const normalized=await normalizeInput(companyName, websiteUrl);
   //website url proper website devives 
 const updatedUrl=await normalizeUrl(normalized.websiteUrl);
  // apply cheks
  const validationChecks=await checks(updatedUrl.hostname,normalized.companyName);
  //get score
  const trustScore=await calculateScore(validationChecks);
  //get risk level
  const riskLevel=await getRiskLevel(trustScore.score);
    // Temporary summary
  const summary =await  getSummary(
    trustScore,
    riskLevel,
    updatedUrl.hostname,
    normalized.companyName,
    validationChecks
  );
    return {
    companyName: normalized.companyName,
    hostname: updatedUrl.hostname,
    websiteUrl:updatedUrl.originalUrl,
    checks: validationChecks,
    trustScore,
    riskLevel,
    summary,

    lastValidatedAt: new Date()
  };


}
export { validationService };
