import {
  Popover,
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
} from "@mui/material";

function TransactionFilterPopover({
  open,
  anchorEl,
  onClose,
  filters,
  setFilters,
  onApply,
  onReset,
}) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          borderRadius: 2,
        },
      }}
    >
      <Box
        sx={{
          width: 320,
          p: 1.5,
          display: "flex",
          flexDirection: "column",
          gap: 1,
          "& .MuiInputBase-root": {
            height: 38,
            fontSize: "0.82rem",
          },
          "& .MuiInputLabel-root": {
            fontSize: "0.82rem",
          },
        }}
      >
        <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 0.5 }}>
          Filters
        </Typography>

        {/* Transaction Type */}
        <TextField
          select
          label="Transaction Type"
          size="small"
          fullWidth
          value={filters.transactionType}
          onChange={(e) =>
            setFilters((prev) => ({
              ...prev,
              transactionType: e.target.value,
            }))
          }
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Internal">Internal</MenuItem>
          <MenuItem value="External">External</MenuItem>
        </TextField>

        {/* Payment Type + Method */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
          }}
        >
          <TextField
            select
            label="Payment Type"
            size="small"
            fullWidth
            value={filters.paymentType}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                paymentType: e.target.value,
              }))
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Credit">Credit</MenuItem>
            <MenuItem value="Debit">Debit</MenuItem>
            <MenuItem value="Transfer">Transfer</MenuItem>
          </TextField>

          <TextField
            select
            label="Payment Method"
            size="small"
            fullWidth
            value={filters.paymentMethod}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                paymentMethod: e.target.value,
              }))
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Cash">Cash</MenuItem>
            <MenuItem value="Online">Online</MenuItem>
            <MenuItem value="Loan">Loan</MenuItem>
          </TextField>
        </Box>

        {/* Amount */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
          }}
        >
          <TextField
            label="Min Amount"
            type="number"
            size="small"
            fullWidth
            value={filters.minAmount}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                minAmount: e.target.value,
              }))
            }
          />

          <TextField
            label="Max Amount"
            type="number"
            size="small"
            fullWidth
            value={filters.maxAmount}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                maxAmount: e.target.value,
              }))
            }
          />
        </Box>

        {/* Dates */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 1,
          }}
        >
          {/* <TextField
            label="From"
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={filters.fromDate}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                fromDate: e.target.value,
              }))
            }
          /> */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontSize: "0.75rem",
                color: "text.secondary",
              }}
            >
              From
            </Typography>

            <TextField
              type="date"
              size="small"
              fullWidth
              value={filters.fromDate}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  fromDate: e.target.value,
                }))
              }
            />
          </Box>

          {/* <TextField
            label="To"
            type="date"
            size="small"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={filters.toDate}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                toDate: e.target.value,
              }))
            }
          /> */}
          <Box>
            <Typography
              variant="body2"
              sx={{
                mb: 0.5,
                fontSize: "0.75rem",
                color: "text.secondary",
              }}
            >
              To
            </Typography>

            <TextField
              type="date"
              size="small"
              fullWidth
              value={filters.toDate}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  toDate: e.target.value,
                }))
              }
            />
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 1,
            mt: 1,
          }}
        >
          <Button
            size="small"
            onClick={onReset}
            sx={{
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Reset
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={onApply}
            sx={{
              px: 2,
              textTransform: "none",
              fontWeight: 600,
              backgroundColor: "#032A5C",
              "&:hover": {
                backgroundColor: "#043b82",
              },
            }}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}

export default TransactionFilterPopover;
