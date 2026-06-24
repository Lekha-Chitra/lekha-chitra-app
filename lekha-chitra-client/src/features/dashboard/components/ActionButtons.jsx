import { FaPlus, FaSyncAlt, FaChartLine, FaTrash } from "react-icons/fa";

function ActionButtons({ onAddClient }) {
  const buttons = [
    {
      title: "Add Client",
      icon: <FaPlus className="text-white" />,
      action: onAddClient,
    },
    {
      title: "Update Client",
      icon: <FaSyncAlt className="text-[#6C3BFF]" />,
    },
    {
      title: "Add Transaction",
      icon: <FaChartLine className="text-[#FFC107]" />,
    },
    {
      title: "Delete Client",
      icon: <FaTrash className="text-[#FF4D4F]" />,
    },
  ];

  return (
    <div
      className="
        mt-2
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-5
        w-full
      "
    >
      {buttons.map((btn) => (
        <button
          key={btn.title}
          onClick={btn.action}
          className="
            bg-[#032A5C]
            text-white

            h-[52px]

            rounded-md
            shadow-md

            px-5

            flex
            items-center
            justify-between

            hover:scale-[1.02]
            transition-all
            duration-200
            cursor-pointer
          "
        >
          <span className="text-sm md:text-base">{btn.title}</span>

          <span className="text-lg">{btn.icon}</span>
        </button>
      ))}
    </div>
  );
}

export default ActionButtons;
