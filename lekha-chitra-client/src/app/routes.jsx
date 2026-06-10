import { createBrowserRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import VerifyOtp from "../features/auth/pages/VerifyOtp";
import ResetPassword from "../features/auth/pages/ResetPassword";

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
    path:"/verify-otp",
    element:<VerifyOtp />
  },
  {
     path: "/reset-password",
    element: <ResetPassword />,
  }
  
]);

export default router;
