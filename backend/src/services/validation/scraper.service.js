import axios from "axios";
import * as cheerio from "cheerio";
import getContactInfo from "./contact.service.js";
import getLegalPages from "./legal.service.js";
import getSocialPresence from "./social.service.js";
import getCareersInfo from "./careers.service.js";


async function globalscraper(hostname) {
  try {
    const response = await axios.get(`https://${hostname}`, {
      timeout: 10000,
    });
    const html = response.data;
    const data = cheerio.load(html);

    const contact = await getContactInfo(data, html);
    const legal = await getLegalPages(data, html);
    const social =await getSocialPresence(data, html);
    const career =await getCareersInfo(data, html);

    return{
      contact,
      legal,
      social,
      career
    }
  
  } catch (err) {
     return {
      contact: null,
      legal: null,
      social: null,
      career: null,
    };
  }
}
export default globalscraper;