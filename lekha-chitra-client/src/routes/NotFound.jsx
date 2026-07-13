import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
   const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F6F8FB] px-4">
      <h1 className="text-7xl font-bold text-[#032A5C]">404</h1>

      <p className="mt-3 text-2xl font-semibold text-gray-800">
        Page Not Found
      </p>

      <p className="mt-2 text-gray-500 text-center">
        The page you're looking for doesn't exist.
      </p>

      <button
        onClick={() => navigate(isAuthenticated ? "/analytics" : "/login")}
        className="
          mt-8
          px-6
          py-3
          bg-[#032A5C]
          text-white
          rounded-lg
          hover:bg-[#043b82]
          transition
        "
      >
        {isAuthenticated ? "Go to Dashboard" : "Go to Login"}
      </button>
    </div>
  );
}

export default NotFound;
