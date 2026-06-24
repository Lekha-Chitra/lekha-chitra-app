import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ResetPassword from "../features/auth/pages/ResetPassword";
import Home from "../features/auth/pages/Home";
import CategoryManagement from "../features/category/pages/CategoryManagement";
import Dashboard from "../features/dashboard/pages/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
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
    path: "/home",
    element: <Home />,
  },
  {
    path: "/category",
    element: <CategoryManagement />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
