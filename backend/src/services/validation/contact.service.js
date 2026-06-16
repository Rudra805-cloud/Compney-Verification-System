import axios from "axios";
import * as cheerio from "cheerio";

async function getContactInfo($,html) {
  try {

    // Email
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

    const emails = html.match(emailRegex) || [];
    // Phone
    const phoneRegex = /(\+?\d[\d\s\-()]{7,}\d)/g;

    const phones = html.match(phoneRegex) || [];
    // Contact page
    let contactPageFound = false;

    $("a").each((i, el) => {
      const href = ($(el).attr("href") || "").toLowerCase();
      const text = ($(el).text() || "").toLowerCase();
      if (href.includes("contact") || text.includes("contact")) {
        contactPageFound = true;
      }
    });
    return {
      emailFound: emails.length > 0,
      phoneFound: phones.length > 0,
      contactPageFound,
    };
  } catch (error) {
    return {
      emailFound: false,
      phoneFound: false,
      contactPageFound: false,
    };
  }
}
export default getContactInfo;
