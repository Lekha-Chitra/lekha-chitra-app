import api from "../../../app/api";

export const addClient = async (clientData) => {
  const response = await api.post("/V1/Client/addClient", clientData);

  return response.data;
};

export const getClients = async (pageNumber = 1, pageSize =5) => {
  const response = await api.get(
    `/V1/Client/getAllClients?pageNumber=${pageNumber}&pageSize=${pageSize}`,
  );

  return response.data;
};

export const filterClients = async (
  filters = {},
  pageNumber = 1,
  pageSize = 5
      ) => {
        const response = await api.get("/V1/Client/filterClients", {
          params: {
            pageNumber,
            pageSize,
            ...filters,
          },
        });

        return response.data;
      };