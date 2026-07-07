import { FaTimes } from "react-icons/fa";

function TransactionModalHeader({ onClose }) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        px-6
        py-4
        border-b
      "
    >
      <h2 className="text-xl font-bold text-[#032A5C]">Add Transaction</h2>

      <button
        onClick={onClose}
        className="
          text-gray-500
          hover:text-red-500
          transition
        "
      >
        <FaTimes size={20} />
      </button>
    </div>
  );
}

export default TransactionModalHeader;
