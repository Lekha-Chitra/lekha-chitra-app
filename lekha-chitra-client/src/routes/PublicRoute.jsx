import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    return <Navigate to="/analytics" replace />;
  }

  return children;
}

export default PublicRoute;
