
function Notification({ message, type }) {
  if (!message) return null;

  return (
    <div
      className={`
        animate-fadeIn
        mb-6
        max-w-md
        px-4
        py-3
        rounded-lg
        shadow-md
        border
        text-sm
        font-medium

        ${
          type === "success"
            ? "bg-green-50 text-green-700 border-green-200"
            : "bg-red-50 text-red-700 border-red-200"
        }
      `}
    >
      {message}
    </div>
  );
}

export default Notification;