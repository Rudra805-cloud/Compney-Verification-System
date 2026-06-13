import { checks } from "./checks.service.js";

const SCORE_RULES = {
  websiteExists: 20,
  sslEnabled: 20,
  contactInfoFound: 20,
  linkedInFound: 20,
  domainAgeValid: 20
};

function calculateScore(checks) {
    let score=0;
    for(const key in SCORE_RULES){
       if(checks[key]){
        score+=SCORE_RULES[key]
       }
    }
    
    return score;
}

function  getRiskLevel(score) {
  if (score >= 90) return "Very Low";
  if (score >= 75) return "Low";
  if (score >= 60) return "Midium";
  if (score >= 40) return "High";
  return "Very High";
}

export {calculateScore,getRiskLevel}


