
const normalizeInput=(websiteUrl)=>{
  if (!websiteUrl || typeof websiteUrl !== "string") {
    throw new Error("Invalid website URL");
  }
 return {

    websiteUrl: websiteUrl
      .trim()
      .toLowerCase(),
  };
}
export {normalizeInput}