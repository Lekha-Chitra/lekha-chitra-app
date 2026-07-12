import { FaTimes } from "react-icons/fa";

function TransactionModalHeader({ onClose }) {
  return (
    <div className="flex items-start justify-between px-5 py-4 bg-gradient-to-r from-slate-50 to-white rounded-t-2xl">
      <div>
        <h2 className="text-lg font-semibold text-[#032A5C]">
          Add Transaction
        </h2>

        {/* <p className="mt-1 text-sm text-gray-500">
          Record an internal or external transaction.
        </p> */}
      </div>

      <button
        onClick={onClose}
        className="
          flex
          h-9
          w-9
          items-center
          justify-center
          rounded-full
          bg-gray-100
          text-gray-500
          transition-all
          duration-200
          hover:bg-red-50
          hover:text-red-500
          active:scale-95
          cursor-pointer
        "
      >
        <FaTimes size={16} />
      </button>
    </div>
  );
}

export default TransactionModalHeader;