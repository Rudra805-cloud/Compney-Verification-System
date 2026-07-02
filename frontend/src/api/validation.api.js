import axiosInstance from "./axios.api";

export const validateCompany = async (domain) => {
  const response = await axiosInstance.post("/validate", {
    websiteUrl: domain,
  });

  return response.data;
};

export const liveValidateCompany = async (domain) => {
  const response = await axiosInstance.post(
    "/validate?force=true",
    {
      websiteUrl: domain,
    }
  );

  return response.data;
};