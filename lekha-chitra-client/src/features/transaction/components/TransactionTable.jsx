// import { Box, Chip } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";

// import CustomPagination from "../../client/customData/customnPagination";

// function TransactionTable({ transactions, columns, loading,pagination,fetchTransactions }) {
//   const rows =
//     transactions?.map((transaction, index) => ({
//       id: transaction.transactionId,
//       sn: index + 1,
//       ...transaction,
//     })) || [];

//   const gridColumns = [
//     {
//       field: "sn",
//       headerName: "#",
//       width: 60,
//       cellClassName: "alt-column",
//       headerClassName: "alt-column-header",
//     },

//     ...columns.map((column) => ({
//       field: column.accessorKey,
//       headerName: column.header,
//       flex: 1,
//       minWidth: 140,
//       cellClassName: "alt-column",
//       headerClassName: "alt-column-header",

//       renderCell:
//         column.accessorKey === "paymentType"
//           ? (params) => (
//               <Chip
//                 label={params.value}
//                 size="small"
//                 sx={{
//                   color: "#fff",
//                   fontWeight: 600,
//                   backgroundColor:
//                     params.value === "Credit"
//                       ? "#032A5C"
//                       : params.value === "Debit"
//                         ? "#E59C11"
//                         : "#16A34A",
//                 }}
//               />
//             )
//           : column.accessorKey === "amount"
//             ? (params) => `Rs. ${params.value}`
//             : column.accessorKey === "addedDate"
//               ? (params) =>
//                   params.value ? new Date(params.value).toLocaleString() : ""
//               : undefined,
//     })),
//   ];

//   return (
//     <Box
//       sx={{
//         height: 500,
//         width: "100%",
//         background: "#fff",
//         borderRadius: "12px",
//         p: 2,
//         boxShadow: 2,
//       }}
//     >
//       <DataGrid
//         rows={rows}
//         columns={gridColumns}
//         rowHeight={42}
//         loading={loading}
//         disableColumnMenu
//         pagination
//         paginationMode="server"
//         rowCount={pagination.totalRecords}
//         paginationModel={{
//           page: pagination.currentPage - 1,
//           pageSize: pagination.pageSize,
//         }}
//         onPaginationModelChange={(model) => {
//           fetchTransactions(model.page + 1, model.pageSize);
//         }}
//         pageSizeOptions={[5, 10, 20]}
//         slots={{
//           pagination: CustomPagination,
//         }}
//         sx={{
//           borderRadius: "12px",

//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: "#F8FAFC",
//             borderBottom: "1px solid #E2E8F0",
//           },

//           "& .alt-column-header": {
//             color: "#032A5C",
//             fontWeight: 700,
//             fontSize: "0.72rem",
//           },

//           "& .MuiDataGrid-row:hover": {
//             backgroundColor: "#F8FAFC",
//           },
//         }}
//       />
//     </Box>
//   );
// }

// export default TransactionTable;

import { Box, Chip } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import CustomPagination from "../../client/customData/customnPagination";

function TransactionTable({
  transactions,
  columns,
  loading,
  pagination,
  fetchTransactions,
}) {
  const rows =
    transactions?.map((transaction, index) => ({
      id: transaction.transactionId,
      sn: index + 1,
      ...transaction,
    })) || [];

  // Display ------ for null, undefined or empty values
  const displayValue = (value) => {
    return value === null || value === undefined || value === ""
      ? "------"
      : value;
  };

  const gridColumns = [
    {
      field: "sn",
      headerName: "#",
      width: 60,
      cellClassName: "alt-column",
      headerClassName: "alt-column-header",
    },

    ...columns.map((column) => ({
      field: column.accessorKey,
      headerName: column.header,
      flex: 1,
      minWidth: 140,
      cellClassName: "alt-column",
      headerClassName: "alt-column-header",

      renderCell: (params) => {
        // Payment Type
        if (column.accessorKey === "paymentType") {
          if (!params.value) {
            return "------";
          }

          return (
            <Chip
              label={params.value}
              size="small"
              sx={{
                color: "#fff",
                fontWeight: 600,
                backgroundColor:
                  params.value === "Credit"
                    ? "#032A5C"
                    : params.value === "Debit"
                      ? "#E59C11"
                      : "#16A34A",
              }}
            />
          );
        }

        // Amount
        if (column.accessorKey === "amount") {
          return params.value !== null &&
            params.value !== undefined &&
            params.value !== ""
            ? `Rs. ${params.value}`
            : "------";
        }

        // Date
        if (column.accessorKey === "addedDate") {
          return params.value
            ? new Date(params.value).toLocaleString()
            : "------";
        }

        // Default for all remaining columns
        return displayValue(params.value);
      },
    })),
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        background: "#fff",
        borderRadius: "12px",
        p: 2,
        boxShadow: 2,
      }}
    >
      <DataGrid
        rows={rows}
        columns={gridColumns}
        rowHeight={42}
        loading={loading}
        disableColumnMenu
        pagination
        paginationMode="server"
        rowCount={pagination.totalRecords}
        paginationModel={{
          page: pagination.currentPage - 1,
          pageSize: pagination.pageSize,
        }}
        onPaginationModelChange={(model) => {
          fetchTransactions(model.page + 1, model.pageSize);
        }}
        pageSizeOptions={[5, 10, 20]}
        slots={{
          pagination: CustomPagination,
        }}
        sx={{
          borderRadius: "12px",

          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
          },

          "& .alt-column-header": {
            color: "#032A5C",
            fontWeight: 700,
            fontSize: "0.72rem",
          },

          "& .MuiDataGrid-row:hover": {
            backgroundColor: "#F8FAFC",
          },
        }}
      />
    </Box>
  );
}

export default TransactionTable;