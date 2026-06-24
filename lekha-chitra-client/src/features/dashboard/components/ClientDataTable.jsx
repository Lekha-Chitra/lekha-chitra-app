import { Box, TextField, InputAdornment, Chip, Tooltip } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";

import { DataGrid } from "@mui/x-data-grid";

function ClientDataTable({ columns, data, title = "Clients", onEdit,loading }) {
  const rows =
    data?.map((client, index) => ({
      id: index + 1,
      sn: index + 1,
      ...client,
    })) || [];

  const editColumn = {
    field: "actions",
    headerName: "Actions",
    width: 120,
    sortable: false,

    renderCell: (params) => (
      <Tooltip title="Edit Client">
        <Box
          onClick={() => onEdit?.(params.row)}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            px: 1,
            py: 0.5,
            cursor: "pointer",
            borderRadius: "8px",
            background: "#EFF6FF",
            color: "#185FA5",
            border: "1px solid #BFDBFE",

            "&:hover": {
              background: "#185FA5",
              color: "#fff",
            },
          }}
        >
          <EditIcon sx={{ fontSize: 14 }} />
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
    },

    ...columns.map((col) => ({
      field: col.accessorKey,
      headerName: col.header,
      flex: 1,
      minWidth: 150,

      renderCell:
        col.accessorKey === "status"
          ? (params) => (
              <Chip
                label={params.value}
                size="small"
                color={params.value === "Credit" ? "success" : "error"}
              />
            )
          : undefined,
    })),

    editColumn,
  ];

  return (
    <Box
      sx={{
        background: "#fff",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: 2,
      }}
    >
      {/* Header */}

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <h3>{title}</h3>

        <TextField
          size="small"
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}

      <DataGrid
        rows={rows}
        columns={gridColumns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
        initialState={{
          pagination: {
            paginationModel: {
              page: 0,
              pageSize: 5,
            },
          },
        }}
        disableColumnMenu
        autoHeight
      />
    </Box>
  );
}

export default ClientDataTable;
