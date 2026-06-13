import { checks } from "./checks.service.js";

const SCORE_RULES = {
  websiteExists: 20,
  sslEnabled: 20,
  contactInfoFound: 20,
  linkedInFound: 20,
};
const DOMAIN_AGE_MAX = 20;
const MAX_SCORE =
  Object.values(SCORE_RULES).reduce((a, b) => a + b, 0) + DOMAIN_AGE_MAX;


function calculateScore(checks) {
    let score=0;
    for(const key in SCORE_RULES){
       if(checks[key]){
        score+=SCORE_RULES[key]
       }
    }
     // special rule: domain age (numeric logic)
  if (typeof checks.domainAgeYears === "number") {
    if (checks.domainAgeYears >= 3) score += 20;
    else if (checks.domainAgeYears >= 1) score += 10;
    else score += 0;
  }
    return (score/MAX_SCORE)*100;
}

function  getRiskLevel(score) {
  if (score >= 90) return "Very Low";
  if (score >= 75) return "Low";
  if (score >= 60) return "Midium";
  if (score >= 40) return "High";
  return "Very High";
}

export {calculateScore,getRiskLevel}


