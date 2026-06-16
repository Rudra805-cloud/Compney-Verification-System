import axios from "axios";
import * as cheerio from "cheerio";

async function getLegalPages($, html) {
  try {


    let privacyPolicyFound = false;
    let termsFound = false;
    let aboutPageFound = false;

    $("a").each((i, el) => {
      const href = ($(el).attr("href") || "").toLowerCase();
      const text = ($(el).text() || "").toLowerCase();
     
      // Privacy Policy
      if (
        href.includes("privacy") ||
        text.includes("privacy")
      ) {
        privacyPolicyFound = true;
      }

      // Terms & Conditions
      if (
        href.includes("terms") ||
        href.includes("tos") ||
        text.includes("terms") ||
        text.includes("terms of service")
      ) {
        termsFound = true;
      }

      // About Us
      if (
        href.includes("about") ||
        text.includes("about")
      ) {
        aboutPageFound = true;
      }
    });

    return {
      privacyPolicyFound,
      termsFound,
      aboutPageFound
    };

  } catch (error) {
    return {
      privacyPolicyFound: false,
      termsFound: false,
      aboutPageFound: false
    };
  }
}

export default getLegalPages;