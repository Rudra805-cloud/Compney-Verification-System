import axiosInstance from "./axios.api";

export const userHistory = async () => {
  const response = await axiosInstance.get(
    "/history",
  ); 
  return response.data;
};
export const getHistoryDetails = async (validationId) => {
  const response = await axiosInstance.get(`/history/${validationId}`);

  return response.data;
};