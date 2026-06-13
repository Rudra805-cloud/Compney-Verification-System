function normalizeUrl(websiteUrl){
if(!websiteUrl.startsWith("http://") && !websiteUrl.startsWith("https://")){
     websiteUrl = `https://${websiteUrl}`;
}
try {
    const parsedUrl = new URL(websiteUrl);

    return {
      originalUrl: websiteUrl,
      // normalizedUrl: parsedUrl.href,
      normalizedUrl: `${parsedUrl.protocol}//${parsedUrl.hostname}`,
      hostname: parsedUrl.hostname
    };
  } catch (error) {
    throw new Error("Invalid website URL");
  }
}


export { normalizeUrl };