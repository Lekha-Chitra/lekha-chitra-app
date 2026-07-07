

import { FaPlus } from "react-icons/fa";
import TransactionSearchBar from "./TransactionSearchBar";

function TransactionActionButtons({
  onAddTransaction,
  search,
  setSearch,
  onOpenFilter,
}) {
  return (
    <div className="w-full space-y-4">
      {/* Mobile */}
      <div className="flex sm:hidden gap-3">
        <button
          onClick={onAddTransaction}
          className="
            flex-1
            h-[48px]
            bg-[#032A5C]
            text-white
            rounded-lg
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-[#043b82]
            transition
            cursor-pointer
          "
        >
          <FaPlus />
          Add Transaction
        </button>

        <button
          onClick={onOpenFilter}
          className="
            flex-1
            h-[48px]
            bg-[#032A5C]
            text-white
            rounded-lg
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-[#043b82]
            transition
            cursor-pointer
            
          "
        >
          <FaPlus />
          Add Filter
        </button>
      </div>

      <div className="sm:hidden">
        <TransactionSearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex items-center gap-4 w-full">
        <button
          onClick={onAddTransaction}
          className="
            w-[220px]
            h-[48px]
            bg-[#032A5C]
            text-white
            rounded-lg
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-[#043b82]
            transition
            shrink-0
            cursor-pointer
          "
        >
          <FaPlus />
          Add Transaction
        </button>

        <div className="flex-1">
          <TransactionSearchBar search={search} setSearch={setSearch} />
        </div>

        <button
          onClick={onOpenFilter}
          className="
            w-[220px]
            h-[48px]
            bg-[#032A5C]
            text-white
            rounded-lg
            font-semibold
            flex
            items-center
            justify-center
            gap-2
            hover:bg-[#043b82]
            transition
            shrink-0
            cursor-pointer
          "
        >
          <FaPlus />
          Add Filter
        </button>
      </div>
    </div>
  );
}

export default TransactionActionButtons;