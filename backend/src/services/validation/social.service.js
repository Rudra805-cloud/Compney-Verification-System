import axios from "axios";
import * as cheerio from "cheerio";

async function getSocialPresence(hostname) {
  try {
    const response = await axios.get(
      `https://${hostname}`,
      {
        timeout: 10000
      }
    );

    const html = response.data;
    const $ = cheerio.load(html);

    let linkedInFound = false;
    let twitterFound = false;
    let facebookFound = false;
    let instagramFound = false;

    $("a").each((i, el) => {
      const href = ($(el).attr("href") || "").toLowerCase();

      if (href.includes("linkedin.com")) {
        linkedInFound = true;
      }

      if (
        href.includes("twitter.com") ||
        href.includes("x.com")
      ) {
        twitterFound = true;
      }

      if (href.includes("facebook.com")) {
        facebookFound = true;
      }

      if (href.includes("instagram.com")) {
        instagramFound = true;
      }
    });

    const socialLinksCount =
      Number(linkedInFound) +
      Number(twitterFound) +
      Number(facebookFound) +
      Number(instagramFound);

    return {
      linkedInFound,
      twitterFound,
      facebookFound,
      instagramFound,
      socialLinksCount
    };

  } catch (error) {
    return {
      linkedInFound: false,
      twitterFound: false,
      facebookFound: false,
      instagramFound: false,
      socialLinksCount: 0
    };
  }
}

export default getSocialPresence;