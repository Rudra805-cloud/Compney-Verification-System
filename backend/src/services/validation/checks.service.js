import getWhoisData from "./whois.service.js";
import getSslData from "./ssl.service.js";

async function checks(hostname) {
    // companyName → future: brand matching / linkedin check

     const whoisData=await getWhoisData(hostname);
     const sslData=await getSslData(hostname);

    return {
       whois: whoisData,
       ssl:sslData

    };
}

export { checks };