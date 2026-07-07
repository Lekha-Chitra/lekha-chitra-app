import api from "../../../app/api";

export const getClients = async () => {
  const response = await api.get("/V1/Client/getAllClients");

  return response.data;
};

export const addTransaction = async (data) => {
  const response = await api.post("/V1/Transaction/addTransaction", {
    addTransaction: data,
  });

  return response.data;
};

export const getTransactions = async (pageNumber = 1, pageSize = 10) => {
  const response = await api.get("/V1/Transaction/getAllTransactions", {
    params: {
      pageNumber,
      pageSize,
    },
  });

  return response.data;
};

export const filterTransactions = async (filters) => {
  const response = await api.get("/V1/Transaction/filterTransaction", {
    params: filters,
  });

  return response.data;
};