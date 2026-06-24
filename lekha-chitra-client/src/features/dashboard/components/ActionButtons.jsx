import { FaPlus } from "react-icons/fa";

function ActionButtons({ onAddClient }) {
  const buttons = [
    {
      title: "Add Client",
      icon: <FaPlus size={12} className="text-white" />,
      action: onAddClient,
    },
  ];

  return (
    <div className="flex items-center">
      {buttons.map((btn) => (
        <button
          key={btn.title}
          onClick={btn.action}
          className="
            bg-[#032A5C]
            text-white
            h-[38px]
            px-4
            rounded-md
            shadow-sm
            flex
            items-center
            gap-2
            hover:bg-[#0B3B77]
            transition-all
            duration-200
            cursor-pointer
            whitespace-nowrap
          "
        >
          {btn.icon}

          <span className="text-sm font-medium">
            {btn.title}
          </span>
        </button>
      ))}
    </div>
  );
}

export default ActionButtons;