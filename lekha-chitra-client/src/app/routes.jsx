import { createBrowserRouter } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ResetPassword from "../features/auth/pages/ResetPassword";
import CategoryManagement from "../features/category/pages/CategoryManagement";
import ClientPage from "../features/client/pages/ClientPage";
import DashboardPage from "../features/dashboard/pages/dashboardPage";
import TransactionPage from "../features/transaction/pages/TransactionPage";
import ProtectedRoute from "../routes/ProtectedRoute";
import NotFound from "../routes/NotFound";
import PublicRoute from "../routes/PublicRoute";
import { Navigate } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },

  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/verify-otp",
    element: <VerifyOtp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },

  {
    path: "/category",
    element: (
      <ProtectedRoute>
        <CategoryManagement />
      </ProtectedRoute>
    ),
  },
  {
    path: "/clients",
    element: (
      <ProtectedRoute>
        <ClientPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/analytics",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/transactions",
    element: (
      <ProtectedRoute>
        <TransactionPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
