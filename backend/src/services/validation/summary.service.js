async function getSummary(trustScore, riskLevel, hostname,checks) {
  try {
    const {
      whois,
      ssl,
      websiteReach,
      contactInfo,
      socialPresence,
      legalpages,
      careersInfo,
    } = checks;

    const lines = [];

    // Header
    lines.push(
      `The company (${hostname}) received a Trust Score of ${trustScore.score}/100 and is classified as ${riskLevel} Risk.`
    );

    lines.push("");

    // Insights
    lines.push("Insights:");

    lines.push(
      `• WHOIS (${trustScore.breakdownScore.whoisScore}): ${
        whois?.registered
          ? `Domain is ${whois.domainAgeYears || "unknown"} years old and active.`
          : "Domain registration data not fully available."
      }`
    );

    lines.push(
      `• SSL (${trustScore.breakdownScore.sslScore}): ${
        ssl?.valid
          ? `Secure certificate issued by ${ssl.issuer}, valid encryption enabled.`
          : "No valid SSL certificate detected."
      }`
    );

    lines.push(
      `• Website Reach (${trustScore.breakdownScore.websiteReachScore}): ${
        websiteReach?.exists
          ? "Website is reachable and responding normally."
          : "Website is not reachable or unstable."
      }`
    );

    lines.push(
      `• Contact (${trustScore.breakdownScore.contactScore}): ${
        contactInfo?.emailFound || contactInfo?.phoneFound
          ? "Contact information is available."
          : "No reliable contact information found."
      }`
    );

    lines.push(
      `• Legal (${trustScore.breakdownScore.legalScore}): ${
        legalpages?.privacyPolicyFound ||
        legalpages?.termsFound ||
        legalpages?.aboutPageFound
          ? "Some legal/transparency pages are present."
          : "Legal and transparency pages are missing."
      }`
    );

    lines.push("");

    // Risk flags
    const risks = [];

    if (whois?.domainAgeYears < 1)
      risks.push("New domain detected (< 1 year)");

    if (!ssl?.valid) risks.push("SSL certificate missing or invalid");

    if (!contactInfo?.emailFound && !contactInfo?.phoneFound)
      risks.push("No contact verification found");

    if (!legalpages?.privacyPolicyFound)
      risks.push("Privacy Policy missing");

    if (websiteReach?.exists === false)
      risks.push("Website reachability issues detected");

    if (risks.length > 0) {
      lines.push("Risk Flags:");
      risks.forEach((r) => lines.push(`• ${r}`));
    } else {
      lines.push("Risk Flags:");
      lines.push("• No major risk indicators detected");
    }

    lines.push("");

    // Recommendation
    let recommendation = "";

    if (riskLevel === "Low") {
      recommendation =
        "SAFE — The company demonstrates strong legitimacy signals.";
    } else if (riskLevel === "Medium") {
      recommendation =
        "MODERATE — Generally safe but some verification gaps exist.";
    } else if (riskLevel === "High") {
      recommendation =
        "HIGH RISK — Several trust indicators are missing or weak.";
    } else {
      recommendation =
        "VERY HIGH RISK — Strong suspicion due to multiple missing or failed checks.";
    }

    lines.push("Final Verdict:");
    lines.push(recommendation);

    return lines.join("\n");
  } catch (error) {
    console.log("summary error:", error);
    return "Unable to generate summary.";
  }
}

export default getSummary;