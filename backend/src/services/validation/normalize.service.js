
const normalizeInput=(companyName, websiteUrl)=>{
   if (!companyName || typeof companyName !== "string") {
    throw new Error("Invalid company name");
  }

  if (!websiteUrl || typeof websiteUrl !== "string") {
    throw new Error("Invalid website URL");
  }
 return {
    companyName: companyName.trim().toLowerCase(),

    websiteUrl: websiteUrl
      .trim()
      .toLowerCase(),
  };
}
export {normalizeInput}