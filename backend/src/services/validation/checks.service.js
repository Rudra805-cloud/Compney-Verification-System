import getWhoisData from "./whois.service.js";
import getSslData from "./ssl.service.js";
import websiteReachable from "./website.service.js";
import getContactInfo from "./contact.service.js";
import getSocialPresence from "./social.service.js";
import globalscraper from "./scraper.service.js";
async function checks(hostname) {
     


     const whoisData=await getWhoisData(hostname);
     const sslData=await getSslData(hostname);
     const websiteReach=await websiteReachable(hostname)
     const scrapeData = await globalscraper(hostname);

    return {

       whois: whoisData,
       ssl:sslData,
       websiteReach:websiteReach,
       contactInfo:scrapeData.contact,
       socialPresence:scrapeData.social,
       legalpages:scrapeData.legal,
       careersInfo:scrapeData.career
    };
}

export { checks };