import { checks } from "./checks.service.js";

//handel whoisrules
const whoisRules = {
  registered: {
    weight: 5,
    test: (v) => v === true,
  },

  active: {
    weight: 5,
    test: (v) => v === true,
  },

  domainAgeYears: {
    weight: 5,
    test: (v) => v >= 1,
  },

  expired: {
    weight: 5,
    test: (v) => v === false,
  },

  registrar: {
    weight: 3,
    test: (v) => !!v,
  },

  dnsProvider: {
    weight: 2,
    test: (v) => !!v,
  },

  nameserverCount: {
    weight: 2,
    test: (v) => v > 0,
  },

  dnssec: {
    weight: 2,
    test: (v) => v && v !== "unsigned",
  },

  ownerAddress: {
    weight: 1,
    test: (v) => !!v,
  },
};
//handel ssl feild;
const sslRules = {
  valid: {
    weight: 10,
    test: (v) => v === true,
  },

  issuer: {
    weight: 5,
    test: (v) => {
      const trustedIssuers = [
        "let's encrypt",
        "digicert",
        "google trust services",
        "cloudflare",
      ];
      test: (v) => trustedIssuers.includes((v || "").toLowerCase());
    },
  },

  bits: {
    weight: 5,
    test: (v) => v >= 256,
  },

  subjectCN: {
    weight: 5,
    test: (v) => !!v,
  },

  subjectAltNames: {
    weight: 3,
    test: (v) => !!v,
  },

  expired: {
    weight: 10,
    test: (v) => v === false,
  },

  expiringSoon: {
    weight: 5,
    test: (v) => v === false,
  },

  hostnameMatch: {
    weight: 10,
    test: (v) => v === true,
  },

  daysUntilExpiry: {
    weight: 5,
    test: (v) => typeof v === "number" && v > 30,
  },
};
//handel website reachable feild
const websiteReachRules = {
  exists: {
    weight: 10,
    test: (v) => v === true,
  },
  statusCode: {
    weight: 10,
    test: (v) => v >= 200 && v < 500,
  },
};
//contact page reachable feild
const contactRules = {
  emailFound: {
    weight: 6,
    test: (v) => v === true,
  },

  phoneFound: {
    weight: 8,
    test: (v) => v === true,
  },

  contactPageFound: {
    weight: 6,
    test: (v) => v === true,
  },
};
//social link found
const socialRules = {
  linkedInFound: {
    weight: 10,
    test: (v) => v === true,
  },

  twitterFound: {
    weight: 5,
    test: (v) => v === true,
  },

  facebookFound: {
    weight: 5,
    test: (v) => v === true,
  },

  instagramFound: {
    weight: 4,
    test: (v) => v === true,
  },

  socialLinksCount: {
    weight: 6,
    test: (v) => v >= 2,
  },
};
//legel page rule
const legalRules = {
  privacyPolicyFound: {
    weight: 8,
    test: (v) => v === true,
  },

  termsFound: {
    weight: 8,
    test: (v) => v === true,
  },

  aboutPageFound: {
    weight: 6,
    test: (v) => v === true,
  },
};
//carrer page rule
const careerRules = {
  careersPageFound: {
    weight: 6,
    test: (v) => v === true,
  },
};

function calculateScore(checks) {
  let whoisScore = 0;
  let sslScore = 0;
  let maxScore = 0;
  let websiteReachScore = 0;
  let contactScore = 0;
  let socialScore = 0;
  let legalScore = 0;
  let careerScore = 0;
  //woise score
  for (const [field, rule] of Object.entries(whoisRules)) {
    const value = checks.whois?.[field];

    if (rule.test(value)) {
      whoisScore += rule.weight;
    }
    maxScore += rule.weight;
  }
  //ssl score
  for (const [field, rule] of Object.entries(sslRules)) {
    const value = checks.ssl?.[field];

    if (rule.test(value)) {
      sslScore += rule.weight;
    }
    maxScore += rule.weight;
  }
  //website reachable score
  for (const [field, rule] of Object.entries(websiteReachRules)) {
    const value = checks.wesiteReach?.[field];

    if (rule.test(value)) {
      websiteReachScore += rule.weight;
    }
    maxScore += rule.weight;
  }
  //contact page score
  for (const [field, rule] of Object.entries(contactRules)) {
    const value = checks.contactInfo?.[field];

    if (rule.test(value)) {
      contactScore += rule.weight;
    }
    maxScore += rule.weight;
  }
  //social link score
  for (const [field, rule] of Object.entries(socialRules)) {
    const value = checks.socialPresence?.[field];

    if (rule.test(value)) {
      socialScore += rule.weight;
    }
    maxScore += rule.weight;
  }
  //legel pages score
  for (const [field, rule] of Object.entries(legalRules)) {
    const value = checks.legelpages?.[field];

    if (rule.test(value)) {
      legalScore += rule.weight;
    }
    maxScore += rule.weight;
  }
  //carrer page score
  for (const [field, rule] of Object.entries(careerRules)) {
    const value = checks.careersInfo?.[field];

    if (rule.test(value)) {
      careerScore += rule.weight;
    }
    maxScore += rule.weight;
  }
  const totalscore =
    whoisScore +
    sslScore +
    websiteReachScore +
    contactScore +
    socialScore +
    legalScore +
    careerScore;
  const score = (totalscore / maxScore) * 100;
  return {
    score,
    breakdownScore: {
      whoisScore,
      sslScore,
      websiteReachScore,
      contactScore,
      socialScore,
      legalScore,
      careerScore,
    },
  };
}

function getRiskLevel(score) {
  if (score >= 80) return "Low";
  if (score >= 60) return "Medium";
  if (score >= 40) return "High";
  return "Very High";
}

export { calculateScore, getRiskLevel };
