import {Box,
        Button , 
        TextField,
        InputAdornment, 
        Chip, 
        Tooltip,
        Popover,
        Typography, 
       FormControlLabel,
        FormControl,
      InputLabel,
      Select,
      MenuItem,
      Checkbox} from "@mui/material";
import { useState, useMemo } from "react";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import SearchBar from "./SearchBar";
import ActionButtons from "./ActionButtons";
import AddClientModal from "./AddClientModal";
import { DataGrid } from "@mui/x-data-grid";
import CustomPagination from "../customData/customnPagination";
import { filterClients, getClients } from "../services/clientServices";

function ClientDataTable({ columns, data, title = "Clients",pagination,fetchClients, onEdit,loading }) {
    // frontend search term (drives client-side filtering of the grid)
    const [search, setSearch] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const [openAddClient, setOpenAddClient] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    category: "",
    subCategory: "",
    status: "",
    minBalance: "",
    maxBalance: "",
    minBudget: "",
    maxBudget: "",
    minQuantity: "",
    maxQuantity: "",
    fromDate: "",
    toDate: "",
    sortBy: "",
    isDescending: false,
  });
  const [appliedFilters, setAppliedFilters] = useState({});

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleApplyFilters = async () => {
    const activeFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([_, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value !== false,
      ),
    );

    setAppliedFilters(activeFilters);

    await fetchClients(1, 10, activeFilters);

    handleCloseFilter();
  };

  const handleResetFilters = async () => {
    setFilters(initialFilters);
    setAppliedFilters({});

    await fetchClients();

    handleCloseFilter();
  };

  const open = Boolean(anchorEl);

  const rows =
    data?.map((client, index) => ({
      id: index + 1,
      sn: index + 1,
      ...client,
    })) || [];

  // Frontend search: filter the mapped rows against every visible column value.
  // This runs entirely in the browser, no API round-trip.
  const filteredRows = useMemo(() => {
    if (!search?.trim()) return rows;

    const term = search.trim().toLowerCase();

    return rows.filter((row) =>
      columns.some((col) => {
        const value = row[col.accessorKey];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(term);
      })
    );
  }, [rows, search, columns]);

  const compactField = {
    "& .MuiInputBase-root": {
      height: 30,
      fontSize: "0.75rem",
    },
    "& .MuiInputLabel-root": {
      fontSize: "0.7rem",
    },
    "& .MuiInputBase-input": {
      py: 0,
    },
  };

  const gridColumns = [
    {
      field: "sn",
      headerName: "#",
      width: 60,
      cellClassName: "alt-column",
      headerClassName: "alt-column-header",
    },

    ...columns.map((col) => ({
      field: col.accessorKey,
      headerName: col.header,
      flex: 1,
      minWidth: 120,
      cellClassName: "alt-column",
      headerClassName: "alt-column-header",
      renderCell:
        col.accessorKey === "status"
          ? (params) => (
              <Chip
                label={params.value}
                size="small"
                color={params.value === "Credit" ? "success" : "error"}
                sx={{
                  width: 60,
                  height: 20,
                  fontWeight: 200,
                  color: "#fff",
                  ...(params.value === "Credit"
                    ? {
                        color: "#ffffff",
                        backgroundColor: "#032A5C",
                      }
                    : {
                        color: "#78350F",
                        backgroundColor: "#E59C11",
                      }),
                }}
              />
            )
          : ["addedDate", "modifiedDate"].includes(col.accessorKey)
            ? (params) =>
                params.value ? new Date(params.value).toLocaleString() : ""
            : undefined,
    })),

    // editColumn,
  ];
  const filterLabels = {
    category: "Category",
    subCategory: "Sub Category",
    status: "Status",
    minBalance: "Min Balance",
    maxBalance: "Max Balance",
    minBudget: "Min Budget",
    maxBudget: "Max Budget",
    minQuantity: "Min Qty",
    maxQuantity: "Max Qty",
    fromDate: "From",
    toDate: "To",
    sortBy: "Sort By",
    isDescending: "Descending",
  };

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
          alignItems: "center",
          justifyContent: "space-between",
          p: 2,
          gap: 2,
        }}
      >
        {/* Left */}
        <Box sx={{ minWidth: "fit-content" }}>
          <ActionButtons onAddClient={() => setOpenAddClient(true)} />
          <AddClientModal
            open={openAddClient}
            onClose={() => setOpenAddClient(false)}
            onSuccess={async () => {
              await fetchClients(pagination.currentPage, pagination.pageSize);
            }}
          />
        </Box>

        {/* Center */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            maxWidth: 420,
          }}
        >
          <SearchBar search={search} setSearch={setSearch} />
        </Box>
        <Button
          variant="contained"
          size="small"
          startIcon={<AddIcon />}
          onClick={handleOpenFilter}
          sx={{
            backgroundColor: "#032A5C",
            color: "#f1f1f1",
            textTransform: "none",
            fontWeight: 600,
            width: 180,
            height: 40,
            minWidth: "auto",
            ml: "auto",
            px: 1.5,
            py: 0.5,
            borderRadius: "8px",
            boxShadow: "none",
            "&:hover": {
              backgroundColor: "#043576",
              boxShadow: "none",
            },
          }}
        >
          {" "}
          Add Filter
        </Button>

        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleCloseFilter}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
        >
          <Box
            sx={{
              p: 1.5,
              width: 320,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              fontSize: "0.9rem",
            }}
          >
            <Typography variant="subtitle2" fontWeight={600}>
              Filters
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 1,
              }}
            >
              <FormControl
                size="small"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "0.7rem",
                    top: "-2px",
                  },
                }}
              >
                <InputLabel>Category</InputLabel>

                <Select
                  name="category"
                  label="Category"
                  value={filters.category}
                  onChange={handleFilterChange}
                  sx={{
                    height: 28,
                    fontSize: "0.7rem",

                    "& .MuiSelect-select": {
                      py: 0,
                      minHeight: "28px !important",
                    },
                  }}
                >
                  <MenuItem value="" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    All
                  </MenuItem>
                  <MenuItem value="Vendor" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    Vendor
                  </MenuItem>
                  <MenuItem value="Site" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    Site
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "0.7rem",
                    top: "-2px",
                  },
                }}
              >
                <InputLabel>Sub Cat.</InputLabel>
                <Select
                  name="subCategory"
                  value={filters.subCategory}
                  label="Sub Cat."
                  onChange={handleFilterChange}
                  sx={{
                    height: 28,
                    fontSize: "0.7rem",

                    "& .MuiSelect-select": {
                      py: 0,
                      minHeight: "28px !important",
                    },
                  }}
                >
                  <MenuItem value="" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    All
                  </MenuItem>
                  <MenuItem value="PetrolPump" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    PetrolPump
                  </MenuItem>
                  <MenuItem value="Father" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    Father
                  </MenuItem>
                  <MenuItem value="XYZ Company" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    XYZ Company
                  </MenuItem>
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{
                  "& .MuiInputLabel-root": {
                    fontSize: "0.7rem",
                    top: "-2px",
                  },
                }}
              >
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={filters.status}
                  label="Status"
                  onChange={handleFilterChange}
                  sx={{
                    height: 28,
                    fontSize: "0.7rem",

                    "& .MuiSelect-select": {
                      py: 0,
                      minHeight: "28px !important",
                    },
                  }}
                >
                  <MenuItem value="" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    All
                  </MenuItem>
                  <MenuItem value="Credit" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    Credit
                  </MenuItem>
                  <MenuItem value="Debit" sx={{ fontSize: "0.7rem", minHeight: "28px", py: 0.25 }}>
                    Debit
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              <TextField
                placeholder="Min Balance"
                name="minBalance"
                type="number"
                value={filters.minBalance}
                onChange={handleFilterChange}
                sx={compactField}
              />

              <TextField
                placeholder="Max Balance"
                name="maxBalance"
                type="number"
                value={filters.maxBalance}
                onChange={handleFilterChange}
                sx={compactField}
              />
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              <TextField
                placeholder="Min Budget"
                name="minBudget"
                type="number"
                InputLabelProps={{ shrink: true }}
                sx={compactField}
              />

              <TextField
                placeholder="Max Budget"
                name="maxBudget"
                type="number"
                InputLabelProps={{ shrink: true }}
                sx={compactField}
              />
            </Box>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}>
              <Box>
                <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", mb: 0.3 }}>
                  From
                </Typography>

                <TextField
                  type="date"
                  name="fromDate"
                  size="small"
                  onChange={handleFilterChange}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: 30,
                      fontSize: "0.75rem",
                    },
                  }}
                />
              </Box>

              <Box>
                <Typography sx={{ fontSize: "0.7rem", color: "text.secondary", mb: 0.3 }}>
                  To
                </Typography>

                <TextField
                  type="date"
                  name="toDate"
                  size="small"
                  onChange={handleFilterChange}
                  sx={{
                    width: "100%",
                    "& .MuiInputBase-root": {
                      height: 30,
                      fontSize: "0.75rem",
                    },
                  }}
                />
              </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
              <Button
                size="small"
                onClick={() => {
                  setFilters({
                    search: "",
                    category: "",
                    subCategory: "",
                    status: "",
                    minBalance: "",
                    maxBalance: "",
                    minBudget: "",
                    maxBudget: "",
                    minQuantity: "",
                    maxQuantity: "",
                    fromDate: "",
                    toDate: "",
                    sortBy: "",
                    isDescending: false,
                  });

                  setAppliedFilters({});
                }}
              >
                Reset
              </Button>

              <Button
                size="small"
                variant="contained"
                onClick={() => {
                  const activeFilters = Object.fromEntries(
                    Object.entries(filters).filter(
                      ([_, value]) =>
                        value !== "" &&
                        value !== null &&
                        value !== undefined &&
                        value !== false,
                    ),
                  );

                  setAppliedFilters(activeFilters);
                  handleApplyFilters();
                  handleCloseFilter();
                }}
              >
                Apply
              </Button>
            </Box>
          </Box>
        </Popover>
      </Box>

      {Object.keys(appliedFilters).length > 0 && (
        <Box sx={{ px: 2, pb: 1, display: "flex", flexWrap: "wrap", gap: 1 }}>
          {Object.entries(appliedFilters).map(([key, value]) => (
            <Chip
              key={key}
              size="small"
              label={`${filterLabels[key] || key}: ${value}`}
              onDelete={async () => {
                const updatedFilters = {
                  ...filters,
                  [key]: "",
                };

                setFilters(updatedFilters);

                const updatedAppliedFilters = { ...appliedFilters };
                delete updatedAppliedFilters[key];
                setAppliedFilters(updatedAppliedFilters);

                const activeFilters = Object.fromEntries(
                  Object.entries(updatedFilters).filter(
                    ([_, v]) => v !== "" && v !== null && v !== undefined && v !== false
                  )
                );

                await fetchClients(1, pagination?.pageSize || 10, activeFilters);
              }}
              sx={{
                backgroundColor: "#EFF6FF",
                color: "#185FA5",
                border: "1px solid #BFDBFE",
                fontSize: "0.75rem",
                "& .MuiChip-deleteIcon": {
                  color: "#185FA5",
                  fontSize: "16px",
                },
                "& .MuiChip-deleteIcon:hover": {
                  color: "#D32F2F",
                },
              }}
            />
          ))}
        </Box>
      )}
      <Box
        sx={{
          height: 480,
          width: "100%",
          p: 2,
        }}
      >
        <DataGrid
          rows={filteredRows}
          rowHeight={40}
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
    </Box>
  );
}

export default ClientDataTable;