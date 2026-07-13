// import { Navigate } from "react-router-dom";

// function ProtectedRoute({ children }) {
//   const isLoggedIn = sessionStorage.getItem("isLoggedIn");

//   if (!isLoggedIn) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// }

// export default ProtectedRoute;

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;