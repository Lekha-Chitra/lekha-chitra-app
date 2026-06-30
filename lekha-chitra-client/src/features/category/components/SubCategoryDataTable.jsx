import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import CustomPagination from "../../client/customData/customnPagination";
import { useState } from "react";
function SubCategoryDataTable({ columns, data, title = "Records", onEdit ,loading}) {
  const rows = data?.map((row, index) => ({
    id: row.id ?? index,
    sn: index + 1,
    ...row,
  }));

  const editColumn = {
    field: "actions",
    headerName: "",
    width: 130,
    sortable: false,
    filterable: false,
    // renderHeader: () => (
    //   <span style={{ fontSize: 12, fontWeight: 500, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.04em" }}>
    //     Sub Category
    //   </span>
    // ),
    renderCell: (params) => (
  <Tooltip title="Edit sub category" placement="left">
    
    <Box
      onClick={() => onEdit?.(params.row)}
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: "4px",
        px: "6px",
        py: "1px",
        fontSize: 12,
        fontWeight: 500,
        color: "#185FA5",
        background: "#EFF6FF",
        border: "1px solid #bfdbfe",
        borderRadius: "8px !important",
        cursor: "pointer",
        transition: "all 0.15s ease",
        userSelect: "none",
        "&:hover": {
          background: "#185FA5",
          color: "#fff",
          borderColor: "#185FA5",
          transform: "translateY(-1px)",
          boxShadow: "0 4px 12px rgba(24, 95, 165, 0.25)",
        },
        "&:active": {
          transform: "translateY(0px)",
          boxShadow: "none",
        },
      }}
    >
      <EditIcon sx={{ fontSize: 13 }} />
      Edit
    </Box>
  </Tooltip>
),
  };

  const gridColumns = [
    {
      field: "sn",
      headerName: "#",
      width: 60,
      sortable: false,
       cellClassName: "alt-column",
    headerClassName: "alt-column-header",
    },
    ...columns.map((col) => ({
      field: col.accessorKey || col.id,
      headerName:
        typeof col.header === "string"
          ? col.header
          : col.header?.toString?.() || "",
      flex: 1,
      minWidth: 120,

       cellClassName: "alt-column",
        headerClassName: "alt-column-header",
    })),
  
  ];

  return (

<Box
  sx={{
    height: 350, // fixed table height
    width: "100%",
     p: 2,
     background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: 2,
  }}
>
      <DataGrid
        rows={rows}
         rowHeight={40}
            // getRowHeight={() => "auto"}
        columns={gridColumns}
        
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
         slots={{
    pagination: CustomPagination,
  }}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 10,
            },
          },
        }}

         sx={{
            borderRadius: "12px",
            "& .MuiDataGrid-columnHeaders": {
              position: "sticky",
              top: 0,
              zIndex: 1,
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              whiteSpace: "normal",
              lineHeight: "1.0",
              textAlign: "center",
            },
          "& .alt-column-header": {
            background: "linear-gradient(180deg, #ffffff 10%, #ffffff 100%)",
            color: "#032A5C",
             fontSize: "0.65rem",
            letterSpacing: "0.4px",
            textTransform: "-moz-initial",
            borderBottom: "1px solid #CBD5E1",
              },
               "& .MuiDataGrid-columnHeader.alt-column-header .MuiDataGrid-columnHeaderTitle": {
              fontWeight: 700,
            },
              "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#F8FAFC",
            borderBottom: "1px solid #E2E8F0",
          },
     "& .MuiDataGrid-row:hover": {
      backgroundColor: "#F8FAFC !important",
        },
       }}
        disableColumnMenu
        
      />
      </Box>
  
  );
}

export default SubCategoryDataTable;