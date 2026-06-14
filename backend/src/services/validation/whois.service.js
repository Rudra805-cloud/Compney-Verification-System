import axios from "axios";

async function getWhoisData(hostname) {
  try {
    const response = await axios.get(
      `https://whoisjson.com/api/v1/whois?domain=${hostname}`,
      {
        headers: { Authorization: `TOKEN=${process.env.WHOIS_API_KEY}` },
        timeout: 10000,
      },
    );
    const data = response.data;
    return {
      registered: data.registered,
      active: data.statusAnalysis?.isActive,

      domainAgeYears: data.age?.years,
      domainAgeDays: data.age?.days,

      createdDate: data.created,
      expiryDate: data.expires,

      daysUntilExpiry: data.expiration?.daysLeft,
      expiringSoon: data.expiration?.isExpiringSoon,
      expired: data.expiration?.isExpired,

      registrar: data.registrar?.name,

      dnsProvider: data.nsAnalysis?.detectedProviders?.[0] || null,
      nameserverCount: data.nsAnalysis?.count || 0,

      dnssec: data.dnssec,

      ownerAddress: data.contacts?.owner?.[0]?.address || null,
    };
  } catch (error) {
    console.error("WHOIS Error:", error.message);
    return null;
  }
}

export default getWhoisData;
