import { FaSearch } from "react-icons/fa";

function SearchBar() {
  return (
    <div className="relative w-full mt-8">
      <input
        type="text"
        placeholder="Search"
        className="
          w-full
          h-10
          bg-white
          rounded-md
          border
          border-gray-300
          pl-4
          pr-10
          outline-none
          text-sm
        "
      />

      <FaSearch
        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          text-gray-400
        "
      />
    </div>
  );
}

export default SearchBar;
