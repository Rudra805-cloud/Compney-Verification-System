function normalizeUrl(websiteUrl){
  if (!websiteUrl || typeof websiteUrl !== "string") {
    throw new Error("Invalid website URL");
  }

  let url = websiteUrl.trim().toLowerCase();

  // Fix malformed patterns
  url = url
    .replace(/w\.w\.w\./g, "www.")
    .replace(/wwww\./g, "www.");

  // Add protocol if missing
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `https://${url}`;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch (error) {
    throw new Error("Invalid website URL");
  }

  const hostname = parsedUrl.hostname
    .toLowerCase()
    .replace(/^www\./, "");

  const pathname = parsedUrl.pathname.replace(/\/+$/, "");

  return {
    originalUrl: websiteUrl.trim(),
    normalizedUrl: `${parsedUrl.protocol}//${hostname}`,
    hostname,
    fullUrl: `${parsedUrl.protocol}//${hostname}${pathname}`
  };
}

export { normalizeUrl };