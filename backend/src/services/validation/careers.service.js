import axios from "axios";
import * as cheerio from "cheerio";

async function getCareersInfo($, html) {
  try {
    

    let careersPageFound = false;

    $("a").each((i, el) => {
      const href = ($(el).attr("href") || "").toLowerCase();
      const text = ($(el).text() || "").toLowerCase();
console.log(href, " | ", text);
      if (
        href.includes("career") ||
        href.includes("careers") ||
        href.includes("job") ||
        href.includes("jobs") ||
        href.includes("hiring") ||
        href.includes("internship") ||
        href.includes("join-us") ||
        text.includes("career") ||
        text.includes("careers") ||
        text.includes("jobs") ||
        text.includes("hiring") ||
        text.includes("internship")
      ) {
        careersPageFound = true;
      }
    });

    return {
      careersPageFound
    };

  } catch (error) {
    return {
      careersPageFound: false
    };
  }
}

export default getCareersInfo;