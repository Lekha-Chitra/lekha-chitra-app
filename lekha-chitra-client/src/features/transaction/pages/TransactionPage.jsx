import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import Sidebar from "../../client/components/Sidebar";
import TransactionActionButtons from "../components/TransactionActionButtons";
import TransactionTable from "../components/TransactionTable";
import AddTransactionModal from "../components/AddTransactionModal";
import TransactionFilterPopover from "../components/TransactionFilterPopover";
import Header from "../../auth/pages/Header";
import useTransactions from "../hooks/useTransactions";
import { transactionColumns } from "../columns/transactionColumns";
import { Box, Chip } from "@mui/material";
function TransactionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);
const [appliedFilters, setAppliedFilters] = useState({});
  const [search, setSearch] = useState("");

  // Filter Popover
  const [anchorEl, setAnchorEl] = useState(null);
  

  const handleOpenFilter = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const {
    transactions,
    pagination,
    loading,
    fetchTransactions,
    searchTransactions,
  } = useTransactions();

  const [filters, setFilters] = useState({
    transactionType: "",
    paymentType: "",
    paymentMethod: "",
    minAmount: "",
    maxAmount: "",
    fromDate: "",
    toDate: "",
  });
  const filterLabels = {
  transactionType: "Transaction",
  paymentType: "Payment Type",
  paymentMethod: "Payment Method",
  minAmount: "Min Amount",
  maxAmount: "Max Amount",
  fromDate: "From",
  toDate: "To",
};

  // ---------------- SEARCH ----------------
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search.trim() === "") {
        fetchTransactions(1, pagination.pageSize || 10);
      } else {
        searchTransactions({
          Search: search,
          PageNumber: 1,
          PageSize: pagination.pageSize || 10,
        });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  // ---------------- FILTER ----------------
  const handleApplyFilters = () => {
  searchTransactions({
    ...filters,
    Search: search,
    PageNumber: 1,
    PageSize: pagination.pageSize || 10,
  });

  const activeFilters = Object.fromEntries(
    Object.entries(filters).filter(
      ([, value]) =>
        value !== "" &&
        value !== null &&
        value !== undefined
    )
  );

  setAppliedFilters(activeFilters);

  handleCloseFilter();
};

  
const handleResetFilters = () => {
  const reset = {
    transactionType: "",
    paymentType: "",
    paymentMethod: "",
    minAmount: "",
    maxAmount: "",
    fromDate: "",
    toDate: "",
  };

  setFilters(reset);
  setAppliedFilters({});

  fetchTransactions(1, pagination.pageSize || 10);

  handleCloseFilter();
};

  return (
    <div className="flex min-h-screen bg-[#F3F3F3]">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Add Transaction Modal */}
      <AddTransactionModal
        open={openTransaction}
        onClose={() => setOpenTransaction(false)}
        onSuccess={fetchTransactions}
      />

      <main
  className="
    flex-1
    overflow-x-hidden
    md:ml-[70px]
    px-4 pt-1 pb-4
    md:px-6 md:pt-2 md:pb-6
    lg:px-8 lg:pt-2 lg:pb-8
    min-h-screen
    transition-all
    duration-300
  "
>
        {/* Header */}
        <Header title="Transaction" />
        {/* Mobile Menu */}
        <div className="md:hidden mb-4 mt-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="bg-[#032A5C] text-white p-3 rounded-md shadow-md"
          >
            <FaBars size={18} />
          </button>
        </div>

        {/* Buttons + Search + Filter */}
     <div className="mt-6 bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
  <TransactionActionButtons
    onAddTransaction={() => setOpenTransaction(true)}
    search={search}
    setSearch={setSearch}
    onOpenFilter={handleOpenFilter}
  />
  {Object.keys(appliedFilters).length > 0 && (
  <Box
    sx={{
      display: "flex",
      flexWrap: "wrap",
      gap: 1,
      mt: 2,
    }}
  >
    {Object.entries(appliedFilters).map(([key, value]) => (
      <Chip
        key={key}
        size="small"
        label={`${filterLabels[key]}: ${value}`}
        onDelete={() => {
          const updatedFilters = {
            ...filters,
            [key]: "",
          };

          setFilters(updatedFilters);

          const updatedAppliedFilters = {
            ...appliedFilters,
          };

          delete updatedAppliedFilters[key];
          setAppliedFilters(updatedAppliedFilters);

          searchTransactions({
            ...updatedFilters,
            Search: search,
            PageNumber: 1,
            PageSize: pagination.pageSize || 10,
          });
        }}
        sx={{
          backgroundColor: "#EFF6FF",
          color: "#185FA5",
          border: "1px solid #BFDBFE",
          fontSize: "0.75rem",
          "& .MuiChip-deleteIcon": {
            color: "#185FA5",
          },
          "& .MuiChip-deleteIcon:hover": {
            color: "#D32F2F",
          },
        }}
      />
    ))}
  </Box>
)}
</div>

        {/* Filter Popover */}
        <TransactionFilterPopover
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseFilter}
          filters={filters}
          setFilters={setFilters}
          onApply={handleApplyFilters}
          onReset={handleResetFilters}
        />

        {/* Table */}
        <div className="mt-6">
        
          <TransactionTable
            transactions={transactions}
            columns={transactionColumns}
            loading={loading}
            pagination={pagination}
            fetchTransactions={fetchTransactions}
          />
        </div>
      </main>
    </div>
  );
}

export default TransactionPage;