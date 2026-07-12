import { FiSearch } from "react-icons/fi";

function TransactionSearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search transaction..."
        className="
          w-full
          h-[40px]
          rounded-lg
          border
          border-gray-300
          bg-white
          pl-4
          pr-12
          text-sm
          outline-none
          focus:border-[#032A5C]
        "
      />

      <FiSearch
        size={20}
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
          pointer-events-none
        "
      />
    </div>
  );
}

export default TransactionSearchBar;
