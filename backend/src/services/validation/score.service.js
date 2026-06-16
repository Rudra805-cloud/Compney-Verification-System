// scoring.service.js
// const whoisRules = {
//   registered: { weight: 5, test: (v) => v === true },
//   active: { weight: 5, test: (v) => v === true },
//    domainAgeYears: {
//   weight: 10,
//   test: (v) => {
//     if (v >= 10) return true;
//     if (v >= 5) return 0.7;
//     if (v >= 2) return 0.4;
//     return false;
//   }
// }, 
//   expired: { weight: 5, test: (v) => v === false },
//   registrar: { weight: 3, test: (v) => !!v },
//   dnsProvider: { weight: 2, test: (v) => !!v },
//   nameserverCount: { weight: 2, test: (v) => v > 0 },
//   dnssec: { weight: 2, test: (v) => v && v !== "unsigned" },
//   ownerAddress: { weight: 5, test: (v) => !!v },

// import getLegalPages from "./legal.service";

// };
const whoisRules = {
  registered: { weight: 5, test: (v) => v === true },

  active: { weight: 5, test: (v) => v === true },

  domainAgeYears: {
    weight: 25,
    test: (v) => {
      if (v >= 15) return true;
      if (v >= 10) return 0.9;
      if (v >= 5) return 0.7;
      if (v >= 1) return 0.4;
      return false;
    },
  },

  expired: { weight: 8, test: (v) => v === false },

  registrar: { weight: 4, test: (v) => !!v },

  dnsProvider: { weight: 2, test: (v) => !!v },

  nameserverCount: { weight: 2, test: (v) => v > 0 },

  dnssec: { weight: 4, test: (v) => v && v !== "unsigned" },

  ownerAddress: { weight: 1, test: (v) => !!v },
};

// const sslRules = {
//   valid: { weight: 10, test: (v) => v === true },
//   issuer: {
//     weight: 5,
//     test: (v) =>
//       [
//         "let's encrypt",
//         "digicert",
//         "google trust services",
//         "cloudflare",
//       ].includes((v || "").toLowerCase()),
//   },
//   bits: { weight: 8, test: (v) => v >= 256 },
//   subjectCN: { weight: 8, test: (v) => !!v },
//   subjectAltNames: { weight: 8, test: (v) => !!v },
//   expired: { weight: 10, test: (v) => v === false },
//   expiringSoon: { weight: 5, test: (v) => v === false },
//   hostnameMatch: { weight: 10, test: (v) => v === true },
//   daysUntilExpiry: { weight: 5, test: (v) => typeof v === "number" && v > 30 },
// };
const sslRules = {
  valid: { weight: 15, test: (v) => v === true },

  hostnameMatch: {
    weight: 15,
    test: (v) => v === true,
  },

  expired: {
    weight: 15,
    test: (v) => v === false,
  },

  bits: {
    weight: 10,
    test: (v) => v >= 256,
  },

  issuer: {
    weight: 5,
    test: (v) =>
      [
        "let's encrypt",
        "digicert",
        "google trust services",
        "cloudflare",
      ].includes((v || "").toLowerCase()),
  },

  subjectCN: { weight: 5, test: (v) => !!v },

  subjectAltNames: { weight: 5, test: (v) => !!v },

  daysUntilExpiry: {
    weight: 5,
    test: (v) => typeof v === "number" && v > 30,
  },

  expiringSoon: {
    weight: 5,
    test: (v) => v === false,
  },
};

const websiteReachRules = {
  exists: { weight: 8, test: (v) => v === true },
  statusCode: { weight: 8, test: (v) => v >= 200 && v < 500 },
};

const contactRules = {
  emailFound: { weight: 6, test: (v) => v === true },
  phoneFound: { weight: 5, test: (v) => v === true },
  contactPageFound: { weight: 6, test: (v) => v === true },
};

const socialRules = {
  linkedInFound: { weight: 2, test: (v) => v === true },
  twitterFound: { weight: 2, test: (v) => v === true },
  facebookFound: { weight: 2, test: (v) => v === true },
  instagramFound: { weight: 2, test: (v) => v === true },
  socialLinksCount: { weight: 2, test: (v) => v >= 2 },
};

const legalRules = {
  privacyPolicyFound: { weight: 10, test: (v) => v === true },
  termsFound: { weight: 10, test: (v) => v === true },
  aboutPageFound: { weight: 10, test: (v) => v === true },
};

const careerRules = {
  careersPageFound: { weight: 10, test: (v) => v === true },
};

//confidence
function getConfidence(checks) {
  const sections = {
    whois: {
      weight: 50,
      rules: whoisRules,
    },

    ssl: {
      weight: 25,
      rules: sslRules,
    },

    websiteReach: {
      weight: 10,
      rules: websiteReachRules,
    },

    contactInfo: {
      weight: 5,
      rules: contactRules,
    },

    legalpages: {
      weight: 5,
      rules: legalRules,
    },

    socialPresence: {
      weight: 3,
      rules: socialRules,
    },

    careersInfo: {
      weight: 2,
      rules: careerRules,
    },
  };

  let earned = 0;
  let possible = 0;

  for (const [sectionName, sectionConfig] of Object.entries(sections)) {
    const data = checks?.[sectionName] || {};
    const fields = Object.keys(sectionConfig.rules);

    const fieldWeight = sectionConfig.weight / fields.length;

    for (const field of fields) {
      possible += fieldWeight;

      if (data[field] !== null && data[field] !== undefined) {
        earned += fieldWeight;
      }
    }
  }

  return Math.round((earned / possible) * 100);
}
// ─── helper: score one section ───────────────────────────────────────────────
function scoreSection(data, rules) {
  let earned = 0;
  let possible = 0;

  for (const [field, rule] of Object.entries(rules)) {
    const value = data?.[field];
    possible += rule.weight;

    if (value === null || value === undefined) continue;

    const result = rule.test(value);
     
    if (result === true) {
      earned += rule.weight;
    } 
    else if (result === false || result === 0) {
      earned += 0;
    } 
    else if (typeof result === "number") {
      earned += rule.weight * result; // 🔥 FIX: partial scoring works now
    }
  }

  if (possible === 0) return 0;
  return Math.round((earned / possible) * 100);
}




function calculateScore(checks) {
  // hard block — unreachable site is always Very High risk
  if (!checks.websiteReach?.exists &&
   !checks.ssl?.valid &&
   !checks.whois?.registered) {
    return {
      score: 0,
      breakdownScore: {
        whoisScore: 0,
        sslScore: 0,
        websiteReachScore: 0,
        contactScore: 0,
        socialScore: 0,
        legalScore: 0,
        careerScore: 0,
      },
    };
  }
  const confidence = getConfidence(checks);

  // score each section independently (0–100)
  const whoisScore = scoreSection(checks.whois, whoisRules);
  const sslScore = scoreSection(checks.ssl, sslRules);
  const websiteReachScore = scoreSection(
    checks.websiteReach,
    websiteReachRules,
  );
  const contactScore = scoreSection(checks.contactInfo, contactRules);
  const socialScore = scoreSection(checks.socialPresence, socialRules);
  const legalScore = scoreSection(checks.legalpages, legalRules);

  const careerScore = scoreSection(checks.careersInfo, careerRules);
let score
score = Math.round(
  whoisScore * 0.45 +
  sslScore * 0.30 +
  websiteReachScore * 0.10 +
  contactScore * 0.06 +
  legalScore * 0.04 +
  socialScore * 0.03 +
  careerScore * 0.02
);


const hasTrustSignal =
  checks.contactInfo?.emailFound ||
  checks.contactInfo?.phoneFound ||
  checks.careersInfo?.careersPageFound ||
  checks.legalpages?.privacyPolicyFound ||
  checks.legalpages?.termsFound ||
  checks.legalpages?.aboutPageFound;

// trusted old domain handle
// Suspicious domain
if (
  checks.whois?.domainAgeYears < 1.5 && whoisScore<60 &&
  !hasTrustSignal
) {
  score = Math.min(score, 70);
}

// Trusted old domain
if (
  checks.whois?.domainAgeYears >= 10 &&
  whoisScore>70 &&
  sslScore > 60 &&
  hasTrustSignal
) {
  score = Math.max(score, 80);
}

  score= Math.max(0, Math.min(score, 100));
  return {
    score,
     confidence,
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

export { calculateScore, getRiskLevel }
