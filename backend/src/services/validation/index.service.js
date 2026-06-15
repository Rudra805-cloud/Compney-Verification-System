import { normalizeInput } from "./normalize.service.js";
import {normalizeUrl} from "./url.service.js"
import { checks } from "./checks.service.js";
import {calculateScore,getRiskLevel} from "./score.service.js"


async function validationService(companyName, websiteUrl) {
    //url and website noremalisation 
 const normalized=normalizeInput(companyName, websiteUrl);
   //website url proper website devives 
 const updatedUrl=normalizeUrl(normalized.websiteUrl);
  // apply cheks
  const validationChecks=await checks(updatedUrl.hostname,normalized.companyName);
  //get score
  const trustScore=calculateScore(validationChecks);
  //get risk level
  const riskLevel=getRiskLevel(trustScore.score);
    // Temporary summary
  const summary = "Validation completed successfully";
  
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
