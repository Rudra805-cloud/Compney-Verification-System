import getWhoisData from "./whois.service.js";
import getSslData from "./ssl.service.js";
import websiteReachable from "./website.service.js";
import getContactInfo from "./contact.service.js";
import getSocialPresence from "./social.service.js";
import getLegalPages from "./legel.service.js";
import getCareersInfo from "./careers.service.js";
async function checks(hostname) {
    // companyName → future: brand matching / linkedin check

     const whoisData=await getWhoisData(hostname);
     const sslData=await getSslData(hostname);
     const websiteReach=await websiteReachable(hostname)
     const contactInfo=await getContactInfo(hostname);
     const legelpages=await getLegalPages(hostname)
     const careersInfo =await getCareersInfo(hostname)
     const socialPresence=await getSocialPresence(hostname)
    return {
       whois: whoisData,
       ssl:sslData,
       wesiteReach:websiteReach,
       contactInfo:contactInfo,
       socialPresence:socialPresence,
       legelpages:legelpages,
       careersInfo:careersInfo
    };
}

export { checks };