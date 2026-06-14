import axios from "axios";

async function getSslData(hostname) {
  try {
    const response = await axios.get(
      `https://whoisjson.com/api/v1/ssl-cert-check?domain=${hostname}`,
      {
        headers: { Authorization: `TOKEN=${process.env.WHOIS_API_KEY}` },
        timeout: 10000,
      },
    );
    const data = response.data;
    if (!data) return null;
    const issuer = data.issuer?.O || "unknown";
    const validTo = new Date(data.valid_to);
    const now = new Date();

    const diffDays = (validTo - now) / (1000 * 60 * 60 * 24);
    const expiringSoon = diffDays <= 30 && diffDays > 0;
    const expired = diffDays <= 0;
    const daysUntilExpiry = Math.floor(diffDays);
    const subjectCN = data.details?.subject?.CN;
    const hostnameMatch = subjectCN === hostname;

    return {
      valid: data.valid,

      issuer: data.issuer?.O || "unknown",

      validFrom: data.valid_from,
      validTo: data.valid_to,

      bits: data.details?.bits,

      subjectCN: data.details?.subject?.CN,

      subjectAltNames: data.details?.subjectaltname,

      // 🔥 derived intelligence
      expired,
      expiringSoon,
      daysUntilExpiry: Math.floor(diffDays),
      hostnameMatch,
    };
  } catch (error) {
    console.error("SSL Error:", error.message);
    return null;
  }
}

export default getSslData;
