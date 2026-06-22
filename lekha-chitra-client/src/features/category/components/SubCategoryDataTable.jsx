import { DataGrid } from "@mui/x-data-grid";
import { Box, TextField, InputAdornment, IconButton, Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

function SubCategoryDataTable({ columns, data, title = "Records", onEdit }) {
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
      renderCell: (params) => (
        <span style={{ color: "#9ca3af", fontSize: 12 }}>{params.value}</span>
      ),
    },
    ...columns.map((col) => ({
      field: col.accessorKey || col.id,
      headerName:
        typeof col.header === "string"
          ? col.header
          : col.header?.toString?.() || "",
      flex: 1,
      minWidth: 150,
    })),
    editColumn, // 👈 appended last
  ];

  return (
    <Box
      sx={{
        background: "#032A4E",
        borderRadius: "12px",
        border: "1px solid #032A4E",
        overflow: "hidden",
      }}
    >
      {/* Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2.5,
          py: 1.75,
          borderBottom: "0.5px solid #e5e7eb",
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 600, color: "#E59C11" }}>
          {title}
        </span>
        <TextField
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ fontSize: 16, color: "#9ca3af" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              fontSize: 13,
              borderRadius: "8px",
              background: "#f9fafb",
              "& fieldset": { borderColor: "#e5e7eb" },
              "&:hover fieldset": { borderColor: "#d1d5db" },
            },
          }}
        />
      </Box>

      {/* Grid */}
      <DataGrid
        rows={rows}
        columns={gridColumns}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: { paginationModel: { pageSize: 5, page: 0 } },
        }}
        disableColumnMenu
        sx={{
          border: "none",
          fontFamily: "inherit",
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: "#E59C11",
            borderBottom: "0.5px solid #e5e7eb",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: 14,
            fontWeight: 600,
            color: "#E59C11",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          },
          "& .MuiDataGrid-row": {
            "&:hover": { backgroundColor: "#f9fafb" },
            "&:last-child .MuiDataGrid-cell": { borderBottom: "none" },
          },
          "& .MuiDataGrid-cell": {
            fontSize: 14,
            color: "#032A4E",
            borderBottom: "1px solid #032A4E",
            display: "flex",
            alignItems: "center",
          },
          "& .MuiDataGrid-cell:focus, & .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "0.5px solid #e5e7eb",
            minHeight: 48,
          },
          "& .MuiTablePagination-root": {
            fontSize: 12,
            color: "#E59C11",
          },
          "& .MuiDataGrid-cell": {
  overflow: "visible !important",
},
"& .MuiDataGrid-row": {
  overflow: "visible !important",
},
"& .MuiDataGrid-virtualScroller": {
  overflow: "visible !important",
},
        }}
      />
    </Box>
  );
}

export default SubCategoryDataTable;