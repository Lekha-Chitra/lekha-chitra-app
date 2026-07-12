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

function TransactionPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openTransaction, setOpenTransaction] = useState(false);

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
        className="flex-1 overflow-x-hidden p-4 md:p-6 lg:p-8 md:ml-[70px]
          min-h-screen transition-all
          duration-300 "
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
        <div className="mt-6">
          <TransactionActionButtons
            onAddTransaction={() => setOpenTransaction(true)}
            search={search}
            setSearch={setSearch}
            onOpenFilter={handleOpenFilter}
          />
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