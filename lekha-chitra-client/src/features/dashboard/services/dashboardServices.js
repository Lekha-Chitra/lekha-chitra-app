// import api from "../../../app/api";
// export const getSummary = async (params = {}) => {
//   const response = await api.get("/V1/Dashboard/TotalSummary/getSummary", {
//     params,
//   });
//   return response.data;
// };

// export const getClientSummary = async (params = {}) => {
//   const response = await api.get("/V1/Dashboard/ClientSummary/getSummary", {
//     params,
//   });
//   return response.data;
// };

// export const getTransactionSummary = async () => {
//   const response = await api.get(
//     "/V1/Dashboard/TransactionSummary/getSummary",
//   );

//   return response.data;
// };

// // import api from "../../../app/api";
// // export const getSummary = async (fromDate, toDate) => {
// //   const response = await api.get("/V1/Dashboard/TotalSummary/getSummary", {
// //     params: {
// //       ...(fromDate && { fromDate }),
// //       ...(toDate && { toDate }),
// //     },
// //   });
// //   return response.data;
// // };

// // export const getClientSummary = async (fromDate, toDate) => {
// //   const response = await api.get("/V1/Dashboard/ClientSummary/getSummary", {
// //     params: {
// //       ...(fromDate && { fromDate }),
// //       ...(toDate && { toDate }),
// //     },
// //   });
// //   return response.data;
// // };

// // export const getTransactionSummary = async (fromDate, toDate) => {
// //   const response = await api.get(
// //     "/V1/Dashboard/TransactionSummary/getSummary",
// //     {
// //       params: {
// //         ...(fromDate && { fromDate }),
// //         ...(toDate && { toDate }),
// //       },
// //     },
// //   );
// //   return response.data;
// // };

import api from "../../../app/api";

export const getSummary = async (fromDate, toDate) => {
  const response = await api.get("/V1/Dashboard/TotalSummary/getSummary", {
    params: {
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate }),
    },
  });
  return response.data;
};

export const getClientSummary = async (fromDate, toDate) => {
  const response = await api.get("/V1/Dashboard/ClientSummary/getSummary", {
    params: {
      ...(fromDate && { fromDate }),
      ...(toDate && { toDate }),
    },
  });
  return response.data;
};

export const getTransactionSummary = async (fromDate, toDate) => {
  const response = await api.get(
    "/V1/Dashboard/TransactionSummary/getSummary",
    {
      params: {
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
      },
    },
  );
  return response.data;
};