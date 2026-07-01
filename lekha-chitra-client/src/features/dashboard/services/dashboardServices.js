import api from "../../../app/api";
export const getSummary = async (params = {}) => {
  const response = await api.get("/V1/Dashboard/TotalSummary/getSummary",{
    params,
  });
  return response.data;
};

export const getClientSummary = async (params = {}) => {
  const response = await api.get("/V1/Dashboard/ClientSummary/getSummary",{
    params,
  });
  return response.data;
};