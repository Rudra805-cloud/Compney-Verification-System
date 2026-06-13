
const normalizeInput=(companyName, websiteUrl)=>{
 return {
    companyName: (companyName || "").trim(),
    websiteUrl: (websiteUrl || "").toLowerCase().trim()
  };
}
export {normalizeInput}