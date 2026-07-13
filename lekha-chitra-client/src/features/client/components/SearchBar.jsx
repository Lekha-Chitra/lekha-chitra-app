import { FiSearch } from "react-icons/fi";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative w-full mt-0">
      <input
        type="text"
        placeholder="Search"
         value={search}
         onChange={(e) => setSearch(e.target.value)}
        className="
          w-full
          h-[40px]
          bg-white
          rounded-md
          border
          border-gray-300
          pl-4
          pr-12
          outline-none
          text-sm
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
          text-gray-400
          pointer-events-none
        "
      />
    </div>
  );
}

export default SearchBar;
